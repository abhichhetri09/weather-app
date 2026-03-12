import { NavBar } from "./NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <header className="border-b surface-border surface-soft backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
          <NavBar />
        </div>
      </header>
      <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl px-4">
        {children}
      </main>
    </div>
  );
};

export { Layout };
