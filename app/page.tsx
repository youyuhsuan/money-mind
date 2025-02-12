import Nav from "@/components/Nav";
import Card from "@/components/home/Card";
import Hero from "@/components/home/Hero";
import Footer from "@/components/home/Foorter";
import CoinField from "@/components/home/CoinField";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Card />
      <CoinField />
      <Footer />
    </>
  );
}
