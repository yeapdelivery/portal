import type { Metadata } from "next";
import { Rubik, Outfit } from "next/font/google";
import "../style/global.css";
const rubik = Rubik({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yeap delivery",
  description:
    "Gerencie facilmente seu restaurante com um dashboard completo: controle de pedidos, vendas, estoque, entregas e mais. Tudo em tempo real, em um só lugar.",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="bg-white overflow-x-hidden ">
      <body className={`${outfit.className} ${rubik.className}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
