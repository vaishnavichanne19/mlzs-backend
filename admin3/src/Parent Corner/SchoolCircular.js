import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const SchoolCircularHome = () => {
  const [SchoolCircular, setSchoolCircular] = useState([]);
  const navigate = useNavigate();
  const [mainHeading, setMainHeading] = useState("");
  const [Description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallschoolcircular"
      );
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setDescription(response.data[0].description);
        setSchoolCircular(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deleteschoolcircular/${userId}`
      );
      setSchoolCircular((prevUser) =>
        prevUser.filter((user) => user._id !== userId)
      );
      console.log(response);
      toast.error("Data Deleted Successfully!");
      navigate("/SchoolCircular");
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
            <Link
              to={`/head-SchoolCircular-edit/${"67b2cffd8cb5ab331442e43d"}`}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
          <h5>{Description}</h5>
        </div>

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 schoolinfo-table">
            <Link to="/SchoolCircular-add">
              <button type="button" className="academic-add">
                <span>
                  <i className="fa-solid fa-plus"></i> Add{" "}
                </span>
              </button>
            </Link>
            <table>
              <thead>
                <tr>
                  <th className="col-lg-1">Title</th>
                  <th className="col-lg-3">School Circular Image</th>
                  <th className="col-lg-2">School Circular Pdf</th>
                  <th className="col-lg-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {SchoolCircular.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>
                        <h6>{user.title}</h6>
                      </td>
                      <td>
                        {" "}
                        <img
                          src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.circularimage}`}
                          alt="School Logo"
                          style={{ width: "100px", height: "50px" }}
                        />{" "}
                        <br />
                        <br />
                      </td>
                      <td>
                        {" "}
                        <a
                          href={`http://gosaviadvanceddentalclinic.com:8003/pdfs/${user.circularpdf}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user.circularpdf
                            ? user.circularpdf.replace(/^\d+_/, "")
                            : "Open PDF"}
                        </a>
                      </td>
                      <td>
                        <Link to={`/SchoolCircular-view/` + user._id}>
                          <i
                            title="View"
                            className="fa-regular fa-eye action-sec"
                            style={{ color: "blue" }}
                          ></i>
                        </Link>
                        <Link to={`/SchoolCircular-edit/` + user._id}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddSchoolCircular = () => {
  const users = {
    title: "",
  };
  const [SchoolCircularUser, setSchoolCircularUser] = useState(users);
  const [SchoolCircularimage, setSchoolCircularimage] = useState(null);
  const [SchoolCircularpdf, setSchoolCircularpdf] = useState(null);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setSchoolCircularUser({ ...SchoolCircularUser, [name]: value });
  };

  // Separate file validation
  const validateImage = (file) => {
    if (!file) return { isValid: false, message: "No image selected!" };

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 1 * 1024 * 1024; // 1MB

    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, message: "Invalid image format!" };
    }

    if (file.size > maxSize) {
      return { isValid: false, message: "Image size exceeds 1MB!" };
    }

    return { isValid: true, message: "Image is valid!" };
  };

  const validatePdf = (file) => {
    if (!file) return { isValid: false, message: "No PDF selected!" };

    const allowedTypes = ["application/pdf"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, message: "Invalid PDF format!" };
    }

    if (file.size > maxSize) {
      return { isValid: false, message: "PDF size exceeds 5MB!" };
    }

    return { isValid: true, message: "PDF is valid!" };
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const validation = validateImage(file);

    if (!validation.isValid) {
      alert(validation.message);
      return;
    }
    setSchoolCircularimage(file);
  };

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    const validation = validatePdf(file);

    if (!validation.isValid) {
      alert(validation.message);
      return;
    }
    setSchoolCircularpdf(file);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!SchoolCircularimage) {
      alert("Please select a valid image file before submitting.");
      return;
    }

    if (!SchoolCircularpdf) {
      alert("Please select a valid PDF file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("title", SchoolCircularUser.title);
    formData.append("circularimage", SchoolCircularimage);
    formData.append("circularpdf", SchoolCircularpdf);

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createschoolcircular",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Data Added Successfully!");
      navigate("/SchoolCircular");
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
          <Link to="/SchoolCircular">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>School Circular Details</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                onChange={inputHandler}
                value={SchoolCircularUser.title}
                id="title"
                name="title"
                placeholder="Title"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="circularimage">School Circular Image <span style={{color:"red"}}>("Image must be at least 200x200 pixels!")</span></label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="circularpdf">School Circular Pdf</label>
              <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
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


export const ViewSchoolCircular = () => {
  const [SchoolCircularUser, setSchoolCircularUser] = useState({
    title: "",
    circularpdf: "",
    circularimage: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const SchoolCircularData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneschoolcircular/${id}`
        );
        setSchoolCircularUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolCircularData();
  }, [id]);

  return (
    <div className="container-fluid schoolinfo-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>

        <div className="col-lg-7 col-md-7 col-sm-12 view-sec">
          <Link to="/SchoolCircular" className="back-btn">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <br />
          <br />

          <h4>
            {SchoolCircularUser.title}{" "}
            <Link to={`/SchoolCircular-edit/` + SchoolCircularUser._id}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h4>
          <a
            href={`http://gosaviadvanceddentalclinic.com:8003/pdfs/${SchoolCircularUser.circularpdf}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open PDF
          </a>
          <br />
          <br />
          <img
            src={`http://gosaviadvanceddentalclinic.com:8003/images/${SchoolCircularUser.circularimage}`}
            alt="School Circular Image"
          />
        </div>
      </div>
    </div>
  );
};

