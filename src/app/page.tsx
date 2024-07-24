import { Container } from "@/app/components/style/Container.styled";
import Nav from "@/app/components/Nav";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Nav></Nav>
      <section>
        <Container>
          <div>歡迎光臨我的頁面</div>
        </Container>
      </section>
      <Link href="/accounting">點擊開始</Link>
    </main>
  );
}
