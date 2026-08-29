"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "../AdminHeader";
import { createBackendPost, publishBackendPostNow, scheduleAutoPost } from "../calendarActions";
import { fetchIndustries, fetchPosts, fetchFestivals, ApiPost, ApiFestival } from "@/api/homeApi";
import { resolveGeneratorProfileFields } from "@/api/postGeneratorApi";
import { getRandomImageBySubIndustry } from "@/api/calendarApi";
import { API_BASE_URL, API_ENDPOINTS } from "@/api/configApi";
import { useUserProfile } from "@/hooks/useUserProfile";
import ProtectedImage from "@/components/ProtectedImage";

const MIN_CAPTION_LENGTH_FOR_REWRITE = 10;

// ── Types ──────────────────────────────────────────────────────────────────
type ContentType = "image" | "reel" | "carousel" | "festival";
type FilterType = "all" | ContentType;

/** Backend returns type uppercase (e.g. "IMAGE") — normalize to our lowercase
 *  ContentType, defaulting to "image" for anything missing/unrecognized. */
function normalizeApiContentType(raw?: string): ContentType {
  const lower = typeof raw === "string" ? raw.toLowerCase() : "";
  if (lower === "reel" || lower === "carousel") return lower;
  return "image";
}
type SortType = "default" | "engagement" | "newest";
type ViewMode = 4 | 3 | "list";
type PlatKey = "ig" | "li" | "tw" | "fb" | "tk" | "th" | "yt" | "bs" | "pi" | "gb";

interface TimeSlot { t: string; tz: string; e: string; best: boolean }
interface LibCard {
  id: number;
  type: ContentType;
  cat: string;
  cap: string;
  tags: string[];
  plats: PlatKey[];
  img: string;
  bestTime: string;
  eng: string;
  k: string;
}

// ── Constants ──────────────────────────────────────────────────────────────
const PC: Record<PlatKey, string> = {
  ig: "#E1306C", li: "#0A66C2", tw: "#1DA1F2",
  fb: "#1877F2", tk: "#333333", th: "#000000", yt: "#FF0000",
  bs: "#0085FF", pi: "#BD081C", gb: "#4285F4",
};
const PLAT_ICONS: Record<PlatKey, string> = {
  ig: "fa-instagram", li: "fa-linkedin", tw: "fa-x-twitter",
  fb: "fa-facebook", tk: "fa-tiktok", th: "fa-threads", yt: "fa-youtube",
  bs: "fa-bluesky", pi: "fa-pinterest", gb: "fa-google",
};

const TYPE_META: Record<ContentType, { label: string; icon: string; bg: string; c: string }> = {
  image:    { label: "Image",    icon: "fa-image",             bg: "#3B82F6", c: "#3B82F6" },
  reel:     { label: "Reel",     icon: "fa-clapperboard",      bg: "#EC4899", c: "#EC4899" },
  carousel: { label: "Carousel", icon: "fa-table-cells-large", bg: "#F97316", c: "#F97316" },
  festival: { label: "Festival", icon: "fa-cake-candles",      bg: "#F59E0B", c: "#F59E0B" },
};

const TYPES: ContentType[] = [
  "image","image","reel","image","carousel","image","image","reel","festival","image",
  "image","reel","carousel","image","image","image","reel","image","festival","image",
  "image","reel","carousel","image","image","image","reel","image","image","image",
];
const PLAT_SETS: PlatKey[][] = [
  ["ig","fb"],["ig","li"],["tw","ig"],["ig","tk"],["fb","ig","li"],
  ["li","tw"],["ig","tk","fb"],["ig","li","tw"],
];

const IMGS: Record<string, string[]> = {
  "real-estate": [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=75",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=75",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=75",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=75",
    "https://images.unsplash.com/photo-1600607687939-ce8a6d349a58?w=400&q=75",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=75",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=75",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=75",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=75",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=75",
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=400&q=75",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=75",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=75",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&q=75",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75",
    "https://images.unsplash.com/photo-1600210491892-03d54730d73c?w=400&q=75",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=75",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&q=75",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&q=75",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&q=75",
    "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=400&q=75",
    "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=400&q=75",
    "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=400&q=75",
    "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=400&q=75",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&q=75",
    "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=400&q=75",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=75",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=75",
    "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=400&q=75",
    "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=400&q=75",
  ],
  food: [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=75",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&q=75",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=75",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=75",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=75",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=75",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=75",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=75",
    "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=75",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=75",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=75",
    "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&q=75",
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&q=75",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=75",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=75",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=75",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=75",
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=75",
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=75",
    "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&q=75",
    "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=75",
    "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=75",
    "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=75",
    "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400&q=75",
    "https://images.unsplash.com/photo-1539136788836-5699e78bdbf2?w=400&q=75",
    "https://images.unsplash.com/photo-1567345177657-6f000fa86c9e?w=400&q=75",
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=75",
    "https://images.unsplash.com/photo-1473093226555-0c5671b78e0b?w=400&q=75",
    "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&q=75",
  ],
  fitness: [
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=75",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=75",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&q=75",
    "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&q=75",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=75",
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=75",
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=75",
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=75",
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=75",
    "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&q=75",
    "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&q=75",
    "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?w=400&q=75",
    "https://images.unsplash.com/photo-1601422407692-ec4bbe3b7bd0?w=400&q=75",
    "https://images.unsplash.com/photo-1614928228253-dc9b4baccce2?w=400&q=75",
    "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&q=75",
    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=75",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=75",
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=75",
    "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&q=75",
    "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=400&q=75",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=75",
    "https://images.unsplash.com/photo-1486218119243-13883505764c?w=400&q=75",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=75",
    "https://images.unsplash.com/photo-1594894575346-6ae3d7b3be31?w=400&q=75",
    "https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?w=400&q=75",
    "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?w=400&q=75",
    "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400&q=75",
    "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&q=75",
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=75",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=75",
  ],
  fashion: [
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=75",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=75",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=75",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=75",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=75",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=75",
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&q=75",
    "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&q=75",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=75",
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=75",
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=75",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=75",
    "https://images.unsplash.com/photo-1550639524-a6e29a348e7a?w=400&q=75",
    "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?w=400&q=75",
    "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&q=75",
    "https://images.unsplash.com/photo-1558171813-6cb41038d7b2?w=400&q=75",
    "https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=400&q=75",
    "https://images.unsplash.com/photo-1565462905584-dae4f69f649b?w=400&q=75",
    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=75",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=75",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=75",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=75",
    "https://images.unsplash.com/photo-1611042553365-9b101441c135?w=400&q=75",
    "https://images.unsplash.com/photo-1575504270765-d57c1286e1dd?w=400&q=75",
    "https://images.unsplash.com/photo-1594938298603-c8148c4b4b6b?w=400&q=75",
    "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&q=75",
    "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=75",
    "https://images.unsplash.com/photo-1485518882345-15568b007407?w=400&q=75",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=75",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=75",
  ],
  technology: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=75",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=75",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=75",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=75",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=75",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=75",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&q=75",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=75",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&q=75",
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&q=75",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=75",
    "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=400&q=75",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=75",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=75",
    "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=75",
    "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&q=75",
    "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&q=75",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=75",
    "https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=400&q=75",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=75",
    "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400&q=75",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&q=75",
    "https://images.unsplash.com/photo-1506097425191-7ad538b29cef?w=400&q=75",
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=75",
    "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&q=75",
    "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=400&q=75",
    "https://images.unsplash.com/photo-1504223814259-7f50a2bc2e3c?w=400&q=75",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=75",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&q=75",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=75",
  ],
  finance: [
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=75",
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=75",
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=75",
    "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&q=75",
    "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&q=75",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=75",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=75",
    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&q=75",
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=75",
    "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&q=75",
    "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=400&q=75",
    "https://images.unsplash.com/photo-1619697944777-a21ec0688c76?w=400&q=75",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=75",
    "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&q=75",
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=75",
    "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=400&q=75",
    "https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?w=400&q=75",
    "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?w=400&q=75",
    "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=400&q=75",
    "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=400&q=75",
    "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=400&q=75",
    "https://images.unsplash.com/photo-1620714223084-8fcacc2dbed5?w=400&q=75",
    "https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?w=400&q=75",
    "https://images.unsplash.com/photo-1634704784915-aacf363b021f?w=400&q=75",
    "https://images.unsplash.com/photo-1579170053380-58064b2dee67?w=400&q=75",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=75",
    "https://images.unsplash.com/photo-1612714895539-866f84a84e50?w=400&q=75",
    "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=400&q=75",
    "https://images.unsplash.com/photo-1624705013726-8d0a89321fe0?w=400&q=75",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=75",
  ],
  beauty: [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=75",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=75",
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=75",
    "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=400&q=75",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&q=75",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=75",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=75",
    "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400&q=75",
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=75",
    "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=400&q=75",
    "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400&q=75",
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=75",
    "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=400&q=75",
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&q=75",
    "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?w=400&q=75",
    "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=400&q=75",
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&q=75",
    "https://images.unsplash.com/photo-1543747579-795b9c2c3ada?w=400&q=75",
    "https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?w=400&q=75",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=75",
    "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&q=75",
    "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=75",
    "https://images.unsplash.com/photo-1600428853876-fb3168be8c08?w=400&q=75",
    "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400&q=75",
    "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&q=75",
    "https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?w=400&q=75",
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=75",
    "https://images.unsplash.com/photo-1512208886994-dafd16e17b79?w=400&q=75",
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400&q=75",
    "https://images.unsplash.com/photo-1591019052241-e4d84ee7bc16?w=400&q=75",
  ],
  festival: [
    "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&q=75",
    "https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?w=400&q=75",
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=75",
    "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&q=75",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=75",
    "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=400&q=75",
    "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=400&q=75",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=75",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=75",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=75",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=75",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=75",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&q=75",
    "https://images.unsplash.com/photo-1571266752049-c6d76e60c4cd?w=400&q=75",
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&q=75",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=75",
    "https://images.unsplash.com/photo-1416339684178-3a239570f315?w=400&q=75",
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&q=75",
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=400&q=75",
    "https://images.unsplash.com/photo-1547700055-b61cacebece9?w=400&q=75",
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=75",
    "https://images.unsplash.com/photo-1483213097419-365e22f0f258?w=400&q=75",
    "https://images.unsplash.com/photo-1443632864897-14973fa006cf?w=400&q=75",
    "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400&q=75",
    "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=400&q=75",
    "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=400&q=75",
    "https://images.unsplash.com/photo-1493247073932-d9471af2cd37?w=400&q=75",
    "https://images.unsplash.com/photo-1561489413-985b06da5bee?w=400&q=75",
    "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=400&q=75",
    "https://images.unsplash.com/photo-1565608438257-fac3c27bdbf2?w=400&q=75",
  ],
  travel: [
    "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=75",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=75",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=75",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=75",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=75",
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=75",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=75",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&q=75",
    "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400&q=75",
    "https://images.unsplash.com/photo-1520645521318-f03a712f0e67?w=400&q=75",
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=75",
    "https://images.unsplash.com/photo-1505832249882-8de47cc7d003?w=400&q=75",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=75",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=75",
    "https://images.unsplash.com/photo-1526427974702-a03c4a8a26d4?w=400&q=75",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=75",
    "https://images.unsplash.com/photo-1553603227-2358aabe8d10?w=400&q=75",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=75",
    "https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=400&q=75",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=75",
    "https://images.unsplash.com/photo-1601581987809-a874a81309c9?w=400&q=75",
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=75",
    "https://images.unsplash.com/photo-1548194197-0b3e8a7edb77?w=400&q=75",
    "https://images.unsplash.com/photo-1464716013513-5836cc5d3e57?w=400&q=75",
    "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&q=75",
    "https://images.unsplash.com/photo-1542996966-2e31c00bae31?w=400&q=75",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75",
    "https://images.unsplash.com/photo-1526526318579-e5b6e1e24a48?w=400&q=75",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=75",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=75",
  ],
  startup: [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=75",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=75",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=75",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=75",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=75",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=75",
    "https://images.unsplash.com/photo-1551135049-8a33b5883817?w=400&q=75",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=75",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=75",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=75",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&q=75",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=75",
    "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&q=75",
    "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=400&q=75",
    "https://images.unsplash.com/photo-1543269664-7eef42226a21?w=400&q=75",
    "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&q=75",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=75",
    "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=400&q=75",
    "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=400&q=75",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=75",
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&q=75",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=75",
    "https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=400&q=75",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=75",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=75",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=75",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=75",
    "https://images.unsplash.com/photo-1563461660947-507ef49e9c47?w=400&q=75",
    "https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=400&q=75",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=75",
  ],
};

