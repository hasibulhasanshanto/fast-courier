import { Outlet } from "react-router";
import { Brand } from "@/components/common/Brand";
import { Container } from "@/components/common/Container";

/**
 * AuthLayout — used for /login, /register, /forgot-password, etc.
 * Centered card on a muted background with a minimal top bar.
 */
export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="border-b bg-background">
        <Container className="flex h-16 items-center">
          <Brand />
        </Container>
      </header>
      <main className="flex flex-1 items-center justify-center py-10">
        <Outlet />
      </main>
    </div>
  );
}
