import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const WithdrawalPolicyHome = () => {
  const [WithdrawalPolicy, setWithdrawalPolicy] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallwithdrawalpolicy");
        setWithdrawalPolicy(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid all-school-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>
        {WithdrawalPolicy.map((user) => {
                return (
        <div className="col-lg-7 col-md-7 col-sm-12 view-sec-case">
          <h4>
            {user.heading}{" "}
            <Link to={`/WithdrawalPolicy-edit/` + user._id}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
            <br />
          </h4>
          <p dangerouslySetInnerHTML={{__html: user.description}}></p>
          <h6>{user.title}</h6>
          <p dangerouslySetInnerHTML={{__html: user.paragraph}}></p>
</div>
        )})}
      </div>
    </div>
  );
};



export const EditWithdrawalPolicy = () => {
  const users = {
    heading: "",
    description: "",
    title:"",
    paragraph:""
  };

  const [WithdrawalPolicyUser, setWithdrawalPolicyUser] = useState(users);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getonewithdrawalpolicy/${id}`);
      setWithdrawalPolicyUser(response.data);

      // ✅ Set CKEditor content if instances exist
      if (window.CKEDITOR) {
        if (window.CKEDITOR.instances.editor1) {
          window.CKEDITOR.instances.editor1.setData(response.data.description || "");
        }
        if (window.CKEDITOR.instances.editor2) {
          window.CKEDITOR.instances.editor2.setData(response.data.paragraph || "");
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
      window.CKEDITOR.instances.editor1.setData(WithdrawalPolicyUser.description || "");
    }
    if (editorLoaded && window.CKEDITOR.instances.editor2) {
      window.CKEDITOR.instances.editor2.setData(WithdrawalPolicyUser.paragraph || "");
    }
  }, [WithdrawalPolicyUser.description, WithdrawalPolicyUser.paragraph, editorLoaded]);



  const changeHandler = (e) => {
    const { name, value } = e.target;
    setWithdrawalPolicyUser({ ...WithdrawalPolicyUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: WithdrawalPolicyUser.heading,
      description: window.CKEDITOR.instances.editor1.getData(),
      title: WithdrawalPolicyUser.title,
      paragraph: window.CKEDITOR.instances.editor2.getData(),
    };

    try {
      await axios.put(`http://gosaviadvanceddentalclinic.com:8003/api/updatewithdrawalpolicy/${id}`, formData);
      toast.info("Data Updated Successfully!");
      fetchDirectorData();
      navigate("/WithdrawalPolicy");
    } catch (error) {
      console.error("There was an error updating the WithdrawalPolicy!", error);
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
              <Link to="/WithdrawalPolicy">
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
                  value={WithdrawalPolicyUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  id="editor1"
                ></textarea>
                <br />
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={WithdrawalPolicyUser.title}
                  onChange={changeHandler}
                  className="form-control"
                  name="title"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Paragraph</label>
                <textarea
                  id="editor2"
                ></textarea>
                <br />
              </div>

            </div>

            <div className="modal-footer">
              <Link to="/WithdrawalPolicy">
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



  





