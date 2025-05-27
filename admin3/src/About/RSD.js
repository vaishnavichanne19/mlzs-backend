import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const RSDHome = () => {
  const [RSD, setRSD] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallRSD");
      setRSD(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container chairman">
      <div className="row">
        <div className="col-lg-2"></div>
        {/* <Link to="/RSD-add">
          <button className="about-button">
            <i className="fa-solid fa-plus"></i> Add
          </button>
        </Link> */}
        <div className="col-lg-10 chairman-data">
          {RSD.map((user) => {
            return (
              <div className="row">
                <h4>
                  {user.heading}{" "}
                  <Link to={`/RSD-edit/` + user._id}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                  <br />
                </h4>
                <img
                  src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.RSDimage}`}
                  alt="RSD"
                  style={{width:"200px", height:"210px"}}
                />
                <br />
                <h5>{user.RSDname}</h5>
                <p>{user.description}</p>

                <p
                  dangerouslySetInnerHTML={{ __html: user.paragraph1 || "" }}
                ></p>
                <h5>{user.title || ""}</h5>
                <p
                  dangerouslySetInnerHTML={{ __html: user.paragraph2 || "" }}
                ></p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const EditRSD = () => {
  const users = {
    heading: "",
    RSDname: "",
    description: "",
    paragraph1: "",
    title: "",
    paragraph2: "",
  };

  const [RSDUser, setRSDUser] = useState(users);
  const [RSDImage, setRSDImage] = useState(null);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneRSD/${id}`);
      setRSDUser(response.data);

      // ✅ Set CKEditor content if instances exist
      if (window.CKEDITOR) {
        if (window.CKEDITOR.instances.editor1) {
          window.CKEDITOR.instances.editor1.setData(response.data.paragraph1 || "");
        }
        if (window.CKEDITOR.instances.editor2) {
          window.CKEDITOR.instances.editor2.setData(response.data.paragraph2 || "");
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
      window.CKEDITOR.instances.editor1.setData(RSDUser.paragraph1 || "");
    }
    if (editorLoaded && window.CKEDITOR.instances.editor2) {
      window.CKEDITOR.instances.editor2.setData(RSDUser.paragraph2 || "");
    }
  }, [RSDUser.paragraph1, RSDUser.paragraph2, editorLoaded]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setRSDUser({ ...RSDUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

       // ✅ Get CKEditor content before submitting
       if (window.CKEDITOR.instances.editor1) {
        RSDUser.paragraph1 = window.CKEDITOR.instances.editor1.getData();
      }
      if (window.CKEDITOR.instances.editor2) {
        RSDUser.paragraph2 = window.CKEDITOR.instances.editor2.getData();
      }

    const formData = new FormData();
    formData.append("heading", RSDUser.heading);
    formData.append("description", RSDUser.description);
    formData.append("RSDname", RSDUser.RSDname);
    formData.append("paragraph1", RSDUser.paragraph1);
    formData.append("title", RSDUser.title);
    formData.append("paragraph2", RSDUser.paragraph2);
    if (RSDImage) formData.append("RSDimage", RSDImage);

    try {
      await axios.put(`http://gosaviadvanceddentalclinic.com:8003/api/updateRSD/${id}`, formData);
      toast.info("Data Updated Successfully!");
      navigate("/RSD");
      fetchDirectorData();
    } catch (error) {
      console.error("There was an error updating the RSD!", error);
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
    setRSDImage(file);
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
              <Link to="/RSD">
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
                  value={RSDUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Image <span style={{color:"red"}}>("Image must be at least 150x150 pixels!")</span></label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleFileUpload}
                />
                <br />
              </div>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={RSDUser.RSDname}
                  onChange={changeHandler}
                  className="form-control"
                  name="RSDname"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={RSDUser.description}
                  onChange={changeHandler}
                  className="form-control"
                  name="description"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Paragraph 1</label>
                <textarea
                  id="editor1"
                ></textarea>
                <br />
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={RSDUser.title}
                  onChange={changeHandler}
                  className="form-control"
                  name="title"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Paragraph 2</label>
                <textarea
                  id="editor2"
                ></textarea>
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/RSD">
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

export const AddRSD = () => {
  const users = {
    heading: "",
    RSDname: "",
    description: "",
    paragraph1: "",
    title: "",
    paragraph2: "",
  };
  const [RSDUser, setRSDUser] = useState(users);
  const [RSDImage, setRSDImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ClassicEditor && document.getElementById("paragraph1-editor")) {
      let editorInstance;

      window.ClassicEditor.create(document.getElementById("paragraph1-editor"))
        .then((editor) => {
          editor.setData(RSDUser.paragraph1 || "");
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            setRSDUser((prev) => ({ ...prev, paragraph1: data }));
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
  }, [RSDUser.paragraph1]);

  useEffect(() => {
    if (window.ClassicEditor && document.getElementById("paragraph2-editor")) {
      let editorInstance;

      window.ClassicEditor.create(document.getElementById("paragraph2-editor"))
        .then((editor) => {
          editor.setData(RSDUser.paragraph2 || "");
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            setRSDUser((prev) => ({ ...prev, paragraph2: data }));
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
  }, [RSDUser.paragraph2]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setRSDUser({ ...RSDUser, [name]: value });
    console.log(RSDUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", RSDUser.heading);
    formData.append("description", RSDUser.description);
    formData.append("RSDname", RSDUser.RSDname);
    formData.append("paragraph1", RSDUser.paragraph1);
    formData.append("title", RSDUser.title);
    formData.append("paragraph2", RSDUser.paragraph2);
    if (RSDImage) formData.append("RSDimage", RSDImage);

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createRSD",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setRSDUser(response.data);
      navigate("/RSD");
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
          <Link to="/RSD">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>RSD Detail</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="heading">Heading</label>
              <input
                type="text"
                onChange={inputHandler}
                value={RSDUser.heading}
                id="heading"
                name="heading"
                placeholder="Heading"
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="RSDimage">Image</label>
              <input
                type="file"
                onChange={(e) => setRSDImage(e.target.files[0])}
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="RSDname">Name</label>
              <input
                type="text"
                onChange={inputHandler}
                value={RSDUser.RSDname}
                id="RSDname"
                name="RSDname"
                placeholder="Name"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                onChange={inputHandler}
                value={RSDUser.description}
                id="description"
                name="description"
                placeholder="description"
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="paragraph1">Paragraph 1</label>
              <input id="paragraph1-editor" defaultValue={RSDUser.paragraph1} />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                onChange={inputHandler}
                value={RSDUser.title}
                id="title"
                name="title"
                placeholder="title"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="paragraph2">Paragraph 2</label>
              <input id="paragraph2-editor" defaultValue={RSDUser.paragraph2} />
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
