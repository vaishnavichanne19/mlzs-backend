import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const HomeAbout = () => {
  const [AboutUser, setAboutUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallhomeabout"
      );
      setAboutUser(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="container homeabout-details">
      <div className="row arpi">
        <div className="col-lg-2 col-md-2 col-sm-12"></div>

        <div className="col-lg-10 col-md-10 col-sm-12 view-home">
          {/* <Link to="/homeabout-add">
            <button className="about-button">Add</button>
          </Link> */}

          {AboutUser.map((user) => {
            return (
              <div key={user._id}>
                <h3>
                  {user.heading}{" "}
                  <Link to={`/homeabout-edit/` + user._id}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                </h3>
                <h6>{user.expno}</h6>
                <p>{user.exptext}</p>
                <h5>{user.title}</h5>
                <h6>{user.subtitle}</h6>
                <div
                  dangerouslySetInnerHTML={{ __html: user.description }}
                ></div>
                <br />
                <p>{user.para}</p>
                <div className="row">
                  <div className="col-lg-6">
                    <h5>{user.point1}</h5>
                    <p>{user.pointpara1}</p>
                  </div>
                  <div className="col-lg-6">
                    <h5>{user.point2}</h5>
                    <p>{user.pointpara2}</p>
                  </div>
                  <div className="col-lg-6">
                    <h5>{user.point3}</h5>
                    <p>{user.pointpara3}</p>
                  </div>
                  <div className="col-lg-6">
                    <h5>{user.point4}</h5>
                    <p>{user.pointpara4}</p>
                  </div>
                </div>
                <br />
                <img
                  src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.homeaboutimg1}`}
                  style={{ width: "300px", height: "200px" }}
                />

                <img
                  src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.homeaboutimg2}`}
                  style={{
                    width: "300px",
                    height: "200px",
                    marginLeft: "50px",
                    position: "relative",
                  }}
                />
                <br />
                <br />
                <video
                  src={`http://gosaviadvanceddentalclinic.com:8003/videos/${user.aboutvideo}`}
                  width="400"
                  height="230"
                  controls
                >
                  Your browser does not support the video tag.
                </video>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const HomeAboutAdd = () => {
  const users = {
    heading: "",
    title: "",
    description: "",
  };
  const [AboutUser, setAboutUser] = useState(users);
  const [aboutvideo, setAboutVideo] = useState(null);
  const [aboutimg1, setAboutimg1] = useState(null);
  const [aboutimg2, setAboutimg2] = useState(null);

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAboutUser({ ...AboutUser, [name]: value });
    console.log(AboutUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", AboutUser.heading);
    formData.append("title", AboutUser.title);
    formData.append("description", AboutUser.description);

    if (aboutvideo) formData.append("aboutvideo", aboutvideo);
    if (aboutimg1) formData.append("homeaboutimg1", aboutimg1);
    if (aboutimg2) formData.append("homeaboutimg2", aboutimg2);

    try {
      await axios.post("http://gosaviadvanceddentalclinic.com:8003/api/createhomeabout", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/homeabout");
      toast.success("Data added successfully!");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container about-details">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 aboutuser">
          <Link to="/homeabout">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>About Us</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="heading">Heading</label>
              <input
                type="text"
                onChange={inputHandler}
                value={AboutUser.heading}
                id="heading"
                name="heading"
                placeholder="Heading"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                onChange={inputHandler}
                value={AboutUser.title}
                id="title"
                name="title"
                placeholder="title"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="aboutvideo">Video</label>
              <input
                type="file"
                onChange={(e) => setAboutVideo(e.target.files[0])}
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="homeaboutimg1">aboutimg1</label>
              <input
                type="file"
                onChange={(e) => setAboutimg1(e.target.files[0])}
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="homeaboutimg2">aboutimg2</label>
              <input
                type="file"
                onChange={(e) => setAboutimg2(e.target.files[0])}
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="description">description</label>
              <input
                type="text"
                onChange={inputHandler}
                value={AboutUser.description}
                id="description"
                name="description"
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

export const HomeAboutEdit = () => {
  const [aboutvideo, setAboutVideo] = useState(null);
  const [aboutimg1, setAboutimg1] = useState(null);
  const [aboutimg2, setAboutimg2] = useState(null);

  const users = {
    heading: "",
    expno:"",
    exptext:"",
    title: "",
    subtitle:"",
    description: "",
    para:"",
    point1:"",
    pointpara1:"",
    point2:"",
    pointpara2:"",
    point3:"",
    pointpara3:"",
    point4:"",
    pointpara4:"",
  };

  const [aboutuser, setAboutUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();
const [editorLoaded, setEditorLoaded] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAboutUser({ ...aboutuser, [name]: value });
    // console.log(user);
  };

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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getonehomeabout/${id}`);
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
      window.CKEDITOR.instances.editor.setData(aboutuser.description);
    }
  }, [aboutuser.description, editorLoaded]);



  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", aboutuser.heading);
    formData.append("expno", aboutuser.expno);
    formData.append("exptext", aboutuser.exptext);
    formData.append("title", aboutuser.title);
    formData.append("subtitle", aboutuser.subtitle);
    formData.append("description", window.CKEDITOR.instances.editor.getData());
    formData.append("para", aboutuser.para);
    formData.append("point1", aboutuser.point1);
    formData.append("pointpara1", aboutuser.pointpara1);
    formData.append("point2", aboutuser.point2);
    formData.append("pointpara2", aboutuser.pointpara2);
    formData.append("point3", aboutuser.point3);
    formData.append("pointpara3", aboutuser.pointpara3);
    formData.append("point4", aboutuser.point4);
    formData.append("pointpara4", aboutuser.pointpara4);
    if (aboutvideo) formData.append("aboutvideo", aboutvideo);
    if (aboutimg1) {
      formData.append("homeaboutimg1", aboutimg1);
    }
    if (aboutimg2) {
      formData.append("homeaboutimg2", aboutimg2);
    }

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatehomeabout/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchPedagogyData();
      navigate("/homeabout");
      toast.info("Data Update successfully!");
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
        maxSize: 100 * 1024 * 1024, // 100MB
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

  const handleFileUpload1 = (event) => {
    const file = event.target.files[0];
    const validation = validateFile(file);
  
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }
    setAboutimg1(file);
    console.log("File is valid. Proceed with upload...");
  };

  const handleFileUpload2 = (event) => {
    const file = event.target.files[0];
    const validation = validateFile(file);
  
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }
    setAboutimg2(file);
    console.log("File is valid. Proceed with upload...");
  };

  const handleFileUploadvideo = (event) => {
    const file = event.target.files[0];
    const validation = validateFile(file);
  
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }
    setAboutVideo(file);
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
              <Link to="/homeabout">
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
                  value={aboutuser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Exp. No</label>
                <input
                  type="text"
                  value={aboutuser.expno}
                  onChange={changeHandler}
                  className="form-control"
                  name="expno"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Exp. Description</label>
                <input
                  type="text"
                  value={aboutuser.exptext}
                  onChange={changeHandler}
                  className="form-control"
                  name="exptext"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={aboutuser.title}
                  onChange={changeHandler}
                  className="form-control"
                  name="title"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Sub Title</label>
                <input
                  type="text"
                  value={aboutuser.subtitle}
                  onChange={changeHandler}
                  className="form-control"
                  name="subtitle"
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

              <div className="form-group">
                <label>Paragraph</label>
                <input
                  type="text"
                  value={aboutuser.para}
                  onChange={changeHandler}
                  className="form-control"
                  name="para"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Point1</label>
                <input
                  type="text"
                  value={aboutuser.point1}
                  onChange={changeHandler}
                  className="form-control"
                  name="point1"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Point 1 Description</label>
                <input
                  type="text"
                  value={aboutuser.pointpara1}
                  onChange={changeHandler}
                  className="form-control"
                  name="pointpara1"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Point2</label>
                <input
                  type="text"
                  value={aboutuser.point2}
                  onChange={changeHandler}
                  className="form-control"
                  name="point2"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Point 2 Description</label>
                <input
                  type="text"
                  value={aboutuser.pointpara2}
                  onChange={changeHandler}
                  className="form-control"
                  name="pointpara2"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Point3</label>
                <input
                  type="text"
                  value={aboutuser.point3}
                  onChange={changeHandler}
                  className="form-control"
                  name="point3"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Point 3 Description</label>
                <input
                  type="text"
                  value={aboutuser.pointpara3}
                  onChange={changeHandler}
                  className="form-control"
                  name="pointpara3"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Point4</label>
                <input
                  type="text"
                  value={aboutuser.point4}
                  onChange={changeHandler}
                  className="form-control"
                  name="point4"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Point 4 Description</label>
                <input
                  type="text"
                  value={aboutuser.pointpara4}
                  onChange={changeHandler}
                  className="form-control"
                  name="pointpara4"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Video <span style={{color:"red"}}>("Video must be at least Width-100% Height-500 pixels!")</span></label>
                <input
                  type="file"
                  className="form-control"
                  accept="video/*"
                onChange={handleFileUploadvideo}
                />
                <br />
              </div>
              <div className="form-group">
                <label htmlFor="homeaboutimg1">Aboutimg1 <span style={{color:"red"}}>("Image must be at least Width-100% Height-500 pixels!")</span></label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileUpload1}
                />
                <br />
              </div>
              <div className="form-group">
                <label htmlFor="homeaboutimg2">Aboutimg2 <span style={{color:"red"}}>("Image must be at least Width-100% Height-400 pixels!")</span></label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileUpload2}
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/homeabout">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </Link>
              <button className="btn btn-primary">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
