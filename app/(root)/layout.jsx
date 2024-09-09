// Some parts do not consider the root layout, but it is still useful to have it for th rest of the app

import Header from "@/Components/General/Header";

export default function RootLayout({
  children,
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
