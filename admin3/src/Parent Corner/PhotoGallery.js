import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";


export const PhotoGalleryHome = () => {
  const [PhotoGallery, setPhotoGallery] = useState([]);
  const navigate = useNavigate();
  const [mainHeading, setMainHeading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallphotogallery");
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setPhotoGallery(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deletephotogallery/${userId}`
      );
      setPhotoGallery((prevUser) =>
        prevUser.filter((user) => user._id !== userId)
      );
      console.log(response);
      toast.error("Data Deleted Successfully!");
      navigate("/PhotoGallery");
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
            <Link to={`/head-PhotoGallery-edit/${"6799d414d06d6cc793c353ea"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
        </div>

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 schoolinfo-table">
            <Link to="/PhotoGallery-add">
              <button type="button" className="academic-add">
                <span>
                  <i className="fa-solid fa-plus"></i> Add{" "}
                </span>
              </button>
            </Link>
            <table>
              <thead>
                <tr>
                  <th className="col-lg-2">Photo Gallery Image</th>
                  <th className="col-lg-3">Heading</th>
                  <th className="col-lg-2">Date</th>
                  <th className="col-lg-2">Action</th>
                </tr>
              </thead>

              <tbody>
              {PhotoGallery.map((user) => {
                return (
                <tr key={user._id}>
                  <td>
                    {" "}
                    <img
                      src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.photo}`}
                      alt="Photo Gallery Image"
                      style={{ width: "100px", height: "50px" }}
                    />{" "}
                    <br />
                    <br />
                  </td>
                  <td><h6>{user.title}</h6></td>
                  <td><h6>{user.date}</h6></td>
                  <td>
                      <Link to={`/PhotoGallery-view/` + user._id}>
                        <i
                          title="View"
                          className="fa-regular fa-eye action-sec"
                          style={{ color: "blue" }}
                        ></i>
                      </Link>
                      <Link to={`/PhotoGallery-edit/` + user._id}>
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

export const AddPhotoGallery = () => {
    const users = {
      title: "",
      date: "",
    };
    const [PhotoGalleryUser, setPhotoGalleryUser] = useState(users);
    const [PhotoGalleryImage, setPhotoGalleryImage] = useState(null);
    const navigate = useNavigate();
  
    const inputHandler = (e) => {
      const { name, value } = e.target;
      setPhotoGalleryUser({ ...PhotoGalleryUser, [name]: value });
      console.log(PhotoGalleryUser);
    };
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      if (!PhotoGalleryImage) {
        alert("Please select a valid image file before submitting.");
        return;
      }

      const formData = new FormData();
      formData.append("title", PhotoGalleryUser.title);
      formData.append("date", PhotoGalleryUser.date);
  
      if (PhotoGalleryImage) formData.append("photo", PhotoGalleryImage);
  
      try {
        const response = await axios.post(
          "http://gosaviadvanceddentalclinic.com:8003/api/createphotogallery",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Data Added Successfully!");;
        navigate("/PhotoGallery");
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
        maxSize: 10 * 1024 * 1024, // 10MB
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
    setPhotoGalleryImage(file);
    console.log("File is valid. Proceed with upload...");
  };
  

    return (
      <div className="container about-details">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10 aboutuser">
            <Link to="/PhotoGallery">
              <i className="fa-solid fa-xmark"></i>
            </Link>
            <h3>Photo Gallery Details</h3>
            <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
                <label htmlFor="photo">Image <span style={{color:"red"}}>("Image must be at least Width-100% Height-250 pixels!")</span></label>
                <input
                  type="file"
                  accept="image/*"
                onChange={handleFileUpload}
                />
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
                <label htmlFor="title">Heading</label>
                <input
                  type="text"
                  onChange={inputHandler}
                  value={PhotoGalleryUser.title}
                  id="title"
                  name="title"
                  placeholder="Heading"
                />
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
                <label htmlFor="date">Date</label>
                <input
                  type="text"
                  onChange={inputHandler}
                  value={PhotoGalleryUser.date}
                  id="date"
                  name="date"
                  placeholder="Enter Date (e.g. 1 Jan 2025)"
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

  export const ViewPhotoGallery = () => {
    const [PhotoGalleryUser, setPhotoGalleryUser] = useState({
    title: "",
      date: "",
      photo: "",
    });
    const { id } = useParams();
  
    useEffect(() => {
      const PhotoGalleryData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getonephotogallery/${id}`
          );
          setPhotoGalleryUser(response.data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      PhotoGalleryData();
    }, [id]);
  
    return (
      <div className="container-fluid schoolinfo-view">
        <div className="row arpi">
          <div className="col-lg-3 col-md-3 col-sm-12"></div>
  
          <div className="col-lg-7 col-md-7 col-sm-12 view-sec">
            <Link to="/PhotoGallery" className="back-btn">
            <i className="fa-solid fa-xmark"></i>
            </Link>
            <br />
            <br />
  
            <h4>
              {PhotoGalleryUser.title}{" "}
              <Link to={`/PhotoGallery-edit/` + PhotoGalleryUser._id}>
                <i className="fa-regular fa-pen-to-square"></i>
              </Link>
            </h4>
            <h6>{PhotoGalleryUser.date}</h6>
            <br/>
            <img
              src={`http://gosaviadvanceddentalclinic.com:8003/images/${PhotoGalleryUser.photo}`}
              alt="PhotoGallery Image"
            />
          </div>
        </div>
      </div>
    );
  };

  export const EditTopDataPhotoGallery = () => {
    const users = {
      heading: "",
    };
  
    const [PhotoGalleryUser, setPhotoGalleryUser] = useState(users);
    const { id } = useParams();
    const navigate = useNavigate();

    const changeHandler = (e) => {
      const { name, value } = e.target;
      setPhotoGalleryUser({ ...PhotoGalleryUser, [name]: value });
      // console.log(user);
    };
  
    useEffect(() => {
      const PhotoGalleryData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getonephotogallery/${id}`
          );
          // console.log(response.data);
          setPhotoGalleryUser(response.data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      PhotoGalleryData();
    }, [id]);
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      const formData = {
        heading: PhotoGalleryUser.heading,
      }
  
      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updatephotogallery/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response);
       toast.info("Data Updated Successfully!");
        setPhotoGalleryUser(response.data.data);
        navigate("/PhotoGallery");
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
                <Link to="/PhotoGallery">
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
                    value={PhotoGalleryUser.heading}
                    onChange={changeHandler}
                    className="form-control"
                    name="heading"
                  />
                  <br />
                </div>
              </div>
  
              <div className="modal-footer">
                <Link to="/PhotoGallery">
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

  export const EditPhotoGallery = () => {
    const users = {
      title: "",
      date:""
    };
  
    const [PhotoGalleryImage, setPhotoGalleryImage] = useState(null);
    const [PhotoGalleryUser, setPhotoGalleryUser] = useState(users);
    const { id } = useParams();
    const navigate = useNavigate();

    const changeHandler = (e) => {
      const { name, value } = e.target;
      setPhotoGalleryUser({ ...PhotoGalleryUser, [name]: value });
      // console.log(user);
    };
  
    useEffect(() => {
      const SchoolInfoData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getonephotogallery/${id}`
          );
          // console.log(response.data);
          setPhotoGalleryUser(response.data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      SchoolInfoData();
    }, [id]);
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      if (!PhotoGalleryImage) {
        alert("Please select a valid image file before submitting.");
        return;
      }

      const formData = new FormData();
      formData.append("title", PhotoGalleryUser.title);
      formData.append("date", PhotoGalleryUser.date);
      if (PhotoGalleryImage) formData.append("photo", PhotoGalleryImage);
  
      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updatephotogallery/${id}`,
          formData
        );
        // console.log(response);
       toast.info("Data Updated Successfully!");
        setPhotoGalleryUser(response.data.data);
        navigate("/PhotoGallery");
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
        maxSize: 10 * 1024 * 1024, // 10MB
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
    setPhotoGalleryImage(file);
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
                <Link to="/PhotoGallery">
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
                    value={PhotoGalleryUser.title}
                    onChange={changeHandler}
                    className="form-control"
                    name="title"
                  />
                  <br />
                </div>

                <div className="form-group">
                  <label>Image <span style={{color:"red"}}>("Image must be at least Width-100% Height-250 pixels!")</span></label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                onChange={handleFileUpload}
                  />
                  <br/>
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="text"
                    value={PhotoGalleryUser.date}
                    onChange={changeHandler}
                    className="form-control"
                    name="date"
                  />
                  <br />
                </div>
              </div>
  
              <div className="modal-footer">
                <Link to="/PhotoGallery">
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