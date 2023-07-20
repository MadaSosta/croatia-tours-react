import { Poppins } from "next/font/google";

import Footer from "@/components/common/footer/Index";
import Header from "@/components/common/header/Index";

import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Croatia Tours",
  description:
    "Croatia Tours is a travel agency that offers tours and guides in Croatia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div id="pageWrapper">
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
