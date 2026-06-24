import { Outlet, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faPaw, faUsers, faClipboardList, faHome } from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { to: "/admin", icon: faChartLine, label: "Dashboard" },
  { to: "/admin/pets", icon: faPaw, label: "Manage Pets" },
  { to: "/admin/users", icon: faUsers, label: "Manage Users" },
  { to: "/admin/requests", icon: faClipboardList, label: "Adoption Requests" },
];

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 bg-dark text-white flex flex-col p-6 fixed h-full">
        <div className="text-2xl font-display font-bold mb-10 text-secondary">🐾 Happy Tails</div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-700"
                }`
              }
            >
              <FontAwesomeIcon icon={item.icon} />
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-700 mt-6">
            <FontAwesomeIcon icon={faHome} />
            Back to Site
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;