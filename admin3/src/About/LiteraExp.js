import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const LiteraExpHome = () => {
  const [LiteraExp, setLiteraExp] = useState([]);
  const [MainHeading, setMainHeading] = useState("");
  const [MainTitle, setMainTitle] = useState("");
  const [Paragraph1, setParagraph1] = useState("");
  const [LiteraImage, setLiteraImage] = useState("");
  const [Paragraph2, setParagraph2] = useState("");
  const [MainPoint, setMainPoint] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallliteraexp"
      );
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setMainTitle(response.data[0].title);
        setParagraph1(response.data[0].paragraph1);
        setLiteraImage(response.data[0].literaimage);
        setParagraph2(response.data[0].paragraph2);
        setMainPoint(response.data[0].point);
        setLiteraExp(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container philosophy">
      <div className="row arpi">
        <div className="col-lg-2 col-md-2 col-sm-12"></div>
        <div className="col-lg-8 col-md-8 col-sm-12 view-sec-case">
              {/* <Link to="/LiteraExp-add">
          <button className="about-button">
            <i className="fa-solid fa-plus"></i> Add
          </button>
        </Link> */}
          <h4>
            {MainHeading}{" "}
            <Link to={`/LiteraExp-edit/${"67b215e3735097283a082c5f"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
            <br />
          </h4>
          <h5>{MainTitle}</h5>
          <p dangerouslySetInnerHTML={{ __html: Paragraph1 }}></p>
          <img
            src={`http://gosaviadvanceddentalclinic.com:8003/images/${LiteraImage}`}
            alt="Litera Image"
            style={{ width: "200px", height: "210px" }}
            />
            <br/>
            <br/>
            <h5>{MainPoint}</h5>
          <p dangerouslySetInnerHTML={{ __html: Paragraph2 }}></p>
     

        {LiteraExp.map((user) => {
          return (
            <div className="row">
              <h4>
                {user.subtitle}{" "}
                <Link to={`/LiteraExp-point-edit/` + user._id}>
                  <i className="fa-regular fa-pen-to-square"></i>
                </Link>
              </h4>
              <p dangerouslySetInnerHTML={{__html: user.description}}></p>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
};

export const EditLiteraExp = () => {
  const users = {
    heading: "",
    paragraph1: "",
    title: "",
    point:"",
    paragraph2: "",
  };

  const [LiteraExpUser, setLiteraExpUser] = useState(users);
  const [LiteraImage, setLiteraImage] = useState(null);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneliteraexp/${id}`);
      setLiteraExpUser(response.data);

      if (window.CKEDITOR) {
        if(window.CKEDITOR.instances.editor1) {
        window.CKEDITOR.instances.editor1.setData(response.data.paragraph1 || "");
      }
      if(window.CKEDITOR.instances.editor2) {
        window.CKEDITOR.instances.editor2.setData(response.data.paragraph2 || "");
      }
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
    if (editorLoaded) {
      if(!window.CKEDITOR.instances.editor1){
      window.CKEDITOR.replace("editor1");
      }
      if(!window.CKEDITOR.instances.editor2){
        window.CKEDITOR.replace("editor2");
        }
    }
  }, [editorLoaded]);
  
 
   useEffect(() => {
     if (editorLoaded && window.CKEDITOR.instances.editor1) {
       window.CKEDITOR.instances.editor1.setData(LiteraExpUser.paragraph1 || "");
     }
     if (editorLoaded && window.CKEDITOR.instances.editor2) {
       window.CKEDITOR.instances.editor2.setData(LiteraExpUser.paragraph2 || "");
     }
   }, [LiteraExpUser.paragraph1, LiteraExpUser.paragraph2, editorLoaded]);
 


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLiteraExpUser({ ...LiteraExpUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

        // ✅ Get CKEditor content before submitting
        if (window.CKEDITOR.instances.editor1) {
          LiteraExpUser.paragraph1 = window.CKEDITOR.instances.editor1.getData();
        }
        if (window.CKEDITOR.instances.editor2) {
          LiteraExpUser.paragraph2 = window.CKEDITOR.instances.editor2.getData();
        }

    const formData = new FormData();
    formData.append("heading", LiteraExpUser.heading);
    formData.append("paragraph1", LiteraExpUser.paragraph1);
    formData.append("title", LiteraExpUser.title);
    formData.append("point", LiteraExpUser.point);
    formData.append("paragraph2", LiteraExpUser.paragraph2);
    if (LiteraImage) formData.append("literaimage", LiteraImage);

    try {
      await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateliteraexp/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      navigate("/LiteraExp");
      fetchPedagogyData();
    } catch (error) {
      console.error("There was an error updating the LiteraExp!", error);
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
    setLiteraImage(file);
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
              <Link to="/LiteraExp">
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
                  value={LiteraExpUser.heading}
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
                  value={LiteraExpUser.title}
                  onChange={changeHandler}
                  className="form-control"
                  name="title"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Paragraph1</label>
                <textarea
                  id="editor1"
                ></textarea>
                <br />
              </div>

         

              <div className="form-group">
                <label>Litera Image <span style={{color:"red"}}>("Image must be at least Width-240 Height-580 pixels!")</span></label>
                <input
                  type="file"
                   accept="image/*"
                  className="form-control"
                  onChange={handleFileUpload}
                />
                <br />
              </div>

              <div className="form-group">
                <label>SubTitle</label>
                <input
                  type="text"
                  value={LiteraExpUser.point}
                  onChange={changeHandler}
                  className="form-control"
                  name="point"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Paragraph2</label>
                <textarea
                  id="editor2"
                ></textarea>
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/LiteraExp">
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

export const AddLiteraExp = () => {
  const users = {
    heading: "",
    title: "",
    paragraph2: "",
    paragraph1: "",
  };
  const [LiteraExpUser, setLiteraExpUser] = useState(users);
  const [LiteraExpImage, setLiteraExpImage] = useState(null);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLiteraExpUser({ ...LiteraExpUser, [name]: value });
    console.log(LiteraExpUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", LiteraExpUser.heading);
    formData.append("title", LiteraExpUser.title);
    formData.append("paragraph2", LiteraExpUser.paragraph2);
    formData.append("paragraph1", LiteraExpUser.paragraph1);
    if (LiteraExpImage) formData.append("literaimage", LiteraExpImage);

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createliteraexp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLiteraExpUser(response.data);
      navigate("/LiteraExp");
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
          <Link to="/LiteraExp">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>LiteraExp Detail</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="heading">Heading</label>
              <input
                type="text"
                onChange={inputHandler}
                value={LiteraExpUser.heading}
                id="heading"
                name="heading"
                placeholder="Heading"
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="literaimage">LiteraExp Image</label>
              <input
                type="file"
                onChange={(e) => setLiteraExpImage(e.target.files[0])}
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                onChange={inputHandler}
                value={LiteraExpUser.title}
                id="title"
                name="title"
                placeholder="LiteraExp Name"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="paragraph1">paragraph1</label>
              <input
                type="text"
                onChange={inputHandler}
                value={LiteraExpUser.paragraph1}
                id="paragraph1"
                name="paragraph1"
                placeholder="paragraph1"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="paragraph2">paragraph2</label>
              <input
                type="text"
                onChange={inputHandler}
                value={LiteraExpUser.paragraph2}
                id="paragraph2"
                name="paragraph2"
                placeholder="paragraph2"
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

export const EditLiteraExpPoint = () => {
  const users = {
    subtitle: "",
    description: "",
  };

  const [LiteraExpUser, setLiteraExpUser] = useState(users);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneliteraexp/${id}`);
      setLiteraExpUser(response.data);

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
      window.CKEDITOR.instances.editor.setData(LiteraExpUser.description);
    }
  }, [LiteraExpUser.description, editorLoaded]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLiteraExpUser({ ...LiteraExpUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      subtitle: LiteraExpUser.subtitle,
      description: window.CKEDITOR.instances.editor.getData(),
    }

    try {
      await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateliteraexp/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      navigate("/LiteraExp");
      fetchPedagogyData();
    } catch (error) {
      console.error("There was an error updating the LiteraExp!", error);
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
              <Link to="/LiteraExp">
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
                  value={LiteraExpUser.subtitle}
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
            </div>

            <div className="modal-footer">
              <Link to="/LiteraExp">
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