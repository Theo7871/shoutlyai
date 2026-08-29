"use client";
import NextImage from "next/image";

interface MosaicItem {
    label: string;
    url: string;
}

export default function HeroMosaic({
    items,
    columnsCount,
    itemsPerColumn,
    directions,
    speeds,
}: {
    items: MosaicItem[];
    columnsCount: number;
    itemsPerColumn: number;
    directions: string[];
    speeds: number[];
}) {
    return (
  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur p-3 sm:p-4 h-[280px] sm:h-[350px] lg:h-[480px]">
    {/* Badge */}
    <div className="w-max max-w-[90%] absolute top-4 left-1/2 -translate-x-1/2 z-20 px-3 sm:px-4 py-2 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold text-slate-300 whitespace-nowrap overflow-hidden text-ellipsis">
      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shrink-0"></span>
      155+ Industries • Authentic Matching Photos
    </div>

    {/* Mosaic Grid */}
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1 h-full overflow-hidden" style={{
      WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 8%, black 90%, transparent 100%)",
      maskImage: "linear-gradient(180deg, transparent 0%, black 8%, black 90%, transparent 100%)"
    }}>
      {Array.from({length: columnsCount}).map((_, colIndex) => {
        const startIdx = colIndex * itemsPerColumn;
        const endIdx = Math.min(startIdx + itemsPerColumn, items.length);
        const columnItems = items.slice(startIdx, endIdx);
        // Repeat once — the keyframes translate exactly -50%, so two copies
        // already loop seamlessly; a third copy was extra DOM/image nodes
        // for no visual gain.
        const allItems = [...columnItems, ...columnItems];
        const direction = directions[colIndex];
        const speed = speeds[colIndex];
        const columnVisibility =
          colIndex === 3 ? "hidden sm:flex" : colIndex === 4 ? "hidden lg:flex" : "flex";

        return (
          <div
            key={colIndex}
            className={`${columnVisibility} flex-col gap-1`}
            style={{
              animation: `${direction === 'scrollUp' ? 'scrollUp' : 'scrollDown'} ${speed}s linear infinite`,
              willChange: "transform",
            }}
          >
            {allItems.map((item, idx) => (
              <div
                key={`${colIndex}-${idx}`}
                className="relative flex-shrink-0 rounded-lg overflow-hidden border border-white/10 hover:border-white/30 hover:scale-110 transition-all cursor-pointer group h-[60px] sm:h-[75px] lg:h-[90px]"
                style={{zIndex: "auto"}}
              >
                <NextImage
                  src={item.url}
                  alt={item.label}
                  fill
                  sizes="150px"
                  loading="lazy"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback for any broken images
                    e.currentTarget.src = "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=300&h=200&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                <span className="absolute bottom-1 left-0 right-0 text-center text-[10px] font-bold text-white uppercase tracking-wider px-1 drop-shadow-lg" style={{textShadow: '0 1px 4px rgba(0,0,0,.9)'}}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  </div>
    );
}
