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
    <nav>
      <Link to="/"></Link>
      <div className="flex gap-4 p-2 border bg-slate-900">
        {navItems.map((item) => (
          <div
            key={item.to}
            className="flex items-center justify-center border border-slate-300 rounded-md p-2 hover:bg-slate-300 hover:text-slate-900 transition-all duration-300"
          >
            <Link to={item.to}>{item.label}</Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export { NavBar };
