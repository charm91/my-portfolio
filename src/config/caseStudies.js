import { BetterHRPage } from "@/views/BetterHRPage";
import { KBZBankPage } from "@/views/KBZBankPage";
import { UniLinksPage } from "@/views/UniLinksPage";
import { WctPage } from "@/views/WctPage";

export const CASE_STUDIES = {
  betterhr: {
    Component: BetterHRPage,
    title: "BetterHR Case Study",
    description: "BetterHR Cloud-based HR Management Platform",
    thumbnail: {
      url: "/betterhr/thumbnail.png",
      width: 1488,
      height: 1050,
      alt: "BetterHR Case Study",
    },
  },
  "kbz-bank": {
    Component: KBZBankPage,
    title: "KBZ Bank Case Study",
    description: "KBZ Bank Digital Banking Authentication System",
    thumbnail: {
      url: "/kbz/thumbnail.png",
      width: 1492,
      height: 1028,
      alt: "KBZ Bank Case Study",
    },
  },
  unilinks: {
    Component: UniLinksPage,
    title: "UniLinks Case Study",
    description: "UniLinks All-in-One Study Abroad Platform",
    thumbnail: {
      url: "/unilinks/thumbnail.png",
      width: 1488,
      height: 1050,
      alt: "UniLinks Case Study",
    },
  },
  wct: {
    Component: WctPage,
    title: "WCT Pay Case Study",
    description: "WCT Pay Crypto–Fiat Payment Dashboard",
    thumbnail: {
      url: "/wct/thumbnail.png",
      width: 1488,
      height: 1050,
      alt: "WCT Pay Case Study",
    },
  },
};
