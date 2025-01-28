import Nav from "@/components/Nav";
import AuthForm from "@/components/home/AuthForm";
import Card from "@/components/home/Card";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Card />
      <AuthForm />
    </>
  );
}
