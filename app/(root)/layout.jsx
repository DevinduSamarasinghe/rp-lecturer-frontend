// RootLayout.jsx
import Header from "@/Components/General/Header";
import Footer from "@/Components/General/Footer";

export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      {/* Main content should be scrollable and take the remaining height */}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
