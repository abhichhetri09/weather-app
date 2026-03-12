import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const NavBar = () => {
  const navItems = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "About",
      to: "/about",
    },
  ];
  return (
    <nav className="flex w-full items-center justify-between gap-4">
      <Link to="/" className="text-sm font-semibold tracking-tight">
        Clima
        <span className="ml-1 rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-300">
          beta
        </span>
      </Link>
      <div className="flex items-center gap-3">
        <ul className="flex items-center gap-4 text-xs font-medium">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="surface-soft rounded-full px-3 py-1 hover:opacity-80 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export { NavBar };
