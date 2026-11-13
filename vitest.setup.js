import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";
import { createMotionProxy } from "./src/__tests__/test-utils/mockMotion";

vi.mock("framer-motion", () => ({
  MotionConfigContext: React.createContext({}),
  motion: createMotionProxy(),
  useIsPresent: () => true,
  useScroll: () => ({ scrollYProgress: 0 }),
  useTransform: () => 0,
  AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
}));
