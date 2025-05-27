import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const GuidelinesHome = () => {
  const [Guidelines, setGuidelines] = useState([]);
  const [mainHeading, setmainHeading] = useState("");
  const [Description, setDescription] = useState("");
  const [mainSubHeading, setmainSubHeading] = useState("");
  const [Declaration, setDeclaration] = useState("");
  const [Paragraph, setParagraph] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallguidelines"
      );
      if (response.data.length > 0) {
        setmainHeading(response.data[0].heading);
        setDescription(response.data[0].description);
        setmainSubHeading(response.data[0].subheading);
        setDeclaration(response.data[0].declaration);
        setParagraph(response.data[0].paragraph);
        setGuidelines(response.data.slice(1));
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
            {mainHeading}{" "}
            <Link
              to={`/Guidelines-edit/${"67b2e2c1a5c1200383a460d6"}`}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h3>
          <p dangerouslySetInnerHTML={{ __html: Description }}></p>
          <h5>{mainSubHeading}</h5>
          <hr />
          <br />
          {Guidelines.map((user) => {
            return (
              <div className="row">
                <h5>
                  {user.title}{" "}
                  <Link to={`/Guidelines-point-edit/` + user._id}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                  <br />
                </h5>
                <p dangerouslySetInnerHTML={{ __html: user.points }}></p>
              </div>
            );
          })}
          <hr />
          <br />
          <h4>
            {Declaration}{" "}
            <Link
              to={`/Guidelines-declaration-edit/${"67b2e2c1a5c1200383a460d6"}`}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h4>
          <p dangerouslySetInnerHTML={{ __html: Paragraph }}></p>
        </div>
      </div>
    </div>
  );
};

export const EditGuidelines = () => {
  const users = {
    heading: "",
    subheading: "",
    description: "",
  };

  const [GuidelinesUser, setGuidelinesUser] = useState(users);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneguidelines/${id}`);
      setGuidelinesUser(response.data);

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
      window.CKEDITOR.instances.editor.setData(GuidelinesUser.description);
    }
  }, [GuidelinesUser.description, editorLoaded]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setGuidelinesUser({ ...GuidelinesUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: GuidelinesUser.heading,
      subheading: GuidelinesUser.subheading,
      description: window.CKEDITOR.instances.editor.getData(),
    };

    try {
      await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateguidelines/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      fetchPedagogyData();
      navigate("/Guidelines");
    } catch (error) {
      console.error("There was an error updating the Guidelines!", error);
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
              <Link to="/Guidelines">
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
                  value={GuidelinesUser.heading}
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

              <div className="form-group">
                <label>Sub-Heading</label>
                <input
                  type="text"
                  value={GuidelinesUser.subheading}
                  onChange={changeHandler}
                  className="form-control"
                  name="subheading"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/Guidelines">
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

export const EditGuidelinesPoint = () => {
  const users = {
    title: "",
    points: "",
  };

  const [GuidelinesUser, setGuidelinesUser] = useState(users);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneguidelines/${id}`);
      setGuidelinesUser(response.data);

      if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
        window.CKEDITOR.instances.editor.setData(response.data.points);
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
      window.CKEDITOR.instances.editor.setData(GuidelinesUser.points);
    }
  }, [GuidelinesUser.points, editorLoaded]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setGuidelinesUser({ ...GuidelinesUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      title: GuidelinesUser.title,
      points: window.CKEDITOR.instances.editor.getData(),
    };

    try {
      await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateguidelines/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      fetchPedagogyData();
      navigate("/Guidelines");
    } catch (error) {
      console.error("There was an error updating the Guidelines!", error);
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
              <Link to="/Guidelines">
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
                  value={GuidelinesUser.title}
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
              <Link to="/Guidelines">
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

export const EditGuidelinesDeclaration = () => {
  const users = {
    declaration: "",
    paragraph: "",
  };

  const [GuidelinesUser, setGuidelinesUser] = useState(users);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneguidelines/${id}`);
      setGuidelinesUser(response.data);

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
      window.CKEDITOR.instances.editor.setData(GuidelinesUser.paragraph);
    }
  }, [GuidelinesUser.paragraph, editorLoaded]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setGuidelinesUser({ ...GuidelinesUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      declaration: GuidelinesUser.declaration,
      paragraph: window.CKEDITOR.instances.editor.getData(),
    };

    try {
      await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateguidelines/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      fetchPedagogyData();
      navigate("/Guidelines");
    } catch (error) {
      console.error("There was an error updating the Guidelines!", error);
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
              <Link to="/Guidelines">
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
                  value={GuidelinesUser.declaration}
                  onChange={changeHandler}
                  className="form-control"
                  name="declaration"
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
              <Link to="/Guidelines">
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
