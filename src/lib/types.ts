export type inv = {
  intCharId: number;
  strName: string;
  bUpgrade: boolean;
  bCoins: boolean;
  intCount: number;
  strType: string;
  sortOrder: number;
};

type Category =
  | "Battle"
  | "Hidden"
  | "Legendary"
  | "Epic Hero"
  | "Support"
  | "Exclusive"
  | "Artix Entertainment"
  | "HeroMart";

export type badge = {
  badgeID: number;
  sCategory: Category;
  sTitle: string;
  sDesc: string;
  sFileName: string;
  sSubCategory: string;
};
