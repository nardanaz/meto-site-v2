import Link from "next/link";
import Isotype from "./Isotype";

type TocItem = { id: string; label: string };

export default function LegalShell({
  eyebrow,
  title,
  version,
  toc,
  children,
}: {
  eyebrow: string;
  title: string;
  version: string;
  toc: TocItem[];
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-void)", color: "var(--text-primary)" }}
    >
      {/* Minimal legal nav */}
      <header
        className="sticky top-0 z-40 backdrop-blur-xl"
        style={{
          backgroundColor: "rgba(5, 3, 8, 0.78)",
          borderBottom: "1px solid var(--border-subtle)",
          paddingTop: "max(14px, env(safe-area-inset-top, 0px))",
          paddingLeft: "max(20px, env(safe-area-inset-left, 0px))",
          paddingRight: "max(20px, env(safe-area-inset-right, 0px))",
          paddingBottom: 14,
        }}
      >
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white focus-ring"
            aria-label="Volver al inicio de MeTo"
          >
            <Isotype size={28} />
            <span className="font-display text-[17px] tracking-[-0.02em]">
              MeTo
            </span>
          </Link>
          <nav className="flex items-center gap-5 text-[13px] font-medium text-[color:var(--text-secondary)]">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Términos
            </Link>
          </nav>
        </div>
      </header>

      <main
        className="mx-auto"
        style={{
          maxWidth: 820,
          paddingLeft: "max(24px, env(safe-area-inset-left, 0px))",
          paddingRight: "max(24px, env(safe-area-inset-right, 0px))",
          paddingBlock: "clamp(60px, 10vh, 120px)",
        }}
      >
        <div className="legal-header">
          <p className="legal-eyebrow">{eyebrow}</p>
          <h1
            className="font-display text-white"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              textWrap: "balance",
            }}
          >
            {title}
          </h1>
          <p className="legal-meta">{version}</p>
        </div>

        <aside className="legal-toc" aria-label="Contenido">
          <p className="legal-toc-title">Contenido</p>
          <ol>
            {toc.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>
                  <span className="legal-toc-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="legal-body">{children}</article>
      </main>

      <footer
        className="border-t"
        style={{
          borderColor: "var(--border-subtle)",
          paddingBlock: "clamp(40px, 6vh, 64px)",
          paddingLeft: "max(24px, env(safe-area-inset-left, 0px))",
          paddingRight: "max(24px, env(safe-area-inset-right, 0px))",
        }}
      >
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <p className="font-mono-tiny text-[color:var(--text-tertiary)]">
            © {new Date().getFullYear()} Avalon Agency SRL · CUIT 30-71734263-8
          </p>
          <div className="flex gap-5 text-[13px] text-[color:var(--text-secondary)]">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Términos
            </Link>
            <a
              href="mailto:hola@meto.com.ar"
              className="hover:text-white transition-colors"
            >
              hola@meto.com.ar
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
