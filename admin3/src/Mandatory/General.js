import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const GeneralTableHome = () => {
  const [GeneralTable, setGeneralTable] = useState([]);
  const navigate = useNavigate();
  const [mainHeading, setMainHeading] = useState("");
  const [Heading, setHeading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallgeneral"
      );
      if (response.data.length > 0) {
        setMainHeading(response.data[0].mainheading);
        setHeading(response.data[0].heading);
        setGeneralTable(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deletegeneral/${userId}`
      );
      setGeneralTable((prevUser) =>
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
    <div className="container-fluid all-school-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>
        <div className="col-lg-7 col-md-7 col-sm-12 view-sec-case">
          <h2>
            {mainHeading}{" "}
            <Link to={`/head-GeneralTable-edit/${"67b42a3358e952ff67c36090"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
          <h5>{Heading}</h5>
        </div>

          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-9 schoolinfo-table">          
          <Link to="/GeneralTable-add">
            <button
              type="button"
              className="document-add"
            >
              <span>
                <i className="fa-solid fa-plus"></i> Add General{" "}
              </span>
            </button>
          </Link>
              <table>
                <thead>
                  <tr>
                    <th className="col-lg-1">Sr. No.</th>
                    <th className="col-lg-3">Information</th>
                    <th className="col-lg-4">Details</th>
                    <th className="col-lg-1">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {GeneralTable.map((user, index) => (
                    <tr key={user._id}>
                      <td>
                        <h6>{index + 1}</h6>
                      </td>
                      <td>
                        <h6>{user.information}</h6>
                      </td>
                      <td>
                        <h6>{user.detail}</h6>
                      </td>
                      <td>
                        <Link to={`/GeneralTable-edit/` + user._id}>
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

export const AddGeneralTable = () => {
  const users = {
    information: "",
    detail:""
  };
  const [GeneralTableUser, setGeneralTableUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setGeneralTableUser({ ...GeneralTableUser, [name]: value });
    console.log(GeneralTableUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      information: GeneralTableUser.information,
      detail: GeneralTableUser.detail,
    };

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/creategeneral",
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
              <label htmlFor="information">Information</label>
              <input
                type="text"
                onChange={inputHandler}
                value={GeneralTableUser.information}
                id="information"
                name="information"
                placeholder="Information"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="detail">Details</label>
              <input
                type="text"
                onChange={inputHandler}
                value={GeneralTableUser.detail}
                id="detail"
                name="detail"
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


export const EditTopDataGeneralTable = () => {
  const users = {
    mainheading:"",
    heading: "",
  };

  const [GeneralTableUser, setGeneralTableUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setGeneralTableUser({ ...GeneralTableUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const GeneralTableData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonegeneral/${id}`
        );
        // console.log(response.data);
        setGeneralTableUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    GeneralTableData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
        mainheading: GeneralTableUser.mainheading,
      heading: GeneralTableUser.heading,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updategeneral/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setGeneralTableUser(response.data.data);
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
                <label>Main Heading</label>
                <input
                  type="text"
                  value={GeneralTableUser.mainheading}
                  onChange={changeHandler}
                  className="form-control"
                  name="mainheading"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Heading</label>
                <input
                  type="text"
                  value={GeneralTableUser.heading}
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

export const EditGeneralTable = () => {
  const users = {
    information: "",
    detail: "",
  };

  const [GeneralTableUser, setGeneralTableUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setGeneralTableUser({ ...GeneralTableUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonegeneral/${id}`
        );
        // console.log(response.data);
        setGeneralTableUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
        information: GeneralTableUser.information,
        detail:GeneralTableUser.detail
    }

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updategeneral/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setGeneralTableUser(response.data.data);
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
                  value={GeneralTableUser.information}
                  onChange={changeHandler}
                  className="form-control"
                  name="information"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Details</label>
                <input
                  type="text"
                  value={GeneralTableUser.detail}
                  onChange={changeHandler}
                  className="form-control"
                  name="detail"
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
