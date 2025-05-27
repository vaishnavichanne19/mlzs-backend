import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const PrincipalHome = () => {
  const [Principal, setPrincipal] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallprincipal"
      );
      setPrincipal(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container principal">
      <div className="row">
        <div className="col-2"></div>
        {/* <Link to="/Principal-add">
          <button className="principal-button">
            <i className="fa-solid fa-plus"></i> Add
          </button>
        </Link> */}
        <div className="col-lg-10 principal-data">
          {Principal.map((user) => {
            return (
              <div className="row">
                <h4>
                  {user.heading}{" "}
                  <Link to={`/Principal-edit/` + user._id}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                  <br />
                </h4>
                <img
                  src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.principalimage}`}
                  alt="School Logo"
                  style={{width:"200px", height:"210px"}}
                />
                <br />
                <h5>{user.principalname}</h5>
                <p>{user.description}</p>

                <p
                  dangerouslySetInnerHTML={{ __html: user.paragraph1 || "" }}
                ></p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const EditPrincipal = () => {
  const users = {
    heading: "",
    principalname: "",
    description: "",
    paragraph1: "",
  };

  const [PrincipalUser, setPrincipalUser] = useState(users);
  const [PrincipalImage, setPrincipalImage] = useState(null);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneprincipal/${id}`);
      setPrincipalUser(response.data);

      if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
        window.CKEDITOR.instances.editor.setData(response.data.paragraph1);
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
      window.CKEDITOR.instances.editor.setData(PrincipalUser.paragraph1);
    }
  }, [PrincipalUser.paragraph1, editorLoaded]);



  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPrincipalUser({ ...PrincipalUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
      PrincipalUser.paragraph1 = window.CKEDITOR.instances.editor.getData();
    }

    const formData = new FormData();
    formData.append("heading", PrincipalUser.heading);
    formData.append("description", PrincipalUser.description);
    formData.append("principalname", PrincipalUser.principalname);
    formData.append("paragraph1", PrincipalUser.paragraph1);
    if (PrincipalImage) formData.append("principalimage", PrincipalImage);

    try {
      await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateprincipal/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      navigate("/Principal");
      fetchPedagogyData();
    } catch (error) {
      console.error("There was an error updating the Principal!", error);
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
    setPrincipalImage(file);
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
              <Link to="/Principal">
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
                  value={PrincipalUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Principal Image <span style={{color:"red"}}>("Image must be at least 150x150 pixels!")</span></label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleFileUpload}
                />
                <br />
              </div>

              <div className="form-group">
                <label>Principal Name</label>
                <input
                  type="text"
                  value={PrincipalUser.principalname}
                  onChange={changeHandler}
                  className="form-control"
                  name="principalname"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={PrincipalUser.description}
                  onChange={changeHandler}
                  className="form-control"
                  name="description"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Paragraph 1</label>
                <textarea
                  id="editor"
                ></textarea>
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/Principal">
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

export const AddPrincipal = () => {
  const users = {
    heading: "",
    principalname: "",
    description: "",
    paragraph1: "",
  };
  const [PrincipalUser, setPrincipalUser] = useState(users);
  const [PrincipalImage, setPrincipalImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ClassicEditor && document.getElementById("paragraph1-editor")) {
      let editorInstance;

      window.ClassicEditor.create(document.getElementById("paragraph1-editor"))
        .then((editor) => {
          editor.setData(PrincipalUser.paragraph1 || "");
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            setPrincipalUser((prev) => ({ ...prev, paragraph1: data }));
          });

          editorInstance = editor;
        })
        .catch((error) => {
          console.error("CKEditor initialization error:", error);
        });

      return () => {
        if (editorInstance) {
          editorInstance.destroy().catch((error) => {
            console.error("Error destroying the editor instance:", error);
          });
        }
      };
    } else {
      console.error(
        "ClassicEditor is not defined. Ensure the CKEditor CDN script is loaded."
      );
    }
  }, [PrincipalUser.paragraph1]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setPrincipalUser({ ...PrincipalUser, [name]: value });
    console.log(PrincipalUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!PrincipalImage) {
      alert("Please select a valid image file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("heading", PrincipalUser.heading);
    formData.append("description", PrincipalUser.description);
    formData.append("principalname", PrincipalUser.principalname);
    formData.append("paragraph1", PrincipalUser.paragraph1);
    if (PrincipalImage) formData.append("principalimage", PrincipalImage);

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createprincipal",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrincipalUser(response.data);
      navigate("/Principal");
      toast.success("Data Added successfully!");
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
      setPrincipalImage(file);
      console.log("File is valid. Proceed with upload...");
    };

  return (
    <div className="container about-details">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 aboutuser">
          <Link to="/Principal">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>Principal Detail</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="heading">Heading</label>
              <input
                type="text"
                onChange={inputHandler}
                value={PrincipalUser.heading}
                id="heading"
                name="heading"
                placeholder="Heading"
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="principalimage">Principal Image</label>
              <input
                type="file"
                onChange={handleFileUpload}
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="principalname">Principal Name</label>
              <input
                type="text"
                onChange={inputHandler}
                value={PrincipalUser.principalname}
                id="principalname"
                name="principalname"
                placeholder="Principal Name"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                onChange={inputHandler}
                value={PrincipalUser.description}
                id="description"
                name="description"
                placeholder="description"
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="paragraph1">Paragraph 1</label>
              <input
                id="paragraph1-editor"
                defaultValue={PrincipalUser.paragraph1}
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
