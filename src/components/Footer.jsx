import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "./styles/Footer.style.css";

function Footer() {
  return (
    <footer>
      <div className="row">
        <a href="https://www.instagram.com">
          <i className="fa fa-instagram" />
        </a>
        <a href="https://twitter.com">
          <i className="fa fa-twitter" />
        </a>
        <a href="https://www.linkedin.com">
          <i className="fa fa-linkedin" />
        </a>
        <a href="https://www.facebook.com">
          <i className="fa fa-facebook" />
        </a>
      </div>

      <div className="row">
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/gallery">Галерея</Link>
          </li>
        </ul>
      </div>
      <div className="row">
        qPhoto Copyright © 2024 qPhoto - All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