export const EditSchoolCircular = () => {
  const users = {
    title: "",
  };

  const [SchoolCircularImage, setSchoolCircularImage] = useState(null);
  const [SchoolCircularPdf, setSchoolCircularPdf] = useState(null);
  const [SchoolCircularUser, setSchoolCircularUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSchoolCircularUser({ ...SchoolCircularUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolCircularData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneschoolcircular/${id}`
        );
        // console.log(response.data);
        setSchoolCircularUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolCircularData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", SchoolCircularUser.title);
    if (SchoolCircularImage)
      formData.append("circularimage", SchoolCircularImage);
    if (SchoolCircularPdf) formData.append("circularpdf", SchoolCircularPdf);
    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateschoolcircular/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setSchoolCircularUser(response.data.data);
      navigate("/SchoolCircular");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

    // Separate file validation
    const validateImage = (file) => {
      if (!file) return { isValid: false, message: "No image selected!" };
  
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      const maxSize = 1 * 1024 * 1024; // 1MB
  
      if (!allowedTypes.includes(file.type)) {
        return { isValid: false, message: "Invalid image format!" };
      }
  
      if (file.size > maxSize) {
        return { isValid: false, message: "Image size exceeds 1MB!" };
      }
  
      return { isValid: true, message: "Image is valid!" };
    };
  
    const validatePdf = (file) => {
      if (!file) return { isValid: false, message: "No PDF selected!" };
  
      const allowedTypes = ["application/pdf"];
      const maxSize = 10 * 1024 * 1024; // 10MB
  
      if (!allowedTypes.includes(file.type)) {
        return { isValid: false, message: "Invalid PDF format!" };
      }
  
      if (file.size > maxSize) {
        return { isValid: false, message: "PDF size exceeds 5MB!" };
      }
  
      return { isValid: true, message: "PDF is valid!" };
    };
  
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const validation = validateImage(file);
  
      if (!validation.isValid) {
        alert(validation.message);
        return;
      }
      setSchoolCircularImage(file);
    };
  
    const handlePdfUpload = (event) => {
      const file = event.target.files[0];
      const validation = validatePdf(file);
  
      if (!validation.isValid) {
        alert(validation.message);
        return;
      }
      setSchoolCircularPdf(file);
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
              <Link to="/SchoolCircular">
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
                <label>Title</label>
                <input
                  type="text"
                  value={SchoolCircularUser.title}
                  onChange={changeHandler}
                  className="form-control"
                  name="title"
                />
                <br />
              </div>

              <div className="form-group">
                <label>School Circular Image <span style={{color:"red"}}>("Image must be at least 200x200 pixels!")</span></label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*" 
                  onChange={handleImageUpload}
                />
                <br />
              </div>

              <div className="form-group">
                <label>School Circular Pdf</label>
                <input
                  type="file"
                  className="form-control"
                  accept="application/pdf"
                   onChange={handlePdfUpload}
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/SchoolCircular">
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

export const EditTopDataSchoolCircular = () => {
  const users = {
    heading: "",
    description: "",
  };

  const [SchoolCircularUser, setSchoolCircularUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSchoolCircularUser({ ...SchoolCircularUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneschoolcircular/${id}`
        );
        // console.log(response.data);
        setSchoolCircularUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: SchoolCircularUser.heading,
      description: SchoolCircularUser.description,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateschoolcircular/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setSchoolCircularUser(response.data.data);
      navigate("/SchoolCircular");
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
              <Link to="/SchoolCircular">
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
                  value={SchoolCircularUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={SchoolCircularUser.description}
                  onChange={changeHandler}
                  className="form-control"
                  name="description"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/SchoolCircular">
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
