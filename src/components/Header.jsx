import React from "react";

const Header = () => {
  let email = JSON.parse(localStorage.getItem("user_data")).user_email;
  let initial = JSON.parse(localStorage.getItem("user_data")).user_email.split(
    ""
  );

  const logout = () => {
    localStorage.removeItem("user_data");
  };
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid justify-content-end gap-2">
        <div
          className="d-flex bg-primary rounded-circle fw-semibold fs-6 text-light align-items-center justify-content-center"
          style={{
            maxWidth: "40px",
            maxHeight: "40px",
            minWidth: "40px",
            minHeight: "40px",
            cursor: "pointer",
          }}
        >
          {`${initial[0].toUpperCase() + initial[1].toUpperCase()}`}
        </div>

        <div class="dropdown">
          <button
            class="btn btn-outline-dark dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {email}
          </button>
          <ul class="dropdown-menu">
            <li>
              <a
                class="dropdown-item text-danger text-decoration-underline"
                href=""
                onClick={logout}
              >
                logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
