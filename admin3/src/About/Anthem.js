import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AnthemHome = () => {
  const [Anthem, setAnthem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallanthem");
        setAnthem(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid all-school-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>
        {Anthem.map((user) => {
                return (
        <div className="col-lg-7 col-md-7 col-sm-12 view-sec-case">
          <h4>
            {user.heading}{" "}
            <Link to={`/anthem-edit/` + user._id}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
            <br />
          </h4>
          <p dangerouslySetInnerHTML={{__html: user.description}}></p>
</div>
        )})}
      </div>
    </div>
  );
};


export const EditAnthem = () => {
  const users = {
    heading: "",
    description: "",
  };

  const [AnthemUser, setAnthemUser] = useState(users);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneanthem/${id}`);
      setAnthemUser(response.data);

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
      window.CKEDITOR.instances.editor.setData(AnthemUser.description);
    }
  }, [AnthemUser.description, editorLoaded]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAnthemUser({ ...AnthemUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: AnthemUser.heading,
      description: window.CKEDITOR.instances.editor.getData(),
    };

    try {
      await axios.put(`http://gosaviadvanceddentalclinic.com:8003/api/updateanthem/${id}`, formData);
      toast.info("Data Updated Successfully!");
      navigate("/anthem");
      fetchPedagogyData();
    } catch (error) {
      console.error("There was an error updating the anthem!", error);
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
              <Link to="/anthem">
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
                  value={AnthemUser.heading}
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
              <Link to="/anthem">
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

  





