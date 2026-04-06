import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion"; // eslint-disable-line no-unused-vars -- motion used as motion.div
import { Star, X } from "lucide-react";

const ZayarImage = "/zayar.jpeg";
const ThetImage = "/ko-chaw.jpeg";
const ZinImage = "/zin-thant.jpeg";
const ThiriImage = "/thiri.jpeg";

const testimonials = [
  {
    quote:
      "I confidently recommend Charm for any frontend and UI/UX design role. Having collaborated with her for 1.5 years, I can affirm her unwavering dedication and consistent performance. She consistently delivers high-quality work, demonstrating a strong grasp of both frontend development and user experience design principles.",
    name: "Zayar Zy",
    role: "Chief Operating Officer, BetterHR",
    avatar: ZayarImage,
  },
  {
    quote:
      "I have the utmost respect and admiration for her as a UI/UX professional. Her talent, dedication and passion for her craft make her a standout in the industry and I am confident that she will continue to achieve great success in her career.",
    name: "Thet Maung Chaw",
    role: "Group Deputy Chief Technology Officer, KBZ Bank",
    avatar: ThetImage,
  },
  {
    quote:
      "I had the pleasure of working with Charm on several projects at Nexlabs, including a user-friendly online shopping platform designed to enhance the customer experience. Charm is skilled at explaining design ideas clearly, both to the team and to clients. Her presentation skills made it easier for everyone to understand the design direction, which helped the project move forward smoothly. I enjoyed working with her and would be happy to collaborate again in the future.",
    name: "Zin Thant",
    role: "Senior Business Analyst at Block Aero Technologies",
    avatar: ZinImage,
  },
  {
    quote:
      "I highly recommend Charm for any design-related position. She possesses a unique set of skills that make her an asset to any team. Her ability to collaborate with cross-functional teams, including developers and product managers, is unparalleled. She ensures that design consistency and feasibility are maintained throughout the project, which leads to a better end-product. Overall, I highly recommend her because she is a hardworking, dedicated, and talented individual who will undoubtedly make a positive impact on any team she joins.",
    name: "Thiri Aung",
    role: "Thoughtworker | MBA",
    avatar: ThiriImage,
  },
];

const textPrimary = "#242424";
const VIEWPORT_HEIGHT = 800;

export function Testimonials() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(800);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 0, -scrollRange, -scrollRange],
  );

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const contentHeight = el.scrollHeight;
      setScrollRange(Math.max(0, contentHeight - VIEWPORT_HEIGHT));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="pb-10 pt-20"
      style={{ minHeight: VIEWPORT_HEIGHT + scrollRange - 500 }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header - centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span
            className="px-4 py-1.5 rounded-full text-xs font-medium bg-white text-center mx-auto inline-block"
            style={{
              color: textPrimary,
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
            }}
          >
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1f2937] mt-4">
            Colleague Feedback
          </h2>
        </motion.div>

        {/* Fixed 800px viewport, no scrollbar; content translates with body scroll */}
        <div
          className="max-w-[600px] mx-auto rounded-2xl overflow-hidden"
          style={{
            height: VIEWPORT_HEIGHT,
            backgroundImage: "linear-gradient(180deg, #fff, #f6f7f9 46%, #fff)",
            backgroundSize: "100% 100%",
          }}
        >
          <motion.div
            ref={contentRef}
            style={{ y }}
            className="p-6 md:p-10 space-y-6 w-full"
          >
            {testimonials.map((t, i) => (
              <article
                key={i}
                className="rounded-2xl bg-white p-6 md:p-8 relative shadow-xs"
              >
                <div className="flex gap-0.5 mb-5">
                  {[1, 2, 3, 4].map((n) => (
                    <Star
                      key={n}
                      className="size-5 fill-[#fbbf24] text-[#fbbf24] shrink-0"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <p className="text-[#323744] text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="size-12 rounded-full object-cover shrink-0 bg-[#e5e7eb]"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-[#1f2937] text-lg truncate">
                        {t.name}
                      </p>
                      <p className="text-sm text-[#6b7280] truncate">
                        {t.role}
                      </p>
                    </div>
                  </div>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="#000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m13.081 10.712l-4.786-6.71a.6.6 0 0 0-.489-.252H5.28a.6.6 0 0 0-.488.948l6.127 8.59m2.162-2.576l6.127 8.59a.6.6 0 0 1-.488.948h-2.526a.6.6 0 0 1-.489-.252l-4.786-6.71m2.162-2.576l5.842-6.962m-8.004 9.538L5.077 20.25"
                      ></path>
                    </svg>
                  </span>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
