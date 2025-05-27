import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";


export const LearningsupportHome = () => {
  const [learningsupport, setlearningsupport] = useState([]);
  const [mainHeading, setMainHeading] = useState("");
  const [mainParagraph, setMainParagraph] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallLearningSupport");
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setMainParagraph(response.data[0].paragraph);
        setlearningsupport(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container philosophy">
      <div className="row arpi">
        <div className="col-lg-2 col-md-2 col-sm-12"></div>

        <div className="col-lg-8 col-md-8 col-sm-12 view-sec-case">
        <h2>
            {mainHeading}{" "}
            <Link to={`/LearningSupport-heading-edit/${"67cab9e37a44ac897404cad3"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
          <p dangerouslySetInnerHTML={{__html: mainParagraph}}></p>
          
          {learningsupport.map((user) => {
            return (
              <div className="row">
                <h4>
                  {user.title}{" "}
                  <Link to={`/LearningSupport-edit/` + user._id}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                  <br />
                </h4>
                <p dangerouslySetInnerHTML={{ __html: user.description }}></p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

  export const EditTopDatalearningsupport = () => {
    const users = {
      heading: "",
      paragraph: ""
    };
  
    const [learningsupportUser, setlearningsupportUser] = useState(users);
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
        const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneLearningSupport/${id}`);
        setlearningsupportUser(response.data);
  
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
    
    // ✅ Ensure CKEditor updates when PedagogyUser.paragraph changes
    useEffect(() => {
      if (editorLoaded && window.CKEDITOR.instances.editor) {
        window.CKEDITOR.instances.editor.setData(learningsupportUser.paragraph);
      }
    }, [learningsupportUser.paragraph, editorLoaded]);
    
  
    const changeHandler = (e) => {
      const { name, value } = e.target;
      setlearningsupportUser({ ...learningsupportUser, [name]: value });
      // console.log(user);
    };
  
 const submitForm = async (e) => {
  e.preventDefault();

  const formData = {
    heading: learningsupportUser.heading,
    paragraph: window.CKEDITOR.instances.editor.getData(),
  };

  try {
    const response = await axios.put(
      `http://gosaviadvanceddentalclinic.com:8003/api/updateLearningSupport/${id}`,
      formData
    );

    toast.info("Data Updated Successfully!");
    fetchPedagogyData();
    navigate("/learningsupport");
  } catch (error) {
    console.error("There was an error!", error);
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
                <Link to="/learningsupport">
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
                    value={learningsupportUser.heading}
                    onChange={changeHandler}
                    className="form-control"
                    name="heading"
                  />
                  <br />
                </div>

                <div className="form-group">
                  <label>Paragraph</label>
                  <textarea id="editor"></textarea>
                  <br />
                </div>
              </div>
  
              <div className="modal-footer">
                <Link to="/learningsupport">
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

  export const Editlearningsupport = () => {
    const users = {
      title: "",
      description:""
    };
  
    const [learningsupportUser, setlearningsupportUser] = useState(users);
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
        const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneLearningSupport/${id}`);
        setlearningsupportUser(response.data);
  
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
        window.CKEDITOR.instances.editor.setData(learningsupportUser.description);
      }
    }, [learningsupportUser.description, editorLoaded]);

    const changeHandler = (e) => {
      const { name, value } = e.target;
      setlearningsupportUser({ ...learningsupportUser, [name]: value });
      // console.log(user);
    };
  
  
    const submitForm = async (e) => {
      e.preventDefault();
    
      // ✅ Get CKEditor content before submitting
      if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
        learningsupportUser.description = window.CKEDITOR.instances.editor.getData();
      }
    
      const formData = {
        title: learningsupportUser.title,
        description: window.CKEDITOR.instances.editor.getData(),
      }
    
      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updateLearningSupport/${id}`,
          formData
        );
        toast.info("Data Updated Successfully!");
        fetchPedagogyData();
        navigate("/learningsupport");
      } catch (error) {
        console.error("There was an error!", error);
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
                <Link to="/learningsupport">
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
                    value={learningsupportUser.title}
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
                <Link to="/learningsupport">
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
