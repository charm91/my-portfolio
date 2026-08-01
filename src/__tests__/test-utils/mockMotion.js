import React from "react";

// Shared framer-motion `motion.*` mock: strips animation-only props and
// forwards everything else (including `style`) to a plain DOM element.
export function createMotionProxy() {
  return new Proxy(
    {},
    {
      get:
        (_, tag) =>
        ({
          children,
          initial,
          animate,
          transition,
          viewport,
          whileInView,
          variants,
          exit,
          style,
          ...props
        }) =>
          React.createElement(tag, { style, ...props }, children),
    },
  );
}
