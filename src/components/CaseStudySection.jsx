import { textPrimary } from "@/config/caseStudy";

export function CaseStudySection({ title, children }) {
  return (
    <section className="mb-12 md:mb-16 px-4">
      {title && (
        <h2
          className="text-2xl md:text-3xl font-bold mb-6"
          style={{ color: textPrimary }}
        >
          {title}
        </h2>
      )}
      <div className="space-y-4 text-base leading-relaxed">{children}</div>
    </section>
  );
}
