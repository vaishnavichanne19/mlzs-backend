import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AboutHome = () => {
  const [About, setAbout] = useState([]);
  const navigate = useNavigate();
  const [mainHeading, setMainHeading] = useState("");
  const [para, setPara] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallabout");
      if (response.data.length > 0) {
        setMainHeading(response.data[0].mainheading);
        setAbout(response.data.slice(1));
      }

      if (response.data.length > 0) {
        setPara(response.data[0].para);
        setAbout(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deleteabout/${userId}`
      );
      setAbout((prevUser) => prevUser.filter((user) => user._id !== userId));
      console.log(response);
      toast.error("Data Deleted Successfully!");
      navigate("/about");
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
            <Link to={`/head-about-edit/${"6793773fdb637d30616edcdd"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
          <p dangerouslySetInnerHTML={{__html:para}}></p>
        </div>

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 schoolinfo-table">
            <Link to="/about-add">
              <button type="button" className="about-add-product">
                <span>
                  <i className="fa-solid fa-plus"></i> Add{" "}
                </span>
              </button>
            </Link>
            <table>
              <thead>
                <tr>
                  <th className="col-lg-3">About Image</th>
                  <th className="col-lg-3">Heading</th>
                  <th className="col-lg-3">Description</th>
                  <th className="col-lg-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {About.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>
                        {" "}
                        <img
                          src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.aboutimage}`}
                          alt="School Logo"
                          style={{ width: "100px", height: "50px" }}
                        />{" "}
                        <br />
                        <br />
                      </td>
                      <td>
                        <h6>{user.heading}</h6>
                      </td>
                      <td>
                        <p dangerouslySetInnerHTML={{__html:user.description}}></p>
                      </td>
                      <td>
                        <Link to={`/about-view/` + user._id}>
                          <i
                            title="View"
                            className="fa-regular fa-eye action-sec"
                            style={{ color: "blue" }}
                          ></i>
                        </Link>
                        <Link to={`/about-edit/` + user._id}>
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
                        <Link to={`/view-card-detail/${user._id}`}>
                          <span>
                            <button className="view-button">
                              View Card Details{" "}
                            </button>
                          </span>
                        </Link>
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

export const AddAbout = () => {
  const users = {
    heading: "",
    description: "",
    title: "",
    description1: "",
  };
  const [aboutUser, setaboutUser] = useState(users);
  const [Aboutimage, setAboutimage] = useState(null);
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
    if (editorLoaded && document.getElementById("editor") && !window.CKEDITOR.instances.editor) {
      try {
        window.CKEDITOR.replace("editor", { height: 200 });
  
        window.CKEDITOR.instances.editor.on("change", function () {
          setaboutUser((prev) => ({
            ...prev,
            description1: window.CKEDITOR.instances.editor.getData(),
          }));
        });
      } catch (error) {
        console.error("CKEditor initialization error:", error);
      }
    }
  }, [editorLoaded]);
  
  

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setaboutUser({ ...aboutUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
  
    if (!Aboutimage) {
      alert("Please select a valid image file before submitting.");
      return;
    }
  
    // Ensure CKEditor data is updated before submission
    const editorData = window.CKEDITOR.instances.editor.getData();
    setaboutUser((prev) => ({
      ...prev,
      description1: editorData,
    }));
  
    try {
      const formData = new FormData();
      formData.append("heading", aboutUser.heading);
      formData.append("description", aboutUser.description);
      formData.append("title", aboutUser.title);
      formData.append("description1", editorData); // Use updated editor data
  
      if (Aboutimage) formData.append("aboutimage", Aboutimage);
  
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createabout",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      toast.success("Data Added Successfully!");
      navigate("/about");
    } catch (error) {
      console.error("There was an error submitting the form:", error);
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
    setAboutimage(file);
    console.log("File is valid. Proceed with upload...");
  };
  
  return (
    <div className="container about-details">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 aboutuser">
          <Link to="/about">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>About Details</h3>
          <form className="row" onSubmit={submitForm}>
            <h4>Front Side About Card Details</h4>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="aboutimage">About Image <span style={{color:"red"}}>("Image must be at least Width-100% Height-500 pixels!")</span></label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="heading">Heading</label>
              <input
                type="text"
                onChange={inputHandler}
                value={aboutUser.heading}
                id="heading"
                name="heading"
                placeholder="Heading"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                onChange={inputHandler}
                value={aboutUser.description}
                id="description"
                name="description"
                placeholder="Description"
              />
            </div>

            <h4>All Cards Details</h4>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                onChange={inputHandler}
                value={aboutUser.title}
                id="title"
                name="title"
                placeholder="Title"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label>Description</label>
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

export const ViewAbout = () => {
  const [AboutUser, setAboutUser] = useState({
    heading: "",
    description: "",
    aboutimage: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const AboutData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneabout/${id}`
        );
        setAboutUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    AboutData();
  }, [id]);

  return (
    <div className="container-fluid schoolinfo-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>

        <div className="col-lg-7 col-md-7 col-sm-12 view-sec">
          <Link to="/about" className="back-btn">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <br />
          <br />

          <h4>
            {AboutUser.heading}{" "}
            <Link to={`/about-edit/` + AboutUser._id}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h4>
          <p dangerouslySetInnerHTML={{__html:AboutUser.description}}></p>
          <img
            src={`http://gosaviadvanceddentalclinic.com:8003/images/${AboutUser.aboutimage}`}
            alt="About Image"
          />
          <br />
        </div>
      </div>
    </div>
  );
};