const CAPS: Record<string, string[]> = {
  "real-estate": ["Just listed! 🏡 4-bed, 3-bath in a prime location — private tour available this weekend. Priced at $1.2M. DM to book.","SOLD in 8 days, $42K over asking 🔑 Our digital-first strategy gets results. Ready to sell?","Market update: Inventory is at a 5-year low while buyer demand hits record highs. Here's what YOUR property is worth.","Open House Sunday 2–5 PM 🏠 Step inside this stunning renovated Victorian — original details, modern upgrades."],
  food: ["New on the menu 🍽 Our chef spent 3 months perfecting this truffle risotto. Every grain cooked separately. Come taste the obsession.","The secret to our signature pasta? 3 ingredients, 2 hours, 1 very stubborn chef 👨‍🍳 Full recipe below.","Farm-to-table isn't a phrase here — it's our supply chain. 85% locally sourced. Fresh tastes different.","Saturday brunch energy ✨ Golden hour, good coffee, great company. Tag who you're bringing."],
  fitness: ["30-day transformation 💪 Meet Alex — down 14kg, ran their first 5K. This is what showing up looks like. EVERY. SINGLE. DAY.","HIIT you can do with ZERO equipment in 20 minutes 🔥 Save this and do it tomorrow morning.","Most underrated recovery tool? Not an ice bath. Not supplements. Sleep. Here's the science. 😴","Night yoga launching Monday 🌙 Perfect for decompressing after 9-to-5s. 12 spots. Book now."],
  fashion: ["New collection DROP 🔥 Inspired by Milan, made for everywhere. 24 new pieces. Live now.","The outfit formula for every occasion: elevated basics + ONE statement piece. Save this.","End of season sale: up to 60% off our most-loved pieces ⏳ 48 hours only.","Sustainable by design 🌿 Our new eco line: 100% recycled materials, same craftsmanship."],
  technology: ["🚀 v3.0 is LIVE. 47 improvements, 12 new features, 0 bugs in 48 hours. Full changelog below.","AI isn't replacing your job — someone using AI is. 5 tools every professional needs in 2026. 🤖","0 to 100K users in 18 months, $0 paid acquisition. The full growth playbook — no gatekeeping 🧵","We just open-sourced our internal analytics tool 🎁 Free for the community. Link in bio."],
  finance: ["The market dropped 8% this week. Here's the only question that actually matters for YOUR portfolio 📊","₹5K/month at 25 vs 35: the difference by retirement is ₹2.8 crore. Time is the most powerful asset you own. 📈","50/30/20 rule is OUTDATED. Here's what actually works for the modern income earner.","Tax-saving deadline approaching ⏰ 5 deductions 80% of salaried people miss EVERY year."],
  beauty: ["The 3-step routine that cleared my skin in 21 days ✨ Zero filters. Full details in bio.","Before and after: 8 weeks of consistent use 🌟 No editing — just the honest results.","New launch 🚨 Vitamin C + niacinamide + bakuchiol blend. Derm-tested. Zero compromise. Link in bio.","Clean beauty isn't a label — it's a standard. Our formulations pass 1,400+ safety checks."],
  festival: ["✨ Wishing you and your family a Diwali filled with light, love, and prosperity. Happy Diwali! 🪔","🎄 From our entire team to yours — may your Christmas be warm and your heart lighter.","🌈 Happy Holi! May the colours of this beautiful festival fill your life with joy and fresh beginnings.","🎊 Another year of learning and growing together. Here's to everything 2026 has in store! 🥂"],
  travel: ["Hidden gem 💎 This beach sees fewer than 2K visitors a year. We're about to change that — just a little. For you.","Flight booking hack: Tuesday at 2 AM in the destination timezone. Average saving: 23% 🎫","That moment you watch the sunrise over Santorini and realise this is what you worked for 🌅","Bali in 7 days on a mid-range budget 🌴 ₹8K/day all-inclusive. Day-by-day itinerary: swipe."],
  startup: ["We just closed our Series A 🚀 $8M raised. Here's what happens next — full thread below.","100K users, 18 months, $0 paid acquisition 📈 The exact growth playbook. No gatekeeping.","Hot take: most startups fail not from bad PMF but because founders underestimate how long great things take. 🔥","Culture > strategy every single time 🍳 5 principles we built our team on from Day 1."],
};

const TAGS_MAP: Record<string, string[]> = {
  "real-estate": ["#RealEstate","#JustListed","#HomeBuying","#PropertyForSale","#NewListing","#DreamHome"],
  food: ["#FoodPhotography","#FoodieLife","#RestaurantLife","#NewMenu","#ChefLife","#EatLocal"],
  fitness: ["#FitnessMotivation","#WorkoutOfTheDay","#GymLife","#FitnessTips","#HealthyLifestyle","#PersonalTrainer"],
  fashion: ["#FashionNova","#OOTD","#NewCollection","#StyleInspo","#SustainableFashion","#FashionBlogger"],
  technology: ["#TechStartup","#ProductUpdate","#AITechnology","#SoftwareDevelopment","#TechTips","#Innovation"],
  finance: ["#PersonalFinance","#InvestingTips","#WealthManagement","#StockMarket","#MutualFunds","#FinancialPlanning"],
  beauty: ["#SkincareCommunity","#BeautyTips","#SkincareRoutine","#NaturalBeauty","#GlowUp","#CleanBeauty"],
  festival: ["#HappyDiwali","#FestiveVibes","#Celebration","#HolidayCheer","#FestivalSeason","#HappyHoli"],
  travel: ["#TravelPhotography","#TravelTips","#Wanderlust","#TravelBlogger","#ExploreMore","#HiddenGems"],
  startup: ["#StartupLife","#Entrepreneurship","#FounderStory","#VentureCapital","#GrowthHacking","#BuildInPublic"],
};

const BEST_TIMES: Record<string, TimeSlot[]> = {
  "real-estate": [
    { t:"8:00 AM",  tz:"IST", e:"9.1%",  best:true  },
    { t:"12:00 PM", tz:"IST", e:"7.4%",  best:false },
    { t:"5:00 PM",  tz:"IST", e:"8.8%",  best:true  },
    { t:"7:30 PM",  tz:"IST", e:"6.2%",  best:false },
    { t:"9:00 AM",  tz:"EST", e:"8.3%",  best:false },
    { t:"6:00 PM",  tz:"EST", e:"7.9%",  best:false },
    { t:"8:00 AM",  tz:"CET", e:"7.1%",  best:false },
    { t:"7:00 PM",  tz:"CET", e:"8.5%",  best:true  },
  ],
  default: [
    { t:"8:00 AM",  tz:"IST", e:"9.2%",  best:true  },
    { t:"12:00 PM", tz:"IST", e:"7.8%",  best:false },
    { t:"6:00 PM",  tz:"IST", e:"10.4%", best:true  },
    { t:"9:00 PM",  tz:"IST", e:"8.1%",  best:false },
    { t:"9:00 AM",  tz:"EST", e:"9.7%",  best:true  },
    { t:"5:00 PM",  tz:"EST", e:"8.4%",  best:false },
    { t:"10:00 AM", tz:"CET", e:"8.9%",  best:false },
    { t:"7:00 PM",  tz:"CET", e:"9.3%",  best:false },
  ],
};

const INDUSTRY_CATS: Record<string, string[]> = {
  "real-estate": ["New Listing","Price Drop","Market Update","Open House","Sold!","Investment","Staging","Neighbourhood","Mortgage Guide","Buyer Tips"],
  food: ["New Dish","Recipe","Seasonal Menu","Chef Feature","Behind Kitchen","Farm to Table","Weekend Special","Review","Coffee Art","Dessert"],
  fitness: ["WOD","Transformation","Nutrition","New Class","Member Win","Challenge","Recovery","Trainer","Mindset","Progress"],
  fashion: ["New Arrival","OOTD","Sale Alert","Lookbook","Sustainable","Collab","Size Inclusive","Styling","Trend Report","Behind Seams"],
  technology: ["Product Update","AI Spotlight","Dev Tips","Security","Product Hunt","Feature Launch","Code Drop","Founder Story","Startup Life","Open Source"],
  finance: ["Market Update","Tip","Budget","Client Win","Crypto","Tax Tips","SIP Guide","Wealth","Economic Watch","Education"],
  beauty: ["New Launch","Skin Tip","Tutorial","Ingredient","Routine","Clean Beauty","Glow Up","Self-Care","Wellness","Review"],
  festival: ["Diwali","Christmas","New Year","Eid","Holi","Independence Day","Navratri","Thanksgiving","Halloween","Raksha Bandhan"],
  travel: ["Hidden Gem","Travel Hack","Package","Hotel","Adventure","Budget","Luxury","Visa Tips","Road Trip","Itinerary"],
  startup: ["Funding News","Launch","Founder Insight","Hiring","Culture","Milestone","Disruption","Thought Leadership","Behind Scenes","Investor Update"],
};

const ENG_VALS = ["4.1%","6.8%","3.2%","8.6%","5.4%","9.1%","7.3%","11.2%","10.4%","8.9%"];

const SEARCH_MAP: Record<string, string> = {
  "real estate":"real-estate", "realestate":"real-estate", "property":"real-estate",
  food:"food", restaurant:"food", fitness:"fitness", gym:"fitness", workout:"fitness",
  fashion:"fashion", style:"fashion", tech:"technology", technology:"technology",
  finance:"finance", money:"finance", beauty:"beauty", skincare:"beauty",
  festival:"festival", diwali:"festival", travel:"travel", startup:"startup", startups:"startup",
};

const INDUSTRY_PILLS = [
  { k:"", label:"⚡ All" },
  { k:"real-estate", label:"🏠 Real Estate" },
  { k:"food", label:"🍽 Food" },
  { k:"fitness", label:"💪 Fitness" },
  { k:"fashion", label:"👗 Fashion" },
  { k:"technology", label:"💻 Tech" },
  { k:"finance", label:"💰 Finance" },
  { k:"beauty", label:"💄 Beauty" },
  { k:"festival", label:"🎉 Festival" },
  { k:"travel", label:"✈ Travel" },
  { k:"startup", label:"🚀 Startup" },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function buildCards(k: string): LibCard[] {
  const imgs = IMGS[k] || IMGS.startup;
  const caps = CAPS[k] || CAPS.startup;
  const tags = TAGS_MAP[k] || TAGS_MAP.startup;
  const cats = INDUSTRY_CATS[k] || INDUSTRY_CATS.startup;
  const times = BEST_TIMES[k] || BEST_TIMES.default;
  return Array.from({ length: 30 }, (_, i) => {
    const bt = times[i % times.length];
    return {
      id: i,
      type: TYPES[i],
      cat: cats[i % cats.length],
      cap: caps[i % caps.length],
      tags: tags.slice(0, 6),
      plats: PLAT_SETS[i % PLAT_SETS.length],
      img: imgs[i],
      bestTime: `${bt.t} ${bt.tz}`,
      eng: ENG_VALS[i % ENG_VALS.length],
      k,
    };
  });
}

// ── Toast hook ─────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState({ visible: false, msg: "", type: "green" });
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = (msg: string, type = "green") => {
    if (t.current) window.clearTimeout(t.current);
    setToast({ visible: true, msg, type });
    t.current = setTimeout(() => setToast(s => ({ ...s, visible: false })), 2800);
  };
  return { toast, show };
}

