export type DashboardPlatKey = "ig" | "fb" | "li" | "tw" | "tk" | "yt" | "th";
export type DashboardPostType = "image" | "reel" | "carousel" | "story";
export type DashboardStatus = "scheduled" | "draft" | "published";

export interface DashboardTimeSlot {
  t: string;
  e: string;
  best: boolean;
}

export interface DashboardCalendarPost {
  id: number;
  date: Date;
  caption: string;
  hashtags: string[];
  plats: DashboardPlatKey[];
  type: DashboardPostType;
  timeStr: string;
  timesOptions: DashboardTimeSlot[];
  img: string;
  score: number;
  status: DashboardStatus;
  reach: number;
  engRate: string;
  isAI: boolean;
}
