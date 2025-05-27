import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const DirectorHome = () => {
  const [Director, setDirector] = useState([]);
  const [mainHeading, setMainHeading] = useState("");
  const [DirectorName, setDirectorName] = useState("");
  const [DirectorImage, setDirectorImage] = useState("");
  const [Description, setDescription] = useState("");
  const [Paragraph1, setParagraph1] = useState("");
  const [mainTitle, setMainTitle] = useState("");
  const [Paragraph2, setParagraph2] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getalldirector"
      );
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setDirectorName(response.data[0].directorname);
        setDirectorImage(response.data[0].directorimage);
        setDescription(response.data[0].description);
        setParagraph1(response.data[0].paragraph1);
        setMainTitle(response.data[0].title);
        setParagraph2(response.data[0].paragraph2);
        setDirector(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container director">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 director-data">
          <div className="row">
            <h4>
              {mainHeading}{" "}
              <Link to={`/Director-edit/${"67948b5a892d9dd6e95d3b6e"}`}>
                <i className="fa-regular fa-pen-to-square"></i>
              </Link>
              <br />
            </h4>
            <img
              src={`http://gosaviadvanceddentalclinic.com:8003/images/${DirectorImage}`}
              alt="Director Image"
              style={{ width: "200px", height: "210px" }}
            />

            <h5>
              <br />
              {DirectorName}
            </h5>
            <p>{Description}</p>

            <p dangerouslySetInnerHTML={{ __html: Paragraph1 }}></p>
            <h5>{mainTitle}</h5>
            <p dangerouslySetInnerHTML={{ __html: Paragraph2 }}></p>
          </div>
          
          <div className="row">
            <Link to="/Director-add">
              <button className="director-button">
                <i className="fa-solid fa-plus"></i> Add
              </button>
            </Link>

            {Director.map((user) => {
              return (
                <div className="col-lg-4">
                  <h4>
                    {user.director2name}{" "}
                    <Link to={`/Directors-edit/` + user._id}>
                      <i
                        title="Edit"
                        className="fa-regular fa-pen-to-square"
                      ></i>
                    </Link>
                  </h4>
                  <p>{user.description2}</p>
                  <img
                    src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.director2image}`}
                    alt=" Logo"
                    style={{ width: "200px", height: "210px" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditDirector = () => {
  const users = {
    heading: "",
    directorname: "",
    description: "",
    paragraph1: "",
    title: "",
    paragraph2: "",
  };

  const [DirectorUser, setDirectorUser] = useState(users);
  const [DirectorImage, setDirectorImage] = useState(null);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getonedirector/${id}`);
      setDirectorUser(response.data);

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
      window.CKEDITOR.instances.editor1.setData(DirectorUser.paragraph1 || "");
    }
    if (editorLoaded && window.CKEDITOR.instances.editor2) {
      window.CKEDITOR.instances.editor2.setData(DirectorUser.paragraph2 || "");
    }
  }, [DirectorUser.paragraph1, DirectorUser.paragraph2, editorLoaded]);

  // ✅ Handle input changes
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDirectorUser((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();

    // ✅ Get CKEditor content before submitting
    if (window.CKEDITOR.instances.editor1) {
      DirectorUser.paragraph1 = window.CKEDITOR.instances.editor1.getData();
    }
    if (window.CKEDITOR.instances.editor2) {
      DirectorUser.paragraph2 = window.CKEDITOR.instances.editor2.getData();
    }

    const formData = new FormData();
    formData.append("heading", DirectorUser.heading);
    formData.append("description", DirectorUser.description);
    formData.append("directorname", DirectorUser.directorname);
    formData.append("paragraph1", DirectorUser.paragraph1);
    formData.append("title", DirectorUser.title);
    formData.append("paragraph2", DirectorUser.paragraph2);
    if (DirectorImage) formData.append("directorimage", DirectorImage);

    try {
      await axios.put(`http://gosaviadvanceddentalclinic.com:8003/api/updatedirector/${id}`, formData);
      toast.info("Data Updated Successfully!");
      navigate("/Director");
      fetchDirectorData();
    } catch (error) {
      console.error("There was an error updating the Director!", error);
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
  setDirectorImage(file);
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
              <Link to="/Director">
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
                    value={DirectorUser.heading}
                    onChange={changeHandler}
                    className="form-control"
                    name="heading"
                  />
                  <br />
                </div>

              <div className="form-group">
                <label>Director Image <span style={{color:"red"}}>("Image must be at least 150x150 pixels!")</span></label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleFileUpload}
                />
                <br />
              </div>

       
                <div className="form-group">
                  <label>Director Name</label>
                  <input
                    type="text"
                    value={DirectorUser.directorname}
                    onChange={changeHandler}
                    className="form-control"
                    name="directorname"
                  />
                  <br />
                </div>
         
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    value={DirectorUser.description}
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
                    value={DirectorUser.title}
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
              <Link to="/Director">
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


export const AddDirector = () => {
  const users = {
    director2name: "",
    description2: "",
  };
  const [DirectorUser, setDirectorUser] = useState(users);
  const [Director2Image, setDirector2Image] = useState(null);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setDirectorUser({ ...DirectorUser, [name]: value });
    console.log(DirectorUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description2", DirectorUser.description2);
    formData.append("director2name", DirectorUser.director2name);
    if (Director2Image) formData.append("director2image", Director2Image);

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createdirector",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setDirectorUser(response.data);
      navigate("/Director");
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
          <Link to="/Director">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>Director Detail</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="director2image">Director Image</label>
              <input
                type="file"
                onChange={(e) => setDirector2Image(e.target.files[0])}
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="director2name">Director Name</label>
              <input
                type="text"
                onChange={inputHandler}
                value={DirectorUser.director2name}
                id="director2name"
                name="director2name"
                placeholder="Director Name"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="description2">Description</label>
              <input
                type="text"
                onChange={inputHandler}
                value={DirectorUser.description2}
                id="description2"
                name="description2"
                placeholder="description"
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


export const EditDirectorCard = () => {
  const users = {
    director2name: "",
    description2: "",
  };

  const [DirectorUser, setDirectorUser] = useState(users); 
  const [Director2Image, setDirector2Image] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDirectorData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonedirector/${id}`
        );
        if (response.data) {
          setDirectorUser(response.data);
        } else {
          console.warn("No data found for this ID.");
        }
      } catch (error) {
        console.error("There was an error fetching the Director data!", error);
        setDirectorUser(null);
      }
    };
    fetchDirectorData();
  }, [id]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDirectorUser((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description2", DirectorUser.description2);
    formData.append("director2name", DirectorUser.director2name);
    if (Director2Image) formData.append("director2image", Director2Image);

    try {
      await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatedirector/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      navigate("/Director");
    } catch (error) {
      console.error("There was an error updating the Director!", error);
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
              <Link to="/Director">
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
                <label>Director Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setDirector2Image(e.target.files[0])}
                />
                <br />
              </div>

       
                <div className="form-group">
                  <label>Director Name</label>
                  <input
                    type="text"
                    value={DirectorUser.director2name}
                    onChange={changeHandler}
                    className="form-control"
                    name="director2name"
                  />
                  <br />
                </div>
         
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    value={DirectorUser.description2}
                    onChange={changeHandler}
                    className="form-control"
                    name="description2"
                  />
                  <br />
                </div>
             </div>

            <div className="modal-footer">
              <Link to="/Director">
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