import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const CareerHome = () => {
  const [Career, setCareer] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallcareer");
        setCareer(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid all-school-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>
        {Career.map((user) => {
                return (
        <div className="col-lg-7 col-md-7 col-sm-12 view-sec-case">
          <h4>
            {user.heading}{" "}
            <Link to={`/Career-edit/` + user._id}>
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



export const EditCareer = () => {
  const users = {
    heading: "",
    description: "",
  };

  const [CareerUser, setCareerUser] = useState(users);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getonecareer/${id}`);
      setCareerUser(response.data);

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
      window.CKEDITOR.instances.editor.setData(CareerUser.description);
    }
  }, [CareerUser.description, editorLoaded]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCareerUser({ ...CareerUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: CareerUser.heading,
      description: window.CKEDITOR.instances.editor.getData(),
    };

    try {
      await axios.put(`http://gosaviadvanceddentalclinic.com:8003/api/updatecareer/${id}`, formData);
      toast.info("Data Updated Successfully!");
      fetchPedagogyData();
      navigate("/Career");
    } catch (error) {
      console.error("There was an error updating the Career!", error);
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
              <Link to="/Career">
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
                  value={CareerUser.heading}
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
              <Link to="/Career">
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



  





