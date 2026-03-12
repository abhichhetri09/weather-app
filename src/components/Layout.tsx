import { NavBar } from "./NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <NavBar />
      </header>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export { Layout };
