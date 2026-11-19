import Isotype from "./Isotype";

const nav = {
  producto: [
    { label: "Qué es", href: "#que-es" },
    { label: "Beneficios", href: "#beneficios" },
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Hiperlocal", href: "#hiperlocal" },
    { label: "Descargar", href: "#descargar" },
  ],
  informacion: [
    { label: "Contacto", href: "mailto:hola@meto.com.ar" },
    { label: "Preguntas frecuentes", href: "/faq" },
    { label: "Política de privacidad", href: "/privacy" },
    { label: "Términos y condiciones", href: "/terms" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative"
      style={{
        backgroundColor: "#050308",
        borderTop: "1px solid var(--border-subtle)",
        paddingBlock: "clamp(60px, 10vh, 100px)",
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: 1360, padding: "0 clamp(24px, 4vw, 48px)" }}
      >
        <div className="grid gap-12 md:gap-16 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Identity */}
          <div>
            <div className="inline-flex items-center gap-3">
              <Isotype size={48} animated />
              <div>
                <p className="text-white text-xl font-black tracking-tight">MeTo</p>
                <p className="font-mono-tiny text-[color:var(--text-tertiary)]">
                  Mercado Touch
                </p>
              </div>
            </div>
            <p
              className="mt-6 text-[color:var(--text-secondary)]"
              style={{
                fontSize: "1rem",
                lineHeight: 1.55,
                maxWidth: "36ch",
              }}
            >
              Lo que tenés cerca, en un swipe.
            </p>
            <p
              className="mt-4 font-mono-tiny text-[color:var(--text-tertiary)]"
              style={{ letterSpacing: "0.05em" }}
            >
              Marca registrada en INPI · Software registrado en DNDA
            </p>
          </div>

          {/* Product nav */}
          <nav aria-label="Secciones del producto">
            <p className="font-mono-tiny text-[color:var(--text-tertiary)] mb-4">
              Producto
            </p>
            <ul className="flex flex-col gap-3">
              {nav.producto.map((l) => (
                <li key={l.href}>
                  <a
                    className="text-[color:var(--text-secondary)] hover:text-white transition-colors"
                    href={l.href}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Info nav */}
          <nav aria-label="Información y legales">
            <p className="font-mono-tiny text-[color:var(--text-tertiary)] mb-4">
              Información
            </p>
            <ul className="flex flex-col gap-3">
              {nav.informacion.map((l) => (
                <li key={l.href}>
                  <a
                    className="text-[color:var(--text-secondary)] hover:text-white transition-colors"
                    href={l.href}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className="mt-14 pt-8 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <p className="font-mono-tiny text-[color:var(--text-tertiary)]">
            © {year} Avalon Agency SRL · CUIT 30-71734263-8 · Buenos Aires, Argentina
          </p>
          <p className="font-mono-tiny text-[color:var(--text-dim)]">
            <a href="mailto:hola@meto.com.ar" className="hover:text-[color:var(--violet-300)]">
              hola@meto.com.ar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
