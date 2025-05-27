import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const ResultHome = () => {
  const [Result, setResult] = useState([]);
  const navigate = useNavigate();
  const [ResultHeading, setResultHeading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallresult"
      );
      if (response.data.length > 0) {
        setResultHeading(response.data[0].heading);
        setResult(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deleteResult/${userId}`
      );
      setResult((prevUser) => prevUser.filter((user) => user._id !== userId));
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
            {ResultHeading}{" "}
            <Link to={`/head-Result-edit/${"67b43991b1717450d94cb2df"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
        </div>

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 schoolinfo-table">
            <Link to="/Result-add">
              <button type="button" className="document-add">
                <span>
                  <i className="fa-solid fa-plus"></i> Add Result{" "}
                </span>
              </button>
            </Link>
            <table>
              <thead>
                <tr>
                  <th className="col-lg-2">Sr. NO</th>
                  <th className="col-lg-3">Documents / Information</th>
                  <th className="col-lg-2">Upload Documents</th>
                  <th className="col-lg-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {Result.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>
                        <h6>{index + 1}</h6>
                      </td>
                      <td>{user.resultdocument}</td>
                      <td>
                        <a
                          href={`http://gosaviadvanceddentalclinic.com:8003/pdfs/${user.resultpdf}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user.resultpdf
                            ? user.resultpdf.replace(/^\d+_/, "")
                            : "Open PDF"}
                        </a>
                      </td>

                      <td>
                        <Link to={`/Result-edit/` + user._id}>
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
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddResult = () => {
  const users = {
    resultdocument: "",
  };
  const [ResultUser, setResultUser] = useState(users);
  const [Resultpdf, setResultpdf] = useState(null);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setResultUser({ ...ResultUser, [name]: value });
    console.log(ResultUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resultdocument", ResultUser.resultdocument);

    if (Resultpdf) {
      formData.append("resultpdf", Resultpdf);
    }

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createresult",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Data Added Successfully!");
      navigate("/MandatoryTable");
    } catch (error) {
      console.error("There was an error!", error);
      toast.error("File upload failed.");
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
              <label htmlFor="resultdocument">Documents / Information</label>
              <input
                type="text"
                onChange={inputHandler}
                value={ResultUser.resultdocument}
                id="resultdocument"
                name="resultdocument"
                placeholder="Documents / Information"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="resultpdf">Upload Documents </label>
              <input
                type="file"
                onChange={(e) => setResultpdf(e.target.files[0])}
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

export const EditResult = () => {
  const users = {
    resultdocument: "",
  };

  const [ResultPdf, setResultPdf] = useState(null);
  const [ResultUser, setResultUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setResultUser({ ...ResultUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const ResultData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneresult/${id}`
        );
        // console.log(response.data);
        setResultUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    ResultData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resultdocument", ResultUser.resultdocument);

    if (ResultPdf) formData.append("resultpdf", ResultPdf);
    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateresult/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setResultUser(response.data.data);
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
      <div className="modal-dialog" role="Result">
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
                <label>Documents / Information</label>
                <input
                  type="text"
                  value={ResultUser.resultdocument}
                  onChange={changeHandler}
                  className="form-control"
                  name="resultdocument"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Upload Documents</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setResultPdf(e.target.files[0])}
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

export const EditTopDataResult = () => {
  const users = {
    heading: "",
  };

  const [ResultUser, setResultUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setResultUser({ ...ResultUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneresult/${id}`
        );
        // console.log(response.data);
        setResultUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: ResultUser.heading,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateresult/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setResultUser(response.data.data);
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
      <div className="modal-dialog" role="Result">
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
                  value={ResultUser.heading}
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
