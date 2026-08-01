import { Header } from "@/components/Header";

export function HomeShell({ className, children }) {
  return (
    <>
      <Header />
      <div className="home-wrapper">
        <div className="home-bg-layer" />
        <main id="main-content" className={className}>
          {children}
        </main>
      </div>
    </>
  );
}
