import AuthForm from "@/components/home/AuthForm";
import Nav from "@/components/Nav";

export default function Page() {
  return (
    <>
      <Nav />
      <AuthForm value={"login"} />
    </>
  );
}
