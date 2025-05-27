import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const StaffTableHome = () => {
  const [StaffTable, setStaffTable] = useState([]);
  const navigate = useNavigate();
  const [StaffHeading, setStaffHeading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallStaff"
      );
      if (response.data.length > 0) {
        setStaffHeading(response.data[0].heading);
        setStaffTable(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deleteStaff/${userId}`
      );
      setStaffTable((prevUser) =>
        prevUser.filter((user) => user._id !== userId)
      );
      console.log(response);
      toast.error("Data Deleted Successfully!");
      navigate("/MandatoryTable");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>
        <div className="col-lg-7 col-md-7 col-sm-12 view-sec-case">
          <h2>
            {StaffHeading}{" "}
            <Link to={`/head-StaffTable-edit/${"67b458250a3b369728aeac1e"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
        </div>

          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-9 schoolinfo-table">          
          <Link to="/StaffTable-add">
            <button
              type="button"
              className="document-add"
            >
              <span>
                <i className="fa-solid fa-plus"></i> Add Staff{" "}
              </span>
            </button>
          </Link>
              <table>
                <thead>
                  <tr>
                    <th className="col-lg-1">Sr. No.</th>
                    <th className="col-lg-4">Information</th>
                    <th className="col-lg-3">Details</th>
                    <th className="col-lg-1">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {StaffTable.map((user, index) => (
                    <tr key={user._id}>
                      <td>
                        <h6>{index + 1}</h6>
                      </td>
                      <td>
                        <h6>{user.staffinformation}</h6>
                      </td>
                      <td>
                        <h6>{user.staffdetail}</h6>
                      </td>
                      <td>
                        <Link to={`/StaffTable-edit/` + user._id}>
                          <i
                            className="fa-regular fa-pen-to-square action-sec"
                            style={{ color: "darkblue" }}
                          ></i>
                        </Link>
                        <span onClick={() => deleteUser(user._id)}>
                          <i
                            className="fa-solid fa-trash-can action-sec"
                            style={{ color: "red" }}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
      <hr/>
            </div>
          </div>
      </div>
    </div>
  );
};

export const AddStaffTable = () => {
  const users = {
    staffinformation: "",
    staffdetail:""
  };
  const [StaffTableUser, setStaffTableUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setStaffTableUser({ ...StaffTableUser, [name]: value });
    console.log(StaffTableUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      staffinformation: StaffTableUser.staffinformation,
      staffdetail: StaffTableUser.staffdetail,
    };

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createStaff",
        formData
      );
      toast.success("Data Added Successfully!");
      navigate("/MandatoryTable");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container about-details">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 aboutuser">
          <Link to="/MandatoryTable">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>Add Data</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="staffinformation">Information</label>
              <input
                type="text"
                onChange={inputHandler}
                value={StaffTableUser.staffinformation}
                id="staffinformation"
                name="staffinformation"
                placeholder="Information"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="staffdetail">Details</label>
              <input
                type="text"
                onChange={inputHandler}
                value={StaffTableUser.staffdetail}
                id="staffdetail"
                name="staffdetail"
                placeholder="Details"
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


export const EditTopDataStaffTable = () => {
  const users = {
    heading: "",
  };

  const [StaffTableUser, setStaffTableUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setStaffTableUser({ ...StaffTableUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const StaffTableData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneStaff/${id}`
        );
        // console.log(response.data);
        setStaffTableUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    StaffTableData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: StaffTableUser.heading,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateStaff/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setStaffTableUser(response.data.data);
      navigate("/MandatoryTable");
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
              <Link to="/MandatoryTable">
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
                  value={StaffTableUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/MandatoryTable">
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

export const EditStaffTable = () => {
  const users = {
    staffinformation: "",
    staffdetail: "",
  };

  const [StaffTableUser, setStaffTableUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setStaffTableUser({ ...StaffTableUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneStaff/${id}`
        );
        // console.log(response.data);
        setStaffTableUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
        staffinformation: StaffTableUser.staffinformation,
        staffdetail:StaffTableUser.staffdetail
    }

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateStaff/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setStaffTableUser(response.data.data);
      navigate("/MandatoryTable");
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
              <Link to="/MandatoryTable">
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
                <label>Information</label>
                <input
                  type="text"
                  value={StaffTableUser.staffinformation}
                  onChange={changeHandler}
                  className="form-control"
                  name="staffinformation"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Details</label>
                <input
                  type="text"
                  value={StaffTableUser.staffdetail}
                  onChange={changeHandler}
                  className="form-control"
                  name="staffdetail"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/MandatoryTable">
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
