import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const ContactHome = () => {
    const [Contact, setContact] = useState([]);
    const navigate = useNavigate();
    const [mainHeading, setMainHeading] = useState("");
    const [mainPara, setMainPara] = useState("");
    const [mainSubtitle, setMainSubtitle] = useState("");
    const [mainPara2, setMainPara2] = useState("");
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallcontact");
        if (response.data.length > 0) {
          setMainHeading(response.data[0].heading);
          setMainPara(response.data[0].paragraph);
          setMainSubtitle(response.data[0].subtitle);
          setMainPara2(response.data[0].paragraph2);
          setContact(response.data.slice(1));
        }
      };
      fetchData();
    }, []);
  
    const deleteUser = async (userId) => {
      try {
        const response = await axios.delete(
          `http://gosaviadvanceddentalclinic.com:8003/api/deletecontact/${userId}`
        );
        setContact((prevUser) =>
          prevUser.filter((user) => user._id !== userId)
        );
        console.log(response);
        toast.error("Data Deleted Successfully!");
        navigate("/Contact");
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
  
    return (
      <div className="container-fluid all-school-view">
        <div className="row arpi">
          <div className="col-lg-3 col-md-3 col-sm-12"></div>
          <div className="col-lg-7 col-md-7 col-sm-12 view-sec-case">
            <h2>
              {mainHeading}{" "}
              <Link to={`/head-Contact-edit/${"67a07d9a3c0a63040f11aecb"}`}>
                <i className="fa-regular fa-pen-to-square"></i>
              </Link>
            </h2>
            <p>{mainPara}</p>
            <h5>{mainSubtitle}</h5>
            <p dangerouslySetInnerHTML={{__html: mainPara2}}></p>
          </div>
  
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-9 schoolinfo-table">
              <Link to="/Contact-add">
                <button type="button" className="academic-add">
                  <span>
                    <i className="fa-solid fa-plus"></i> Add{" "}
                  </span>
                </button>
              </Link>
              <table>
                <thead>
                  <tr>
                    <th className="col-lg-2">Title</th>
                    <th className="col-lg-5">Description</th>
                    <th className="col-lg-2">Action</th>
                  </tr>
                </thead>
  
                <tbody>
                {Contact.map((user) => {
                  return (
                  <tr key={user._id}>
                    <td><h6>{user.title}</h6></td>
                    <td>
                        <p dangerouslySetInnerHTML={{__html: user.description}}></p>
                    </td>
                    <td>
                        <Link to={`/Contact-edit/` + user._id}>
                          <i
                            title="Edit"
                            className="fa-regular fa-pen-to-square action-sec"
                            style={{ color: "darkblue" }}
                          ></i>
                        </Link>
  
                        <span onClick={() => deleteUser(user._id)}>
                          <i
                            title="Delete"
                            className="fa-solid fa-trash-can action-sec"
                            style={{ color: "red" }}
                          ></i>
                        </span>
                      </td>
                  </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export const AddContact = () => {
      const users = {
        title: "",
        description:"",
      };
      const [ContactUser, setContactUser] = useState(users);
      const navigate = useNavigate();
      const [editorLoaded, setEditorLoaded] = useState(false);
    
      // ✅ Load CKEditor dynamically
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
    
      // ✅ Initialize CKEditor when loaded
      useEffect(() => {
        if (editorLoaded && !window.CKEDITOR.instances.editor) {
          window.CKEDITOR.replace("editor", {
            height: 200,
          });
    
          window.CKEDITOR.instances.editor.on("change", function () {
            setContactUser((prev) => ({
              ...prev,
              description: window.CKEDITOR.instances.editor.getData(),
            }));
          });
        }
      }, [editorLoaded]);

      const inputHandler = (e) => {
        const { name, value } = e.target;
        setContactUser({ ...ContactUser, [name]: value });
        console.log(ContactUser);
      };
    
      const submitForm = async (e) => {
        e.preventDefault();
    
        const formData ={
            title: ContactUser.title,
            description: ContactUser.description
        }
        try {
          const response = await axios.post(
            "http://gosaviadvanceddentalclinic.com:8003/api/createcontact",
            formData
          );
          toast.success("Data Added Successfully!");;
          navigate("/Contact");
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
    
      return (
        <div className="container about-details">
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-10 aboutuser">
              <Link to="/Contact">
                <i className="fa-solid fa-xmark"></i>
              </Link>
              <h3>Contact Details</h3>
              <form className="row" onSubmit={submitForm}>
                <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
                  <label htmlFor="title">Heading</label>
                  <input
                    type="text"
                    onChange={inputHandler}
                    value={ContactUser.title}
                    id="title"
                    name="title"
                    placeholder="Heading"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    id="editor"
                  ></textarea>
                  <br />
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

export const EditContact = () => {
  const users = {
    heading: "",
    paragraph: "",
    subtitle:"",
    paragraph2:""
  };

  const [ContactUser, setContactUser] = useState(users);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getonecontact/${id}`);
      setContactUser(response.data);

      if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
        window.CKEDITOR.instances.editor.setData(response.data.paragraph2);
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
      window.CKEDITOR.instances.editor.setData(ContactUser.paragraph2);
    }
  }, [ContactUser.paragraph2, editorLoaded]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setContactUser({ ...ContactUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: ContactUser.heading,
      paragraph: ContactUser.paragraph,
      subtitle: ContactUser.subtitle,
      paragraph2: window.CKEDITOR.instances.editor.getData(),
    };

    try {
      await axios.put(`http://gosaviadvanceddentalclinic.com:8003/api/updatecontact/${id}`, formData);
      toast.info("Data Updated Successfully!");
      fetchPedagogyData();
      navigate("/Contact");
    } catch (error) {
      console.error("There was an error updating the Contact!", error);
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
              <Link to="/Contact">
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
                  value={ContactUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={ContactUser.paragraph}
                  onChange={changeHandler}
                  className="form-control"
                  name="paragraph"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={ContactUser.subtitle}
                  onChange={changeHandler}
                  className="form-control"
                  name="subtitle"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Paragraph</label>
                <textarea
                  id="editor"
                ></textarea>
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/Contact">
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


export const EditContactDetail = () => {
    const users = {
      title: "",
      description: "",
    };
  
    const [ContactUser, setContactUser] = useState(users);
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
        const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getonecontact/${id}`);
        setContactUser(response.data);
  
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
        window.CKEDITOR.instances.editor.setData(ContactUser.description);
      }
    }, [ContactUser.description, editorLoaded]);
  
    const changeHandler = (e) => {
      const { name, value } = e.target;
      setContactUser({ ...ContactUser, [name]: value });
    };
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      const formData = {
        title: ContactUser.title,
        description: window.CKEDITOR.instances.editor.getData(),
      };
  
      try {
        await axios.put(`http://gosaviadvanceddentalclinic.com:8003/api/updatecontact/${id}`, formData);
        toast.info("Data Updated Successfully!");
        fetchPedagogyData();
        navigate("/Contact");
      } catch (error) {
        console.error("There was an error updating the Contact!", error);
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
                <Link to="/Contact">
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
                    value={ContactUser.title}
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
                <Link to="/Contact">
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

  





