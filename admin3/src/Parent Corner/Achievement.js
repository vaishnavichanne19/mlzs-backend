import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AchievementHome = () => {
  const [Achievement, setAchievement] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallachievement"
      );
      setAchievement(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container principal">
        <div className="row">
            <div className="col-2"></div>
            {/* <Link to="/Achievement-add">
        <button className="about-button">
        <i className="fa-solid fa-plus"></i> Add</button>
         </Link> */}
            <div className="col-lg-10 principal-data">
            {Achievement.map((user) => {
          return (
                <div className="row">
                <h4>
                {user.heading}{" "}
                <Link to={`/Achievement-edit/` + user._id}>
                  <i className="fa-regular fa-pen-to-square"></i>
                </Link>
                <br />
              </h4>
              <img
                src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.accoladessimage}`}
                alt="accoladess Image"
              />
              <br />
              <p dangerouslySetInnerHTML={{__html: user.paragraph}}></p>
              <h4>{user.title}</h4>
              <p dangerouslySetInnerHTML={{__html: user.description}}></p>
             </div>
        )})}
            </div>
        </div>
    </div>
  );
};

export const EditAchievement = () => {
  const users = {
    heading: "",
    paragraph:"",
    title:"",
    description: "",
  };

  const [AchievementUser, setAchievementUser] = useState(users);
  const [AchievementImage, setAchievementImage] = useState(null);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneachievement/${id}`);
      setAchievementUser(response.data);

      // ✅ Set CKEditor content if instances exist
      if (window.CKEDITOR) {
        if (window.CKEDITOR.instances.editor1) {
          window.CKEDITOR.instances.editor1.setData(response.data.paragraph || "");
        }
        if (window.CKEDITOR.instances.editor2) {
          window.CKEDITOR.instances.editor2.setData(response.data.description || "");
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
      window.CKEDITOR.instances.editor1.setData(AchievementUser.paragraph || "");
    }
    if (editorLoaded && window.CKEDITOR.instances.editor2) {
      window.CKEDITOR.instances.editor2.setData(AchievementUser.description || "");
    }
  }, [AchievementUser.paragraph, AchievementUser.description, editorLoaded]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAchievementUser({ ...AchievementUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    // ✅ Get CKEditor content before submitting
    if (window.CKEDITOR.instances.editor1) {
      AchievementUser.paragraph = window.CKEDITOR.instances.editor1.getData();
    }
    if (window.CKEDITOR.instances.editor2) {
      AchievementUser.description = window.CKEDITOR.instances.editor2.getData();
    }

    const formData = new FormData();
    formData.append("heading", AchievementUser.heading);
    formData.append("description", AchievementUser.description);
    formData.append("title", AchievementUser.title);
    formData.append("paragraph", AchievementUser.paragraph);
    if (AchievementImage) formData.append("accoladessimage", AchievementImage);

    try {
      await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateachievement/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      fetchDirectorData();
      navigate("/Achievement");
    } catch (error) {
      console.error("There was an error updating the Achievement!", error);
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
    setAchievementImage(file);
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
              <Link to="/Achievement">
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
                <label>Accoladess Heading</label>
                <input
                  type="text"
                  value={AchievementUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Accoladess Image <span style={{color:"red"}}>("Image must be at least 100x100%")</span></label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                onChange={handleFileUpload}
                />
                <br />
              </div>

              <div className="form-group">
                <label>Accoladess Description</label>
                <textarea
                  id="editor1"
                ></textarea>
                <br />
              </div>

              <div className="form-group">
                <label>Achievement Heading</label>
                <input
                  type="text"
                  value={AchievementUser.title}
                  onChange={changeHandler}
                  className="form-control"
                  name="title"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Achievement Description</label>
                <textarea
                  id="editor2"
                ></textarea>
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/Achievement">
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

export const AddAchievement = () => {
  const users = {
    heading: "",
    paragraph:"",
    title:"",
    description: "",
  };
  const [AchievementUser, setAchievementUser] = useState(users);
  const [AchievementImage, setAchievementImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ClassicEditor && document.getElementById("paragraph-editor")) {
      let editorInstance;

      window.ClassicEditor.create(document.getElementById("paragraph-editor"))
        .then((editor) => {
          editor.setData(AchievementUser.paragraph || "");
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            setAchievementUser((prev) => ({ ...prev, paragraph: data }));
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
  }, [AchievementUser.paragraph]);

  useEffect(() => {
    if (window.ClassicEditor && document.getElementById("description-editor")) {
      let editorInstance;

      window.ClassicEditor.create(document.getElementById("description-editor"))
        .then((editor) => {
          editor.setData(AchievementUser.description || "");
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            setAchievementUser((prev) => ({ ...prev, description: data }));
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
  }, [AchievementUser.description]);


  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAchievementUser({ ...AchievementUser, [name]: value });
    console.log(AchievementUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", AchievementUser.heading);
    formData.append("description", AchievementUser.description);
    formData.append("title", AchievementUser.title);
    formData.append("paragraph", AchievementUser.paragraph);
    if (AchievementImage) formData.append("accoladessimage", AchievementImage);

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createachievement",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAchievementUser(response.data);
      navigate("/Achievement");
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
          <Link to="/Achievement">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>Accoladess Detail</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="heading">Accoladess Heading</label>
              <input
                type="text"
                onChange={inputHandler}
                value={AchievementUser.heading}
                id="heading"
                name="heading"
                placeholder="Heading"
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="accoladessimage">Accoladess Image</label>
              <input
                type="file"
                onChange={(e) => setAchievementImage(e.target.files[0])}
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="paragraph">Accoladess Description</label>
              <input
                id="paragraph-editor"
                defaultValue={AchievementUser.paragraph}
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="title">Achievement Heading</label>
              <input
                type="text"
                onChange={inputHandler}
                value={AchievementUser.title}
                id="title"
                name="title"
                placeholder="Heading"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="description">Achievement Description</label>
              <input
                id="description-editor"
                defaultValue={AchievementUser.description}
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
