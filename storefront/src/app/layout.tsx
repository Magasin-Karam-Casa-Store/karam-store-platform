import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import CategoryNav from "@/components/layout/CategoryNav";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

// Sora for display type, Manrope for everything else — per the design system.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karamtech - Informatique, Sécurité, Solaire & Télécommunications",
  description:
    "Karamtech.ma - Votre boutique en ligne pour l'informatique, l'impression, la sécurité, le solaire, la téléphonie et l'image & sonorisation au Maroc.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${sora.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-body">
        <AnnouncementBar />
        <TopBar />
        <Header />
        <CategoryNav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
