import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const PrimaryHome = () => {
  const [Primary, setPrimary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallprimary"
      );
      setPrimary(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container principal">
      <div className="row">
        <div className="col-2"></div>
        {/* <Link to="/Primary-add">
        <button className="about-button">
        <i className="fa-solid fa-plus"></i> Add</button>
         </Link> */}
        <div className="col-lg-10 principal-data">
          {Primary.map((user) => {
            return (
              <div className="row">
                <h4>
                  {user.heading}{" "}
                  <Link to={`/Primary-edit/` + user._id}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                  <br />
                </h4>
                <h5>{user.title}</h5>
                <p dangerouslySetInnerHTML={{ __html: user.description1 }}></p>
                <img
                  src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.primaryimage}`}
                  alt="Hi Tech Image"
                />
                <br />
                <p dangerouslySetInnerHTML={{ __html: user.description2 }}></p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const EditPrimary = () => {
  const users = {
    heading: "",
    description1: "",
    description2: "",
    title: "",
  };

  const [PrimaryUser, setPrimaryUser] = useState(users);
  const [PrimaryImage, setPrimaryImage] = useState(null);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneprimary/${id}`);
      setPrimaryUser(response.data);

      // ✅ Set CKEditor content if instances exist
      if (window.CKEDITOR) {
        if (window.CKEDITOR.instances.editor1) {
          window.CKEDITOR.instances.editor1.setData(response.data.description1 || "");
        }
        if (window.CKEDITOR.instances.editor2) {
          window.CKEDITOR.instances.editor2.setData(response.data.description2 || "");
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
      window.CKEDITOR.instances.editor1.setData(PrimaryUser.description1 || "");
    }
    if (editorLoaded && window.CKEDITOR.instances.editor2) {
      window.CKEDITOR.instances.editor2.setData(PrimaryUser.description2 || "");
    }
  }, [PrimaryUser.description1, PrimaryUser.description2, editorLoaded]);



  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPrimaryUser({ ...PrimaryUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

        // ✅ Get CKEditor content before submitting
        if (window.CKEDITOR.instances.editor1) {
          PrimaryUser.description1 = window.CKEDITOR.instances.editor1.getData();
        }
        if (window.CKEDITOR.instances.editor2) {
          PrimaryUser.description2 = window.CKEDITOR.instances.editor2.getData();
        }

    const formData = new FormData();
    formData.append("heading", PrimaryUser.heading);
    formData.append("description1", PrimaryUser.description1);
    formData.append("description2", PrimaryUser.description2);
    formData.append("title", PrimaryUser.title);
    if (PrimaryImage) formData.append("primaryimage", PrimaryImage);

    try {
      await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateprimary/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      fetchDirectorData();
      navigate("/Primary");
    } catch (error) {
      console.error("There was an error updating the Primary!", error);
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
    setPrimaryImage(file);
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
              <Link to="/Primary">
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
                  value={PrimaryUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={PrimaryUser.title}
                  onChange={changeHandler}
                  className="form-control"
                  name="title"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Description1</label>
                <textarea
                  id="editor1"
                ></textarea>
                <br />
              </div>

              <div className="form-group">
                <label>
                  Primary Image{" "}
                  <span style={{ color: "red" }}>
                    ("Image must be at least 90x100%")
                  </span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                <br />
              </div>

              <div className="form-group">
                <label>Description2</label>
                <textarea
                  id="editor2"
                ></textarea>
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/Primary">
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

export const AddPrimary = () => {
  const users = {
    heading: "",
    description2: "",
  };
  const [PrimaryUser, setPrimaryUser] = useState(users);
  const [PrimaryImage, setPrimaryImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ClassicEditor && document.getElementById("description-editor")) {
      let editorInstance;

      window.ClassicEditor.create(document.getElementById("description-editor"))
        .then((editor) => {
          editor.setData(PrimaryUser.description2 || "");
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            setPrimaryUser((v) => ({ ...v, description2: data }));
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
  }, [PrimaryUser.description2]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setPrimaryUser({ ...PrimaryUser, [name]: value });
    console.log(PrimaryUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", PrimaryUser.heading);
    formData.append("description2", PrimaryUser.description2);
    if (PrimaryImage) formData.append("primaryimage", PrimaryImage);

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createprimary",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrimaryUser(response.data);
      navigate("/Primary");
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
          <Link to="/Primary">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>Primary Detail</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="heading">Heading</label>
              <input
                type="text"
                onChange={inputHandler}
                value={PrimaryUser.heading}
                id="heading"
                name="heading"
                placeholder="Heading"
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="primaryimage">Primary Image</label>
              <input
                type="file"
                onChange={(e) => setPrimaryImage(e.target.files[0])}
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="description">Description</label>
              <input
                id="description-editor"
                defaultValue={PrimaryUser.description2}
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
