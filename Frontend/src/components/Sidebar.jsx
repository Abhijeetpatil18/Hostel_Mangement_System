import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [btn, setBtn] = useState("Home");

  const handleBtnClick = (btn) => setBtn(btn);

  const isActive = (path, label) =>
    location.pathname.toLowerCase() === path.toLowerCase() || btn === label;

  return (
    <div
      className=" 
        fixed
        
        d-flex flex-column 
        p-3 bg-dark text-white
        h-10/12   /* full viewport height */
        border-end 
           /* right border */
        
           
      "
      style={{
        width: "260px",
      }}
      data-bs-theme="dark"
    >
      {/* Nav */}
      <ul className="nav nav-pills flex-column mb-auto gap-2 ">
        <li className="nav-item">
          <Link
            to="/app"
            className={`nav-link d-flex align-items-center ${
              isActive("/app", "Home") ? "active" : "text-white"
            }`}
            onClick={() => handleBtnClick("Home")}
            aria-current={isActive("/", "Home") ? "page" : undefined}
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#home" />
            </svg>
            <span className="text-lg">Home</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="students"
            className={`nav-link d-flex align-items-center ${
              isActive("students", "Students") ? "active" : "text-white"
            }`}
            onClick={() => handleBtnClick("Students")}
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#speedometer2" />
            </svg>
            <span className="text-lg">Students</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="rooms" /* make path lower-case consistently */
            className={`nav-link d-flex align-items-center ${
              isActive("rooms", "Rooms") ? "active" : "text-white"
            }`}
            onClick={() => handleBtnClick("Rooms")}
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#table" />
            </svg>
            <span className="text-lg">Rooms</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/app/fees" /* make path lower-case consistently */
            className={`nav-link d-flex align-items-center ${
              isActive("/app/fees", "fees") ? "active" : "text-white"
            }`}
            onClick={() => handleBtnClick("Fees")}
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#table" />
            </svg>
            <span className="text-lg">Fees</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/app/complaints"
            className={`nav-link d-flex align-items-center ${
              isActive("/complaints", "Complaints") ? "active" : "text-white"
            }`}
            onClick={() => handleBtnClick("Complaints")}
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#grid" />
            </svg>
            <span className="text-lg">Complaints</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/app/staff"
            className={`nav-link d-flex align-items-center ${
              isActive("/staff", "Staff") ? "active" : "text-white"
            }`}
            onClick={() => handleBtnClick("Staff")}
          >
            <svg
              className="bi pe-none me-2"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#people-circle" />
            </svg>
            <span className="text-lg">Staff</span>
          </Link>
        </li>
      </ul>

      {/* Push profile dropdown to bottom */}
      <hr className="text-white-50" />
      <div className="mt-auto dropdown">
        <a
          href="#"
          className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle text-white"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>Abhijeet</strong>
        </a>

        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          {/* <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li> */}
          <li>
            <Link to="/profile" className="dropdown-item">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link
              to="/register"
              className="dropdown-item"
              onClick={() => handleBtnClick("Home")}
            >
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
