import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const CampusHome = () => {
  const [Campus, setCampus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallcampus"
      );
      setCampus(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container principal">
        <div className="row">
            <div className="col-2"></div>
            {/* <Link to="/Campus-add">
        <button className="about-button">
        <i className="fa-solid fa-plus"></i> Add</button>
         </Link> */}
            <div className="col-lg-10 principal-data">
            {Campus.map((user) => {
          return (
                <div className="row">
                <h4>
                {user.heading}{" "}
                <Link to={`/Campus-edit/` + user._id}>
                  <i className="fa-regular fa-pen-to-square"></i>
                </Link>
              </h4>
              <p dangerouslySetInnerHTML={{__html: user.description}}></p>
              <img
                src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.campusimage}`}
                alt="Hi Tech Image"
                style={{width:"500px", height:"250px"}}
              />
              <br />
              <h5>{user.title}</h5>
              <p dangerouslySetInnerHTML={{__html: user.paragraph}}></p>
             </div>
        )})}
            </div>
        </div>
    </div>
  );
};

export const EditCampus = () => {
  const users = {
    heading: "",
    description: "",
    title:"",
    paragraph:""
  };

  const [CampusUser, setCampusUser] = useState(users);
  const [CampusImage, setCampusImage] = useState(null);
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
  const fetchDirectorData = async () => {
    try {
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getonecampus/${id}`);
      setCampusUser(response.data);

      // ✅ Set CKEditor content if instances exist
      if (window.CKEDITOR) {
        if (window.CKEDITOR.instances.editor1) {
          window.CKEDITOR.instances.editor1.setData(response.data.description || "");
        }
        if (window.CKEDITOR.instances.editor2) {
          window.CKEDITOR.instances.editor2.setData(response.data.paragraph || "");
        }
      }
    } catch (error) {
      console.error("Error fetching Director data!", error);
    }
  };

  useEffect(() => {
    if (editorLoaded) {
      fetchDirectorData();
    }
  }, [id, editorLoaded]);

  // ✅ Initialize CKEditor for both textareas
  useEffect(() => {
    if (editorLoaded) {
      if (!window.CKEDITOR.instances.editor1) {
        window.CKEDITOR.replace("editor1");
      }
      if (!window.CKEDITOR.instances.editor2) {
        window.CKEDITOR.replace("editor2");
      }
    }
  }, [editorLoaded]);

  // ✅ Update CKEditor data when DirectorUser changes
  useEffect(() => {
    if (editorLoaded && window.CKEDITOR.instances.editor1) {
      window.CKEDITOR.instances.editor1.setData(CampusUser.description || "");
    }
    if (editorLoaded && window.CKEDITOR.instances.editor2) {
      window.CKEDITOR.instances.editor2.setData(CampusUser.paragraph || "");
    }
  }, [CampusUser.description, CampusUser.paragraph, editorLoaded]);




  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCampusUser({ ...CampusUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

        // ✅ Get CKEditor content before submitting
        if (window.CKEDITOR.instances.editor1) {
          CampusUser.description = window.CKEDITOR.instances.editor1.getData();
        }
        if (window.CKEDITOR.instances.editor2) {
          CampusUser.paragraph = window.CKEDITOR.instances.editor2.getData();
        }

    const formData = new FormData();
    formData.append("heading", CampusUser.heading);
    formData.append("description", CampusUser.description);
    formData.append("title", CampusUser.title);
    formData.append("paragraph", CampusUser.paragraph);
    if (CampusImage) formData.append("campusimage", CampusImage);

    try {
      await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatecampus/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      fetchDirectorData();
      navigate("/Campus");
    } catch (error) {
      console.error("There was an error updating the Campus!", error);
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
      setCampusImage(file);
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
              <Link to="/Campus">
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
                  value={CampusUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  id="editor1"
                ></textarea>
                <br />
              </div>

              <div className="form-group">
                <label>Campus Image <span style={{color:"red"}}>("Image must be at least Width-500 Height-400 pixels!")</span></label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                <br />
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={CampusUser.title}
                  onChange={changeHandler}
                  className="form-control"
                  name="title"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Paragraph</label>
                <textarea
                  id="editor2"
                ></textarea>
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/Campus">
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

export const AddCampus = () => {
  const users = {
    heading: "",
    description: "",
    title:"",
    paragraph:""
  };
  const [CampusUser, setCampusUser] = useState(users);
  const [CampusImage, setCampusImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ClassicEditor && document.getElementById("description-editor")) {
      let editorInstance;

      window.ClassicEditor.create(document.getElementById("description-editor"))
        .then((editor) => {
          editor.setData(CampusUser.description || "");
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            setCampusUser((prev) => ({ ...prev, description: data }));
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
  }, [CampusUser.description]);

  useEffect(() => {
    if (window.ClassicEditor && document.getElementById("paragraph-editor")) {
      let editorInstance;

      window.ClassicEditor.create(document.getElementById("paragraph-editor"))
        .then((editor) => {
          editor.setData(CampusUser.paragraph || "");
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            setCampusUser((prev) => ({ ...prev, paragraph: data }));
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
  }, [CampusUser.paragraph]);


  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCampusUser({ ...CampusUser, [name]: value });
    console.log(CampusUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", CampusUser.heading);
    formData.append("description", CampusUser.description);
    formData.append("title", CampusUser.title);
    formData.append("paragraph", CampusUser.paragraph);
    if (CampusImage) formData.append("campusimage", CampusImage);

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createcampus",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCampusUser(response.data);
      navigate("/Campus");
      toast.success("Data Added successfully!");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container about-details">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 aboutuser">
          <Link to="/Campus">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>Campus Detail</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="heading">Heading</label>
              <input
                type="text"
                onChange={inputHandler}
                value={CampusUser.heading}
                id="heading"
                name="heading"
                placeholder="Heading"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="description">Description</label>
              <input
                id="description-editor"
                defaultValue={CampusUser.description}
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="campusimage">Campus Image</label>
              <input
                type="file"
                onChange={(e) => setCampusImage(e.target.files[0])}
              />
            </div>
  
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                onChange={inputHandler}
                value={CampusUser.title}
                id="title"
                name="title"
                placeholder="Title"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="paragraph">Paragraph</label>
              <input
                id="paragraph-editor"
                defaultValue={CampusUser.paragraph}
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




