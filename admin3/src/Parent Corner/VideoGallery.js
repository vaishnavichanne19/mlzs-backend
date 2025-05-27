import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const VideoGalleryHome = () => {
  const [VideoGallery, setVideoGallery] = useState([]);
  const navigate = useNavigate();
  const [mainHeading, setMainHeading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallvideogallery"
      );
      if (response.data.length > 0) {
        setMainHeading(response.data[0].heading);
        setVideoGallery(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deletevideogallery/${userId}`
      );
      setVideoGallery((prevUser) =>
        prevUser.filter((user) => user._id !== userId)
      );
      console.log(response);
      toast.error("Data Deleted Successfully!");
      navigate("/VideoGallery");
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
            <Link to={`/head-VideoGallery-edit/${"6799d4ae781495f180d2b9eb"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
        </div>

        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 schoolinfo-table">
            <Link to="/VideoGallery-add">
              <button type="button" className="academic-add">
                <span>
                  <i className="fa-solid fa-plus"></i> Add{" "}
                </span>
              </button>
            </Link>
            <table>
              <thead>
                <tr>
                  <th className="col-lg-2">Video Gallery</th>
                  <th className="col-lg-1">Heading</th>
                  <th className="col-lg-4">Description</th>
                  <th className="col-lg-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {VideoGallery.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>
                        {user.video ? (
                          <video
                            src={`http://gosaviadvanceddentalclinic.com:8003/videos/${user.video}`}
                            width="150"
                            height="130"
                            controls
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : user.url ? (
                          // Display YouTube video if URL is available
                          <iframe
                            width="200"
                            height="150"
                            src={`https://www.youtube.com/embed/${user.url}`}
                            frameBorder="0"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <p>No video available</p>
                        )}
                        <br />
                        <br />
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
                        <Link to={`/VideoGallery-view/` + user._id}>
                          <i
                            title="View"
                            className="fa-regular fa-eye action-sec"
                            style={{ color: "blue" }}
                          ></i>
                        </Link>
                        <Link to={`/VideoGallery-edit/` + user._id}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddVideoGallery = () => {
  const users = {
    title: "",
    description: "",
    url: "",
  };
  const [VideoGalleryUser, setVideoGalleryUser] = useState(users);
  const [VideoGallery, setVideoGallery] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ClassicEditor && document.getElementById("description-editor")) {
      let editorInstance;

      window.ClassicEditor.create(document.getElementById("description-editor"))
        .then((editor) => {
          editor.setData(VideoGalleryUser.description || "");
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            setVideoGalleryUser((prev) => ({ ...prev, description: data }));
          });

          editorInstance = editor;
        })
        .catch((error) => {
          console.error("CKEditor initialization error:", error);
        });

      return () => {
        if (editorInstance) {
          editorInstance.destroy().catch((error) => {
            console.error("Error destroying the editor instance:", error);
          });
        }
      };
    } else {
      console.error(
        "ClassicEditor is not defined. Ensure the CKEditor CDN script is loaded."
      );
    }
  }, [VideoGalleryUser.description]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setVideoGalleryUser({ ...VideoGalleryUser, [name]: value });
    console.log(VideoGalleryUser);
  };

  const extractYouTubeID = (url) => {
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/\S*\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const youtubeID = extractYouTubeID(VideoGalleryUser.url);
    const formData = new FormData();
    formData.append("title", VideoGalleryUser.title);
    formData.append("description", VideoGalleryUser.description);
    formData.append("url", youtubeID);
    if (VideoGallery) formData.append("video", VideoGallery);

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createvideogallery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Data Added Successfully!");
      navigate("/VideoGallery");
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
        message: `File size exceeds the limit! Max size for ${fileCategory} is ${
          fileRules[fileCategory].maxSize / (1024 * 1024)
        }MB.`,
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
    setVideoGallery(file);
    console.log("File is valid. Proceed with upload...");
  };

  return (
    <div className="container about-details">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 aboutuser">
          <Link to="/VideoGallery">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>Video Gallery Details</h3>
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="video">
                {" "}
                Video{" "}
                <span style={{ color: "red" }}>
                  ("Video must be at least Width-95% Height-100%")
                </span>
              </label>
              <input type="file" accept="video/*" onChange={handleFileUpload} />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="url">YouTube Video URL (Add Full URL)</label>
              <input
                type="text"
                onChange={inputHandler}
                value={VideoGalleryUser.url}
                id="url"
                name="url"
                placeholder="Enter YouTube Video URL"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="title">Heading</label>
              <input
                type="text"
                onChange={inputHandler}
                value={VideoGalleryUser.title}
                id="title"
                name="title"
                placeholder="Heading (Enter Date (e.g. [1/01/25]))"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="description">Description</label>
              <textarea
                id="description-editor"
                defaultValue={VideoGalleryUser.description}
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

export const ViewVideoGallery = () => {
  const [VideoGalleryUser, setVideoGalleryUser] = useState({
    title: "",
    description: "",
    video: "",
    url: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const VideoGalleryData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonevideogallery/${id}`
        );
        setVideoGalleryUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    VideoGalleryData();
  }, [id]);

  return (
    <div className="container-fluid schoolinfo-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>

        <div className="col-lg-7 col-md-7 col-sm-12 view-sec">
          <Link to="/VideoGallery" className="back-btn">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <br />
          <br />

          <h4>
            {VideoGalleryUser.title}{" "}
            <Link to={`/VideoGallery-edit/` + VideoGalleryUser._id}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h4>
          <p
            dangerouslySetInnerHTML={{ __html: VideoGalleryUser.description }}
          ></p>
          <br />

          {VideoGalleryUser.video ? (
            <video
              src={`http://gosaviadvanceddentalclinic.com:8003/videos/${VideoGalleryUser.video}`}
              width="600"
              height="330"
              controls
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              width="600"
              height="350"
              src={`https://www.youtube.com/embed/${VideoGalleryUser.url}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export const EditTopDataVideoGallery = () => {
  const users = {
    heading: "",
  };

  const [VideoGalleryUser, setVideoGalleryUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setVideoGalleryUser({ ...VideoGalleryUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const VideoGalleryData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonevideogallery/${id}`
        );
        // console.log(response.data);
        setVideoGalleryUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    VideoGalleryData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: VideoGalleryUser.heading,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatevideogallery/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setVideoGalleryUser(response.data.data);
      navigate("/VideoGallery");
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
              <Link to="/VideoGallery">
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
                  value={VideoGalleryUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/VideoGallery">
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

export const EditVideoGallery = () => {
  const users = {
    title: "",
    description: "",
    url: "",
  };

  const [VideoGallery, setVideoGallery] = useState(null);
  const [VideoGalleryUser, setVideoGalleryUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ClassicEditor && document.getElementById("description-editor")) {
      let editorInstance;

      window.ClassicEditor.create(document.getElementById("description-editor"))
        .then((editor) => {
          editor.setData(VideoGalleryUser.description || "");
          editor.model.document.on("change:data", () => {
            const data = editor.getData();
            setVideoGalleryUser((prev) => ({ ...prev, description: data }));
          });

          editorInstance = editor;
        })
        .catch((error) => {
          console.error("CKEditor initialization error:", error);
        });

      return () => {
        if (editorInstance) {
          editorInstance.destroy().catch((error) => {
            console.error("Error destroying the editor instance:", error);
          });
        }
      };
    } else {
      console.error(
        "ClassicEditor is not defined. Ensure the CKEditor CDN script is loaded."
      );
    }
  }, [VideoGalleryUser.description]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setVideoGalleryUser({ ...VideoGalleryUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonevideogallery/${id}`
        );
        // console.log(response.data);
        setVideoGalleryUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", VideoGalleryUser.title);
    formData.append("description", VideoGalleryUser.description);
    formData.append("url", VideoGalleryUser.url);
    if (VideoGallery) formData.append("video", VideoGallery);

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatevideogallery/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setVideoGalleryUser(response.data.data);
      navigate("/VideoGallery");
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
        message: `File size exceeds the limit! Max size for ${fileCategory} is ${
          fileRules[fileCategory].maxSize / (1024 * 1024)
        }MB.`,
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
    setVideoGallery(file);
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
              <Link to="/VideoGallery">
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
                  value={VideoGalleryUser.title}
                  onChange={changeHandler}
                  className="form-control"
                  name="title"
                />
                <br />
              </div>

              {VideoGalleryUser.video && (
                <div className="form-group">
                  <label>
                    Video Gallery{" "}
                    <span style={{ color: "red" }}>
                      ("Video must be at least Width-95% Height-100%")
                    </span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept="video/*"
                    onChange={handleFileUpload}
                  />
                  <br />
                </div>
              )}
              {VideoGalleryUser.url && (
                <div className="form-group">
                  <label>Video URL <br/> (https://youtu.be/<span style={{color:"blue"}}>VETgRy2FUUk</span>?si=_r233ikYe7R1ApaH) <br/> In This Url Copy Only Blue Part</label>
                  <input
                    type="text"
                    value={VideoGalleryUser.url}
                    onChange={changeHandler}
                    className="form-control"
                    name="url"
                  />
                  <br />
                </div>
              )}
              <div className="form-group">
                <label>Description</label>
                <textarea
                  id="description-editor"
                  defaultValue={VideoGalleryUser.description}
                ></textarea>
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/VideoGallery">
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
