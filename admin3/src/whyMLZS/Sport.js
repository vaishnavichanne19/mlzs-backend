import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";


export const SportHome = () => {
  const [Sport, setSport] = useState([]);
  const navigate = useNavigate();
  const [mainHeading, setMainHeading] = useState("");
  const [mainDescription, setMainDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallsport");
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setSport(response.data.slice(1));
      }
      if (response.data.length > 0) {
        setMainDescription(response.data[0].description);
        setSport(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deleteSport/${userId}`
      );
      setSport((prevUser) =>
        prevUser.filter((user) => user._id !== userId)
      );
      console.log(response);
      toast.error("Data Deleted Successfully!");
      navigate("/Sport");
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
            <Link to={`/head-Sport-edit/${"679727d1d276efe04c7e0714"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
          <p dangerouslySetInnerHTML={{__html: mainDescription}}></p>
        </div>

       <div className="row">
           <div className="col-lg-2"></div>
           <div className="col-lg-10">
             <div>
               <Link to="/Sport-add">
                 <button className="sport-add-button">
                   <i class="fa-solid fa-plus"></i> Add 
                 </button>
               </Link>
             </div>
             <div className="row sport-details">
               {Sport.map((user) => {
                 return (
                   <div className="col-lg-6 slider-image">
                     <img
                       src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.sportimage}`}
                       alt="Sport Image"
                     />
                     <div className="icons">
                       <ul>
                         <li>
                           <Link to={`/Sport-view/` + user._id}>
                             <i className="fa-regular fa-eye" title="View"></i>
                           </Link>
                         </li>
                         <li>
                           <Link to={`/Sport-edit/` + user._id}>
                             <i
                               className="fa-regular fa-pen-to-square"
                               title="Edit"
                             ></i>
                           </Link>
                         </li>
                         <li>
                           <span onClick={() => deleteUser(user._id)}>
                             <i class="fa-solid fa-trash-can" title="Delete"></i>
                           </span>
                         </li>
                       </ul>
                     </div>
                   </div>
                 );
               })}
             </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export const AddSport = () => {
    const [SportImage, setSportImage] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        const maxSize = 1 * 1024 * 1024; 
    
        if (!validTypes.includes(file.type)) {
          setError("Invalid file type. Only JPG, JPEG, WEBP and PNG are allowed.");
          setSportImage(null);
          return;
        }
    
        if (file.size > maxSize) {
          setError("File size exceeds 1MB. Please upload a smaller file.");
          setSportImage(null);
          return;
        }
    
        setError("");
        setSportImage(file);
      }
    };
    
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      if (!SportImage) {
        setError("Please select a valid image file before submitting.");
        return;
      }

      const formData = new FormData();
      if (SportImage) {
        formData.append("sportimage", SportImage);
      }
  
      try {
        const response = await axios.post(
          "http://gosaviadvanceddentalclinic.com:8003/api/createsport",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        toast.success("Data Added Successfully!");
        navigate("/Sport");
      } catch (error) {
        toast.error("There was an error adding the Sport!");
        console.error("Error:", error);
      }
    };
  
    return (
      <div className="container-fluid popup-container">
        <div className="popup-content">
          <div className="adduser">
            <Link to="/Sport">
              <i className="fa-solid fa-xmark"></i>
            </Link>
            <h4>Add Sport Image</h4>
            <hr />
            <form className="row" onSubmit={submitForm}>
              <p style={{color:"red"}}>Image must be at least Width-400 Height-250 pixels!</p>
              <div className="col-lg-6 col-md-6 col-sm-12 inputform">
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>
              <div className="submitform">
                {error && <small style={{ color: "red" }}>{error}</small>}<br/>
                <button type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  
  export const EditSport = () => {
    const [SportImage, setSportImage] = useState(null);
    const [error, setError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      const editData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getonesport/${id}`
          );
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      editData();
    }, [id]);
  
    const validateImage = (file) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      const maxSize = 1 * 1024 * 1024;
  
    
      if (!allowedTypes.includes(file.type)) {
        setError("Invalid file type. Only JPG, JPEG, WEBP and PNG are allowed.");
        return false;
      }
  
   
      if (file.size > maxSize) {
        setError("File size exceeds the 1MB limit.");
        return false;
      }
  
      setError(""); 
      return true;
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file && validateImage(file)) {
        setSportImage(file);
      } else {
        setSportImage(null);
      }
    };
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      if (!SportImage) {
        setError("Please select a valid image file before submitting.");
        return;
      }
  
      const formData = new FormData();
      formData.append("sportimage", SportImage);
  
      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updatesport/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.info("Data Updated Successfully!");
        navigate("/Sport");
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
  
    return (
      <div className="container-fluid popup-container">
        <div className="popup-content">
          <div className="adduser">
            <Link to="/Sport">
              <i className="fa-solid fa-xmark"></i>
            </Link>
            <h4>Update Sport Image</h4>
            <hr />
            <form className="row" onSubmit={submitForm}>
            <p style={{color:"red"}}>Image must be at least Width-400 Height-250 pixels!</p>
              <div className="col-lg-6 col-md-6 col-sm-12 inputform">
                <input
                  type="file"
                   accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="submitform">
                {error && <small style={{ color: "red" }}>{error}</small>}<br/>
                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  
  export const ViewSport = () => {
      const [SportUser, setSportUser] = useState({
          sportimage: "",
        });
        const { id } = useParams();
      
        useEffect(() => {
          const SportData = async () => {
            try {
              const response = await axios.get(
                `http://gosaviadvanceddentalclinic.com:8003/api/getonesport/${id}`
              );
              setSportUser(response.data);
            } catch (error) {
              console.error("There was an error!", error);
            }
          };
          SportData();
        }, [id]);
  
        return(
          <div className="view-image">
                      <Link to="/Sport">
              <i className="fa-solid fa-xmark"></i>
            </Link>
            <img
              src={`http://gosaviadvanceddentalclinic.com:8003/images/${SportUser.sportimage}`}
              alt="Sport"
            />
        </div>
        )
      
  }

  export const EditTopDataSport = () => {
    const users = {
      heading: "",
      description:""
    };
  
    const [SportUser, setSportUser] = useState(users);
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
        const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getonesport/${id}`);
        setSportUser(response.data);
  
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
        window.CKEDITOR.instances.editor.setData(SportUser.description);
      }
    }, [SportUser.description, editorLoaded]);

    const changeHandler = (e) => {
      const { name, value } = e.target;
      setSportUser({ ...SportUser, [name]: value });
      // console.log(user);
    };
  
  
    const submitForm = async (e) => {
      e.preventDefault();
  
      const formData = {
        heading: SportUser.heading,
        description: window.CKEDITOR.instances.editor.getData()
      }
  
      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updatesport/${id}`,
          formData
        );
        // console.log(response);
       toast.info("Data Updated Successfully!");
        fetchPedagogyData();
        navigate("/Sport");
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
                <Link to="/Sport">
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
                    value={SportUser.heading}
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
                <Link to="/Sport">
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