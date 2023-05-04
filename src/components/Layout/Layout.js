import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="grow overflow-y-scroll py-10">{children}</main>
      <Footer />
    </div>
  );
}
