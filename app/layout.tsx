import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meto.com.ar"),
  title: {
    default: "MeTo · Lo que tenés cerca, en un swipe",
    template: "%s · MeTo",
  },
  description:
    "MeTo (Mercado Touch) es el marketplace hiperlocal con swipe. Descubrí productos a cuadras a la redonda, matcheá con vendedores y coordiná sin envíos tradicionales.",
  keywords: [
    "marketplace hiperlocal",
    "mercado touch",
    "meto",
    "compraventa vecinos",
    "argentina marketplace",
    "swipe marketplace",
    "comercio barrial",
  ],
  authors: [{ name: "Avalon Agency SRL" }],
  creator: "Avalon Agency SRL",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://meto.com.ar",
    siteName: "MeTo",
    title: "MeTo · Lo que tenés cerca, en un swipe",
    description:
      "Un swipe. Un match. Un vecino a 10 cuadras. Comprá y vendé sin envíos, sin esperas, sin vueltas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeTo · Lo que tenés cerca, en un swipe",
    description:
      "Marketplace hiperlocal con swipe. Descubrí productos a cuadras, matcheá y coordiná en persona.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
