import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid min-h-screen grid-rows-[72px_1fr] md:grid-rows-[82px_1fr]">
      <div className="sticky top-0 z-100 col-start-1 row-[1/2] grid items-end">
        <Navbar />
      </div>
      <main className="col-start-1 row-span-full">{children}</main>
      <Footer />
    </div>
  );
}