// ── Composer Modal ─────────────────────────────────────────────────────────
function ComposerModal({ card, onClose, showToast }: {
  card: LibCard | null;
  onClose: () => void;
  showToast: (msg: string, type?: string) => void;
}) {
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [isRewritingCaption, setIsRewritingCaption] = useState(false);
  const rewriteAbortRef = useRef<AbortController | null>(null);
  const [isRefreshingHashtags, setIsRefreshingHashtags] = useState(false);
  const hashtagAbortRef = useRef<AbortController | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [selPlats, setSelPlats] = useState<PlatKey[]>(["ig"]);
  const [img, setImg] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [isSwappingImage, setIsSwappingImage] = useState(false);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const [dateVal, setDateVal] = useState(tomorrow.toISOString().split("T")[0]);
  const [timeMode, setTimeMode] = useState<"recommended" | "custom">("recommended");
  const [selTimeIdx, setSelTimeIdx] = useState<number | null>(null);
  const [customTime, setCustomTime] = useState("09:00");
  const [submitting, setSubmitting] = useState<"publish" | "schedule" | null>(null);

  useEffect(() => {
    if (card) {
      setCaption(card.cap); setTags([...card.tags]); setSelPlats(card.plats.length ? card.plats : ["ig"]);
      setImg(card.img); setImgFile(null); setIsSwappingImage(false);
      setDateVal(tomorrow.toISOString().split("T")[0]); setTimeMode("recommended"); setSelTimeIdx(null); setCustomTime("09:00");
      setIsRewritingCaption(false); setSubmitting(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);

  if (!card) return null;

  const slots = (BEST_TIMES[card.k] || BEST_TIMES.default).slice(0, 4);

  const to24HourTime = (t: string): string => {
    const m = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!m) return "";
    let h = parseInt(m[1], 10);
    const mod = m[3].toUpperCase();
    if (mod === "PM" && h < 12) h += 12;
    if (mod === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${m[2]}`;
  };

  const getScheduledDate = (): Date => {
    const timeStr = timeMode === "custom"
      ? (customTime || "09:00")
      : (to24HourTime(slots[selTimeIdx ?? Math.max(slots.findIndex(s => s.best), 0)]?.t || slots[0].t) || "09:00");
    return new Date(`${dateVal}T${timeStr}:00`);
  };

  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImg(URL.createObjectURL(file));
    setImgFile(file);
    showToast("🖼️ Image updated!", "green");
    e.target.value = "";
  };

  /** Swaps in a fresh library image for this post's sub-industry via
   *  GET /api/display-images/one-image (same endpoint the Calendar page's
   *  monthly-plan flow already uses to fetch a random text-ready image).
   *  `card.k` is only a real subIndustryId for posts loaded from the live
   *  library API — demo/fallback cards use a category slug instead, so a
   *  400 "Invalid subIndustryId" from the backend is expected there and
   *  surfaced as a friendly toast rather than a crash. */
  const handleSwapImage = async () => {
    if (isSwappingImage || !card) return;
    setIsSwappingImage(true);
    try {
      const image = await getRandomImageBySubIndustry(card.k);
      setImg(image.file);
      setImgFile(null);
      showToast("🔄 Image swapped!", "green");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Couldn't fetch a new image. Please try again.", "red");
    } finally {
      setIsSwappingImage(false);
    }
  };

  const togglePlat = (pl: PlatKey) => setSelPlats(prev => prev.includes(pl) ? prev.filter(x => x !== pl) : [...prev, pl]);

  const addTag = () => {
    const v = tagInput.trim().replace(/^#+/, "");
    if (v && tags.length < 10) { setTags(prev => [...prev, "#" + v]); setTagInput(""); }
  };

  const canRewriteCaption = caption.trim().length >= MIN_CAPTION_LENGTH_FOR_REWRITE && !isRewritingCaption;

  const handleRewriteCaption = async () => {
    if (isRewritingCaption || caption.trim().length < MIN_CAPTION_LENGTH_FOR_REWRITE) return;

    setIsRewritingCaption(true);
    rewriteAbortRef.current?.abort();
    const controller = new AbortController();
    rewriteAbortRef.current = controller;

    try {
      const response = await fetch(API_ENDPOINTS.textGeneratorGenerateDirect, {
        method: "POST",
        headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
        body: JSON.stringify({ prompt: `Rewrite this social media caption to be more engaging while keeping a similar length and meaning:\n\n${caption.trim()}` }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`Request failed (${response.status})`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const raw = trimmed.slice(5).trim();
          if (!raw || raw === "[DONE]") continue;
          try {
            const parsed = JSON.parse(raw) as { text?: string; done?: boolean };
            if (parsed.done) break;
            if (parsed.text) {
              accumulated += parsed.text;
              setCaption(accumulated);
            }
          } catch {
            // skip malformed chunk
          }
        }
      }

      if (!accumulated) throw new Error("No text received from API.");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      showToast(error instanceof Error ? error.message : "Could not rewrite caption. Please try again.", "red");
    } finally {
      if (rewriteAbortRef.current === controller) rewriteAbortRef.current = null;
      setIsRewritingCaption(false);
    }
  };

  const canRefreshHashtags = caption.trim().length >= MIN_CAPTION_LENGTH_FOR_REWRITE && !isRefreshingHashtags;

  /** Fallback only for when the backend's JSON parse fails and it streams the
   *  raw model text instead (see geminiimage.service.ts's parseHashtagsResult,
   *  which already does the same split server-side — this just guards against
   *  any stray formatting that slips through). */
  const parseHashtagsFromText = (raw: string): string[] => {
    const cleaned = raw.replace(/^["'\s]+|["'\s]+$/g, "");
    const rough = cleaned.split(/[,\n]+/).map(s => s.trim()).filter(Boolean);
    const candidates = rough.length > 1 ? rough : cleaned.split(/\s+/);

    const tokens = candidates
      .map(s => s.replace(/^#+/, "").replace(/[^A-Za-z0-9_]/g, ""))
      .filter(s => s.length >= 2);

    const deduped = Array.from(new Set(tokens.map(t => t.toLowerCase())))
      .map(lower => tokens.find(t => t.toLowerCase() === lower)!)
      .slice(0, 8);

    return deduped.map(t => "#" + t);
  };

  /** Calls the dedicated POST /api/generator/hashtags endpoint (added
   *  alongside this feature) rather than reusing the caption-rewrite
   *  endpoint — that one's prompt is hard-wired to forbid hashtags entirely,
   *  so it could never reliably serve this. */
  const handleRefreshHashtags = async () => {
    if (isRefreshingHashtags || caption.trim().length < MIN_CAPTION_LENGTH_FOR_REWRITE) return;

    setIsRefreshingHashtags(true);
    hashtagAbortRef.current?.abort();
    const controller = new AbortController();
    hashtagAbortRef.current = controller;

    try {
      const response = await fetch(API_ENDPOINTS.hashtagGeneratorDirect, {
        method: "POST",
        headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
        body: JSON.stringify({ caption: caption.trim() }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`Request failed (${response.status})`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let hashtags: string[] | null = null;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const raw = trimmed.slice(5).trim();
          if (!raw || raw === "[DONE]") continue;
          try {
            const parsed = JSON.parse(raw) as { hashtags?: string[]; done?: boolean };
            if (parsed.done) break;
            if (Array.isArray(parsed.hashtags)) hashtags = parsed.hashtags;
          } catch {
            // skip malformed chunk
          }
        }
      }

      if (!hashtags || !hashtags.length) throw new Error("No hashtags received from API.");
      const normalized = hashtags.map(h => "#" + h.replace(/^#+/, "").trim()).filter(h => h.length > 1);
      const parsed = normalized.length ? normalized : parseHashtagsFromText(hashtags.join(", "));
      if (!parsed.length) throw new Error("Couldn't parse any hashtags from the AI's reply.");
      setTags(parsed.slice(0, 8));
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      showToast(error instanceof Error ? error.message : "Could not refresh hashtags. Please try again.", "red");
    } finally {
      if (hashtagAbortRef.current === controller) hashtagAbortRef.current = null;
      setIsRefreshingHashtags(false);
    }
  };

  /** Creates the post on the real backend (POST /api/calendar/post/manual) —
   *  same call the Calendar page's New Post modal makes. */
  const createPostOnBackend = async (postTime: Date) => {
    return createBackendPost({
      postTime,
      caption,
      hashtags: tags,
      imageUrl: imgFile ? undefined : img,
      imageFile: imgFile,
    });
  };

  const handlePublishNow = async () => {
    if (submitting) return;
    if (!caption.trim()) { showToast("Write a caption first", "red"); return; }
    if (!selPlats.length) { showToast("Select a platform first", "red"); return; }

    setSubmitting("publish");
    try {
      const { backendId } = await createPostOnBackend(new Date());
      if (!backendId) {
        showToast("Couldn't sync to the server — please try again.", "red");
        return;
      }
      await publishBackendPostNow(backendId);
      showToast("✅ Post is being published now", "green");
      onClose();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Failed to publish post.", "red");
    } finally {
      setSubmitting(null);
    }
  };

  const handleSaveAndSchedule = async () => {
    if (submitting) return;
    if (!caption.trim()) { showToast("Write a caption first", "red"); return; }

    setSubmitting("schedule");
    try {
      const scheduledAt = getScheduledDate();
      const { backendId, imageUrl } = await createPostOnBackend(scheduledAt);
      if (!backendId) {
        showToast("Couldn't sync to the server — please try again.", "red");
        return;
      }
      try {
        await scheduleAutoPost({
          plats: selPlats,
          caption,
          hashtags: tags,
          scheduledAt,
          imageUrl: imageUrl || img,
        });
      } catch {
        showToast("Scheduled, but auto-posting setup failed.", "amber");
      }
      showToast("✅ Post scheduled!", "green");
      onClose();
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <div onClick={e => { if ((e.target as HTMLElement).id === "comp-overlay") onClose(); }}
      id="comp-overlay"
      style={{ position:"fixed",inset:0,background:"rgba(13,14,26,.4)",backdropFilter:"blur(8px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
      <div style={{ background:"#fff",border:"1px solid #E4E5EF",borderRadius:18,width:880,maxWidth:"100%",maxHeight:"90vh",overflow:"hidden",boxShadow:"0 24px 56px rgba(13,14,26,.14)",display:"flex",flexDirection:"column" }}>
        {/* Header */}
        <div style={{ display:"flex",alignItems:"center",gap:12,padding:"16px 20px",borderBottom:"1px solid #E4E5EF",flexShrink:0,position:"sticky",top:0,zIndex:2,background:"#fff" }}>
          <div style={{ width:36,height:36,borderRadius:9,background:"#EEEEFF",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <i className="fa-solid fa-pen" style={{ color:"#F97316" }} />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:16,fontWeight:800,color:"#0D0E1A",fontFamily:"Sora,sans-serif" }}>Use This Post</div>
            <div style={{ fontSize:12,color:"#9496B5",marginTop:1 }}>Edit, post instantly or schedule</div>
          </div>
          <div onClick={onClose} style={{ width:30,height:30,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",color:"#9496B5",cursor:"pointer" }}>
            <i className="fa-solid fa-xmark" style={{ fontSize:14 }} />
          </div>
        </div>
        {/* Body */}
        <div style={{ display:"flex",flex:1,overflow:"hidden" }}>
          {/* Left */}
          <div style={{ width:260,flexShrink:0,background:"#F0F1F8",borderRight:"1px solid #E4E5EF",display:"flex",flexDirection:"column" }}>
            <div style={{ flex:1,overflow:"hidden",position:"relative",minHeight:160 }}>
              <ProtectedImage src={img} alt="" wrapperStyle={{ width:"100%",height:"100%" }} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
              <input ref={imgInputRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleImgUpload} />
            </div>
            <div style={{ display:"flex",gap:6,padding:"8px 10px",borderTop:"1px solid #E4E5EF" }}>
              <button onClick={() => imgInputRef.current?.click()} disabled={isSwappingImage}
                style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:5,padding:"6px 8px",borderRadius:7,border:"1px solid #E4E5EF",background:"#fff",color:"#3D3F60",fontSize:11.5,fontWeight:700,cursor:isSwappingImage?"not-allowed":"pointer",opacity:isSwappingImage?.6:1 }}>
                <i className="fa-solid fa-upload" style={{ fontSize:10 }} /> Upload
              </button>
              <button onClick={handleSwapImage} disabled={isSwappingImage}
                title="Fetch a different image from the library for this category"
                style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:5,padding:"6px 8px",borderRadius:7,border:"1px solid #E4E5EF",background:"#fff",color:"#3D3F60",fontSize:11.5,fontWeight:700,cursor:isSwappingImage?"not-allowed":"pointer",opacity:isSwappingImage?.6:1 }}>
                <i className={isSwappingImage ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-shuffle"} style={{ fontSize:10 }} /> {isSwappingImage ? "Swapping…" : "Swap"}
              </button>
            </div>
            <div style={{ padding:"10px 12px",borderTop:"1px solid #E4E5EF" }}>
              <div style={{ fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".5px",color:"#9496B5",marginBottom:6,fontFamily:"Sora,sans-serif" }}>Platforms</div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(5, minmax(0, 1fr))",gap:6 }}>
                {(["ig","fb","li","tw","tk","yt","th","bs","pi","gb"] as PlatKey[]).map(pl => {
                  const on = selPlats.includes(pl);
                  return (
                    <div key={pl} title={pl.toUpperCase()} onClick={() => togglePlat(pl)} style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:4,padding:"6px 4px",borderRadius:6,border:`1.5px solid ${on?PC[pl]:"#E4E5EF"}`,background:on?PC[pl]:"#fff",fontSize:11.5,fontWeight:700,cursor:"pointer",color:on?"#fff":"#9496B5",overflow:"hidden" }}>
                      <i className={`fa-brands ${PLAT_ICONS[pl]}`} style={{ fontSize:10,flexShrink:0 }} />{pl.toUpperCase()}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Right */}
          <div style={{ flex:1,overflowY:"auto",padding:"16px 18px",display:"flex",flexDirection:"column",gap:14 }}>
            {/* Caption */}
            <div>
              <div style={{ fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".5px",color:"#9496B5",marginBottom:6,fontFamily:"Sora,sans-serif",display:"flex",alignItems:"center" }}>
                Caption
                <span
                  onClick={handleRewriteCaption}
                  title={canRewriteCaption ? "Rewrite with AI" : `Type at least ${MIN_CAPTION_LENGTH_FOR_REWRITE} characters to rewrite`}
                  style={{ marginLeft:"auto",display:"flex",alignItems:"center",gap:4,fontSize:11,fontWeight:700,textTransform:"none",letterSpacing:0,color:canRewriteCaption?"#F97316":"#C8CADF",cursor:canRewriteCaption?"pointer":"not-allowed" }}
                >
                  {isRewritingCaption ? (
                    <><i className="fa-solid fa-spinner fa-spin" style={{ fontSize:10 }} /> Rewriting…</>
                  ) : (
                    <>✦ Rewrite</>
                  )}
                </span>
              </div>
              <textarea value={caption} onChange={e => setCaption(e.target.value)} placeholder="Your caption…"
                style={{ width:"100%",padding:"10px 12px",borderRadius:7,border:"1px solid #E4E5EF",background:"#F0F1F8",color:"#0D0E1A",fontSize:13.5,outline:"none",resize:"none",minHeight:85,lineHeight:1.6,fontFamily:"inherit" }} />
              <div style={{ textAlign:"right",fontSize:11,color:"#C8CADF",fontFamily:"JetBrains Mono,monospace",marginTop:3 }}>{caption.length} / 2,200</div>
            </div>
            {/* Hashtags */}
            <div>
              <div style={{ fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".5px",color:"#9496B5",marginBottom:6,fontFamily:"Sora,sans-serif",display:"flex",alignItems:"center" }}>
                Hashtags
                <span
                  onClick={handleRefreshHashtags}
                  title={canRefreshHashtags ? "Regenerate with AI" : `Write at least ${MIN_CAPTION_LENGTH_FOR_REWRITE} characters of caption first`}
                  style={{ marginLeft:"auto",display:"flex",alignItems:"center",gap:4,fontSize:11,fontWeight:700,textTransform:"none",letterSpacing:0,color:canRefreshHashtags?"#F97316":"#C8CADF",cursor:canRefreshHashtags?"pointer":"not-allowed" }}
                >
                  {isRefreshingHashtags ? (
                    <><i className="fa-solid fa-spinner fa-spin" style={{ fontSize:10 }} /> Refreshing…</>
                  ) : (
                    <>✦ Refresh</>
                  )}
                </span>
              </div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginBottom:7 }}>
                {tags.map((t, i) => (
                  <div key={t+i} style={{ display:"flex",alignItems:"center",gap:4,padding:"3px 9px",borderRadius:5,background:"#EEEEFF",border:"1px solid #E0E0FA",color:"#F97316",fontSize:11.5,fontWeight:600,fontFamily:"JetBrains Mono,monospace" }}>
                    {t} <span onClick={() => setTags(prev => prev.filter((_, j) => j !== i))} style={{ fontSize:14,opacity:.5,cursor:"pointer" }}>×</span>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex",gap:6 }}>
                <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key==="Enter"||e.key===",") { e.preventDefault(); addTag(); } }} placeholder="Add hashtag…"
                  style={{ flex:1,padding:"8px 11px",borderRadius:7,border:"1px solid #E4E5EF",background:"#F0F1F8",color:"#0D0E1A",fontSize:12.5,outline:"none",fontFamily:"inherit" }} />
                <button onClick={addTag} style={{ padding:"8px 12px",borderRadius:7,background:"#EEEEFF",border:"1px solid #E0E0FA",color:"#F97316",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap" }}>+ Add</button>
              </div>
            </div>
            {/* Date */}
            <div>
              <div style={{ fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".5px",color:"#9496B5",marginBottom:6,fontFamily:"Sora,sans-serif" }}>Date</div>
              <input type="date" value={dateVal} onChange={e => setDateVal(e.target.value)} style={{ width:"100%",padding:"10px 12px",borderRadius:7,border:"1px solid #E4E5EF",background:"#F0F1F8",color:"#0D0E1A",fontSize:13.5,outline:"none",fontFamily:"inherit" }} />
            </div>
            {/* Posting time mode */}
            <div>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6 }}>
                <div style={{ fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".5px",color:"#9496B5",fontFamily:"Sora,sans-serif" }}>Posting Time</div>
                <span onClick={() => router.push("/dashboards/settings/smart-schedule")} style={{ display:"flex",alignItems:"center",gap:4,fontSize:11,fontWeight:700,color:"#F97316",cursor:"pointer" }}>
                  <i className="fa-solid fa-gear" style={{ fontSize:10 }} /> Smart Schedule
                </span>
              </div>
              <div style={{ display:"flex",gap:4,padding:3,borderRadius:8,background:"#F0F1F8",border:"1px solid #E4E5EF",marginBottom:10 }}>
                <button type="button" onClick={() => setTimeMode("recommended")} style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:5,padding:"6px 8px",borderRadius:6,fontSize:11.5,fontWeight:700,border:"none",cursor:"pointer",fontFamily:"Sora,sans-serif",background:timeMode==="recommended"?"#fff":"transparent",color:timeMode==="recommended"?"#F97316":"#9496B5",boxShadow:timeMode==="recommended"?"0 1px 3px rgba(13,14,26,.08)":"none" }}>
                  <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize:10 }} /> Recommended
                </button>
                <button type="button" onClick={() => setTimeMode("custom")} style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:5,padding:"6px 8px",borderRadius:6,fontSize:11.5,fontWeight:700,border:"none",cursor:"pointer",fontFamily:"Sora,sans-serif",background:timeMode==="custom"?"#fff":"transparent",color:timeMode==="custom"?"#F97316":"#9496B5",boxShadow:timeMode==="custom"?"0 1px 3px rgba(13,14,26,.08)":"none" }}>
                  <i className="fa-solid fa-clock" style={{ fontSize:10 }} /> Custom Time
                </button>
              </div>
              {timeMode === "custom" && (
                <input type="time" value={customTime} onChange={e => setCustomTime(e.target.value)}
                  style={{ width:"100%",padding:"10px 12px",borderRadius:7,border:"1px solid #E4E5EF",background:"#F0F1F8",color:"#0D0E1A",fontSize:13.5,outline:"none",fontFamily:"inherit" }} />
              )}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div style={{ padding:"12px 20px",borderTop:"1px solid #E4E5EF",display:"flex",gap:8,alignItems:"center",background:"#F0F1F8",flexShrink:0 }}>
          <button onClick={onClose} style={{ padding:"9px 16px",borderRadius:7,border:"1px solid #E4E5EF",background:"#fff",color:"#3D3F60",fontSize:13,fontWeight:700,cursor:"pointer" }}>Cancel</button>
          <div style={{ display:"flex",gap:8,marginLeft:"auto" }}>
            <button
              onClick={handlePublishNow}
              disabled={submitting !== null}
              style={{ display:"flex",alignItems:"center",gap:6,padding:"9px 16px",borderRadius:7,background:submitting?"#9496B5":"#10B981",color:"#fff",fontSize:13,fontWeight:800,cursor:submitting?"not-allowed":"pointer",border:"none",fontFamily:"Sora,sans-serif" }}
            >
              <i className="fa-solid fa-paper-plane" style={{ fontSize:12 }} />
              {submitting === "publish" ? "Publishing..." : "Publish Now"}
            </button>
            <button
              onClick={handleSaveAndSchedule}
              disabled={submitting !== null}
              style={{ display:"flex",alignItems:"center",gap:6,padding:"9px 20px",borderRadius:7,background:"linear-gradient(115deg,#F97316,#EA580C)",color:"#fff",fontSize:13.5,fontWeight:800,cursor:submitting?"not-allowed":"pointer",border:"none",fontFamily:"Sora,sans-serif",boxShadow:"0 4px 14px rgba(249,115,22,.4)",opacity:submitting?.7:1 }}>
              <i className="fa-solid fa-calendar-check" style={{ fontSize:12 }} /> {submitting === "schedule" ? "Scheduling..." : "Save & Schedule"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Card Component ─────────────────────────────────────────────────────────
const LibCardItem = React.memo(function LibCardItem({ card, viewMode, onOpen, onCopy }: {
  card: LibCard; viewMode: ViewMode;
  onOpen: () => void; onCopy: () => void;
}) {
  const isList = viewMode === "list";

  return (
    <div onClick={onOpen} style={{ background:"#fff",border:"1px solid #E4E5EF",borderRadius:14,overflow:"hidden",cursor:"pointer",boxShadow:"0 1px 2px rgba(13,14,26,.05)",transition:"all .18s",display:isList?"flex":"block",position:"relative",minWidth:0,maxWidth:"100%" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow="0 4px 12px rgba(13,14,26,.08),0 0 0 1.5px #F97316"; (e.currentTarget as HTMLDivElement).style.borderColor="#F97316"; (e.currentTarget as HTMLDivElement).style.transform="translateY(-3px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow="0 1px 2px rgba(13,14,26,.05)"; (e.currentTarget as HTMLDivElement).style.borderColor="#E4E5EF"; (e.currentTarget as HTMLDivElement).style.transform="translateY(0)"; }}>
      {/* Thumbnail */}
      <div style={{ position:"relative",overflow:"hidden",background:"#F0F1F8",width:isList?130:undefined,flexShrink:isList?0:undefined,aspectRatio:isList?undefined:"4/5" }}>
        <ProtectedImage src={card.img} alt={card.cat} loading="lazy" wrapperStyle={{ width:"100%",height:"100%" }} style={{ width:"100%",display:"block",objectFit:"cover",height:"100%" }} />
        {/* Hover action bar — only for grid view */}
        {!isList && (
          <div className="card-hover-actions" style={{ position:"absolute",bottom:0,left:0,right:0,zIndex:4,padding:"8px 6px 6px",display:"flex",gap:4,justifyContent:"center",background:"linear-gradient(transparent,rgba(0,0,0,.7))" }}>
            {([
              {icon:"fa-pen",title:"Edit",fn:()=>onOpen()},
              {icon:"fa-wand-sparkles",title:"Generate AI Image",fn:()=>onOpen()},
              {icon:"fa-rotate-right",title:"Regenerate",fn:()=>onOpen()},
              {icon:"fa-copy",title:"Copy Caption",fn:()=>onCopy()},
              {icon:"fa-calendar-plus",title:"Schedule",fn:()=>onOpen()},
              {icon:"fa-bolt",title:"Post Now",fn:()=>onOpen()},
              {icon:"fa-trash",title:"Delete",fn:()=>{}},
            ] as {icon:string;title:string;fn:()=>void}[]).map(({icon,title,fn}) => (
              <div key={icon} onClick={e => { e.stopPropagation(); fn(); }} title={title}
                style={{ width:28,height:28,borderRadius:7,background:"rgba(255,255,255,.15)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff",fontSize:10.5,border:"1px solid rgba(255,255,255,.18)",transition:"all .13s",flexShrink:0 }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background="rgba(249,115,22,.85)"; (e.currentTarget as HTMLDivElement).style.borderColor="transparent"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,.15)"; (e.currentTarget as HTMLDivElement).style.borderColor="rgba(255,255,255,.18)"; }}>
                <i className={`fa-solid ${icon}`} />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Body */}
      <div style={{ padding:isList?"12px 14px":"10px 12px 12px",flex:isList?1:undefined,display:"flex",flexDirection:"column",gap:7 }}>
        <div style={{ fontSize:12.5,color:"#4B4D6B",lineHeight:1.55,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",fontWeight:500 }}>{card.cap}</div>
        <div style={{ display:"flex",flexWrap:"nowrap",gap:4,overflow:"hidden" }}>
          {card.tags.slice(0,3).map(t => <span key={t} style={{ padding:"2px 7px",borderRadius:5,background:"#FFF7ED",border:"1px solid #FDBA74",color:"#F97316",fontSize:10.5,fontWeight:600,fontFamily:"JetBrains Mono,monospace",whiteSpace:"nowrap",flexShrink:0 }}>{t}</span>)}
          {card.tags.length > 3 && <span style={{ padding:"2px 7px",borderRadius:5,background:"#F0F1F8",border:"1px solid #E4E5EF",color:"#9496B5",fontSize:10.5,fontWeight:600,fontFamily:"JetBrains Mono,monospace",whiteSpace:"nowrap",flexShrink:0 }}>+{card.tags.length - 3}</span>}
        </div>
        {isList && (
          <div style={{ display:"flex",gap:6,marginTop:2 }}>
            <button onClick={e => { e.stopPropagation(); onOpen(); }} style={{ display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:7,background:"linear-gradient(115deg,#F97316,#EA580C)",color:"#fff",fontSize:12.5,fontWeight:700,cursor:"pointer",border:"none",fontFamily:"Sora,sans-serif" }}>
              <i className="fa-solid fa-bolt fa-xs" /> Use This
            </button>
            <button onClick={e => { e.stopPropagation(); onCopy(); }} style={{ display:"flex",alignItems:"center",gap:5,padding:"6px 12px",borderRadius:7,border:"1px solid #E4E5EF",background:"#F0F1F8",color:"#4B4D6B",fontSize:12.5,fontWeight:700,cursor:"pointer",fontFamily:"Sora,sans-serif" }}>
              <i className="fa-regular fa-copy fa-xs" /> Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

// ── Library static data ────────────────────────────────────────────────────
const CONN_PLATS = [
  { id:"tw",  name:"X",          icon:"fa-x-twitter", color:"#000000", connected:true  },
  { id:"li",  name:"LinkedIn",   icon:"fa-linkedin",  color:"#0A66C2", connected:true  },
  { id:"ig",  name:"Instagram",  icon:"fa-instagram", color:"#E1306C", connected:true  },
  { id:"tk",  name:"TikTok",     icon:"fa-tiktok",    color:"#333333", connected:true  },
  { id:"fb",  name:"Facebook",   icon:"fa-facebook",  color:"#1877F2", connected:true  },
  { id:"th",  name:"Threads",    icon:"fa-threads",   color:"#000000", connected:false },
  { id:"bs",  name:"Bluesky",    icon:"fa-bluesky",   color:"#0085FF", connected:false },
  { id:"yt",  name:"YouTube",    icon:"fa-youtube",   color:"#FF0000", connected:false },
  { id:"pi",  name:"Pinterest",  icon:"fa-pinterest", color:"#BD081C", connected:false },
  { id:"gb",  name:"Google Biz", icon:"fa-google",    color:"#4285F4", connected:false },
];

const LIB_INDUSTRIES = [
  {k:"real-estate",label:"🏠 Real Estate"},{k:"food",label:"🍕 Food"},{k:"fitness",label:"💪 Fitness"},
  {k:"startup",label:"🚀 Startup"},{k:"health",label:"❤️ Health"},{k:"fashion",label:"👗 Fashion"},
  {k:"education",label:"📚 Education"},{k:"technology",label:"💻 Technology"},
  {k:"restaurant",label:"🍽️ Restaurant"},{k:"ecommerce",label:"🛒 E-commerce"},
];

const LIB_CATS = ["All categories","Motivational","Educational","Product Showcase","Promotional","Tips & Tricks","Behind the Scenes","Testimonials"];
const LIB_FESTS = ["All festivals","New Year","Valentine's Day","Holi","Easter","Eid","Diwali","Christmas","Independence Day","Halloween"];

// ── Main Page ──────────────────────────────────────────────────────────────
export default function LibraryPage() {
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState<SortType>("default");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [viewMode, setViewMode] = useState<ViewMode>(3);
  const [newStartIdx, setNewStartIdx] = useState(0);
  const [posts, setPosts] = useState<LibCard[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeSubIndId, setActiveSubIndId] = useState<string | undefined>(undefined);
  const [apiIndustries, setApiIndustries] = useState<{id:string;name:string;subIndustries:{id:string;name:string}[]}[]>([]);
  const [selIndId, setSelIndId] = useState("");
  const [selIndName, setSelIndName] = useState("");
  const [selSubIndId, setSelSubIndId] = useState("");
  const [selSubIndName, setSelSubIndName] = useState("");
  const [indDrop, setIndDrop] = useState(false);
  const [subIndDrop, setSubIndDrop] = useState(false);
  const [indPos, setIndPos] = useState({ top: 0, left: 0 });
  const [subIndPos, setSubIndPos] = useState({ top: 0, left: 0 });
  const indBtnRef = useRef<HTMLButtonElement>(null);
  const subIndBtnRef = useRef<HTMLButtonElement>(null);
  const indDropRef = useRef<HTMLDivElement>(null);
  const subIndDropRef = useRef<HTMLDivElement>(null);
  const postTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [loading, setLoading] = useState(false);
  const [compCard, setCompCard] = useState<LibCard | null>(null);
  const [generatorIdsByKey, setGeneratorIdsByKey] = useState<
    Record<string, { industryId: string; subIndustryId: string }>
  >({});
  const { toast, show: showToast } = useToast();
  const { user, initials } = useUserProfile();
  const { industryId: profileIndustryId, subIndustryId: profileSubIndustryId } =
    resolveGeneratorProfileFields((user ?? null) as Record<string, unknown> | null);

  // Build cards from backend images (with fallback to static pool)
  const buildCardsFromApi = (apiImages: { url?: string; imageUrl?: string; file?: string; id?: string | number }[], k: string): LibCard[] => {
    const caps = CAPS[k] || CAPS.startup;
    const tags = TAGS_MAP[k] || TAGS_MAP.startup;
    const cats = INDUSTRY_CATS[k] || INDUSTRY_CATS.startup;
    const times = BEST_TIMES[k] || BEST_TIMES.default;
    return apiImages.map((img, i) => {
      const bt = times[i % times.length];
      return {
        id: i,
        type: TYPES[i % TYPES.length],
        cat: cats[i % cats.length],
        cap: caps[i % caps.length],
        tags: tags.slice(0, 6),
        plats: PLAT_SETS[i % PLAT_SETS.length],
        img: img.file || img.url || img.imageUrl || (IMGS[k] || IMGS.startup)[i % 30],
        bestTime: `${bt.t} ${bt.tz}`,
        eng: ENG_VALS[i % ENG_VALS.length],
        k,
      };
    });
  };

  const mapApiPost = (post: ApiPost, idx: number, offset: number): LibCard => ({
    id: offset + idx,
    type: normalizeApiContentType(post.type),
    cat: "",
    cap: post.text,
    tags: (post.hashtags || []).map(h => h.startsWith("#") ? h : `#${h}`),
    plats: PLAT_SETS[(offset + idx) % PLAT_SETS.length],
    img: post.imageUrl,
    bestTime: "",
    eng: ENG_VALS[(offset + idx) % ENG_VALS.length],
    k: post.subIndustryId,
  });

  const [loadingMore, setLoadingMore] = useState(false);

  // ── Festivals gallery (separate from the post library — images only, no
  //    captions/hashtags/platforms/scheduling) ──
  const [showFestivals, setShowFestivals] = useState(false);
  const [festivals, setFestivals] = useState<ApiFestival[]>([]);
  const [festivalsLoading, setFestivalsLoading] = useState(false);
  const [festivalsLoadingMore, setFestivalsLoadingMore] = useState(false);
  const [festivalsPage, setFestivalsPage] = useState(1);
  const [festivalsTotalPages, setFestivalsTotalPages] = useState(1);
  const [festivalsSearch, setFestivalsSearch] = useState("");
  const [festivalsError, setFestivalsError] = useState(false);

  const loadFestivals = async (p: number, append = false, search = festivalsSearch) => {
    if (append) setFestivalsLoadingMore(true); else { setFestivalsLoading(true); setFestivalsError(false); }
    try {
      const res = await fetchFestivals({ page: p, limit: 12, withImages: true, search: search || undefined });
      setFestivals(prev => (append ? [...prev, ...res.data] : res.data));
      setFestivalsPage(res.meta.page);
      setFestivalsTotalPages(res.meta.totalPages);
    } catch {
      if (!append) setFestivalsError(true);
    } finally {
      if (append) setFestivalsLoadingMore(false); else setFestivalsLoading(false);
    }
  };

  const toggleFestivals = () => {
    setShowFestivals(v => {
      const next = !v;
      if (next && festivals.length === 0) loadFestivals(1);
      return next;
    });
  };

  const searchFestivals = () => {
    setFestivalsSearch(searchInput);
    loadFestivals(1, false, searchInput);
  };

  const festivalImageUrl = (f: ApiFestival): string | null => f.imageUrl || null;

  const loadPosts = async (p: number, subIndId?: string, append = false) => {
    // Cancel any in-progress queued timers from a previous load
    postTimers.current.forEach(clearTimeout);
    postTimers.current = [];

    if (!subIndId) {
      // No sub-industry — use library API (existing behaviour)
      if (append) setLoadingMore(true);
      else setLoading(true);
      try {
        const res = await fetchPosts(p, subIndId);
        const data = res.data || [];
        if (append) {
          setPosts(prev => {
            const off = prev.length;
            setNewStartIdx(off);
            return [...prev, ...data.map((post, i) => mapApiPost(post, i, off))];
          });
        } else {
          setNewStartIdx(0);
          setPosts(data.map((post, i) => mapApiPost(post, i, 0)));
        }
        setPage(res.meta?.page ?? p);
        setTotalPages(res.meta?.totalPages ?? 1);
      } catch {
        if (!append) setPosts([]);
      } finally {
        if (append) setLoadingMore(false);
        else setLoading(false);
      }
      return;
    }

    // Sub-industry selected — use generator API with queue reveal effect
    if (append) setLoadingMore(true);
    else setLoading(true);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("shoutly_token") : null;
      const res = await fetch(`${API_BASE_URL}/api/generator/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ subIndustryId: subIndId }),
      });

      const json = await res.json().catch(() => ({ success: false, posts: [] }));

      if (!json.success || !Array.isArray(json.posts) || json.posts.length === 0) {
        if (!append) { setPosts([]); setLoading(false); }
        else setLoadingMore(false);
        return;
      }

      const mapped: LibCard[] = json.posts.map((post: any, i: number) => ({
        id: Date.now() + i,
        type: normalizeApiContentType(post.type),
        cat: "",
        cap: post.text || "",
        tags: (post.hashtags || []).map((h: string) => h.startsWith("#") ? h : `#${h}`),
        plats: PLAT_SETS[i % PLAT_SETS.length],
        img: post.image?.imageUrl || "",
        bestTime: "",
        eng: ENG_VALS[i % ENG_VALS.length],
        k: subIndId,
      }));

      if (!append) {
        // Show first post immediately
        setNewStartIdx(0);
        setPosts([mapped[0]]);
        setLoading(false);
        setPage(1);
        setTotalPages(1);

        // Queue remaining posts with a random 3–6 s gap between each
        let cumDelay = 0;
        mapped.slice(1).forEach((post, qi) => {
          cumDelay += 3000 + Math.random() * 3000;
          const idxWhenAdded = 1 + qi;
          const t = setTimeout(() => {
            setNewStartIdx(idxWhenAdded);
            setPosts(prev => [...prev, post]);
          }, cumDelay);
          postTimers.current.push(t);
        });
      } else {
        // Append all at once (load more)
        setPosts(prev => {
          const off = prev.length;
          setNewStartIdx(off);
          return [...prev, ...mapped];
        });
        setLoadingMore(false);
      }
    } catch {
      if (!append) { setPosts([]); setLoading(false); }
      else setLoadingMore(false);
    }
  };

  // Posts search is a client-side filter applied to already-loaded posts (text +
  // hashtags), so nothing needs to happen here for that case — it already
  // reacts live via searchTerm/displayPosts as you type. Festivals search is
  // server-side (paginated), so it does need an explicit fetch.
  const doSearch = () => { if (showFestivals) searchFestivals(); };

  useEffect(() => {
    // Load random posts immediately
    loadPosts(1);

    // Fetch industry list for filter dropdowns
    fetchIndustries()
      .then((inds: { id?: string | number; name?: string; subIndustries?: { id?: string | number; name?: string }[] }[]) => {
        if (!inds || inds.length === 0) return;
        const nextMap: Record<string, { industryId: string; subIndustryId: string }> = {};
        inds.forEach((ind) => {
          const key = Object.keys(IMGS).find((k) => (ind.name || "").toLowerCase().includes(k));
          const industryId = ind.id != null ? String(ind.id) : "";
          const subIndustryId = ind.subIndustries?.[0]?.id != null ? String(ind.subIndustries[0].id) : "";
          if (key && industryId && subIndustryId) nextMap[key] = { industryId, subIndustryId };
        });
        setGeneratorIdsByKey(nextMap);

        const mapped = inds.map(ind => ({
          id: String(ind.id ?? ""),
          name: ind.name || "",
          subIndustries: ((ind.subIndustries || []) as {id?:string|number;name?:string}[]).map(s => ({
            id: String(s.id ?? ""),
            name: s.name || "",
          })),
        }));
        setApiIndustries(mapped);
        if (mapped[0]) { setSelIndId(mapped[0].id); setSelIndName(mapped[0].name); }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (indDropRef.current && !indDropRef.current.contains(e.target as Node)) setIndDrop(false);
      if (subIndDropRef.current && !subIndDropRef.current.contains(e.target as Node)) setSubIndDrop(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Clean up queued post timers on unmount
  useEffect(() => {
    return () => { postTimers.current.forEach(clearTimeout); };
  }, []);

  const copyText = (txt: string) => { navigator.clipboard?.writeText(txt).catch(() => {}); showToast("📋 Caption copied!"); };

  const searchTerm = searchInput.trim().toLowerCase();
  const typeFiltered = filterType === "all" ? posts : posts.filter(c => c.type === filterType);
  const searchFiltered = searchTerm
    ? typeFiltered.filter(c =>
        c.cap.toLowerCase().includes(searchTerm) ||
        c.tags.some(t => t.toLowerCase().includes(searchTerm))
      )
    : typeFiltered;
  const displayPosts = sort === "engagement"
    ? [...searchFiltered].sort((a, b) => parseFloat(b.eng) - parseFloat(a.eng))
    : sort === "newest" ? [...searchFiltered].reverse() : searchFiltered;

  const gridCols = viewMode === "list" ? "1fr" : viewMode === 3 ? "repeat(3,1fr)" : "repeat(4,1fr)";

  const toastColors: Record<string, string> = { green: "#10B981", brand: "#F97316", red: "#EF4444" };
  const toastCol = toastColors[toast.type] || toastColors.green;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans',sans-serif; font-size: 13.5px; background: #F5F6FA; color: #0D0E1A; overflow: hidden; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #E4E5EF; border-radius: 4px; }
        @keyframes cardIn { from{opacity:0;transform:translateY(14px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes shimmer { 0%{background-position:-700px 0} 100%{background-position:700px 0} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.35} }
        .tb-search-wrap:focus-within { width: 280px !important; border-color: #F97316 !important; background: #fff !important; box-shadow: 0 0 0 3px rgba(249,115,22,.1) !important; }
        .sb-item-hover:hover { background: #1E1F2E; color: #F1F2FF; }
        #comp-overlay { animation: fadeIn .18s ease; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .card-hover-actions { opacity: 0; transition: all .18s; }
        div:hover > .card-hover-actions { opacity: 1; transform: translateY(0) !important; }
        .lib-grid { min-width: 0; }
        .lib-grid > div { min-width: 0; }
        .lib-dropdown-backdrop {
          position: fixed !important;
          inset: 0 !important;
          background: rgba(13,14,26,.32) !important;
          z-index: 9998 !important;
        }
        .lib-dropdown-panel {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          right: auto !important;
          transform: translate(-50%,-50%) !important;
          width: min(340px, calc(100vw - 32px)) !important;
          min-width: 0 !important;
          max-width: calc(100vw - 32px) !important;
          max-height: min(360px, calc(100vh - 90px)) !important;
        }
        @media (min-width: 768px) {
          .lib-admin-header {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 50 !important;
            background: #fff !important;
            border-bottom: 1px solid #E4E5EF !important;
          }
          .lib-hero {
            margin-top: 56px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .lib-connected-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .lib-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 767px) {
          .lib-admin-header {
            display: none !important;
          }
          .lib-hero {
            padding: 24px 14px 20px !important;
          }
          .lib-hero-badge {
            font-size: 10px !important;
            padding: 3px 10px !important;
            margin-bottom: 10px !important;
          }
          .lib-hero-title {
            font-size: 24px !important;
            margin-bottom: 6px !important;
          }
          .lib-hero-sub {
            font-size: 12.5px !important;
            margin-bottom: 18px !important;
            line-height: 1.5 !important;
          }
          .lib-hero-sub br {
            display: none;
          }
          .lib-search-bar {
            padding: 7px 7px 7px 12px !important;
            border-radius: 12px !important;
          }
          .lib-search-btn {
            padding: 9px 14px !important;
            font-size: 12.5px !important;
          }
          .lib-chips {
            gap: 6px !important;
            margin-top: 14px !important;
          }
          .lib-chip {
            padding: 6px 11px !important;
            font-size: 11.5px !important;
          }

          .lib-connected {
            display: none !important;
          }

          .lib-filter-bar {
            padding: 8px 12px !important;
            gap: 6px !important;
          }
          .lib-filter-dropdown {
            flex: 1 1 auto !important;
          }
          .lib-filter-dropdown button {
            width: 100% !important;
            justify-content: center !important;
          }
          .lib-filter-right {
            margin-left: 0 !important;
            flex: 1 1 100% !important;
            justify-content: space-between !important;
          }
          .lib-body {
            padding: 14px 12px !important;
          }
          .lib-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <div style={{ flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0,background:"#F5F6FA" }}>

          {/* Topbar */}
          <AdminHeader
            className="lib-admin-header"
            pageTitle="Content Library"
            userName={user?.name}
            userInitials={initials}
          />

          {/* Hero */}
          <div className="lib-hero" style={{ flexShrink:0,padding:"44px 22px 28px",background:"linear-gradient(180deg,#FFF7ED 0%,#fff 65%)",borderBottom:"1px solid #E4E5EF",textAlign:"center" }}>
            <div className="lib-hero-badge" style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"4px 14px",borderRadius:20,background:"#FFF7ED",border:"1.5px solid #FDBA74",color:"#F97316",fontSize:11.5,fontWeight:700,marginBottom:14,fontFamily:"Sora,sans-serif" }}>✦ Shoutly AI · 10,000+ Assets</div>
            <div className="lib-hero-title" style={{ fontSize:38,fontWeight:800,color:"#0D0E1A",letterSpacing:"-.9px",marginBottom:10,fontFamily:"Sora,sans-serif",lineHeight:1.1 }}>Content Library</div>
            <div className="lib-hero-sub" style={{ fontSize:15,color:"#9496B5",maxWidth:520,margin:"0 auto",lineHeight:1.65 }}>Search from thousands of AI-generated social media posts<br/>across 131 industries</div>
          </div>

          {/* Connected Accounts */}
          <div className="lib-connected" style={{ flexShrink:0,padding:"14px 22px 16px",background:"#F9FAFB",borderBottom:"1px solid #E4E5EF" }}>
            <div style={{ display:"flex",alignItems:"center",gap:7,marginBottom:12 }}>
              <i className="fa-solid fa-link" style={{ color:"#9496B5",fontSize:12 }} />
              <span style={{ fontSize:13,fontWeight:700,color:"#0D0E1A",fontFamily:"Sora,sans-serif" }}>Connected Accounts</span>
              <span style={{ fontSize:11.5,color:"#9496B5",fontWeight:500 }}>5 of 10 connected</span>
            </div>
            <div className="lib-connected-grid" style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8 }}>
              {CONN_PLATS.map(p => (
                <div key={p.id}
                  style={{ display:"flex",alignItems:"center",gap:8,padding:"9px 12px",borderRadius:10,border:`1.5px solid ${p.connected?"#10B981":"#E4E5EF"}`,background:p.connected?"rgba(16,185,129,.05)":"#fff",cursor:"pointer",transition:"all .15s" }}
                  onMouseEnter={e => { if (!p.connected) (e.currentTarget as HTMLDivElement).style.borderColor="#F97316"; }}
                  onMouseLeave={e => { if (!p.connected) (e.currentTarget as HTMLDivElement).style.borderColor="#E4E5EF"; }}>
                  <div style={{ width:28,height:28,borderRadius:"50%",background:p.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,flexShrink:0 }}>
                    <i className={`fa-brands ${p.icon}`} />
                  </div>
                  <span style={{ fontSize:12.5,fontWeight:600,color:p.connected?"#0D0E1A":"#4B4D6B",flex:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontFamily:"Sora,sans-serif" }}>{p.name}</span>
                  {p.connected
                    ? <i className="fa-solid fa-check" style={{ color:"#10B981",fontSize:11,flexShrink:0 }} />
                    : <span style={{ fontSize:10.5,color:"#9496B5",fontWeight:700,flexShrink:0,fontFamily:"Sora,sans-serif" }}>Connect</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Filter Bar */}
          <div className="lib-filter-bar" style={{ flexShrink:0,display:"flex",alignItems:"center",gap:8,padding:"10px 22px",background:"#fff",borderBottom:"1px solid #E4E5EF",flexWrap:"wrap" }}>
            {/* Industry dropdown */}
            <div ref={indDropRef} className="lib-filter-dropdown" style={{ flexShrink:0 }}>
              <button ref={indBtnRef}
                onClick={() => {
                  const r = indBtnRef.current?.getBoundingClientRect();
                  if (r) setIndPos({ top: r.bottom + 6, left: r.left });
                  setIndDrop(d => !d); setSubIndDrop(false);
                }}
                style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 13px",borderRadius:10,border:`1.5px solid ${indDrop||selIndId?"#F97316":"#E4E5EF"}`,background:selIndId?"#FFF7ED":"#fff",color:selIndId?"#F97316":"#4B4D6B",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"Sora,sans-serif",whiteSpace:"nowrap" }}>
                <i className="fa-solid fa-globe" style={{ fontSize:11 }} />
                {selIndName || "Industry"}
                <i className={`fa-solid fa-chevron-${indDrop?"up":"down"}`} style={{ fontSize:10 }} />
              </button>
              {indDrop && (
                <>
                <div className="lib-dropdown-backdrop" onClick={() => setIndDrop(false)} />
                <div className="lib-dropdown-panel" style={{ position:"fixed",top:indPos.top,left:indPos.left,zIndex:9999,background:"#fff",border:"1.5px solid #E4E5EF",borderRadius:12,boxShadow:"0 8px 28px rgba(13,14,26,.14)",minWidth:220,maxHeight:300,overflowY:"auto",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain",touchAction:"pan-y" }}>
                  {apiIndustries.length === 0 && (
                    <div style={{ padding:"12px 14px",fontSize:13,color:"#9496B5",fontFamily:"Sora,sans-serif" }}>Loading…</div>
                  )}
                  {apiIndustries.map(ind => (
                    <div key={ind.id} onClick={() => { setSelIndId(ind.id); setSelIndName(ind.name); setSelSubIndId(""); setSelSubIndName(""); setIndDrop(false); }}
                      style={{ padding:"10px 14px",fontSize:13,fontWeight:600,cursor:"pointer",color:selIndId===ind.id?"#F97316":"#0D0E1A",background:selIndId===ind.id?"#FFF7ED":"#fff",fontFamily:"Sora,sans-serif",borderBottom:"1px solid #F5F6FA" }}
                      onMouseEnter={e => { if(selIndId!==ind.id) (e.currentTarget as HTMLDivElement).style.background="#F9FAFB"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background=selIndId===ind.id?"#FFF7ED":"#fff"; }}>
                      {ind.name}
                    </div>
                  ))}
                </div>
                </>
              )}
            </div>
            {/* Festivals gallery toggle — images only, from GET /api/festivals */}
            <button onClick={toggleFestivals} className="lib-filter-dropdown" style={{ flexShrink:0, display:"flex",alignItems:"center",gap:6,padding:"7px 13px",borderRadius:10,border:`1.5px solid ${showFestivals?"#F97316":"#E4E5EF"}`,background:showFestivals?"#FFF7ED":"#fff",color:showFestivals?"#F97316":"#4B4D6B",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"Sora,sans-serif",whiteSpace:"nowrap" }}>
              <i className="fa-solid fa-cake-candles" style={{ fontSize:11 }} />
              Festivals
            </button>
            {/* Sub-industry dropdown — only when an industry is selected */}
            {!showFestivals && selIndId && (
              <div ref={subIndDropRef} className="lib-filter-dropdown" style={{ flexShrink:0 }}>
                <button ref={subIndBtnRef}
                  onClick={() => {
                    const r = subIndBtnRef.current?.getBoundingClientRect();
                    if (r) setSubIndPos({ top: r.bottom + 6, left: r.left });
                    setSubIndDrop(d => !d); setIndDrop(false);
                  }}
                  style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 13px",borderRadius:10,border:`1.5px solid ${subIndDrop||selSubIndId?"#F97316":"#E4E5EF"}`,background:selSubIndId?"#FFF7ED":"#fff",color:selSubIndId?"#F97316":"#4B4D6B",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"Sora,sans-serif",whiteSpace:"nowrap" }}>
                  {selSubIndName || "All sub-industries"}
                  <i className={`fa-solid fa-chevron-${subIndDrop?"up":"down"}`} style={{ fontSize:10 }} />
                </button>
                {subIndDrop && (
                  <>
                  <div className="lib-dropdown-backdrop" onClick={() => setSubIndDrop(false)} />
                  <div className="lib-dropdown-panel" style={{ position:"fixed",top:subIndPos.top,left:subIndPos.left,zIndex:9999,background:"#fff",border:"1.5px solid #E4E5EF",borderRadius:12,boxShadow:"0 8px 28px rgba(13,14,26,.14)",minWidth:220,maxHeight:300,overflowY:"auto",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain",touchAction:"pan-y" }}>
                    {(apiIndustries.find(i => i.id === selIndId)?.subIndustries || []).length === 0 && (
                      <div style={{ padding:"12px 14px",fontSize:13,color:"#9496B5",fontFamily:"Sora,sans-serif" }}>No sub-industries</div>
                    )}
                    {(apiIndustries.find(i => i.id === selIndId)?.subIndustries || []).map(sub => (
                      <div key={sub.id} onClick={() => { setSelSubIndId(sub.id); setSelSubIndName(sub.name); setSubIndDrop(false); setActiveSubIndId(sub.id); loadPosts(1, sub.id); }}
                        style={{ padding:"10px 14px",fontSize:13,fontWeight:600,cursor:"pointer",color:selSubIndId===sub.id?"#F97316":"#0D0E1A",background:selSubIndId===sub.id?"#FFF7ED":"#fff",fontFamily:"Sora,sans-serif",borderBottom:"1px solid #F5F6FA" }}
                        onMouseEnter={e => { if(selSubIndId!==sub.id) (e.currentTarget as HTMLDivElement).style.background="#F9FAFB"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background=selSubIndId===sub.id?"#FFF7ED":"#fff"; }}>
                        {sub.name}
                      </div>
                    ))}
                  </div>
                  </>
                )}
              </div>
            )}
            {/* Sort + results + view — right side */}
            <div className="lib-filter-right" style={{ marginLeft:"auto",display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
              <span style={{ fontSize:12,color:"#9496B5",whiteSpace:"nowrap",fontFamily:"JetBrains Mono,monospace" }}>
                <span style={{ color:"#F97316",fontWeight:700 }}>{showFestivals ? festivals.length : posts.length}</span> results
              </span>
              {!showFestivals && (
                <>
                  <div style={{ width:1,height:20,background:"#E4E5EF" }} />
                  {/* Type filter */}
                  <div style={{ display:"flex",alignItems:"center",gap:5,padding:"6px 11px",borderRadius:10,border:"1px solid #E4E5EF",background:"#fff",cursor:"pointer",fontSize:13,fontWeight:600,color:"#4B4D6B",whiteSpace:"nowrap" }}>
                    <i className="fa-solid fa-filter" style={{ fontSize:11 }} />
                    <select value={filterType} onChange={e => setFilterType(e.target.value as FilterType)} style={{ background:"none",border:"none",outline:"none",fontSize:13,fontWeight:600,color:"#4B4D6B",cursor:"pointer",fontFamily:"inherit" }}>
                      <option value="all">All types</option>
                      <option value="image">Image</option>
                      <option value="reel">Reel</option>
                      <option value="carousel">Carousel</option>
                    </select>
                  </div>
                  <div style={{ width:1,height:20,background:"#E4E5EF" }} />
                  {/* Sort dropdown */}
                  <div style={{ display:"flex",alignItems:"center",gap:5,padding:"6px 11px",borderRadius:10,border:"1px solid #E4E5EF",background:"#fff",cursor:"pointer",fontSize:13,fontWeight:600,color:"#4B4D6B",whiteSpace:"nowrap" }}>
                    <i className="fa-solid fa-arrow-up-arrow-down" style={{ fontSize:11 }} />
                    <select value={sort} onChange={e => setSort(e.target.value as SortType)} style={{ background:"none",border:"none",outline:"none",fontSize:13,fontWeight:600,color:"#4B4D6B",cursor:"pointer",fontFamily:"inherit" }}>
                      <option value="default">Recently added</option>
                      <option value="engagement">Best Engagement</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                  <div style={{ width:1,height:20,background:"#E4E5EF" }} />
                  {/* View toggles */}
                  <div style={{ display:"flex",background:"#F0F1F8",borderRadius:8,padding:3,border:"1px solid #E4E5EF" }}>
                    {([[3,"fa-table-cells"],["list","fa-list"]] as const).map(([v, icon]) => (
                      <div key={String(v)} onClick={() => setViewMode(v as ViewMode)} style={{ width:30,height:30,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:viewMode===v?"#F97316":"#9496B5",cursor:"pointer",fontSize:12,background:viewMode===v?"#fff":undefined,boxShadow:viewMode===v?"0 1px 4px rgba(13,14,26,.07)":undefined,transition:"all .12s" }}>
                        <i className={`fa-solid ${icon}`} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Library Body */}
          <div className="lib-body" style={{ flex:1,overflowY:"auto",padding:"20px 22px" }}>
          {!showFestivals && (<>
            {/* Empty state — no sub-industry selected yet */}
            {!loading && posts.length === 0 && !activeSubIndId && (
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:380 }}>
                <div style={{ width:80,height:80,borderRadius:22,background:"#fff",border:"1.5px solid #E4E5EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:14,boxShadow:"0 1px 4px rgba(13,14,26,.07)" }}>🔍</div>
                <div style={{ fontSize:18,fontWeight:800,color:"#0D0E1A",fontFamily:"Sora,sans-serif",marginBottom:5 }}>Pick an industry above</div>
                <div style={{ fontSize:13,color:"#9496B5",maxWidth:360,textAlign:"center",lineHeight:1.7 }}>Tap any quick-pick or search an industry to browse ready-to-post images and captions pre-loaded with real hashtags.</div>
              </div>
            )}
            {/* Empty state — sub-industry selected but API returned nothing */}
            {!loading && posts.length === 0 && activeSubIndId && (
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:380 }}>
                <div style={{ width:80,height:80,borderRadius:22,background:"#FFF7ED",border:"1.5px solid #FDBA74",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:14,boxShadow:"0 1px 4px rgba(249,115,22,.08)" }}>📭</div>
                <div style={{ fontSize:18,fontWeight:800,color:"#0D0E1A",fontFamily:"Sora,sans-serif",marginBottom:5 }}>No posts found</div>
                <div style={{ fontSize:13,color:"#9496B5",maxWidth:340,textAlign:"center",lineHeight:1.7,marginBottom:16 }}>
                  {selSubIndName ? `No content is available for "${selSubIndName}" yet.` : "No content is available for this sub-industry yet."}<br/>Try a different sub-industry or clear the filter.
                </div>
                <button onClick={() => { setSelSubIndId(""); setSelSubIndName(""); setActiveSubIndId(undefined); loadPosts(1); }}
                  style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"9px 20px",borderRadius:20,background:"linear-gradient(115deg,#F97316,#EA580C)",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",border:"none",fontFamily:"Sora,sans-serif",boxShadow:"0 4px 14px rgba(249,115,22,.3)" }}>
                  <i className="fa-solid fa-xmark" style={{ fontSize:11 }} /> Clear filter
                </button>
              </div>
            )}
            {/* Empty state — search filtered everything out */}
            {!loading && posts.length > 0 && displayPosts.length === 0 && searchTerm && (
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:380 }}>
                <div style={{ width:80,height:80,borderRadius:22,background:"#fff",border:"1.5px solid #E4E5EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:14,boxShadow:"0 1px 4px rgba(13,14,26,.07)" }}>🔎</div>
                <div style={{ fontSize:18,fontWeight:800,color:"#0D0E1A",fontFamily:"Sora,sans-serif",marginBottom:5 }}>No matches found</div>
                <div style={{ fontSize:13,color:"#9496B5",maxWidth:340,textAlign:"center",lineHeight:1.7,marginBottom:16 }}>
                  No posts match <strong style={{ color:"#0D0E1A" }}>"{searchInput}"</strong> in the current results.<br/>Try a different keyword or clear the search.
                </div>
                <button onClick={() => setSearchInput("")}
                  style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"9px 20px",borderRadius:20,border:"1.5px solid #E4E5EF",background:"#fff",color:"#4B4D6B",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Sora,sans-serif" }}>
                  <i className="fa-solid fa-xmark" style={{ fontSize:11 }} /> Clear search
                </button>
              </div>
            )}
            {/* Skeleton */}
            {loading && (
              <div className="lib-grid" style={{ display:"grid",gridTemplateColumns:gridCols,gap:14 }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{ background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #E4E5EF" }}>
                    <div style={{ aspectRatio:"4/3",background:"linear-gradient(90deg,#F0F1F8 0%,#E4E5EF 50%,#F0F1F8 100%)",backgroundSize:"700px",animation:"shimmer 1.5s infinite" }} />
                    <div style={{ padding:12,display:"flex",flexDirection:"column",gap:7 }}>
                      {[100,75,55].map(w => <div key={w} style={{ height:10,borderRadius:5,background:"linear-gradient(90deg,#F0F1F8 0%,#E4E5EF 50%,#F0F1F8 100%)",backgroundSize:"700px",animation:"shimmer 1.5s infinite",width:`${w}%` }} />)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Grid */}
            {!loading && displayPosts.length > 0 && (
              <div className="lib-grid" style={{ display:"grid",gridTemplateColumns:gridCols,gap:14 }}>
                {displayPosts.map((card, i) => {
                  const isNew = i >= newStartIdx;
                  return (
                    <div key={card.id} style={{ minWidth:0, ...(isNew ? { animation:"cardIn .35s ease both",animationDelay:`${Math.min((i - newStartIdx) * 0.04, 0.5)}s` } : undefined) }}>
                      <LibCardItem card={card} viewMode={viewMode} onOpen={() => setCompCard(card)} onCopy={() => copyText(card.cap)} />
                    </div>
                  );
                })}
              </div>
            )}
            {/* Load more spinner (inline — existing images stay visible) */}
            {loadingMore && (
              <div className="lib-grid" style={{ display:"grid",gridTemplateColumns:gridCols,gap:14,marginTop:14 }}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} style={{ background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #E4E5EF" }}>
                    <div style={{ aspectRatio:"4/3",background:"linear-gradient(90deg,#F0F1F8 0%,#E4E5EF 50%,#F0F1F8 100%)",backgroundSize:"700px",animation:"shimmer 1.5s infinite" }} />
                    <div style={{ padding:12,display:"flex",flexDirection:"column",gap:7 }}>
                      {[100,75,55].map(w => <div key={w} style={{ height:10,borderRadius:5,background:"linear-gradient(90deg,#F0F1F8 0%,#E4E5EF 50%,#F0F1F8 100%)",backgroundSize:"700px",animation:"shimmer 1.5s infinite",width:`${w}%` }} />)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Load more button */}
            {!loading && !loadingMore && page < totalPages && posts.length > 0 && (
              <div style={{ textAlign:"center",marginTop:30,paddingBottom:8 }}>
                <button onClick={() => loadPosts(page + 1, activeSubIndId, true)}
                  style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"11px 30px",borderRadius:24,border:"1.5px solid #E4E5EF",background:"#fff",color:"#4B4D6B",fontSize:13.5,fontWeight:700,cursor:"pointer",fontFamily:"Sora,sans-serif",boxShadow:"0 1px 6px rgba(13,14,26,.06)",transition:"all .2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor="#F97316"; (e.currentTarget as HTMLButtonElement).style.color="#F97316"; (e.currentTarget as HTMLButtonElement).style.boxShadow="0 4px 14px rgba(249,115,22,.18)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor="#E4E5EF"; (e.currentTarget as HTMLButtonElement).style.color="#4B4D6B"; (e.currentTarget as HTMLButtonElement).style.boxShadow="0 1px 6px rgba(13,14,26,.06)"; }}>
                  <i className="fa-solid fa-chevron-down" style={{ fontSize:12 }} />
                  Load more posts
                  <span style={{ opacity:.55,fontWeight:500,fontSize:12.5 }}>(page {page} of {totalPages})</span>
                </button>
              </div>
            )}
          </>)}

          {showFestivals && (<>
            {/* Skeleton */}
            {festivalsLoading && (
              <div className="lib-grid" style={{ display:"grid",gridTemplateColumns:gridCols,gap:14 }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{ background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #E4E5EF" }}>
                    <div style={{ aspectRatio:"4/3",background:"linear-gradient(90deg,#F0F1F8 0%,#E4E5EF 50%,#F0F1F8 100%)",backgroundSize:"700px",animation:"shimmer 1.5s infinite" }} />
                    <div style={{ padding:12,display:"flex",flexDirection:"column",gap:7 }}>
                      {[100,60].map(w => <div key={w} style={{ height:10,borderRadius:5,background:"linear-gradient(90deg,#F0F1F8 0%,#E4E5EF 50%,#F0F1F8 100%)",backgroundSize:"700px",animation:"shimmer 1.5s infinite",width:`${w}%` }} />)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Error state — a failed request, not a genuine empty result */}
            {!festivalsLoading && festivalsError && (
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:380 }}>
                <div style={{ width:80,height:80,borderRadius:22,background:"#fff",border:"1.5px solid #E4E5EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:14,boxShadow:"0 1px 4px rgba(13,14,26,.07)" }}>⚠️</div>
                <div style={{ fontSize:18,fontWeight:800,color:"#0D0E1A",fontFamily:"Sora,sans-serif",marginBottom:5 }}>Couldn't load festivals</div>
                <div style={{ fontSize:13,color:"#9496B5",maxWidth:340,textAlign:"center",lineHeight:1.7,marginBottom:16 }}>Something went wrong reaching the server. Please try again.</div>
                <button onClick={() => loadFestivals(1)} style={{ padding:"8px 18px",borderRadius:10,border:"1.5px solid #F97316",background:"#FFF7ED",color:"#F97316",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Sora,sans-serif" }}>
                  Retry
                </button>
              </div>
            )}
            {/* Empty state */}
            {!festivalsLoading && !festivalsError && festivals.length === 0 && (
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:380 }}>
                <div style={{ width:80,height:80,borderRadius:22,background:"#fff",border:"1.5px solid #E4E5EF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:14,boxShadow:"0 1px 4px rgba(13,14,26,.07)" }}>🎉</div>
                <div style={{ fontSize:18,fontWeight:800,color:"#0D0E1A",fontFamily:"Sora,sans-serif",marginBottom:5 }}>No festival images yet</div>
                <div style={{ fontSize:13,color:"#9496B5",maxWidth:340,textAlign:"center",lineHeight:1.7 }}>Check back later — festival images are added ahead of upcoming events.</div>
              </div>
            )}
            {/* Grid — image + festival name/date only, no post-related fields */}
            {!festivalsLoading && festivals.length > 0 && (
              <div className="lib-grid" style={{ display:"grid",gridTemplateColumns:gridCols,gap:14 }}>
                {festivals.map(f => {
                  const src = festivalImageUrl(f);
                  return (
                    <div key={f.id} style={{ background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #E4E5EF",minWidth:0 }}>
                      <div style={{ aspectRatio:"4/3",background:"#F0F1F8",position:"relative" }}>
                        {src ? (
                          <ProtectedImage src={src} alt={f.event} wrapperStyle={{ width:"100%", height:"100%" }} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} loading="lazy" />
                        ) : (
                          <div style={{ width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"#BFC1D9",fontSize:24 }}>
                            <i className="fa-solid fa-cake-candles" />
                          </div>
                        )}
                      </div>
                      <div style={{ padding:12 }}>
                        <div style={{ fontSize:13.5,fontWeight:700,color:"#0D0E1A",fontFamily:"Sora,sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{f.event}</div>
                        <div style={{ fontSize:11.5,color:"#9496B5",marginTop:2 }}>
                          {f.date ? new Date(f.date).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" }) : ""}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* Load more spinner */}
            {festivalsLoadingMore && (
              <div className="lib-grid" style={{ display:"grid",gridTemplateColumns:gridCols,gap:14,marginTop:14 }}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} style={{ background:"#fff",borderRadius:14,overflow:"hidden",border:"1px solid #E4E5EF" }}>
                    <div style={{ aspectRatio:"4/3",background:"linear-gradient(90deg,#F0F1F8 0%,#E4E5EF 50%,#F0F1F8 100%)",backgroundSize:"700px",animation:"shimmer 1.5s infinite" }} />
                  </div>
                ))}
              </div>
            )}
            {/* Load more button */}
            {!festivalsLoading && !festivalsLoadingMore && festivalsPage < festivalsTotalPages && festivals.length > 0 && (
              <div style={{ textAlign:"center",marginTop:30,paddingBottom:8 }}>
                <button onClick={() => loadFestivals(festivalsPage + 1, true)}
                  style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"11px 30px",borderRadius:24,border:"1.5px solid #E4E5EF",background:"#fff",color:"#4B4D6B",fontSize:13.5,fontWeight:700,cursor:"pointer",fontFamily:"Sora,sans-serif",boxShadow:"0 1px 6px rgba(13,14,26,.06)",transition:"all .2s" }}>
                  <i className="fa-solid fa-chevron-down" style={{ fontSize:12 }} />
                  Load more festivals
                  <span style={{ opacity:.55,fontWeight:500,fontSize:12.5 }}>(page {festivalsPage} of {festivalsTotalPages})</span>
                </button>
              </div>
            )}
          </>)}
          </div>
        </div>

      {/* Composer Modal */}
      <ComposerModal
        card={compCard}
        onClose={() => setCompCard(null)}
        showToast={showToast}
      />

      {/* Toast */}
      <div style={{ position:"fixed",bottom:22,right:22,zIndex:9999,display:"flex",alignItems:"center",gap:9,padding:"11px 16px",borderRadius:10,background:"#0D0E1A",color:"#fff",fontSize:13,fontWeight:600,boxShadow:"0 12px 32px rgba(13,14,26,.10)",fontFamily:"Sora,sans-serif",opacity:toast.visible?1:0,transform:toast.visible?"translateY(0)":"translateY(8px)",transition:"all .3s cubic-bezier(.4,0,.2,1)",pointerEvents:"none" }}>
        <span style={{ display:"inline-flex",width:20,height:20,borderRadius:"50%",background:`${toastCol}22`,color:toastCol,alignItems:"center",justifyContent:"center",fontSize:10,flexShrink:0 }}>{toast.type==="red"?"✕":"✓"}</span>
        &nbsp;{toast.msg}
      </div>
    </>
  );
}