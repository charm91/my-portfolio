import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import RootLayout from "../../app/layout";
import ContactPageClient from "../../app/contact-me/ContactPageClient";
import { CaseStudyShell } from "../components/CaseStudyShell";
import { HomeShell } from "../components/HomeShell";

vi.mock("next/font/google", () => ({ Inter: () => ({ variable: "test-inter" }) }));

// The shared setup mock has no MotionConfig, which the layout's MotionProvider renders.
vi.mock("framer-motion", async () => {
  const { createMotionProxy } = await import("./test-utils/mockMotion");
  return {
    motion: createMotionProxy(),
    MotionConfig: ({ children }) => children,
  };
});

vi.mock("next/image", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
}));

vi.mock("@emailjs/browser", () => ({ default: { send: vi.fn() } }));
vi.mock("@/components/Header", () => ({ Header: () => null }));
vi.mock("@/components/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/CaseStudyAuthor", () => ({ CaseStudyAuthor: () => null }));

const shells = [
  ["home pages", () => <HomeShell>content</HomeShell>],
  ["case-study pages", () => (
    <CaseStudyShell
      coverImage="/cover.png"
      title="Case"
      tags={[]}
      liveUrl="https://example.com/"
      thumbnail={{ src: "/thumbnail.png", width: 100, height: 100 }}
    >
      content
    </CaseStudyShell>
  )],
  ["the contact page", () => <ContactPageClient />],
];

describe("Skip link", () => {
  afterEach(cleanup);

  it("targets #main-content", () => {
    const markup = new DOMParser().parseFromString(
      renderToStaticMarkup(<RootLayout>content</RootLayout>),
      "text/html",
    );
    expect(markup.querySelector('a[href="#main-content"]')?.textContent).toBe("Skip to content");
  });

  it.each(shells)("has exactly one #main-content landmark on %s", (_, renderShell) => {
    const { container } = render(renderShell());
    const targets = container.querySelectorAll("#main-content");
    expect(targets).toHaveLength(1);
    expect(targets[0].tagName).toBe("MAIN");
  });
});
