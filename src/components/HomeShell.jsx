import { Header } from "@/components/Header";

export function HomeShell({ className, children, errorPage = false }) {
  return (
    <>
      <Header />
      <div className="home-wrapper">
        <div className="home-bg-layer" />
        <main id="main-content" className={className} data-error-page={errorPage || undefined}>
          {children}
        </main>
      </div>
    </>
  );
}
