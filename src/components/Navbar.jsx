import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Logo from "./Logo.jsx";

const Navbar = () => {
  const navbarRef = useRef(null);
  const menuTextRef = useRef(null);
  const [atTop, setAtTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const menuItemsRef = useRef([]);

  const menuItems = useMemo(
    () => [
      "Home",
      "Work",
      "Services",
      "About",
      "Clients",
      "Careers",
      "Contact",
    ],
    []
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (isOpen) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        gsap.to(".navbar-logo", {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(".navbar-logo", {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      if (currentScrollY > 50 && atTop) {
        setAtTop(false);
        gsap.to(menuTextRef.current, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            menuTextRef.current.innerText = "&";
            gsap.to(menuTextRef.current, { opacity: 1, duration: 0.2 });
          },
        });
      }

      if (currentScrollY === 0 && !atTop) {
        setAtTop(true);
        gsap.to(menuTextRef.current, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            menuTextRef.current.innerText = "& MENU";
            gsap.to(menuTextRef.current, { opacity: 1, duration: 0.2 });
          },
        });
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [atTop, isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  return (
    <nav ref={navbarRef} className="navbar">
      <div className="navbar-logo">
        <Logo />
      </div>
      <button className="menu-button" onClick={toggleMenu}>
        <span ref={menuTextRef}>{isOpen ? "×" : "& MENU"}</span>
      </button>

      {isOpen && (
        <div className="modal">
          <button className="close-button" onClick={toggleMenu}>
            ×
          </button>
          <ul className="modal-links">
            {menuItems.map((link, index) => {
              const delay = link.length * 0.07; // Staggered delay based on text length

              return (
                <motion.li
                  key={link}
                  ref={(el) => (menuItemsRef.current[index] = el)}
                  className="menu-item"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.33, 1, 0.68, 1],
                    delay,
                  }}
                >
                  <motion.span
                    className="menu-text"
                    whileHover={{
                      color: "rgb(0,0,0)",
                      backgroundColor: "rgb(255,255,255)",
                      transition: { duration: 0.3 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {link}
                  </motion.span>
                  <motion.div
                    className="hover-bg"
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
