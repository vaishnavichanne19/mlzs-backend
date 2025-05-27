import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";


export const AnnualHome = () => {
  const [Annual, setAnnual] = useState([]);
  const navigate = useNavigate();
  const [mainHeading, setMainHeading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallannual");
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setAnnual(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deleteannual/${userId}`
      );
      setAnnual((prevUser) =>
        prevUser.filter((user) => user._id !== userId)
      );
      console.log(response);
      toast.error("Data Deleted Successfully!");
      navigate("/Annual");
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
            <Link to={`/head-Annual-edit/${"679d06ec9c81aa949e2ed108"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
        </div>

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 schoolinfo-table">
            <Link to="/Annual-add">
              <button type="button" className="academic-add">
                <span>
                  <i className="fa-solid fa-plus"></i> Add{" "}
                </span>
              </button>
            </Link>
            <table>
              <thead>
                <tr>
                  <th className="col-lg-2">Annual Report</th>
                  <th className="col-lg-3">Heading</th>
                  <th className="col-lg-2">Action</th>
                </tr>
              </thead>

              <tbody>
              {Annual.map((user) => {
                return (
                <tr key={user._id}>
                  <td>
                  {" "}
                        <a
                          href={`http://gosaviadvanceddentalclinic.com:8003/pdfs/${user.annualpdf}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                           {user.annualpdf
                            ? user.annualpdf.replace(/^\d+_/, "")
                            : "Open PDF"}
                        </a>
                  </td>
                  <td><h6>{user.title}</h6></td>
                  <td>
                      <Link to={`/Annual-edit/` + user._id}>
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
                )})}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddAnnual = () => {
    const users = {
      title: "",
    };
    const [AnnualUser, setAnnualUser] = useState(users);
    const [Annualpdf, setAnnualpdf] = useState(null);
    const navigate = useNavigate();
  
    const inputHandler = (e) => {
      const { name, value } = e.target;
      setAnnualUser({ ...AnnualUser, [name]: value });
      console.log(AnnualUser);
    };
  
    const submitForm = async (e) => {
      e.preventDefault();
      if (!Annualpdf) {
        alert("Please select a valid PDF file before submitting.");
        return;
      }
      const formData = new FormData();
      formData.append("title", AnnualUser.title);
  
      if (Annualpdf) formData.append("annualpdf", Annualpdf);
  
      try {
        const response = await axios.post(
          "http://gosaviadvanceddentalclinic.com:8003/api/createannual",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Data Added Successfully!");;
        navigate("/Annual");
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

      // validation 
  const validateFile = (file) => {
    if (!file) return { isValid: false, message: "No file selected!" };
  
    const fileType = file.type;
    const fileSize = file.size;
  
    // Allowed file types and their max sizes
    const fileRules = {
      images: {
        types: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
        maxSize: 1 * 1024 * 1024, // 1MB
      },
      pdf: {
        types: ["application/pdf"],
        maxSize: 10 * 1024 * 1024, // 10MB
      },
      videos: {
        types: ["video/mp4", "video/webm", "video/ogg"],
        maxSize: 100 * 1024 * 1024, // 100MB
      },
    };
  
    // Determine file category
    let fileCategory = null;
    if (fileRules.images.types.includes(fileType)) fileCategory = "images";
    else if (fileRules.pdf.types.includes(fileType)) fileCategory = "pdf";
    else if (fileRules.videos.types.includes(fileType)) fileCategory = "videos";
  
    if (!fileCategory) {
      return { isValid: false, message: "Invalid file type!" };
    }
  
    if (fileSize > fileRules[fileCategory].maxSize) {
      return { 
        isValid: false, 
        message: `File size exceeds the limit! Max size for ${fileCategory} is ${fileRules[fileCategory].maxSize / (1024 * 1024)}MB.` 
      };
    }
  
    return { isValid: true, message: "File is valid!" };
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const validation = validateFile(file);
  
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }
    setAnnualpdf(file);
    console.log("File is valid. Proceed with upload...");
  };
  
    return (
      <div className="container about-details">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10 aboutuser">
            <Link to="/Annual">
              <i className="fa-solid fa-xmark"></i>
            </Link>
            <h3>Annual Details</h3>
            <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
                <label htmlFor="annualpdf"> Upload PDF </label>
                <input
                  type="file"
                  onChange={(e) => setAnnualpdf(e.target.files[0])}
                />
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
                <label htmlFor="title">Heading</label>
                <input
                  type="text"
                  onChange={inputHandler}
                  value={AnnualUser.title}
                  id="title"
                  name="title"
                  placeholder="Heading (Enter Date (e.g. [1/01/25]))"
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

  export const ViewAnnual = () => {
    const [AnnualUser, setAnnualUser] = useState({
    title: "",
      annualpdf: "",
    });
    const { id } = useParams();
  
    useEffect(() => {
      const AnnualData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getoneannual/${id}`
          );
          setAnnualUser(response.data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      AnnualData();
    }, [id]);
  
    return (
      <div className="container-fluid schoolinfo-view">
        <div className="row arpi">
          <div className="col-lg-3 col-md-3 col-sm-12"></div>
  
          <div className="col-lg-7 col-md-7 col-sm-12 view-sec">
            <Link to="/Annual" className="back-btn">
            <i className="fa-solid fa-xmark"></i>
            </Link>
            <br />
            <br />
  
            <h4>
              {AnnualUser.title}{" "}
              <Link to={`/Annual-edit/` + AnnualUser._id}>
                <i className="fa-regular fa-pen-to-square"></i>
              </Link>
            </h4>
            <br/>
            <img
              src={`http://gosaviadvanceddentalclinic.com:8003/images/${AnnualUser.annualimage}`}
              alt="Annual Image"
            />
          </div>
        </div>
      </div>
    );
  };

  export const EditTopDataAnnual = () => {
    const users = {
      heading: "",
    };
  
    const [AnnualUser, setAnnualUser] = useState(users);
    const { id } = useParams();
    const navigate = useNavigate();

    const changeHandler = (e) => {
      const { name, value } = e.target;
      setAnnualUser({ ...AnnualUser, [name]: value });
      // console.log(user);
    };
  
    useEffect(() => {
      const AnnualData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getoneannual/${id}`
          );
          // console.log(response.data);
          setAnnualUser(response.data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      AnnualData();
    }, [id]);
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      const formData = {
        heading: AnnualUser.heading,
      }
  
      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updateannual/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response);
       toast.info("Data Updated Successfully!");
        setAnnualUser(response.data.data);
        navigate("/Annual");
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
                <Link to="/Annual">
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
                    value={AnnualUser.heading}
                    onChange={changeHandler}
                    className="form-control"
                    name="heading"
                  />
                  <br />
                </div>
              </div>
  
              <div className="modal-footer">
                <Link to="/Annual">
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

  export const EditAnnual = () => {
    const users = {
      title: "",
    };
  
    const [AnnualPdf, setAnnualPdf] = useState(null);
    const [AnnualUser, setAnnualUser] = useState(users);
    const { id } = useParams();
    const navigate = useNavigate();

    const changeHandler = (e) => {
      const { name, value } = e.target;
      setAnnualUser({ ...AnnualUser, [name]: value });
      // console.log(user);
    };
  
    useEffect(() => {
      const SchoolInfoData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getoneannual/${id}`
          );
          // console.log(response.data);
          setAnnualUser(response.data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      SchoolInfoData();
    }, [id]);
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("title", AnnualUser.title);
      if (AnnualPdf) formData.append("annualpdf", AnnualPdf);
  
      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updateannual/${id}`,
          formData
        );
        // console.log(response);
       toast.info("Data Updated Successfully!");
        setAnnualUser(response.data.data);
        navigate("/Annual");
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
  
     // validation 
  const validateFile = (file) => {
    if (!file) return { isValid: false, message: "No file selected!" };
  
    const fileType = file.type;
    const fileSize = file.size;
  
    // Allowed file types and their max sizes
    const fileRules = {
      images: {
        types: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
        maxSize: 1 * 1024 * 1024, // 1MB
      },
      pdf: {
        types: ["application/pdf"],
        maxSize: 10 * 1024 * 1024, 
      },
      videos: {
        types: ["video/mp4", "video/webm", "video/ogg"],
        maxSize: 100 * 1024 * 1024, 
      },
    };
  
    // Determine file category
    let fileCategory = null;
    if (fileRules.images.types.includes(fileType)) fileCategory = "images";
    else if (fileRules.pdf.types.includes(fileType)) fileCategory = "pdf";
    else if (fileRules.videos.types.includes(fileType)) fileCategory = "videos";
  
    if (!fileCategory) {
      return { isValid: false, message: "Invalid file type!" };
    }
  
    if (fileSize > fileRules[fileCategory].maxSize) {
      return { 
        isValid: false, 
        message: `File size exceeds the limit! Max size for ${fileCategory} is ${fileRules[fileCategory].maxSize / (1024 * 1024)}MB.` 
      };
    }
  
    return { isValid: true, message: "File is valid!" };
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const validation = validateFile(file);
  
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }
    setAnnualPdf(file);
    console.log("File is valid. Proceed with upload...");
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
                <Link to="/Annual">
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
                    value={AnnualUser.title}
                    onChange={changeHandler}
                    className="form-control"
                    name="title"
                  />
                  <br />
                </div>

                <div className="form-group">
                  <label>Upload Document </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setAnnualPdf(e.target.files[0])}
                  />
                  <br/>
                </div>
              </div>
  
              <div className="modal-footer">
                <Link to="/Annual">
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