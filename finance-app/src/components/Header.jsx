function Header({ toggleSidebar }) {
  return (
    <div className="top-header">
      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar}>☰</button>
        <div className="logo">F✨Nance</div>
      </div>

      <input className="search" placeholder="Search..." />

      <div className="header-actions">
        <button onClick={() => window.location.href = "/profile"}>Profile</button>
        <button
          className="logout"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
