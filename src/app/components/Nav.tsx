"use client";

import { Nav as StyledNav, NavItem } from "@/app/components/style/Nav.styled";
import { Container } from "@/app/components/style/Container.styled";

export default function Nav() {
  return (
    <StyledNav>
      <Container>
        <NavItem>React 練習專案</NavItem>
      </Container>
    </StyledNav>
  );
}
