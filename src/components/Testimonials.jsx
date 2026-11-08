import Image from "next/image";
import zayarAsset from "../../public/zayar.jpeg";
import koChawAsset from "../../public/ko-chaw.jpeg";
import zinThantAsset from "../../public/zin-thant.jpeg";
import thiriAsset from "../../public/thiri.jpeg";
import { Star } from "lucide-react";

const ZayarImage = zayarAsset.src;
const ThetImage = koChawAsset.src;
const ZinImage = zinThantAsset.src;
const ThiriImage = thiriAsset.src;

const testimonials = [
  {
    quote:
      "I confidently recommend Charm for any frontend and UI/UX design role. Having collaborated with her for 1.5 years, I can affirm her unwavering dedication and consistent performance. She consistently delivers high-quality work, demonstrating a strong grasp of both frontend development and user experience design principles.",
    name: "Zayar Zy",
    role: "Chief Operating Officer, Better HR",
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

export function Testimonials() {
  return (
    <section id="testimonials" className="pb-10 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
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
            What Colleagues Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="rounded-2xl bg-white p-5 md:p-8 relative shadow-xs flex flex-col"
            >
              <div className="flex gap-0.5 mb-5" aria-label="5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className="size-5 fill-[#fbbf24] text-[#fbbf24] shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-[#323744] text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between gap-4 mt-auto">
                <div className="flex flex-1 items-center gap-3 min-w-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover shrink-0 bg-[#e5e7eb]"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-[#1f2937] text-lg">
                      {t.name}
                    </p>
                    <p className="text-sm text-[#6b7280]">
                      {t.role}
                    </p>
                  </div>
                </div>
                <span className="shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m13.081 10.712l-4.786-6.71a.6.6 0 0 0-.489-.252H5.28a.6.6 0 0 0-.488.948l6.127 8.59m2.162-2.576l6.127 8.59a.6.6 0 0 1-.488.948h-2.526a.6.6 0 0 1-.489-.252l-4.786-6.71m2.162-2.576l5.842-6.962m-8.004 9.538L5.077 20.25"
                    ></path>
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
