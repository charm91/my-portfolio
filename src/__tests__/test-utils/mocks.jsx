import { vi } from "vitest";

// Module mocks for vi.mock factories. vi.mock is hoisted above imports, so tests
// load these with: vi.mock("next/link", async () => (await import("./test-utils/mocks")).nextLinkMock)
export const nextImageMock = {
  default: ({ src, alt }) => <img src={src} alt={alt} />,
};

export const nextLinkMock = {
  default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
};

// jsdom does not implement IntersectionObserver — arrow fns can't be constructors
export class MockIntersectionObserver {
  static instances = [];
  constructor(callback) {
    this.notify = callback;
    MockIntersectionObserver.instances.push(this);
  }
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
