import React from "react";

function Header() {

  return (
    <ul className="nav">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="/">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/addForm">LoyaltyForm</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="list">List</a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="admin">Product Admin</a>
      </li>

    </ul>
  )

}

export default Header;