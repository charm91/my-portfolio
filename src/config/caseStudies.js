import { BetterHRPage } from "@/views/BetterHRPage";
import betterhrThumbnailAsset from "../../public/betterhr/thumbnail.png";
import kbzThumbnailAsset from "../../public/kbz/thumbnail.png";
import unilinksThumbnailAsset from "../../public/unilinks/thumbnail.png";
import wctThumbnailAsset from "../../public/wct/thumbnail.png";
import { KBZBankPage } from "@/views/KBZBankPage";
import { UniLinksPage } from "@/views/UniLinksPage";
import { WctPage } from "@/views/WctPage";

export const CASE_STUDIES = {
  betterhr: {
    Component: BetterHRPage,
    title: "Better HR Case Study",
    description: "Better HR Cloud-based HR Management Platform",
    thumbnail: {
      url: betterhrThumbnailAsset.src,
      width: 1488,
      height: 1050,
      alt: "Better HR Case Study",
    },
  },
  "kbz-bank": {
    Component: KBZBankPage,
    title: "KBZ Bank Case Study",
    description: "KBZ Bank Digital Banking Authentication System",
    thumbnail: {
      url: kbzThumbnailAsset.src,
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
      url: unilinksThumbnailAsset.src,
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
      url: wctThumbnailAsset.src,
      width: 1488,
      height: 1050,
      alt: "WCT Pay Case Study",
    },
  },
};
