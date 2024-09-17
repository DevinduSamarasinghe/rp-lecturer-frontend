// RootLayout.jsx
import Header from "@/Components/General/Header";
import Footer from "@/Components/General/Footer";

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      {/* Main content should be scrollable and take the remaining height */}
      <main className="flex-1 flex overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}
