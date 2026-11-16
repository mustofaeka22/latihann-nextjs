import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Regular.ttf", weight: "400" },
    { path: "./fonts/Poppins-Bold.ttf", weight: "700" },
  ],
});

export const metadata = {
  title: { default: "EventKu", template: "%s · EventKu" },
  description: "Aplikasi Manajemen Event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.className} flex min-h-screen flex-col bg-slate-50 text-slate-800`}>
        {children}
      </body>
    </html>
  );
}