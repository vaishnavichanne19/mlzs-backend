import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";


export const SchoolCalendarHome = () => {
  const [SchoolCalendar, setSchoolCalendar] = useState([]);
  const [mainHeading, setMainHeading] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallSchoolCalendar");
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setSchoolCalendar(response.data.slice(1));
        setFilteredData(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://gosaviadvanceddentalclinic.com:8003/api/deleteSchoolCalendar/${userId}`);
      setSchoolCalendar((prevUser) => prevUser.filter((user) => user._id !== userId));
      setFilteredData((prevUser) => prevUser.filter((user) => user._id !== userId));
      toast.error("Data Deleted Successfully!");
      navigate("/SchoolCalendar");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  // Handle search filter
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = SchoolCalendar.filter(
      (item) =>
        item.month.toLowerCase().includes(lowercasedQuery) ||
        item.day.toLowerCase().includes(lowercasedQuery) ||
        item.date.includes(lowercasedQuery) ||
        item.event.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredData(filtered);
    setCurrentPage(1); 
  }, [searchQuery, SchoolCalendar]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container-fluid all-school-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>
        <div className="col-lg-7 col-md-7 col-sm-12 view-sec-case">
          <h2>
            {mainHeading}{" "}
            <Link to={`/head-SchoolCalendar-edit/6797a789b38ac1c232dec7a3`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
        </div>

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 schoolinfo-table">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Link to="/SchoolCalendar-add">
                <button type="button" className="calendar-add">
                  <span>
                    <i className="fa-solid fa-plus"></i> Add Calendar{" "}
                  </span>
                </button>
              </Link>
              <input
                type="text"
                className="calendar-input form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="calendar-select form-select"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={5}>5 entries</option>
                <option value={10}>10 entries</option>
                <option value={15}>15 entries</option>
              </select>
            </div>

            <table>
              <thead>
                <tr>
                  <th className="col-lg-1">Sr. No</th>
                  <th className="col-lg-1">Month</th>
                  <th className="col-lg-1">Day</th>
                  <th className="col-lg-2">Date</th>
                  <th className="col-lg-3">Event</th>
                  <th className="col-lg-1">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>
                        <h6>{user.month}</h6>
                      </td>
                      <td>
                        <h6>{user.day}</h6>
                      </td>
                      <td>
                        <h6>{user.date}</h6>
                      </td>
                      <td>
                        <p>{user.event}</p>
                      </td>
                      <td>
                        <Link to={`/SchoolCalendar-edit/${user._id}`}>
                          <i
                            title="Edit"
                            className="fa-regular fa-pen-to-square action-sec"
                            style={{ color: "darkblue" }}
                          ></i>
                        </Link>
                        <span onClick={() => deleteUser(user._id)}>
                          <i
                            title="Delete"
                            className="fa-solid fa-trash-can action-sec"
                            style={{ color: "red" }}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center">
              <span>
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, filteredData.length)} of{" "}
                {filteredData.length} entries
              </span>
              <div>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export const AddSchoolCalendar = () => {
    const users = {
      month: "",
      day: "",
      date: "",
      event: "",
    };
    const [SchoolCalendarUser, setSchoolCalendarUser] = useState(users);
    const navigate = useNavigate();


    const inputHandler = (e) => {
      const { name, value } = e.target;
      setSchoolCalendarUser({ ...SchoolCalendarUser, [name]: value });
      console.log(SchoolCalendarUser);
    };
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      const formData = {
        month: SchoolCalendarUser.month,
        day: SchoolCalendarUser.day,
        date: SchoolCalendarUser.date,
        event: SchoolCalendarUser.event,
      }
  
  
      try {
        const response = await axios.post(
          "http://gosaviadvanceddentalclinic.com:8003/api/createSchoolCalendar",
          formData
        );
        toast.success("Data Added Successfully!");;
        navigate("/SchoolCalendar");
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
  
    return (
      <div className="container about-details">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10 aboutuser">
            <Link to="/SchoolCalendar">
              <i className="fa-solid fa-xmark"></i>
            </Link>
            <h3>SchoolCalendar Details</h3>
            <form className="row" onSubmit={submitForm}>

              <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
                <label htmlFor="month">Month</label>
                <input
                  type="text"
                  onChange={inputHandler}
                  value={SchoolCalendarUser.month}
                  id="month"
                  name="month"
                  placeholder="Month"
                />
              </div>
              
              <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
                <label htmlFor="day">Day</label>
                <input
                  type="text"
                  onChange={inputHandler}
                  value={SchoolCalendarUser.day}
                  id="day"
                  name="day"
                  placeholder="Day"
                />
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
                <label htmlFor="date">Date</label>
                <input
                  type="text"
                  onChange={inputHandler}
                  value={SchoolCalendarUser.date}
                  id="date"
                  name="date"
                  placeholder="Date"
                />
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
                <label htmlFor="event">Event</label>
                <input
                  type="text"
                  onChange={inputHandler}
                  value={SchoolCalendarUser.event}
                  id="event"
                  name="event"
                  placeholder="Event"
                />
              </div>
              <div className="mobilesubmitform">
                <button type="submit">Add User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export const EditSchoolCalendar = () => {
    const users = {
      month: "",
      day: "",
      date: "",
      event: "",
    };
  
    const [SchoolCalendarUser, setSchoolCalendarUser] = useState(users);
    const { id } = useParams();
    const navigate = useNavigate();
  
    const changeHandler = (e) => {
      const { name, value } = e.target;
      setSchoolCalendarUser({ ...SchoolCalendarUser, [name]: value });
      // console.log(user);
    };
  
    useEffect(() => {
      const SchoolCalendarData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getoneSchoolCalendar/${id}`
          );
          // console.log(response.data);
          setSchoolCalendarUser(response.data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      SchoolCalendarData();
    }, [id]);
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      const formData = {
        month: SchoolCalendarUser.month,
        day: SchoolCalendarUser.day,
        date: SchoolCalendarUser.date,
        event: SchoolCalendarUser.event,
      }
  
      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updateSchoolCalendar/${id}`,
          formData
        );
        // console.log(response);
       toast.info("Data Updated Successfully!");
        setSchoolCalendarUser(response.data.data);
        navigate("/SchoolCalendar");
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
  
    return (
      <div
        className="modal fade show"
        id="update_heading"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        style={{
          display: "block",
          paddingRight: 18,
          marginTop: 90,
          paddingBottom: 50,
        }}
        aria-modal="true"
      >
        <div className="modal-dialog" role="document">
          <form onSubmit={submitForm}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit
                </h5>
                <Link to="/SchoolCalendar">
                <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    style={{
                      position: "relative",
                      left: "380px",
                      backgroundColor: "#064a76",
                      color: "white",
                      padding: 4,
                    }}
                  >
                    <span aria-hidden="true">
                      <i className="fa-solid fa-xmark close-btn"></i>
                    </span>
                  </button>
                </Link>
              </div>
  
              <div className="modal-body">
                <div className="form-group">
                  <label>Month</label>
                  <input
                    type="text"
                    value={SchoolCalendarUser.month}
                    onChange={changeHandler}
                    className="form-control"
                    name="month"
                  />
                  <br />
                </div>

                <div className="form-group">
                  <label>Day</label>
                  <input
                    type="text"
                    value={SchoolCalendarUser.day}
                    onChange={changeHandler}
                    className="form-control"
                    name="day"
                  />
                  <br />
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="text"
                    value={SchoolCalendarUser.date}
                    onChange={changeHandler}
                    className="form-control"
                    name="date"
                  />
                  <br />
                </div>

                <div className="form-group">
                  <label>Event</label>
                  <input
                    type="text"
                    value={SchoolCalendarUser.event}
                    onChange={changeHandler}
                    className="form-control"
                    name="event"
                  />
                  <br />
                </div>
              </div>
  
              <div className="modal-footer">
                <Link to="/SchoolCalendar">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </Link>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export const EditTopDataSchoolCalendar = () => {
    const users = {
      heading: "",
    };
  
    const [SchoolCalendarUser, setSchoolCalendarUser] = useState(users);
    const { id } = useParams();
    const navigate = useNavigate();
  
    const changeHandler = (e) => {
      const { name, value } = e.target;
      setSchoolCalendarUser({ ...SchoolCalendarUser, [name]: value });
      // console.log(user);
    };
  
    useEffect(() => {
      const SchoolInfoData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getoneSchoolCalendar/${id}`
          );
          // console.log(response.data);
          setSchoolCalendarUser(response.data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      SchoolInfoData();
    }, [id]);
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      const formData = {
        heading: SchoolCalendarUser.heading,
      }
  
      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updateSchoolCalendar/${id}`,
          formData
        );
        // console.log(response);
       toast.info("Data Updated Successfully!");
        setSchoolCalendarUser(response.data.data);
        navigate("/SchoolCalendar");
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
  
    return (
      <div
        className="modal fade show"
        id="update_heading"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        style={{
          display: "block",
          paddingRight: 18,
          marginTop: 90,
          paddingBottom: 50,
        }}
        aria-modal="true"
      >
        <div className="modal-dialog" role="document">
          <form onSubmit={submitForm}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit
                </h5>
                <Link to="/SchoolCalendar">
                <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    style={{
                      position: "relative",
                      left: "380px",
                      backgroundColor: "#064a76",
                      color: "white",
                      padding: 4,
                    }}
                  >
                    <span aria-hidden="true">
                      <i className="fa-solid fa-xmark close-btn"></i>
                    </span>
                  </button>
                </Link>
              </div>
  
              <div className="modal-body">
                <div className="form-group">
                  <label>Heading</label>
                  <input
                    type="text"
                    value={SchoolCalendarUser.heading}
                    onChange={changeHandler}
                    className="form-control"
                    name="heading"
                  />
                  <br />
                </div>
              </div>
  
              <div className="modal-footer">
                <Link to="/SchoolCalendar">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </Link>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };