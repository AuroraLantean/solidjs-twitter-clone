import solidLogo from '../assets/logo.png';

function Header() {
  return (
  <header id="main-header">
    <img src={solidLogo} alt="SolidJS Logo" />
    <h1>SolidJS Header</h1>
  </header>
  );
}

export default Header;