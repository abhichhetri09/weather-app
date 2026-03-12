import { Link } from "react-router-dom";

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
    <nav className="flex w-full items-center justify-between">
      <Link to="/" className="text-sm font-semibold tracking-tight text-slate-50">
        Clima
        <span className="ml-1 rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-300">
          beta
        </span>
      </Link>
      <ul className="flex items-center gap-4 text-xs font-medium text-slate-300">
        {navItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="rounded-full px-3 py-1 hover:bg-slate-800 hover:text-slate-100 transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { NavBar };
