import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const ChairmanHome = () => {
  const [Chairman, setChairman] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallChairman"
      );
      setChairman(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container chairman">
      <div className="row">
        <div className="col-2"></div>
        {/* <Link to="/Chairman-add">
          <button className="about-button">
            <i className="fa-solid fa-plus"></i> Add
          </button>
        </Link> */}
        <div className="col-lg-10 chairman-data">
          {Chairman.map((user) => {
            return (
              <div className="row">
                <h4>
                  {user.heading}{" "}
                  <Link to={`/Chairman-edit/` + user._id}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                  <br />
                </h4>
                <img
                  src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.Chairmanimage}`}
                  alt="Chairman Image"
                  style={{width:"200px", height:"210px"}}
                />
                <br />
                <h5>{user.Chairmanname}</h5>
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

export const EditChairman = () => {
  const users = {
    heading: "",
    Chairmanname: "",
    description: "",
    paragraph1: "",
  };

  const [ChairmanUser, setChairmanUser] = useState(users);
  const [ChairmanImage, setChairmanImage] = useState(null);
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
          const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneChairman/${id}`);
          setChairmanUser(response.data);
    
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
          window.CKEDITOR.instances.editor.setData(ChairmanUser.paragraph1);
        }
      }, [ChairmanUser.paragraph1, editorLoaded]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setChairmanUser({ ...ChairmanUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

         // ✅ Get CKEditor content before submitting
         if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
          ChairmanUser.paragraph1 = window.CKEDITOR.instances.editor.getData();
        }

    const formData = new FormData();
    formData.append("heading", ChairmanUser.heading);
    formData.append("description", ChairmanUser.description);
    formData.append("Chairmanname", ChairmanUser.Chairmanname);
    formData.append("paragraph1", ChairmanUser.paragraph1);
    if (ChairmanImage) formData.append("Chairmanimage", ChairmanImage);

    try {
      await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateChairman/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      navigate("/Chairman");
      fetchPedagogyData();
    } catch (error) {
      console.error("There was an error updating the Chairman!", error);
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
      setChairmanImage(file);
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
              <Link to="/Chairman">
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
                  value={ChairmanUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Chairman Image <span style={{color:"red"}}>("Image must be at least 150x150 pixels!")</span></label>
                <input
                  type="file"
                    accept="image/*"
                  className="form-control"
                  onChange={handleFileUpload}
                />
                <br />
              </div>

              <div className="form-group">
                <label>Chairman Name</label>
                <input
                  type="text"
                  value={ChairmanUser.Chairmanname}
                  onChange={changeHandler}
                  className="form-control"
                  name="Chairmanname"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={ChairmanUser.description}
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
              <Link to="/Chairman">
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

export const AddChairman = () => {
  const users = {
    heading: "",
    Chairmanname: "",
    description: "",
    paragraph1: "",
  };
  const [ChairmanUser, setChairmanUser] = useState(users);
  const [ChairmanImage, setChairmanImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ClassicEditor && document.getElementById("paragraph1-editor")) {
      let editorInstance;

      window.ClassicEditor.create(document.getElementById("paragraph1-editor"))
        .then((editor) => {
          editor.setData(ChairmanUser.paragraph1 || "");
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            setChairmanUser((prev) => ({ ...prev, paragraph1: data }));
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
  }, [ChairmanUser.paragraph1]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setChairmanUser({ ...ChairmanUser, [name]: value });
    console.log(ChairmanUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", ChairmanUser.heading);
    formData.append("description", ChairmanUser.description);
    formData.append("Chairmanname", ChairmanUser.Chairmanname);
    formData.append("paragraph1", ChairmanUser.paragraph1);
    if (ChairmanImage) formData.append("Chairmanimage", ChairmanImage);

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createChairman",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setChairmanUser(response.data);
      navigate("/Chairman");
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
          <Link to="/Chairman">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>Chairman Detail</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="heading">Heading</label>
              <input
                type="text"
                onChange={inputHandler}
                value={ChairmanUser.heading}
                id="heading"
                name="heading"
                placeholder="Heading"
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="Chairmanimage">Chairman Image</label>
              <input
                type="file"
                onChange={(e) => setChairmanImage(e.target.files[0])}
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="Chairmanname">Chairman Name</label>
              <input
                type="text"
                onChange={inputHandler}
                value={ChairmanUser.Chairmanname}
                id="Chairmanname"
                name="Chairmanname"
                placeholder="Chairman Name"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                onChange={inputHandler}
                value={ChairmanUser.description}
                id="description"
                name="description"
                placeholder="description"
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="paragraph1">Paragraph 1</label>
              <input
                id="paragraph1-editor"
                defaultValue={ChairmanUser.paragraph1}
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
