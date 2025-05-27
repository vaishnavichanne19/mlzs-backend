import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const SchoolTimingsHome = () => {
  const [SchoolTimings, setSchoolTimings] = useState([]);
  const navigate = useNavigate();
  const [mainHeading, setMainHeading] = useState("");
  const [mainLogo1, setMainLogo1] = useState("");
  const [mainLogo2, setMainLogo2] = useState("");
  const [mainSchoolAddress, setMainSchoolAddress] = useState("");
  const [mainAcademicYear, setMainAcademicYear] = useState("");
  const [mainSchoolTimingHeading, setMainSchoolTimingHeading] = useState("");
  const [mainTitle, setMainTitle] = useState("");
  const [mainDirectorName, setMainDirectorName] = useState("");
  const [mainAbout, setMainAbout] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://gosaviadvanceddentalclinic.com:8003/api/getallschooltiming"
        );
        if (response.data.length > 0) {
          const data = response.data[0];
          setMainHeading(data.heading);
          setMainLogo1(data.logo1);
          setMainLogo2(data.logo2);
          setMainSchoolAddress(data.schooladdress);
          setMainAcademicYear(data.academicyear);
          setMainSchoolTimingHeading(data.schooltimingheading);
          setMainTitle(data.title);
          setMainDirectorName(data.directorname);
          setMainAbout(data.about);
          setSchoolTimings(response.data.slice(1));
        }
      } catch (error) {
        console.error("Error fetching school timings:", error);
        toast.error("Failed to fetch school timings. Please check the server.");
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deleteschooltiming/${userId}`
      );
      setSchoolTimings((prevUser) =>
        prevUser.filter((user) => user._id !== userId)
      );
      console.log(response);
      toast.error("Data Deleted Successfully!");
      navigate("/SchoolTimings");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container-fluid all-school-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>
        <div className="col-lg-7 col-md-7 col-sm-12 view-sec-case">
          <h4>
            {mainHeading}{" "}
            <Link to={`/Heading-edit/${"67a08fdb12c4d132d2c0f190"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h4>
          <hr />
          <img
            src={`http://gosaviadvanceddentalclinic.com:8003/images/${mainLogo1}`}
            alt="School Timing Logo"
            style={{ width: "150px", height: "100px" }}
          />{" "}
          <Link to={`/Logo-edit/${"67a08fdb12c4d132d2c0f190"}`}>
            <i className="fa-regular fa-pen-to-square"></i>
          </Link>
          <br />
          <br />
          <img
            src={`http://gosaviadvanceddentalclinic.com:8003/images/${mainLogo2}`}
            alt="School Logo"
            style={{ width: "150px", height: "100px" }}
          />
          <hr />
          <h5>{mainAcademicYear}{" "}
            <Link to={`/SchoolName-edit/${"67a08fdb12c4d132d2c0f190"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h5>
          <h5 dangerouslySetInnerHTML={{__html: mainSchoolAddress}}></h5>
          <h5>{mainSchoolTimingHeading}</h5>
          <hr />
          <h5>
            {mainTitle}{" "}
            <Link to={`/DirectorName-edit/${"67a08fdb12c4d132d2c0f190"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h5>
          <p>{mainDirectorName}</p>
          <p>{mainAbout}</p>
        </div>

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 schoolinfo-table">
            <Link to="/SchoolTimings-add">
              <button type="button" className="academic-add">
                <span>
                  <i className="fa-solid fa-plus"></i> Add{" "}
                </span>
              </button>
            </Link>
            <table>
              <thead>
                <tr>
                  <th className="col-lg-3">Level</th>
                  <th className="col-lg-2">Day</th>
                  <th className="col-lg-2">Timing</th>
                  <th className="col-lg-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {SchoolTimings.map((user) => {
                  return user.days.map((day, index) => (
                    <tr key={`${user._id}-${index}`}>
                      <td>{user.level}</td>
                      <td>{day}</td>
                      <td>{user.timing[index]}</td>
                      <td>
                        <Link to={`/SchoolTiming-table-edit/${user._id}?day=${day}`}>
                          <i className="fa-regular fa-pen-to-square action-sec" style={{ color: "darkblue" }}></i>
                        </Link>
                        <span onClick={() => deleteUser(user._id)}>
                          <i className="fa-solid fa-trash-can action-sec" style={{ color: "red" }}></i>
                        </span>
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


export const AddSchoolTimings = () => {
  const users = {
    level: "",
    days: [],
    timing: [],
  };

  const [SchoolTimingsUser, setSchoolTimingsUser] = useState(users);
  const [dayInput, setDayInput] = useState("");
  const [timingInput, setTimingInput] = useState("");
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setSchoolTimingsUser({ ...SchoolTimingsUser, [name]: value });
  };

  const addDay = () => {
    if (dayInput) {
      setSchoolTimingsUser({
        ...SchoolTimingsUser,
        days: [...SchoolTimingsUser.days, dayInput],
      });
      setDayInput("");
    }
  };

  const addTiming = () => {
    if (timingInput) {
      setSchoolTimingsUser({
        ...SchoolTimingsUser,
        timing: [...SchoolTimingsUser.timing, timingInput],
      });
      setTimingInput("");
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createschooltiming",
        SchoolTimingsUser
      );
      toast.success("Data Added Successfully!");
      navigate("/SchoolTimings");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container about-details">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 aboutuser">
               <Link to="/SchoolTimings">
                                <i className="fa-solid fa-xmark"></i>
                              </Link>
          <h3>School Timings Details</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 aboutinputform">
              <label htmlFor="level">Level</label>
              <input
                type="text"
                onChange={inputHandler}
                value={SchoolTimingsUser.level}
                id="level"
                name="level"
                placeholder="Level"
              />
            </div>

            <div className="col-lg-12 aboutinputform">
              <label htmlFor="days">Days</label>
              <input
                type="text"
                value={dayInput}
                onChange={(e) => setDayInput(e.target.value)}
                placeholder="Enter a day"
              />
              <button type="button" onClick={addDay}>
                Add Day
              </button>
              <ul>
                {SchoolTimingsUser.days.map((day, index) => (
                  <li key={index}>{day}</li>
                ))}
              </ul>
            </div>

            <div className="col-lg-12 aboutinputform">
              <label htmlFor="timing">Timings</label>
              <input
                type="text"
                value={timingInput}
                onChange={(e) => setTimingInput(e.target.value)}
                placeholder="Enter timing"
              />
              <button type="button" onClick={addTiming}>
                Add Timing
              </button>
              <ul>
                {SchoolTimingsUser.timing.map((time, index) => (
                  <li key={index}>{time}</li>
                ))}
              </ul>
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

// ************************************************ Header Part **************************************************************
 
export const EditHeading = () => {
    const users = {
      heading: "",
    };

    const [SchoolTimingsUser, setSchoolTimingsUser] = useState(users);
    const { id } = useParams();
    const navigate = useNavigate();

    const changeHandler = (e) => {
      const { name, value } = e.target;
      setSchoolTimingsUser({ ...SchoolTimingsUser, [name]: value });
    };

    useEffect(() => {
      const SchoolInfoData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getoneschooltiming/${id}`
          );
          // console.log(response.data);
          setSchoolTimingsUser(response.data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      SchoolInfoData();
    }, [id]);

    const submitForm = async (e) => {
      e.preventDefault();

      const formData = {
        heading: SchoolTimingsUser.heading
      }

      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updateschooltiming/${id}`,
          formData
        );
        // console.log(response);
       toast.info("Data Updated Successfully!");
        setSchoolTimingsUser(response.data.data);
        navigate("/SchoolTimings");
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
                <Link to="/SchoolTimings">
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
                    value={SchoolTimingsUser.heading}
                    onChange={changeHandler}
                    className="form-control"
                    name="heading"
                  />
                  <br />
                </div>
              </div>

              <div className="modal-footer">
                <Link to="/SchoolTimings">
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
  
  export const EditLogo = () => {
    const [Logo1, setLogo1] = useState(null);
    const [Logo2, setLogo2] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
      const SchoolInfoData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getoneschooltiming/${id}`
          );
          // Optionally, set existing logo names to preview them
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      SchoolInfoData();
    }, [id]);
  
    const submitForm = async (e) => {
      e.preventDefault();
      if (!Logo1) {
        alert("Please select a valid image file before submitting.");
        return;
      }
      if (!Logo2) {
        alert("Please select a valid image file before submitting.");
        return;
      }
      const formData = new FormData();
      if (Logo1) {
        formData.append("logo1", Logo1);
      }
      if (Logo2) {
        formData.append("logo2", Logo2);
      }
  
      try {
        await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updateschooltiming/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.info("Data Updated Successfully!");
        navigate("/SchoolTimings");
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
  
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
      setLogo1(file);
      console.log("File is valid. Proceed with upload...");
    };

    const handleFileUploads = (event) => {
      const file = event.target.files[0];
      const validation = validateFile(file);
    
      if (!validation.isValid) {
        alert(validation.message);
        return;
      }
      setLogo2(file);
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
                <Link to="/SchoolTimings">
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
                  <label htmlFor="logo1">Logo1 <span style={{color:"red"}}>("Logo must be at least Width-150 Height-100 pixels!")</span></label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  <br />
                </div>
                <div className="form-group">
                  <label htmlFor="logo2">Logo2 <span style={{color:"red"}}>("Logo must be at least Width-150 Height-100 pixels!")</span></label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                onChange={handleFileUploads}
                  />
                  <br />
                </div>
              </div>
  
              <div className="modal-footer">
                <Link to="/SchoolTimings">
                  <button type="button" className="btn btn-secondary">
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
  
  export const EditSchoolName = () => {
    const users = {
      schooladdress: "",
      academicyear:"",
      schooltimingheading:""
    };

    const [SchoolTimingsUser, setSchoolTimingsUser] = useState(users);
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
        const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getoneschooltiming/${id}`);
        setSchoolTimingsUser(response.data);
  
        if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
          window.CKEDITOR.instances.editor.setData(response.data.schooladdress);
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
        window.CKEDITOR.instances.editor.setData(SchoolTimingsUser.schooladdress);
      }
    }, [SchoolTimingsUser.schooladdress, editorLoaded]);


    const changeHandler = (e) => {
      const { name, value } = e.target;
      setSchoolTimingsUser({ ...SchoolTimingsUser, [name]: value });
    };



    const submitForm = async (e) => {
      e.preventDefault();

      const formData = {
        schooladdress: window.CKEDITOR.instances.editor.getData(),
        academicyear: SchoolTimingsUser.academicyear,
        schooltimingheading: SchoolTimingsUser.schooltimingheading
      }

      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updateschooltiming/${id}`,
          formData
        );
        // console.log(response);
       toast.info("Data Updated Successfully!");
        fetchPedagogyData();
        navigate("/SchoolTimings");
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
                <Link to="/SchoolTimings">
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
                  <label>School Address</label>
                  <textarea
                  id="editor"
                ></textarea>
                  <br />
                </div>

                <div className="form-group">
                  <label>Academic Year</label>
                  <input
                    type="text"
                    value={SchoolTimingsUser.academicyear}
                    onChange={changeHandler}
                    className="form-control"
                    name="academicyear"
                  />
                  <br />
                </div>

                <div className="form-group">
                  <label>School Timing Heading</label>
                  <input
                    type="text"
                    value={SchoolTimingsUser.schooltimingheading}
                    onChange={changeHandler}
                    className="form-control"
                    name="schooltimingheading"
                  />
                  <br />
                </div>
              </div>

              <div className="modal-footer">
                <Link to="/SchoolTimings">
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

  export const EditDirectorName = () => {
    const users = {
      title: "",
      directorname:"",
      about:""
    };

    const [SchoolTimingsUser, setSchoolTimingsUser] = useState(users);
    const { id } = useParams();
    const navigate = useNavigate();

    const changeHandler = (e) => {
      const { name, value } = e.target;
      setSchoolTimingsUser({ ...SchoolTimingsUser, [name]: value });
    };

    useEffect(() => {
      const SchoolInfoData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getoneschooltiming/${id}`
          );
          // console.log(response.data);
          setSchoolTimingsUser(response.data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      SchoolInfoData();
    }, [id]);

    const submitForm = async (e) => {
      e.preventDefault();

      const formData = {
        title: SchoolTimingsUser.title,
        directorname: SchoolTimingsUser.directorname,
        about: SchoolTimingsUser.about
      }

      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updateschooltiming/${id}`,
          formData
        );
        // console.log(response);
       toast.info("Data Updated Successfully!");
        setSchoolTimingsUser(response.data.data);
        navigate("/SchoolTimings");
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
                <Link to="/SchoolTimings">
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
                    value={SchoolTimingsUser.title}
                    onChange={changeHandler}
                    className="form-control"
                    name="title"
                  />
                  <br />
                </div>

                <div className="form-group">
                  <label>Director Name</label>
                  <input
                    type="text"
                    value={SchoolTimingsUser.directorname}
                    onChange={changeHandler}
                    className="form-control"
                    name="directorname"
                  />
                  <br />
                </div>

                <div className="form-group">
                  <label>About Director</label>
                  <input
                    type="text"
                    value={SchoolTimingsUser.about}
                    onChange={changeHandler}
                    className="form-control"
                    name="about"
                  />
                  <br />
                </div>
              </div>

              <div className="modal-footer">
                <Link to="/SchoolTimings">
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



  export const EditSchoolTimings = () => {
    const users = {
      level: "",
      days: [],
      timing: []
    };
  
    const [SchoolTimingsUser, setSchoolTimingsUser] = useState(users);
    const { id } = useParams();
    const navigate = useNavigate();
  
    const changeHandler = (e, index, field) => {
      const updatedData = [...SchoolTimingsUser[field]];
      updatedData[index] = e.target.value;
      setSchoolTimingsUser({ ...SchoolTimingsUser, [field]: updatedData });
    };
  
    useEffect(() => {
      const SchoolTimingsData = async () => {
        try {
          const response = await axios.get(
            `http://gosaviadvanceddentalclinic.com:8003/api/getoneschooltiming/${id}`
          );
          setSchoolTimingsUser(response.data);
        } catch (error) {
          console.error("There was an error!", error);
        }
      };
      SchoolTimingsData();
    }, [id]);
  
    const submitForm = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(
          `http://gosaviadvanceddentalclinic.com:8003/api/updateschooltiming/${id}`,
          SchoolTimingsUser,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.info("Data Updated Successfully!");
        setSchoolTimingsUser(response.data.data);
        navigate("/SchoolTimings");
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
  
    return (
      <div className="modal fade show" id="update_heading" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" style={{ display: "block", paddingRight: 18, marginTop: 90, paddingBottom: 50 }} aria-modal="true">
        <div className="modal-dialog" role="document">
          <form onSubmit={submitForm}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                <Link to="/SchoolTimings">
                  <button type="button" className="close" aria-label="Close" style={{ position: "relative", left: "380px", backgroundColor: "#064a76", color: "white", padding: 4 }}>
                    <span aria-hidden="true">
                      <i className="fa-solid fa-xmark close-btn"></i>
                    </span>
                  </button>
                </Link>
              </div>
  
              <div className="modal-body">
                <div className="form-group">
                  <label>Level</label>
                  <input type="text" value={SchoolTimingsUser.level} onChange={(e) => setSchoolTimingsUser({ ...SchoolTimingsUser, level: e.target.value })} className="form-control" name="level" />
                  <br />
                </div>
  
                {SchoolTimingsUser.days.map((day, index) => (
                  <div key={index} className="form-group">
                    <label>Day {index + 1}</label>
                    <input type="text" value={day} onChange={(e) => changeHandler(e, index, "days")} className="form-control" />
                    <br />
                  </div>
                ))}
  
                {SchoolTimingsUser.timing.map((time, index) => (
                  <div key={index} className="form-group">
                    <label>Timing {index + 1}</label>
                    <input type="text" value={time} onChange={(e) => changeHandler(e, index, "timing")} className="form-control" />
                    <br />
                  </div>
                ))}
              </div>
  
              <div className="modal-footer">
                <Link to="/SchoolTimings">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
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
  


