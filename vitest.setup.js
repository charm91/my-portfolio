import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";
import { createMotionProxy } from "./src/__tests__/test-utils/mockMotion";

vi.mock("framer-motion", () => ({
  motion: createMotionProxy(),
  AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
}));
