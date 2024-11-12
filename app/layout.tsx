import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from "next/font/google";
import {Container} from "react-bootstrap";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Панель отображения заказов",
  description: "Система отображения списка задач компании",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className='h-100'>
        <Container fluid>
            {children}
        </Container>
      </body>
    </html>
  );
}
