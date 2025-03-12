import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Logo from "./Logo.jsx";

const Navbar = () => {
  const navbarRef = useRef(null);
  const menuTextRef = useRef(null);
  const [atTop, setAtTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const menuItemsRef = useRef([]);

  const menuItems = ["Home", "Work", "Services", "About", "Clients", "Careers", "Contact"];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (isOpen) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        gsap.to(".navbar-logo", { opacity: 0, duration: 0.5, ease: "power2.out" });
      } else {
        gsap.to(".navbar-logo", { opacity: 1, duration: 0.5, ease: "power2.out" });
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

    if (!isOpen) {
      menuItems.forEach((item, index) => {
        const delay = item.length * 0.07; // Delay based on text length
        gsap.fromTo(
          menuItemsRef.current[index],
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.6, ease: "power3.out", delay }
        );
      });
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    menuItems.forEach((item, index) => {
      const delay = item.length * 0.07; // Delay based on text length
      gsap.set(menuItemsRef.current[index], { y: "100%", opacity: 0 });

      gsap.to(menuItemsRef.current[index], {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        ease: "power3.linear",
        delay,
      });
    });
  }, [isOpen]);

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
          <button className="close-button" onClick={toggleMenu}>×</button>
          <ul className="modal-links">
            {menuItems.map((link, index) => (
              <li
                key={link}
                ref={(el) => (menuItemsRef.current[index] = el)}
                className="menu-item"
              >
                <span className="menu-text">{link}</span>
                <span className="hover-bg"></span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
