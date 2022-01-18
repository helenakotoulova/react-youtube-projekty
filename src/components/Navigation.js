import { links } from "../data/data";
import { social } from "../data/data";
import logo from "../data/logo.svg";

const Navigation = () => {
  return (
    <header className="navigation">
      <div>
        <img src={logo} alt='logo'/>
      </div>
      <div>
        <nav className="links"> 
          <div>
            <ul>
              {links.map((link) => {
                return (
                  <li key={link.id}>
                    <a href={link.url}>{link.text}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
      <div>
        <nav className="icons">
          <div>
            <ul>
              {social.map((soc) => {
                return (
                  <li key={soc.id}>
                    <a href={soc.url}>{soc.icon}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Navigation;
