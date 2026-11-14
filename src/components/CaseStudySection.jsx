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

export function CaseStudyQuote({ children }) {
  return (
    <div className="border-l-3 border-green-500 text-lg font-medium italic px-6 py-4 my-4 block text-black">
      {children}
    </div>
  );
}

export function CaseStudyReflection({ title, children }) {
  return (
    <div className="bg-gray-50 px-6 py-8 rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
        {title}
      </h2>
      {children}
    </div>
  );
}
