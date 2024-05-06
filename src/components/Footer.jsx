function Footer() {
  return (
    <footer>
      <div className="row">
        <a href="#">
          <i className="fa fa-instagram" />
        </a>
        <a href="#">
          <i className="fa fa-twitter" />
        </a>
        <a href="#">
          <i className="fa fa-linkedin" />
        </a>
        <a href="#">
          <i className="fa fa-facebook" />
        </a>
      </div>

      <div className="row">
        <ul>
          <li>
            <a href="index.html">Home</a>
          </li>
          <li>
            <a href="contacts.html">Contact us</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Terms & Conditions</a>
          </li>
        </ul>
      </div>
      <div className="row">
        qPhoto Copyright © 2024 qPhoto - All rights reserved
      </div>
    </footer>
  );
}

export default function () {
  return <Footer />;
}