export const EditAbout = () => {
  const [AboutImage, setAboutImage] = useState(null);
  const users = {
    heading: "",
    description: "",
  };

  const [AboutUser, setAboutUser] = useState(users);
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
        const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getonecurriculam/${id}`);
        setAboutUser(response.data);
  
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
    
   
    useEffect(() => {
      if (editorLoaded && window.CKEDITOR.instances.editor) {
        window.CKEDITOR.instances.editor.setData(AboutUser.description);
      }
    }, [AboutUser.description, editorLoaded]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAboutUser({ ...AboutUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const AboutData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneabout/${id}`
        );
        // console.log(response.data);
        setAboutUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    AboutData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

         // ✅ Get CKEditor content before submitting
         if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
          AboutUser.description = window.CKEDITOR.instances.editor.getData();
        }

    const formData = new FormData();
    formData.append("heading", AboutUser.heading);
    formData.append("description", AboutUser.description);
    if (AboutImage) formData.append("aboutimage", AboutImage);

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateabout/${id}`,
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
      navigate("/about");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

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
    setAboutImage(file);
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
              <Link to="/about">
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
                  value={AboutUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>

              <div className="form-group">
                <label>About Image <span style={{color:"red"}}>("Image must be at least Width-100% Height-500 pixels!")</span></label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleFileUpload}
                />
                <br />
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
              <Link to="/about">
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

export const EditTopDataAbout = () => {
  const users = {
    mainheading: "",
    para: "",
  };

  const [AboutUser, setAboutUser] = useState(users);
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
      const response = await axios.get( `http://gosaviadvanceddentalclinic.com:8003/api/getoneabout/${id}`);
      setAboutUser(response.data);

      if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
        window.CKEDITOR.instances.editor.setData(response.data.para);
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
  
 
  useEffect(() => {
    if (editorLoaded && window.CKEDITOR.instances.editor) {
      window.CKEDITOR.instances.editor.setData(AboutUser.para);
    }
  }, [AboutUser.para, editorLoaded]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAboutUser({ ...AboutUser, [name]: value });
    // console.log(user);
  };

  const submitForm = async (e) => {
    e.preventDefault();

         // ✅ Get CKEditor content before submitting
         if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
          AboutUser.para = window.CKEDITOR.instances.editor.getData();
        }

    const formData = new FormData();
    formData.append("mainheading", AboutUser.mainheading);
    formData.append("para", AboutUser.para);

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateabout/${id}`,
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
      navigate("/about");
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
              <Link to="/about">
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
                  value={AboutUser.mainheading}
                  onChange={changeHandler}
                  className="form-control"
                  name="mainheading"
                />
                <br />
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
              <Link to="/about">
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

//   card detail
export const EditCardDetail = () => {
  const users = {
    title: "",
    description1: "",
  };

  const [AboutUser, setAboutUser] = useState(users);
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
      const response = await axios.get( `http://gosaviadvanceddentalclinic.com:8003/api/getoneabout/${id}`);
      setAboutUser(response.data);

      if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
        window.CKEDITOR.instances.editor.setData(response.data.description1);
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
  
 
  useEffect(() => {
    if (editorLoaded && window.CKEDITOR.instances.editor) {
      window.CKEDITOR.instances.editor.setData(AboutUser.description1);
    }
  }, [AboutUser.description1, editorLoaded]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAboutUser({ ...AboutUser, [name]: value });
    // console.log(user);
  };


  const submitForm = async (e) => {
    e.preventDefault();

         // ✅ Get CKEditor content before submitting
         if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
          AboutUser.description1 = window.CKEDITOR.instances.editor.getData();
        }

    const formData = new FormData();
    formData.append("title", AboutUser.title);
    formData.append("description1", AboutUser.description1);

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateabout/${id}`,
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
      navigate("/about");
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
              <Link to="/about">
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
                  value={AboutUser.title}
                  onChange={changeHandler}
                  className="form-control"
                  name="title"
                />
                <br />
              </div>
              <div className="form-group">
                <label>Card Description</label>
                <textarea
                  id="editor"
                ></textarea>
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/about">
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

export const ViewCardDetails = () => {
  const [AboutUser, setAboutUser] = useState({
    title: "",
    description1: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const AboutData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneabout/${id}`
        );
        setAboutUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    AboutData();
  }, [id]);

  return (
    <div className="container-fluid schoolinfo-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>

        <div className="col-lg-7 col-md-7 col-sm-12 view-sec">
          <Link to="/about" className="back-btn">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <br />
          <br />

          <h4>
            {AboutUser.title}{" "}
            <Link to={`/card-detail-edit/` + AboutUser._id}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h4>
          <p dangerouslySetInnerHTML={{ __html: AboutUser.description1}}></p>
        </div>
      </div>
    </div>
  );
};
