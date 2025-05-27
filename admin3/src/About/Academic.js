import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";


export const AcademicHome = () => {
  const [Academic, setAcademic] = useState([]);
  const navigate = useNavigate();
  const [mainHeading, setMainHeading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallacademic");
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setAcademic(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deleteacademic/${userId}`
      );
      setAcademic((prevUser) =>
        prevUser.filter((user) => user._id !== userId)
      );
      console.log(response);
      toast.error("Data Deleted Successfully!");
      navigate("/Academic");
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
            <Link to={`/head-Academic-edit/${"6794be19e52717ab5d372dd7"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
        </div>

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 schoolinfo-table">
            <Link to="/Academic-add">
              <button type="button" className="academic-add">
                <span>
                  <i className="fa-solid fa-plus"></i> Add{" "}
                </span>
              </button>
            </Link>
            <table>
              <thead>
                <tr>
                  <th className="col-lg-1">Academic Image</th>
                  <th className="col-lg-1">Title</th>
                  <th className="col-lg-5">Description</th>
                  <th className="col-lg-2">Action</th>
                </tr>
              </thead>

              <tbody>
              {Academic.map((user) => {
                return (
                <tr key={user._id}>
                  <td>
                    {" "}
                    <img
                      src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.academicimage}`}
                      alt="School Logo"
                      style={{ width: "100px", height: "50px" }}
                    />{" "}
                    <br />
                    <br />
                  </td>
                  <td><h6>{user.title}</h6></td>
                  <td><p dangerouslySetInnerHTML={{__html: user.description}}></p></td>
                  <td>
                      <Link to={`/Academic-view/` + user._id}>
                        <i
                          title="View"
                          className="fa-regular fa-eye action-sec"
                          style={{ color: "blue" }}
                        ></i>
                      </Link>
                      <Link to={`/Academic-edit/` + user._id}>
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

export const AddAcademic = () => {
    const users = {
      description: "",
      title:"",
    };
    const [AcademicUser, setAcademicUser] = useState(users);
    const [Academicimage, setAcademicimage] = useState(null);
    const navigate = useNavigate();
    const [editorLoaded, setEditorLoaded] = useState(false);
  
    // ✅ Load CKEditor dynamically
    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://cdn.ckeditor.com/4.21.0/standard/ckeditor.js";
      script.async = true;
      script.onload = () => setEditorLoaded(true);
      document.body.appendChild(script);
  
      return () => {
        if (window.CKEDITOR) {
          Object.keys(window.CKEDITOR.instances).forEach((instance) => {
            window.CKEDITOR.instances[instance].destroy(true);
          });
        }
      };
    }, []);
  
    // ✅ Initialize CKEditor when loaded
    useEffect(() => {
      if (editorLoaded && !window.CKEDITOR.instances.editor) {
        window.CKEDITOR.replace("editor", {
          height: 200,
        });
  
        window.CKEDITOR.instances.editor.on("change", function () {
          setAcademicUser((prev) => ({
            ...prev,
            description: window.CKEDITOR.instances.editor.getData(),
          }));
        });
      }
    }, [editorLoaded]);

    const inputHandler = (e) => {
      const { name, value } = e.target;
      setAcademicUser({ ...AcademicUser, [name]: value });
      console.log(AcademicUser);
    };
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      if (!Academicimage) {
        alert("Please select a valid image file before submitting.");
        return;
      }

      const formData = new FormData();
      formData.append("description", AcademicUser.description);
      formData.append("title", AcademicUser.title);
  
      if (Academicimage) formData.append("academicimage", Academicimage);
  
      try {
        const response = await axios.post(
          "http://gosaviadvanceddentalclinic.com:8003/api/createacademic",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Data Added Successfully!");;
        navigate("/Academic");
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
        maxSize: 5 * 1024 * 1024, // 5MB
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
    setAcademicimage(file);
    console.log("File is valid. Proceed with upload...");
  };
  
    return (
      <div className="container about-details">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10 aboutuser">
            <Link to="/Academic">
              <i className="fa-solid fa-xmark"></i>
            </Link>
            <h3>Academic Details</h3>
            <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
                <label htmlFor="academicimage">Academic Icon <span style={{color:"red"}}>("Icon must be at least Width-60 Height-50 pixels!")</span></label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  onChange={inputHandler}
                  value={AcademicUser.title}
                  id="title"
                  name="title"
                  placeholder="Title"
                />
              </div>
              
                <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
                <label htmlFor="description">Description</label>
                <textarea
                  id="editor"
                ></textarea>
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

  export const ViewAcademic = () => {
    const [AcademicUser, setAcademicUser] = useState({
    title: "",
      description: "",
      academicimage: "",
    });
    const { id } = useParams();
  
    useEffect(() => {
      const AcademicData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getoneacademic/${id}`
          );
          setAcademicUser(response.data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      AcademicData();
    }, [id]);
  
    return (
      <div className="container-fluid schoolinfo-view">
        <div className="row arpi">
          <div className="col-lg-3 col-md-3 col-sm-12"></div>
  
          <div className="col-lg-7 col-md-7 col-sm-12 view-sec">
            <Link to="/Academic" className="back-btn">
            <i className="fa-solid fa-xmark"></i>
            </Link>
            <br />
            <br />
  
            <h4>
              {AcademicUser.title}{" "}
              <Link to={`/Academic-edit/` + AcademicUser._id}>
                <i className="fa-regular fa-pen-to-square"></i>
              </Link>
            </h4>
            <img
              src={`http://gosaviadvanceddentalclinic.com:8003/images/${AcademicUser.academicimage}`}
              alt="Academic Image"
            />
            <br />
              <p dangerouslySetInnerHTML={{__html: AcademicUser.description}}></p>
          </div>
        </div>
      </div>
    );
  };

  export const EditAcademic = () => {
    const [AcademicImage, setAcademicImage] = useState(null);
    const users = {
      title: "",
      description: "",
    };
  
    const [AcademicUser, setAcademicUser] = useState(users);
    const { id } = useParams();
    const navigate = useNavigate();
    const [editorLoaded, setEditorLoaded] = useState(false);

    // ✅ Load CKEditor script dynamically
    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://cdn.ckeditor.com/4.21.0/standard/ckeditor.js";
      script.async = true;
      script.onload = () => setEditorLoaded(true);
      document.body.appendChild(script);
  
      return () => {
        if (window.CKEDITOR) {
          Object.keys(window.CKEDITOR.instances).forEach((instance) => {
            window.CKEDITOR.instances[instance].destroy(true);
          });
        }
      };
    }, []);
  
    // ✅ Fetch existing data from API
    const fetchPedagogyData = async () => {
      try {
        const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneacademic/${id}`);
        setAcademicUser(response.data);
  
        if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
          window.CKEDITOR.instances.editor.setData(response.data.description);
        }
      } catch (error) {
        console.error("Error fetching Pedagogy data!", error);
      }
    };
  
    useEffect(() => {
      if (editorLoaded) {
        fetchPedagogyData();
      }
    }, [id, editorLoaded]);
    
    useEffect(() => {
      if (editorLoaded && !window.CKEDITOR.instances.editor) {
        window.CKEDITOR.replace("editor");
      }
    }, [editorLoaded]);
    
    // ✅ Ensure CKEditor updates when PedagogyUser.description2 changes
    useEffect(() => {
      if (editorLoaded && window.CKEDITOR.instances.editor) {
        window.CKEDITOR.instances.editor.setData(AcademicUser.description);
      }
    }, [AcademicUser.description, editorLoaded]);
    
  
    const changeHandler = (e) => {
      const { name, value } = e.target;
      setAcademicUser({ ...AcademicUser, [name]: value });
      // console.log(user);
    };
  
  
    const submitForm = async (e) => {
      e.preventDefault();

           // ✅ Get CKEditor content before submitting
           if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
            AcademicUser.description = window.CKEDITOR.instances.editor.getData();
          }

      const formData = new FormData();
      formData.append("title", AcademicUser.title);
      formData.append("description", AcademicUser.description);
      if (AcademicImage) formData.append("academicimage", AcademicImage);
  
      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updateacademic/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response);
       toast.info("Data Updated Successfully!");
        fetchPedagogyData();
        navigate("/Academic");
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
    setAcademicImage(file);
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
                <Link to="/Academic">
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
                    value={AcademicUser.title}
                    onChange={changeHandler}
                    className="form-control"
                    name="title"
                  />
                  <br />
                </div>

                <div className="form-group">
                  <label>Academic Icon <span style={{color:"red"}}>("Icon must be at least Width-60 Height-50 pixels!")</span></label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileUpload}
                  />
                  <br/>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                  id="editor"
                ></textarea>
                  <br />
                </div>
              </div>
  
              <div className="modal-footer">
                <Link to="/Academic">
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

  export const EditTopDataAcademic = () => {
    const users = {
      heading: "",
    };
  
    const [AcademicUser, setAcademicUser] = useState(users);
    const { id } = useParams();
    const navigate = useNavigate();
  
    const changeHandler = (e) => {
      const { name, value } = e.target;
      setAcademicUser({ ...AcademicUser, [name]: value });
      // console.log(user);
    };
  
    useEffect(() => {
      const SchoolInfoData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getoneacademic/${id}`
          );
          // console.log(response.data);
          setAcademicUser(response.data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      SchoolInfoData();
    }, [id]);
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      const formData = {
        heading: AcademicUser.heading
      }
  
      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updateacademic/${id}`,
          formData
        );
        // console.log(response);
       toast.info("Data Updated Successfully!");
        setAcademicUser(response.data.data);
        navigate("/Academic");
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
                <Link to="/Academic">
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
                    value={AcademicUser.heading}
                    onChange={changeHandler}
                    className="form-control"
                    name="heading"
                  />
                  <br />
                </div>
              </div>
  
              <div className="modal-footer">
                <Link to="/Academic">
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