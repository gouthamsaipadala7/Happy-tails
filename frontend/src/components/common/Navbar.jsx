import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faHeart, faUser, faPaw } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import logoLight from "../../assets/logo-light.svg";

const links = [
  { to: "/", label: "Home" },
  { to: "/pets", label: "Pets" },
  { to: "/success-stories", label: "Success Stories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoLight} alt="Happy Tails" className="h-9" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-medium transition-colors ${isActive ? "text-primary" : "text-dark hover:text-primary"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="text-sm font-semibold text-accent hover:underline">
                  Admin Panel
                </Link>
              )}
              <Link to="/dashboard" className="flex items-center gap-2 text-dark hover:text-primary">
                <FontAwesomeIcon icon={faUser} />
                {user.name?.split(" ")[0]}
              </Link>
              <button onClick={handleLogout} className="btn-outline !px-4 !py-2 text-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-medium text-dark hover:text-primary">
                Login
              </Link>
              <Link to="/signup" className="btn-primary !px-5 !py-2.5 text-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden text-2xl text-dark" onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={open ? faXmark : faBars} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden glass overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className="font-medium text-dark">
                  {link.label}
                </NavLink>
              ))}
              <hr className="border-gray-300" />
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setOpen(false)} className="font-semibold text-accent">
                      Admin Panel
                    </Link>
                  )}
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="font-medium text-dark">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="btn-outline text-sm">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="font-medium text-dark">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setOpen(false)} className="btn-primary text-sm text-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;