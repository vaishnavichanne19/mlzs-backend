import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";


export const HouseSystemHome = () => {
  const [houseSystem, setHouseSystem] = useState([]);
  const [house, setHouse] = useState([]);
  const [mainHeading, setMainHeading] = useState("");
  const [loading, setLoading] = useState({ houseSystem: true, house: true });
  const navigate = useNavigate();

  // Reusable function to fetch data
  const fetchData = async (url, setState, key, updateLoading) => {
    try {
      const response = await axios.get(url);
      if (key === "houseSystem" && response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setState(response.data.slice(1));
      } else {
        setState(response.data);
      }
    } catch (error) {
      console.error(`Error fetching ${key} data:`, error);
      toast.error(`Failed to fetch ${key} data.`);
    } finally {
      updateLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  // Fetch HouseSystem data
  useEffect(() => {
    fetchData(
      "http://gosaviadvanceddentalclinic.com:8003/api/getallhousesystem",
      setHouseSystem,
      "houseSystem",
      setLoading
    );
  }, []);

  // Fetch House data
  useEffect(() => {
    fetchData(
      "http://gosaviadvanceddentalclinic.com:8003/api/getallhouse",
      setHouse,
      "house",
      setLoading
    );
  }, []);

 
  const deleteItem = async (url, id, setState, key) => {
    try {
      await axios.delete(`${url}/${id}`);
      setState((prev) => prev.filter((item) => item._id !== id));
      toast.error(`${key} deleted successfully!`);
      if (key === "houseSystem") navigate("/HouseSystem");
    } catch (error) {
      console.error(`Error deleting ${key}:`, error);
      toast.error(`Failed to delete ${key}.`);
    }
  };

  return (
    <div className="container-fluid all-school-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>
        <div className="col-lg-7 col-md-7 col-sm-12 view-sec-case">
          <h2>
            {mainHeading}{" "}
            <Link to={`/head-HouseSystem-edit/679894c4aea33fb0f0e41357`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
        </div>

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 schoolinfo-table">
            <Link to="/HouseSystem-add">
              <button type="button" className="calendar-add">
                <span>
                  <i className="fa-solid fa-plus"></i> Add Table Data
                </span>
              </button>
            </Link>
            {loading.houseSystem ? (
              <p></p>
            ) : (
              <table>
                <thead>
                <tr>
                  <th className="col-lg-1">House Name</th>
                  <th className="col-lg-2">House Incharge</th>
                  <th className="col-lg-2">Captain Boys</th>
                  <th className="col-lg-2">Captain Girls</th>
                  <th className="col-lg-1">Points</th>
                  <th className="col-lg-1">Action</th>
                </tr>
                </thead>
                <tbody>
                  {houseSystem.map((user) => (
                    <tr key={user._id}>
                      <td>{user.housename}</td>
                      <td>{user.houseincharge}</td>
                      <td>{user.captainboys}</td>
                      <td>{user.captaingirls}</td>
                      <td>{user.point}</td>
                      <td>
                        <Link to={`/HouseSystem-edit/${user._id}`}>
                          <i
                            title="Edit"
                            className="fa-regular fa-pen-to-square action-sec"
                            style={{ color: "darkblue" }}
                          ></i>
                        </Link>
                        <span
                          onClick={() =>
                            deleteItem(
                              "http://gosaviadvanceddentalclinic.com:8003/api/deletehousesystem",
                              user._id,
                              setHouseSystem,
                              "houseSystem"
                            )
                          }
                        >
                          <i
                            title="Delete"
                            className="fa-solid fa-trash-can action-sec"
                            style={{ color: "red" }}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <br />

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 schoolinfo-table">
            <hr />
            <Link to="/House-add">
              <button type="button" className="calendar-add">
                <span>
                  <i className="fa-solid fa-plus"></i> Add House System
                </span>
              </button>
            </Link>
            {loading.house ? (
              <p></p>
            ) : (
              <table>
                <thead>
                <tr>
                  <th className="col-lg-1">House Image</th>
                  <th className="col-lg-1">Heading</th>
                  <th className="col-lg-5">Description</th>
                  <th className="col-lg-2">Action</th>
                </tr>
                </thead>
                <tbody>
                  {house.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <img
                          src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.houseimage}`}
                          alt="House System Image"
                          style={{ width: "100px", height: "50px" }}
                        />
                      </td>
                      <td>{user.title}</td>
                      <td
                        dangerouslySetInnerHTML={{ __html: user.description }}
                      ></td>
                      <td>
                        <Link to={`/House-view/${user._id}`}>
                          <i
                            title="View"
                            className="fa-regular fa-eye action-sec"
                            style={{ color: "blue" }}
                          ></i>
                        </Link>
                        <Link to={`/House-edit/${user._id}`}>
                          <i
                            title="Edit"
                            className="fa-regular fa-pen-to-square action-sec"
                            style={{ color: "darkblue" }}
                          ></i>
                        </Link>
                        <span
                          onClick={() =>
                            deleteItem(
                              "http://gosaviadvanceddentalclinic.com:8003/api/deletehouse",
                              user._id,
                              setHouse,
                              "house"
                            )
                          }
                        >
                          <i
                            title="Delete"
                            className="fa-solid fa-trash-can action-sec"
                            style={{ color: "red" }}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddHouseSystem = () => {
  const users = {
    housename: "",
    houseincharge: "",
    captainboys: "",
    captaingirls: "",
    point: "",
  };
  const [HouseSystemUser, setHouseSystemUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setHouseSystemUser({ ...HouseSystemUser, [name]: value });
    console.log(HouseSystemUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      housename: HouseSystemUser.housename,
      houseincharge: HouseSystemUser.houseincharge,
      captainboys: HouseSystemUser.captainboys,
      captaingirls: HouseSystemUser.captaingirls,
      point: HouseSystemUser.point,
    };

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createhousesystem",
        formData
      );
      toast.success("Data Added Successfully!");
      navigate("/HouseSystem");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container about-details">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 aboutuser">
          <Link to="/HouseSystem">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>HouseSystem Details</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="housename">House Name</label>
              <input
                type="text"
                onChange={inputHandler}
                value={HouseSystemUser.housename}
                id="housename"
                name="housename"
                placeholder="House Name"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="houseincharge">House Incharge</label>
              <input
                type="text"
                onChange={inputHandler}
                value={HouseSystemUser.houseincharge}
                id="houseincharge"
                name="houseincharge"
                placeholder="House Incharge"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="captainboys">Captain Boys</label>
              <input
                type="text"
                onChange={inputHandler}
                value={HouseSystemUser.captainboys}
                id="captainboys"
                name="captainboys"
                placeholder="Captain Boys"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="captaingirls">Captain Girls</label>
              <input
                type="text"
                onChange={inputHandler}
                value={HouseSystemUser.captaingirls}
                id="captaingirls"
                name="captaingirls"
                placeholder="Captain Girls"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="point">Point</label>
              <input
                type="text"
                onChange={inputHandler}
                value={HouseSystemUser.point}
                id="point"
                name="point"
                placeholder="Point"
              />
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

export const EditHouseSystem = () => {
  const users = {
    housename: "",
    houseincharge: "",
    captainboys: "",
    captaingirls: "",
    point: "",
  };

  const [HouseSystemUser, setHouseSystemUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setHouseSystemUser({ ...HouseSystemUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const HouseSystemData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonehousesystem/${id}`
        );
        // console.log(response.data);
        setHouseSystemUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    HouseSystemData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      housename: HouseSystemUser.housename,
      houseincharge: HouseSystemUser.houseincharge,
      captainboys: HouseSystemUser.captainboys,
      captaingirls: HouseSystemUser.captaingirls,
      point: HouseSystemUser.point,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatehousesystem/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setHouseSystemUser(response.data.data);
      navigate("/HouseSystem");
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
              <Link to="/HouseSystem">
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
                <label>House Name</label>
                <input
                  type="text"
                  value={HouseSystemUser.housename}
                  onChange={changeHandler}
                  className="form-control"
                  name="housename"
                />
                <br />
              </div>

              <div className="form-group">
                <label>House Incharge</label>
                <input
                  type="text"
                  value={HouseSystemUser.houseincharge}
                  onChange={changeHandler}
                  className="form-control"
                  name="houseincharge"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Captain Boys</label>
                <input
                  type="text"
                  value={HouseSystemUser.captainboys}
                  onChange={changeHandler}
                  className="form-control"
                  name="captainboys"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Captain Girls</label>
                <input
                  type="text"
                  value={HouseSystemUser.captaingirls}
                  onChange={changeHandler}
                  className="form-control"
                  name="captaingirls"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Point</label>
                <input
                  type="text"
                  value={HouseSystemUser.point}
                  onChange={changeHandler}
                  className="form-control"
                  name="point"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/HouseSystem">
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

export const EditTopDataHouseSystem = () => {
  const users = {
    heading: "",
  };

  const [HouseSystemUser, setHouseSystemUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setHouseSystemUser({ ...HouseSystemUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonehousesystem/${id}`
        );
        // console.log(response.data);
        setHouseSystemUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: HouseSystemUser.heading,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatehousesystem/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setHouseSystemUser(response.data.data);
      navigate("/HouseSystem");
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
              <Link to="/HouseSystem">
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
                  value={HouseSystemUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/HouseSystem">
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

//   ************************************** house data api ****************************************************

export const AddHouse = () => {
  const users = {
    title: "",
    description: "",
  };
  const [HouseUser, setHouseUser] = useState(users);
  const [Houseimage, setHouseimage] = useState(null);
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
        setHouseUser((prev) => ({
          ...prev,
          description: window.CKEDITOR.instances.editor.getData(),
        }));
      });
    }
  }, [editorLoaded]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setHouseUser({ ...HouseUser, [name]: value });
    console.log(HouseUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!Houseimage) {
      alert("Please select a valid image file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("title", HouseUser.title);
    formData.append("description", HouseUser.description);

    if (Houseimage) formData.append("houseimage", Houseimage);

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createhouse",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Data Added Successfully!");
      navigate("/HouseSystem");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

   // validation 
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
    setHouseimage(file);
    console.log("File is valid. Proceed with upload...");
  };

  return (
    <div className="container about-details">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 aboutuser">
          <Link to="/HouseSystem">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>House Details</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="houseimage">House Image <span style={{color:"red"}}>("Image must be at least 150x150 pixels!")</span></label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="title">Heading</label>
              <input
                type="text"
                onChange={inputHandler}
                value={HouseUser.title}
                id="title"
                name="title"
                placeholder="Heading"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="description">Description</label>
              <textarea
                id="editor"
              ></textarea>
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

export const ViewHouse = () => {
  const [HouseUser, setHouseUser] = useState({
    title: "",
    description: "",
    houseimage: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const HouseData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonehouse/${id}`
        );
        setHouseUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    HouseData();
  }, [id]);

  return (
    <div className="container-fluid schoolinfo-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>

        <div className="col-lg-7 col-md-7 col-sm-12 view-sec">
          <Link to="/HouseSystem" className="back-btn">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <br />
          <br />

          <h4>
            {HouseUser.title}{" "}
            <Link to={`/House-edit/` + HouseUser._id}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h4>
          <img
            src={`http://gosaviadvanceddentalclinic.com:8003/images/${HouseUser.houseimage}`}
            alt="House Image"
          />
          <br />
          <p dangerouslySetInnerHTML={{ __html: HouseUser.description }}></p>
        </div>
      </div>
    </div>
  );
};

export const EditHouse = () => {
  const [HouseImage, setHouseImage] = useState(null);
  const users = {
    title: "",
    description: "",
  };

  const [HouseUser, setHouseUser] = useState(users);
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
        const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getonehouse/${id}`);
        setHouseUser(response.data);
  
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
        window.CKEDITOR.instances.editor.setData(HouseUser.description);
      }
    }, [HouseUser.description, editorLoaded]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setHouseUser({ ...HouseUser, [name]: value });
    // console.log(user);
  };


  const submitForm = async (e) => {
    e.preventDefault();

      // ✅ Get CKEditor content before submitting
      if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
        HouseUser.description = window.CKEDITOR.instances.editor.getData();
      }

    const formData = new FormData();
    formData.append("title", HouseUser.title);
    formData.append("description", HouseUser.description);
    if (HouseImage) formData.append("houseimage", HouseImage);

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatehouse/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      fetchPedagogyData();
      navigate("/HouseSystem");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  // validation 
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
    setHouseImage(file);
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
              <Link to="/HouseSystem">
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
                  value={HouseUser.title}
                  onChange={changeHandler}
                  className="form-control"
                  name="title"
                />
                <br />
              </div>

              <div className="form-group">
                <label>House Image <span style={{color:"red"}}>("Image must be at least 150x150 pixels!")</span></label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileUpload}
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
              <Link to="/HouseSystem">
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
