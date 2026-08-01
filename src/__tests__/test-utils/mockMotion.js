import React from "react";

// Shared framer-motion `motion.*` mock: strips animation-only props and
// forwards everything else (including `style`) to a plain DOM element.
//
// Components are cached per tag. Without this, `motion.form`/`motion.div`/etc
// would resolve to a brand-new function component on every property access,
// so React would see a different component type on every render and remount
// the whole subtree — silently dropping input focus/value between keystrokes
// under userEvent.type(), even though a single fireEvent.change is unaffected.
export function createMotionProxy() {
  const cache = new Map();
  return new Proxy(
    {},
    {
      get(_, tag) {
        if (!cache.has(tag)) {
          cache.set(
            tag,
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
            }) => React.createElement(tag, { style, ...props }, children),
          );
        }
        return cache.get(tag);
      },
    },
  );
}
