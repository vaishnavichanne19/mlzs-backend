import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";


export const AboutmlzsHome = () => {
  const [Aboutmlzs, setAboutmlzs] = useState([]);
  const navigate = useNavigate();
  const [mainHeading, setMainHeading] = useState("");
  const [mainDescription, setMainDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallaboutmlzs");
      if (response.data.length > 0) {
        setMainHeading(response.data[0].mainheading);
        setAboutmlzs(response.data.slice(1));
      }
      if (response.data.length > 0) {
        setMainDescription(response.data[0].description);
        setAboutmlzs(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deleteaboutmlzs/${userId}`
      );
      setAboutmlzs((prevUser) =>
        prevUser.filter((user) => user._id !== userId)
      );
      console.log(response);
      toast.error("Data Deleted Successfully!");
      navigate("/Aboutmlzs");
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
            <Link to={`/head-Aboutmlzs-edit/${"679662b71875204b0151daf6"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
          <p dangerouslySetInnerHTML={{__html: mainDescription}}></p>
        </div>

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 schoolinfo-table">
            <Link to="/Aboutmlzs-add">
              <button type="button" className="academic-add">
                <span>
                  <i className="fa-solid fa-plus"></i> Add{" "}
                </span>
              </button>
            </Link>
            <table>
              <thead>
                <tr>
                  <th className="col-lg-2">About MLZS Image</th>
                  <th className="col-lg-1">Heading</th>
                  <th className="col-lg-4">Paragraph</th>
                  <th className="col-lg-2">Action</th>
                </tr>
              </thead>

              <tbody>
              {Aboutmlzs.map((user) => {
                return (
                <tr key={user._id}>
                  <td>
                    {" "}
                    <img
                      src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.mlzsimage}`}
                      alt="About MLZS Image"
                      style={{ width: "100px", height: "50px" }}
                    />{" "}
                    <br />
                    <br />
                  </td>
                  <td><h6>{user.heading}</h6></td>
                  <td><p dangerouslySetInnerHTML={{__html: user.paragraph}}></p></td>
                  <td>
                      <Link to={`/Aboutmlzs-view/` + user._id}>
                        <i
                          title="View"
                          className="fa-regular fa-eye action-sec"
                          style={{ color: "blue" }}
                        ></i>
                      </Link>
                      <Link to={`/Aboutmlzs-edit/` + user._id}>
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

export const AddAboutmlzs = () => {
    const users = {
      heading: "",
      paragraph: "",
    };
    const [AboutmlzsUser, setAboutmlzsUser] = useState(users);
    const [mlzsimage, setmlzsimage] = useState(null);
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
          setAboutmlzsUser((prev) => ({
            ...prev,
            paragraph: window.CKEDITOR.instances.editor.getData(),
          }));
        });
      }
    }, [editorLoaded]);

    const inputHandler = (e) => {
      const { name, value } = e.target;
      setAboutmlzsUser({ ...AboutmlzsUser, [name]: value });
      console.log(AboutmlzsUser);
    };
  
    const submitForm = async (e) => {
      e.preventDefault();

      if (!mlzsimage) {
        alert("Please select a valid image file before submitting.");
        return;
      }
  
      const formData = new FormData();
      formData.append("heading", AboutmlzsUser.heading);
      formData.append("paragraph", AboutmlzsUser.paragraph);
  
      if (mlzsimage) formData.append("mlzsimage", mlzsimage);
  
      try {
        const response = await axios.post(
          "http://gosaviadvanceddentalclinic.com:8003/api/createaboutmlzs",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Data Added Successfully!");;
        navigate("/Aboutmlzs");
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
    setmlzsimage(file);
    console.log("File is valid. Proceed with upload...");
  };
  
    return (
      <div className="container about-details">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10 aboutuser">
            <Link to="/Aboutmlzs">
              <i className="fa-solid fa-xmark"></i>
            </Link>
            <h3>Aboutmlzs Details</h3>
            <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
                <label htmlFor="mlzsimage">About MLZS Image <span style={{color:"red"}}>("Image must be at least Width-50% Height-270 pixels!")</span></label>
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
                  value={AboutmlzsUser.heading}
                  id="heading"
                  name="heading"
                  placeholder="Heading"
                />
              </div>
              
                <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
                <label htmlFor="paragraph">Paragraph</label>
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

  export const ViewAboutmlzs = () => {
    const [AboutmlzsUser, setAboutmlzsUser] = useState({
    heading: "",
      paragraph: "",
      mlzsimage: "",
    });
    const { id } = useParams();
  
    useEffect(() => {
      const AboutmlzsData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getoneaboutmlzs/${id}`
          );
          setAboutmlzsUser(response.data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      AboutmlzsData();
    }, [id]);
  
    return (
      <div className="container-fluid schoolinfo-view">
        <div className="row arpi">
          <div className="col-lg-3 col-md-3 col-sm-12"></div>
  
          <div className="col-lg-7 col-md-7 col-sm-12 view-sec">
            <Link to="/Aboutmlzs" className="back-btn">
            <i className="fa-solid fa-xmark"></i>
            </Link>
            <br />
            <br />
  
            <h4>
              {AboutmlzsUser.heading}{" "}
              <Link to={`/Aboutmlzs-edit/` + AboutmlzsUser._id}>
                <i className="fa-regular fa-pen-to-square"></i>
              </Link>
            </h4>
            <img
              src={`http://gosaviadvanceddentalclinic.com:8003/images/${AboutmlzsUser.mlzsimage}`}
              alt="Aboutmlzs Image"
            />
            <br />
              <p dangerouslySetInnerHTML={{__html: AboutmlzsUser.paragraph}}></p>
          </div>
        </div>
      </div>
    );
  };

  export const EditAboutmlzs = () => {
    const [mlzsImage, setmlzsImage] = useState(null);
    const users = {
      heading: "",
      paragraph: "",
    };
  
    const [AboutmlzsUser, setAboutmlzsUser] = useState(users);
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
        const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneaboutmlzs/${id}`);
        setAboutmlzsUser(response.data);
  
        if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
          window.CKEDITOR.instances.editor.setData(response.data.paragraph);
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
        window.CKEDITOR.instances.editor.setData(AboutmlzsUser.paragraph);
      }
    }, [AboutmlzsUser.paragraph, editorLoaded]);

  
    const changeHandler = (e) => {
      const { name, value } = e.target;
      setAboutmlzsUser({ ...AboutmlzsUser, [name]: value });
      // console.log(user);
    };
  
    const submitForm = async (e) => {
      e.preventDefault();

     // ✅ Get CKEditor content before submitting
     if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
      AboutmlzsUser.paragraph = window.CKEDITOR.instances.editor.getData();
    }
      const formData = new FormData();
      formData.append("heading", AboutmlzsUser.heading);
      formData.append("paragraph", AboutmlzsUser.paragraph);
      if (mlzsImage) formData.append("mlzsimage", mlzsImage);
  
      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updateaboutmlzs/${id}`,
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
        navigate("/Aboutmlzs");
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
    setmlzsImage(file);
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
                <Link to="/Aboutmlzs">
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
                    value={AboutmlzsUser.heading}
                    onChange={changeHandler}
                    className="form-control"
                    name="heading"
                  />
                  <br />
                </div>

                <div className="form-group">
                  <label>Aboutmlzs Image <span style={{color:"red"}}>("Image must be at least Width-50% Height-270 pixels!")</span></label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                onChange={handleFileUpload}
                  />
                  <br/>
                </div>

                <div className="form-group">
                  <label>Paragraph</label>
                  <textarea
                  id="editor"
                ></textarea>
                  <br />
                </div>
              </div>
  
              <div className="modal-footer">
                <Link to="/Aboutmlzs">
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

  export const EditTopDataAboutmlzs = () => {
    const users = {
      mainheading: "",
      description:""
    };
  
    const [AboutmlzsUser, setAboutmlzsUser] = useState(users);
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
        const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneaboutmlzs/${id}`);
        setAboutmlzsUser(response.data);
  
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
        window.CKEDITOR.instances.editor.setData(AboutmlzsUser.description);
      }
    }, [AboutmlzsUser.description, editorLoaded]);

    const changeHandler = (e) => {
      const { name, value } = e.target;
      setAboutmlzsUser({ ...AboutmlzsUser, [name]: value });
      // console.log(user);
    };
  
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      const formData = {
        mainheading: AboutmlzsUser.mainheading,
        description: window.CKEDITOR.instances.editor.getData(),
      }
  
      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updateaboutmlzs/${id}`,
          formData
        );
        // console.log(response);
       toast.info("Data Updated Successfully!");
        fetchPedagogyData();
        navigate("/Aboutmlzs");
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
                <Link to="/Aboutmlzs">
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
                    value={AboutmlzsUser.mainheading}
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
                <Link to="/Aboutmlzs">
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