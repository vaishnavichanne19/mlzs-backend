import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const EnquiryHome = () => {
  const [Enquiry, setEnquiry] = useState([]);
  const [MainHeading, setMainHeading] = useState("");
  const [Description, setDescription] = useState("");
  const [MainTitle1, setMainTitle1] = useState("");
  const [Description1, setDescription1] = useState("");
  const [MainTitle2, setMainTitle2] = useState("");
  const [Description2, setDescription2] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallEnquiry"
      );
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setDescription(response.data[0].description);
        setMainTitle1(response.data[0].title1);
        setDescription1(response.data[0].description1);
        setMainTitle2(response.data[0].title2);
        setDescription2(response.data[0].description2);
        setEnquiry(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid all-school-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>
        <div className="col-lg-7 col-md-7 col-sm-12 view-sec-case">
          <h3>
            {MainHeading}{" "}
            <Link to={`/Enquiry-edit/${"67b3025b40c472da9df4c9d9"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h3>
          <p dangerouslySetInnerHTML={{ __html: Description }}></p>
          <br />
          {Enquiry.map((user) => {
            return (
              <div className="row">
                <h4>
                  {user.title}{" "}
                  <Link to={`/Enquiry-Point-edit/` + user._id}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                  <br />
                </h4>
                <p dangerouslySetInnerHTML={{ __html: user.paragraph }}></p>
              </div>
            );
          })}

          <h5>
            {MainTitle1}{" "}
            <Link to={`/Enquiry-Data-edit/${"67b3025b40c472da9df4c9d9"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h5>
          <p>{Description1}</p>
          <h5>{MainTitle2}</h5>
          <p dangerouslySetInnerHTML={{ __html: Description2 }}></p>
        </div>
      </div>
    </div>
  );
};

export const EditEnquiry = () => {
  const users = {
    heading: "",
    description: "",
  };

  const [EnquiryUser, setEnquiryUser] = useState(users);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneEnquiry/${id}`);
      setEnquiryUser(response.data);

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
      window.CKEDITOR.instances.editor.setData(EnquiryUser.description);
    }
  }, [EnquiryUser.description, editorLoaded]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setEnquiryUser({ ...EnquiryUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: EnquiryUser.heading,
      description: window.CKEDITOR.instances.editor.getData(),
    };

    try {
      await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateEnquiry/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      fetchPedagogyData();
      navigate("/Enquiry");
    } catch (error) {
      console.error("There was an error updating the Enquiry!", error);
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
              <Link to="/Enquiry">
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
                  value={EnquiryUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
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
              <Link to="/Enquiry">
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

export const EditEnquiryPoint = () => {
  const users = {
    title: "",
    paragraph: "",
  };

  const [EnquiryUser, setEnquiryUser] = useState(users);
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
          const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneEnquiry/${id}`);
          setEnquiryUser(response.data);
    
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
          window.CKEDITOR.instances.editor.setData(EnquiryUser.paragraph);
        }
      }, [EnquiryUser.paragraph, editorLoaded]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setEnquiryUser({ ...EnquiryUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      title: EnquiryUser.title,
      paragraph: window.CKEDITOR.instances.editor.getData(),
    };

    try {
      await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateEnquiry/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      fetchPedagogyData();
      navigate("/Enquiry");
    } catch (error) {
      console.error("There was an error updating the Enquiry!", error);
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
              <Link to="/Enquiry">
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
                  value={EnquiryUser.title}
                  onChange={changeHandler}
                  className="form-control"
                  name="title"
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
              <Link to="/Enquiry">
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

export const EditEnquiryData = () => {
  const users = {
    title1: "",
    description1: "",
    title2: "",
    description2: "",
  };

  const [EnquiryUser, setEnquiryUser] = useState(users);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneEnquiry/${id}`);
      setEnquiryUser(response.data);

      if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
        window.CKEDITOR.instances.editor.setData(response.data.description2);
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
      window.CKEDITOR.instances.editor.setData(EnquiryUser.description2);
    }
  }, [EnquiryUser.description2, editorLoaded]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setEnquiryUser({ ...EnquiryUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      title1: EnquiryUser.title1,
      description1: EnquiryUser.description1,
      title2: EnquiryUser.title2,
      description2: window.CKEDITOR.instances.editor.getData(),
    };

    try {
      await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateEnquiry/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      fetchPedagogyData();
      navigate("/Enquiry");
    } catch (error) {
      console.error("There was an error updating the Enquiry!", error);
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
              <Link to="/Enquiry">
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
                  value={EnquiryUser.title1}
                  onChange={changeHandler}
                  className="form-control"
                  name="title1"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={EnquiryUser.description1}
                  onChange={changeHandler}
                  className="form-control"
                  name="description1"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Heading</label>
                <input
                  type="text"
                  value={EnquiryUser.title2}
                  onChange={changeHandler}
                  className="form-control"
                  name="title2"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Paragraph 2</label>
                <textarea
                  id="editor"
                ></textarea>
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/Enquiry">
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
