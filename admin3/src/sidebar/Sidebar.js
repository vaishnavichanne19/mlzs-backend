import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaMoneyCheckAlt,
  FaCreditCard,
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaCaretDown,
} from "react-icons/fa";
import { MdAnnouncement } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi2";
import { FaSchool } from "react-icons/fa6";
import { RiContactsBook2Fill } from "react-icons/ri";
import { MdEventNote } from "react-icons/md";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios"

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleLogout = async () => {
  await axios.get("http://localhost:8003/api/logout", { withCredentials: true });
  window.location.href = "/"; 
};


  return (
    <div className="dashboard-container">
      <div className="topbar">
        <div className="topbar-logo">Welcome, Admin</div>
        <div className="topbar-user" onClick={handleLogout}>LogOut</div>
      </div>

      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            {!isCollapsed && (
              // <img src="../mlzslogo.png" alt="logo" width={100} height={100} />
              <img
                src="../../new-mlzs-logo.png"
                alt="logo"
                width={100}
                height={100}
              />
            )}
          </div>
          <button className="toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="menu">
          <Link to="/">
            <li className="data">
              <FaFileInvoiceDollar />
              {!isCollapsed && <span>Dashboard</span>}
            </li>
          </Link>
          <li>
            <div className="menu-item" onClick={() => toggleDropdown(0)}>
              <FaHome />
              {!isCollapsed && <span>Master</span>}
              {!isCollapsed && <FaCaretDown className="dropdown-icon" />}
            </div>
            {!isCollapsed && activeDropdown === 0 && (
              <ul className="submenu">
                <Link to="/slider">
                  <li>Slider Image</li>
                </Link>
                <Link to="/homeabout">
                  <li>Home About Us</li>
                </Link>
                <Link to="/gallery">
                  <li>Gallery</li>
                </Link>
                <Link to="/litera">
                  <li>Litera Octava</li>
                </Link>
                <Link to="/SchoolInfo">
                  <li>School Programs</li>
                </Link>
              </ul>
            )}
          </li>

          <li>
            <div className="menu-item" onClick={() => toggleDropdown(1)}>
            <MdAnnouncement />
              {!isCollapsed && <span>About Us</span>}
              {!isCollapsed && <FaCaretDown className="dropdown-icon" />}
            </div>
            {!isCollapsed && activeDropdown === 1 && (
              <ul className="submenu">
                <Link to="/about">
                  <li>About Us</li>
                </Link>
                <Link to="/anthem">
                  <li>Zee Anthem</li>
                </Link>
                <Link to="/Director">
                  <li>Director Message</li>
                </Link>
                <Link to="/Principal">
                  <li>Principal Message</li>
                </Link>
                <Link to="/Philosophy">
                  <li>Our Philosophy</li>
                </Link>
                <Link to="/LiteraExp">
                  <li>Mount Litera Experience</li>
                </Link>
                <Link to="/Chairman">
                  <li>Chairman Message</li>
                </Link>
                <Link to="/RSD">
                  <li>RSD Message</li>
                </Link>
                <Link to="/Mission">
                  <li>Our Mission</li>
                </Link>
                <Link to="/Academic">
                  <li>Beyond Academics</li>
                </Link>
                <Link to="/Annual">
                  <li>Annual Report</li>
                </Link>
              </ul>
            )}
          </li>

          <li>
            <div className="menu-item" onClick={() => toggleDropdown(4)}>
            <HiAcademicCap />
              {!isCollapsed && <span>Academic</span>}
              {!isCollapsed && <FaCaretDown className="dropdown-icon" />}
            </div>
            {!isCollapsed && activeDropdown === 4 && (
              <ul className="submenu">
                  <Link to="/Pedagogy">
                  <li>Pedagogy</li>
                </Link>
                <Link to="/Curriculam">
                  <li>CBSE Curriculam</li>
                </Link>
                <Link to="/Library">
                  <li>Library</li>
                </Link>
                <Link to="/LearningSupport">
                  <li>Learning Support</li>
                </Link>
               
                <Link to="/SchoolCalendar">
                  <li>School Calendar</li>
                </Link>
                <Link to="/SchoolCircular">
                  <li>School Notifications & Circular</li>
                </Link>
                <Link to="/HouseSystem">
                  <li>House System</li>
                </Link>
                <Link to="/PhotoGallery">
                  <li>Photo Gallery</li>
                </Link>
                <Link to="/VideoGallery">
                  <li>Video Gallery</li>
                </Link>
                {/* <Link to="#">
                  <li>Media Gallery</li>
                </Link> */}
                <Link to="/Achievement">
                  <li>Accolades & Achivements</li>
                </Link>
                <Link to="/Learning">
                  <li>Experiential Learning</li>
                </Link>
             
              </ul>
            )}
          </li>

          <li>
            <div className="menu-item" onClick={() => toggleDropdown(3)}>
            <FaSchool />
              {!isCollapsed && <span>Admission</span>}
              {!isCollapsed && <FaCaretDown className="dropdown-icon" />}
            </div>
            {!isCollapsed && activeDropdown === 3 && (
              <ul className="submenu">
                <Link to="/Guidelines">
                  <li>Guidelines & Procedures</li>
                </Link>
                <Link to="/WithdrawalPolicy">
                  <li>Withdrawal Policy</li>
                </Link>
                <Link to="/Rules">
                  <li>School Rules & Regulations</li>
                </Link>
                <Link to="/Enquiry">
                  <li>Enquiry Form</li>
                </Link>
              </ul>
            )}
          </li>

          <Link to="/NewAndEvent">
            <li className="data">
            <MdEventNote />
              {!isCollapsed && <span>News & Events</span>}
            </li>
          </Link>

          <Link to="/MandatoryTable">
            <li className="data">
              <FaFileInvoiceDollar />
              {!isCollapsed && <span>Mandatory Public Disclosure</span>}
            </li>
          </Link>

          <li>
            <div className="menu-item" onClick={() => toggleDropdown(5)}>
            <RiContactsBook2Fill />
              {!isCollapsed && <span>Contact</span>}
              {!isCollapsed && <FaCaretDown className="dropdown-icon" />}
            </div>
            {!isCollapsed && activeDropdown === 5 && (
              <ul className="submenu">
                <Link to="/Contact">
                  <li>Contact</li>
                </Link>
                <Link to="/Career">
                  <li>Career</li>
                </Link>
              </ul>
            )}
          </li>

          <li>
            <div className="menu-item" onClick={() => toggleDropdown(2)}>
              <FaCalendarCheck />
              {!isCollapsed && <span>My MLZS</span>}
              {!isCollapsed && <FaCaretDown className="dropdown-icon" />}
            </div>
            {!isCollapsed && activeDropdown === 2 && (
              <ul className="submenu">
                <Link to="/Aboutmlzs">
                  <li>About MLZS</li>
                </Link>
                <Link to="/Primary">
                <li>Academics: Primary</li>
                </Link>
                <Link to="/HiTech">
                  <li>Hi-Tech Classes</li>
                </Link>
                <Link to="/Campus">
                  <li>Our Campus</li>
                </Link>
                <Link to="/SchoolTimings">
                  <li>School Timing</li>
                </Link>
                <Link to="/PrePrimary">
                <li>Academics: Pre Primary</li>
                </Link>
                <Link to="/NewAndEvent">
                <li>School Event</li>
                </Link>
                <Link to="/Faculty">
                  <li>Faculty</li>
                </Link>
                <Link to="/Sport">
                  <li>Sport</li>
                </Link>
              </ul>
            )}
          </li>

          <Link to="/Calendar">
            <li className="data">
            <IoCalendarNumberSharp />
              {!isCollapsed && <span>Calendar</span>}
            </li>
          </Link>

          <Link to="/getintouchform">
            <li className="data">
              <FaFileInvoiceDollar />
              {!isCollapsed && <span>Get In Touch Form</span>}
            </li>
          </Link>

          <Link to="/Enquiryform">
            <li className="data">
              <FaFileInvoiceDollar />
              {!isCollapsed && <span>Enquiry Form</span>}
            </li>
          </Link>

          <Link to="/contactform">
            <li className="data">
              <FaFileInvoiceDollar />
              {!isCollapsed && <span>Contact Form</span>}
            </li>
          </Link>

          <Link to="#">
            <li className="data">
              <FaFileInvoiceDollar />
              {!isCollapsed && <span>Calendar</span>}
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
