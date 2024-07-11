import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Poppins({ subsets: ["latin"], weight: "300" });

export const metadata = {
  title: "Week 8 Assignment",
  description: "Assigment using next.js and Vercel by Theo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
