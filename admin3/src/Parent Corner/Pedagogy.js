import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const PedagogyHome = () => {
  const [Pedagogy, setPedagogy] = useState([]);
  const [mainheading, setMainHeading] = useState("");
  const [description, setdescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallPedagogy"
      );
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setdescription(response.data[0].description);
        setPedagogy(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container philosophy">
      <div className="row arpi">
        <div className="col-lg-2 col-md-2 col-sm-12"></div>

        <div className="col-lg-8 col-md-8 col-sm-12 view-sec-case">
          <h4>
            {mainheading}{" "}
            <Link to={`/Pedagogy-heading-edit/${"67c98985e8a213a002f6092d"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
            <br />
          </h4>
          <p dangerouslySetInnerHTML={{__html: description}}></p>
            <hr />
          {Pedagogy.map((user) => {
            return (
              <div className="row">
                <h4>
                  {user.title}{" "}
                  <Link to={`/Pedagogy-edit/` + user._id}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                  <br />
                </h4>
                <p dangerouslySetInnerHTML={{ __html: user.paragraph }}></p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const EditHeadingPedagogy = () => {
  const users = {
    heading: "",
    description:"",
  };

  const [PedagogyUser, setPedagogyUser] = useState(users);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getonePedagogy/${id}`);
      setPedagogyUser(response.data);

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
  
  // ✅ Ensure CKEditor updates when PedagogyUser.description changes
  useEffect(() => {
    if (editorLoaded && window.CKEDITOR.instances.editor) {
      window.CKEDITOR.instances.editor.setData(PedagogyUser.description);
    }
  }, [PedagogyUser.description, editorLoaded]);
  


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPedagogyUser({ ...PedagogyUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: PedagogyUser.heading,
      description: window.CKEDITOR.instances.editor.getData(),
    };

    try {
      await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatePedagogy/${id}`,
        formData
      );
      fetchPedagogyData();
      toast.info("Data Updated Successfully!");
      navigate("/Pedagogy");
    } catch (error) {
      console.error("There was an error updating the Pedagogy!", error);
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
              <Link to="/Pedagogy">
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
                  value={PedagogyUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea id="editor"></textarea>
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/Pedagogy">
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

export const EditPedagogy = () => {
  const [PedagogyUser, setPedagogyUser] = useState({ title: "", paragraph: "" });
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getonePedagogy/${id}`);
      setPedagogyUser(response.data);

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
      window.CKEDITOR.instances.editor.setData(PedagogyUser.paragraph);
    }
  }, [PedagogyUser.paragraph, editorLoaded]);
  

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPedagogyUser((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      title: PedagogyUser.title,
      paragraph: window.CKEDITOR.instances.editor.getData(),
    };

    try {
      await axios.put(`http://gosaviadvanceddentalclinic.com:8003/api/updatePedagogy/${id}`, formData);
      toast.info("Data Updated Successfully!");

      // ✅ Update hone ke baad fresh data load karega
      fetchPedagogyData();
      navigate("/Pedagogy")
    } catch (error) {
      console.error("Error updating Pedagogy!", error);
      toast.error("Update failed!");
    }
  };

  return (
    <div
      className="modal fade show"
      id="update_heading"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      style={{ display: "block", paddingRight: 18, marginTop: 90, paddingBottom: 50 }}
      aria-modal="true"
    >
      <div className="modal-dialog" role="document">
        <form onSubmit={submitForm}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit</h5>
              <Link to="/Pedagogy">
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
                  value={PedagogyUser.title}
                  onChange={changeHandler}
                  className="form-control"
                  name="title"
                />
                <br/>
              </div>

              <div className="form-group">
                <label>Paragraph</label>
                <textarea id="editor"></textarea>
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/Pedagogy">
                <button type="button" className="btn btn-secondary">Close</button>
              </Link>
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};






