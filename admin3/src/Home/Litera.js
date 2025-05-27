import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const LiteraHome = () => {
  const [LiteraUser, setLiteraUser] = useState([]);
  const navigate = useNavigate();
  const [mainHeading, setMainHeading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getalllitera"
      );
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setLiteraUser(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 slider-home">
          <div>
            <h3 className="slider-heading">
              {mainHeading}{" "}
              <Link to={`/litera-heading-edit/${"67b970857cc303037f20f937"}`}>
                <i className="fa-regular fa-pen-to-square"></i>
              </Link>
            </h3>
            {/* <Link to="/litera-add">
              <button className="add-button">
                <i class="fa-solid fa-plus"></i> Add Litera
              </button>
            </Link> */}
          </div>
          <div className="row litera-details">
            {LiteraUser.map((user) => {
              return (
                <div className="col-lg-12 slider-image">
                  <video
                    src={`http://gosaviadvanceddentalclinic.com:8003/videos/${user.literavideo}`}
                    width="400"
                    height="230"
                    controls
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="icons">
                    <ul>
                      <li>
                        <Link to={`/litera-edit/` + user._id}>
                          <i
                            className="fa-regular fa-pen-to-square"
                            title="Edit"
                          ></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddLitera = () => {
  const [LiteraImage, setLiteraImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (LiteraImage) {
      formData.append("literavideo", LiteraImage);
    }

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createlitera",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Data Added Successfully!");
      navigate("/litera");
    } catch (error) {
      toast.error("There was an error adding the Litera!");
      console.error("Error:", error);
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
        message: `File size exceeds the limit! Max size for ${fileCategory} is ${
          fileRules[fileCategory].maxSize / (1024 * 1024)
        }MB.`,
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
    setLiteraImage(file);
    console.log("File is valid. Proceed with upload...");
  };

  return (
    <div className="container-fluid popup-container">
      <div className="popup-content">
        <div className="adduser">
          <Link to="/litera">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h4>Add Litera Image</h4>
          <hr />
          <form className="row" onSubmit={submitForm}>
            <p>Max Upload Image Size - 100MB</p>
            <div className="col-lg-6 col-md-6 col-sm-12 inputform">
              <input type="file" onChange={handleFileUpload} />
            </div>
            <div className="submitform">
              {error && <small style={{ color: "red" }}>{error}</small>}
              <button type="submit" disabled={!LiteraImage || error}>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const EditLitera = () => {
  const [Literavideo, setLiteravideo] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const editData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonelitera/${id}`
        );
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    editData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (Literavideo) {
      formData.append("literavideo", Literavideo);
    }
    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatelitera/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.info("Data Updated Successfully!");
      navigate("/litera");
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
        message: `File size exceeds the limit! Max size for ${fileCategory} is ${
          fileRules[fileCategory].maxSize / (1024 * 1024)
        }MB.`,
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
    setLiteravideo(file);
    console.log("File is valid. Proceed with upload...");
  };

  return (
    <div className="container-fluid popup-container">
      <div className="popup-content">
        <div className="adduser">
          <Link to="/litera">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h4>Update Litera Video </h4>
          <hr />
          <form className="row" onSubmit={submitForm}>
            <p style={{ color: "red" }}>
              Video must be at least Width-100% Height-500 pixels!
            </p>
            <div className="col-lg-6 col-md-6 col-sm-12 inputform">
              <input type="file" accept="video/*" onChange={handleFileUpload} />
            </div>
            <div className="submitform">
              {error && <small style={{ color: "red" }}>{error}</small>}
              <br />
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const EditLiteraHeading = () => {
  const users = {
    heading: "",
  };

  const [LiteraUser, setLiteraUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLiteraUser({ ...LiteraUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonelitera/${id}`
        );
        // console.log(response.data);
        setLiteraUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", LiteraUser.heading);

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatelitera/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setLiteraUser(response.data.data);
      navigate("/litera");
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
              <Link to="/litera">
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
                  value={LiteraUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/litera">
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
