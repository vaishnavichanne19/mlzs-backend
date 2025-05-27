import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const NewAndEventHome = () => {
  const [NewAndEvent, setNewAndEvent] = useState([]);
  const [mainHeading, setMainHeading] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallnewandevent"
      );
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setNewAndEvent(response.data.slice(1));
        setFilteredData(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deletenewandevent/${userId}`
      );
      setNewAndEvent((prevUser) =>
        prevUser.filter((user) => user._id !== userId)
      );
      setFilteredData((prevUser) =>
        prevUser.filter((user) => user._id !== userId)
      );
      toast.error("Data Deleted Successfully!");
      navigate("/NewAndEvent");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  // Handle search filter
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = NewAndEvent.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercasedQuery) ||
      item.description.toLowerCase().includes(lowercasedQuery) ||
        item.date.includes(lowercasedQuery)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, NewAndEvent]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container-fluid all-school-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>
        <div className="col-lg-7 col-md-7 col-sm-12 view-sec-case">
          <h2>
            {mainHeading}{" "}
            <Link to={`/head-NewAndEvent-edit/67b32e5a028e31dc5d9a2140`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
        </div>

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 schoolinfo-table">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Link to="/NewAndEvent-add">
                <button type="button" className="calendar-add">
                  <span>
                    <i className="fa-solid fa-plus"></i> Add New & Event{" "}
                  </span>
                </button>
              </Link>
              <input
                type="text"
                className="calendar-input form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="calendar-select form-select"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={5}>5 entries</option>
                <option value={10}>10 entries</option>
                <option value={15}>15 entries</option>
              </select>
            </div>

            <table>
              <thead>
                <tr>
                  <th className="col-lg-1">Sr. No</th>
                  <th className="col-lg-1">Image</th>
                  <th className="col-lg-1">Title</th>
                  <th className="col-lg-3">Description</th>
                  <th className="col-lg-1">Date</th>
                  <th className="col-lg-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>
                        <img
                          src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.newandeventimage}`}
                          alt="New And Event Image"
                          style={{ width: "100px", height: "80px" }}
                        />
                      </td>
                      <td>
                        <h6>{user.title}</h6>
                      </td>
                      <td>
                        <p
                          dangerouslySetInnerHTML={{ __html: user.description }}
                        ></p>
                      </td>
                      <td>
                        <h6>{user.date}</h6>
                      </td>
                      <td>
                        <Link to={`/NewAndEvent-view/${user._id}`}>
                          <i
                            title="View"
                            className="fa-regular fa-eye action-sec"
                            style={{ color: "blue" }}
                          ></i>
                        </Link>
                        <Link to={`/NewAndEvent-edit/${user._id}`}>
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
                  );
                })}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center">
              <span>
                Showing {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, filteredData.length)} of{" "}
                {filteredData.length} entries
              </span>
              <div>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddNewAndEvent = () => {
  const users = {
    title: "",
    description: "",
    date: "",
  };
  const [NewAndEventUser, setNewAndEventUser] = useState(users);
  const [NewAndEventImage, setNewAndEventImage] = useState(null);
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
          setNewAndEventUser((prev) => ({
            ...prev,
            description: window.CKEDITOR.instances.editor.getData(),
          }));
        });
      }
    }, [editorLoaded]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewAndEventUser({ ...NewAndEventUser, [name]: value });
    console.log(NewAndEventUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!NewAndEventImage) {
      alert("Please select a valid image file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("date", NewAndEventUser.date);
    formData.append("description", NewAndEventUser.description);
    formData.append("title", NewAndEventUser.title);
    if (NewAndEventImage) formData.append("newandeventimage", NewAndEventImage);

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createnewandevent",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Data Added Successfully!");
      navigate("/NewAndEvent");
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
      setNewAndEventImage(file);
      console.log("File is valid. Proceed with upload...");
    };

  return (
    <div className="container about-details">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 aboutuser">
          <Link to="/NewAndEvent">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>New And Event Details</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="newandeventimage">Image <span style={{color:"red"}}>("Image must be at least Width-170 Height-150 pixels!")</span></label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                onChange={inputHandler}
                value={NewAndEventUser.title}
                id="title"
                name="title"
                placeholder="Title"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="description">Description</label>
              <input
                id="editor"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="date">Date</label>
              <input
                type="text"
                onChange={inputHandler}
                value={NewAndEventUser.date}
                id="date"
                name="date"
                placeholder="Date"
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

export const EditNewAndEvent = () => {
  const users = {
    title: "",
    description: "",
    date: "",
  };

  const [NewAndEventUser, setNewAndEventUser] = useState(users);
  const [NewAndEventImage, setNewAndEventImage] = useState(null);
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
      const response = await axios.get(`http://gosaviadvanceddentalclinic.com:8003/api/getonenewandevent/${id}`);
      setNewAndEventUser(response.data);

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
      window.CKEDITOR.instances.editor.setData(NewAndEventUser.description);
    }
  }, [NewAndEventUser.description, editorLoaded]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewAndEventUser({ ...NewAndEventUser, [name]: value });
    // console.log(user);
  };


  const submitForm = async (e) => {
    e.preventDefault();

    // ✅ Get CKEditor content before submitting
    if (window.CKEDITOR && window.CKEDITOR.instances.editor) {
      NewAndEventUser.description = window.CKEDITOR.instances.editor.getData();
    }

    const formData = new FormData();
    formData.append("date", NewAndEventUser.date);
    formData.append("description", NewAndEventUser.description);
    formData.append("title", NewAndEventUser.title);
    if (NewAndEventImage) formData.append("newandeventimage", NewAndEventImage);

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatenewandevent/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      fetchPedagogyData();
      navigate("/NewAndEvent");
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
      setNewAndEventImage(file);
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
              <Link to="/NewAndEvent">
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
                <label>Image <span style={{color:"red"}}>("Image must be at least Width-170 Height-150 pixels!")</span></label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                <br />
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={NewAndEventUser.title}
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

              <div className="form-group">
                <label>Date</label>
                <input
                  type="text"
                  value={NewAndEventUser.date}
                  onChange={changeHandler}
                  className="form-control"
                  name="date"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/NewAndEvent">
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

export const EditTopDataNewAndEvent = () => {
  const users = {
    heading: "",
  };

  const [NewAndEventUser, setNewAndEventUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewAndEventUser({ ...NewAndEventUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonenewandevent/${id}`
        );
        // console.log(response.data);
        setNewAndEventUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: NewAndEventUser.heading,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatenewandevent/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setNewAndEventUser(response.data.data);
      navigate("/NewAndEvent");
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
              <Link to="/NewAndEvent">
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
                  value={NewAndEventUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/NewAndEvent">
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

export const ViewNewAndEvent = () => {
  const [NewAndEventUser, setNewAndEventUser] = useState({
    title: "",
    description: "",
    date: "",
    newandeventimage: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const NewAndEventData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonenewandevent/${id}`
        );
        setNewAndEventUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    NewAndEventData();
  }, [id]);

  return (
    <div className="container-fluid schoolinfo-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>

        <div className="col-lg-7 col-md-7 col-sm-12 view-sec">
          <Link to="/NewAndEvent" className="back-btn">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <br />
          <br />

          <h4>
            {NewAndEventUser.title}{" "}
            <Link to={`/NewAndEvent-edit/` + NewAndEventUser._id}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h4>
          <p
            dangerouslySetInnerHTML={{ __html: NewAndEventUser.description }}
          ></p>
          <h5>{NewAndEventUser.date}</h5>
          <img
            src={`http://gosaviadvanceddentalclinic.com:8003/images/${NewAndEventUser.newandeventimage}`}
            alt="NewAndEvent Image"
          />
          <br />
        </div>
      </div>
    </div>
  );
};
