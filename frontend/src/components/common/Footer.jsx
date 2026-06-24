import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPaw } from "@fortawesome/free-solid-svg-icons";

import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300 mt-auto">
      <div className="section-padding !py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 text-white text-xl font-display font-bold mb-3">
            <FontAwesomeIcon icon={faPaw} className="text-secondary" />
            Happy Tails
          </div>
          <p className="text-sm text-gray-400">
            Find a Friend. Give a Home.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/pets" className="hover:text-secondary">
                Browse Pets
              </Link>
            </li>
            <li>
              <Link to="/success-stories" className="hover:text-secondary">
                Success Stories
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-secondary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-secondary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/pets?species=Dog" className="hover:text-secondary">
                Dogs
              </Link>
            </li>
            <li>
              <Link to="/pets?species=Cat" className="hover:text-secondary">
                Cats
              </Link>
            </li>
            <li>
              <Link to="/pets?species=Rabbit" className="hover:text-secondary">
                Rabbits
              </Link>
            </li>
            <li>
              <Link to="/pets?species=Bird" className="hover:text-secondary">
                Birds
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-3 text-lg">
            <a href="#" className="hover:text-secondary">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>

            <a href="#" className="hover:text-secondary">
              <FontAwesomeIcon icon={faInstagram} />
            </a>

            <a href="#" className="hover:text-secondary">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} Happy Tails. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;