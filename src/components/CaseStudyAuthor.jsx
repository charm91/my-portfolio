import Image from "next/image";
import { SITE, SOCIAL_LINKS } from "@/config/site";

export function CaseStudyAuthor() {
  return (
    <div className="border-t border-gray-200 py-4 mx-4">
      <div className="flex items-center justify-between gap-6 mt-2">
        <div className="flex items-center gap-5">
          <Image
            src={SITE.profileImage}
            alt={SITE.displayName}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover"
          />
          <div>
            <h3 className="text-base text-gray-900">{SITE.displayName}</h3>
            <p className="text-sm text-gray-500">{SITE.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-slate-400 shadow-xs transition hover:text-slate-600"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M13 22v-8h3l1-4h-4V8c0-1.03 0-2 2-2h2V2h-3c-3.6 0-5 1.79-5 5v3H6v4h3v8h4z" />
            </svg>
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-slate-400 shadow-xs transition hover:text-slate-600"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A2.03 2.03 0 1 0 5.3 7.06 2.03 2.03 0 0 0 5.25 3zM20.44 12.64c0-3.03-1.62-4.44-3.79-4.44-1.75 0-2.53.96-2.97 1.64V8.5h-3.38c.04.89 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.68.89-1.38 1.93-1.38 1.36 0 1.91 1.04 1.91 2.57V20H21v-6.96z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
