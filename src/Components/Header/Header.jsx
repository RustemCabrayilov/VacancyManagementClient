import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "./Header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);

  const handleUserProfile = () => {
    navigate("/userprofile");
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <>
      {/* Bootstrap Navbar Example (Commented Out) */}
      {/* 
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {location.pathname === "/adminpanel" && (
              <>
                <Nav.Link href="/adminpanel/vacancies">Vacancies</Nav.Link>
                <Nav.Link href="/adminpanel/questions">Questions</Nav.Link>
                <Nav.Link href="/adminpanel/answers">Answers</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
        <div className="mr-2" onClick={handleUserProfile}>
          <img
            className="w-12 h-12"
            src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.webp"
          />
        </div>
      </Navbar> 
      */}

      {/* Custom Navigation */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <a href="/" className="no-underline">
            <h1>LOGO</h1>
          </a>
        </div>

        {/* Desktop Menu */}
        <ul className={`${styles.navList} ${menuActive ? styles.active : ""}`}>
          <li>
            <a href="/home">Home</a>
          </li>
          {location.pathname === "/adminpanel" &&
            location.pathname === "/admin" && (
              <>
                <li>
                  <a href="/adminpanel/vacancies">Vacancies</a>
                </li>
                <li>
                  <a href="/adminpanel/questions">Questions</a>
                </li>
                <li>
                  <a href="/adminpanel/answers">Answers</a>
                </li>
                <li>
                  <a href="/adminpanel/results">Results</a>
                </li>
              </>
            )}
        </ul>
        <div className="mr-2" onClick={handleUserProfile}>
          <img
            className="w-12 h-12"
            src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.webp"
          />
        </div>
        {/* Mobile Hamburger Menu */}
        <div
          className={`${styles.hamburger} ${
            menuActive ? styles.hamburgerActive : ""
          }`}
          onClick={toggleMenu}>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuActive && (
        <div className={`${styles.menubar} ${menuActive ? styles.active : ""}`}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/adminpanel/vacancies">Vacancies</a>
            </li>
            <li>
              <a href="/adminpanel/questions">Questions</a>
            </li>
            <li>
              <a href="/adminpanel/answers">Answers</a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
