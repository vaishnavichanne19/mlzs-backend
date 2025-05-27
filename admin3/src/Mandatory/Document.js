import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const DocumentHome = () => {
  const [Document, setDocument] = useState([]);
  const navigate = useNavigate();
  const [DocumentHeading, setDocumentHeading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getalldocument"
      );
      if (response.data.length > 0) {
        setDocumentHeading(response.data[0].heading);
        setDocument(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deletedocument/${userId}`
      );
      setDocument((prevUser) =>
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
            {DocumentHeading}{" "}
            <Link
              to={`/head-Document-edit/${"67b43298eec0445c806c8c1c"}`}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
        </div>

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 schoolinfo-table">
            <Link to="/Document-add">
              <button type="button" className="document-add">
                <span>
                  <i className="fa-solid fa-plus"></i> Add Document{" "}
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
                {Document.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>
                        <h6>{index + 1}</h6>
                      </td>
                      <td>
                        {user.document}
                      </td>
                      <td>
                        {" "}
                        <a
                          href={`http://gosaviadvanceddentalclinic.com:8003/pdfs/${user.documentpdf}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                           {user.documentpdf
                            ? user.documentpdf.replace(/^\d+_/, "")
                            : "Open PDF"}
                        </a>
                      </td>
                      <td>
                        <Link to={`/Document-edit/` + user._id}>
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
        <hr/>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddDocument = () => {
  const users = {
    document: "",
  };
  const [DocumentUser, setDocumentUser] = useState(users);
  const [Documentpdf, setDocumentpdf] = useState(null);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setDocumentUser({ ...DocumentUser, [name]: value });
    console.log(DocumentUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("document", DocumentUser.document);

    if (Documentpdf) {
      formData.append("documentpdf", Documentpdf);
    }

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createdocument",
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
              <label htmlFor="document">Document</label>
              <input
                type="text"
                onChange={inputHandler}
                value={DocumentUser.document}
                id="document"
                name="document"
                placeholder="Document"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="documentpdf">Upload Document</label>
              <input
                type="file"
                onChange={(e) => setDocumentpdf(e.target.files[0])}
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

export const EditDocument = () => {
  const users = {
    document: "",
  };

  const [DocumentPdf, setDocumentPdf] = useState(null);
  const [DocumentUser, setDocumentUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDocumentUser({ ...DocumentUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const DocumentData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonedocument/${id}`
        );
        // console.log(response.data);
        setDocumentUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    DocumentData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("document", DocumentUser.document);
   
    if (DocumentPdf) formData.append("documentpdf", DocumentPdf);
    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatedocument/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setDocumentUser(response.data.data);
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
                <label>Document</label>
                <input
                  type="text"
                  value={DocumentUser.document}
                  onChange={changeHandler}
                  className="form-control"
                  name="document"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Upload Document</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setDocumentPdf(e.target.files[0])}
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

export const EditTopDataDocument = () => {
  const users = {
    heading: "",
  };

  const [DocumentUser, setDocumentUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDocumentUser({ ...DocumentUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonedocument/${id}`
        );
        // console.log(response.data);
        setDocumentUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: DocumentUser.heading
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatedocument/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setDocumentUser(response.data.data);
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
                  value={DocumentUser.heading}
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
