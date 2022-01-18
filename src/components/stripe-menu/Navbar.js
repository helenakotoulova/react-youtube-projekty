import React from "react";
import logo from "./images/logo.svg";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Navbar = () => {
  const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext();
  const displaySubmenu = (e) => {
    const page = e.target.textContent; // takhle ziskam nazvy tech buttonu, kdyz pres ne budu mouseOverovat
    const tempBtn = e.target.getBoundingClientRect(); //The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
    /* => console.log(tempBtn)
    DOMRect {x: 429.53125, y: 15.5, width: 160, height: 49, top: 15.5, …}
    bottom: 64.5
    height: 49
    left: 429.53125
    right: 589.53125
    top: 15.5
    width: 160
    x: 429.53125
    y: 15.5
    */
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3; // -3 px
    openSubmenu(page, { center, bottom });
  };
  
  // potrebuju aby se spustil closeSubMenu kdyz budu prejizdet pres Navbar MIMO lokaci tech cudliku.
  const handleSubmenu = (e) => {
      /*
    The Element.classList is a read-only property that returns a live DOMTokenList collection of the class attributes of the element.
     This can then be used to manipulate the class list.
     Existuje i element.className ale ten vraci element's list of classes as a space-delimited string
      */
    if (!e.target.classList.contains("link-btn")) {
      closeSubmenu();
    }
  };
  
  return (
    <nav className="nav" onMouseOver={handleSubmenu}>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} className="nav-logo" alt="" />
          <button className="btn toggle-btn" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          <li>
            <button className="link-btn" onMouseOver={displaySubmenu}>
              products
            </button>
          </li>
          <li>
            <button className="link-btn" onMouseOver={displaySubmenu}>
              developers
            </button>
          </li>
          <li>
            <button className="link-btn" onMouseOver={displaySubmenu}>
              company
            </button>
          </li>
        </ul>
        <button className="btn signin-btn">Sign in</button>
      </div>
    </nav>
  );
};

export default Navbar;

