import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const SchoolInfoHome = () => {
  const [SchoolInfo, setSchoolInfo] = useState([]);
  const navigate = useNavigate();
  const [mainHeading, setMainHeading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallschoolinfo"
      );
      if (response.data.length > 0) {
        setMainHeading(response.data[0].mainheading);
        setSchoolInfo(response.data.slice(1));
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deleteschoolinfo/${userId}`
      );
      setSchoolInfo((prevUser) =>
        prevUser.filter((user) => user._id !== userId)
      );
      console.log(response);
      toast.error("Data Deleted Successfully!");
      navigate("/SchoolInfo");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container schoolinfo-details">
      <div className="row">
        <div className="col-lg-2 col-md-2 col-sm-12"></div>
        <div className="col-lg-10 col-md-10 col-sm-12 panel-sec">
          <Link to="/schoolinfo-add">
            <button type="button" className="add-product">
              <span>
                <i className="fa-solid fa-plus"></i> Add{" "}
              </span>
            </button>
          </Link>
          <h3>
            {mainHeading}{" "}
            <Link to={`/School-heading-edit/${"67b96808c77891b4269a6245"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h3>
          <table className="tab">
            <tr>
              <th className="col-lg-2">
                <h3>School Logo</h3>
              </th>
              <th className="col-lg-2">
                <h3>School Name</h3>
              </th>
              <th className="col-lg-2">
                <h3>Years</h3>
              </th>
              <th className="col-lg-2">
                <h3>Action</h3>
              </th>
            </tr>

            <tbody>
              {SchoolInfo.map((SchoolInfouser) => {
                return (
                  <tr key={SchoolInfouser._id}>
                    <td>
                      {" "}
                      <img
                        src={`http://gosaviadvanceddentalclinic.com:8003/images/${SchoolInfouser.schoollogo}`}
                        alt="School Logo"
                        style={{ width: "100px", height: "50px" }}
                      />{" "}
                      <br />
                      <br />
                    </td>
                    <td>
                      <h6>{SchoolInfouser.schoolname}</h6>
                    </td>
                    <td>
                      <h6>{SchoolInfouser.years}</h6>
                    </td>
                    <td>
                      <Link to={`/SchoolInfo-view/` + SchoolInfouser._id}>
                        <i
                          title="View"
                          className="fa-regular fa-eye action-sec"
                          style={{ color: "blue" }}
                        ></i>
                      </Link>
                      <Link to={`/SchoolInfo-edit/` + SchoolInfouser._id}>
                        <i
                          title="Edit"
                          className="fa-regular fa-pen-to-square action-sec"
                          style={{ color: "darkblue" }}
                        ></i>
                      </Link>

                      <span onClick={() => deleteUser(SchoolInfouser._id)}>
                        <i
                          title="Delete"
                          className="fa-solid fa-trash-can action-sec"
                          style={{ color: "red" }}
                        ></i>
                      </span>
                      <Link to={`/view/SchoolInfo/${SchoolInfouser._id}`}>
                        <span>
                          <button className="view-button">
                            view School Info
                          </button>
                        </span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const ViewSchoolInfo = () => {
  const [SchoolInfoUser, setSchoolInfoUser] = useState({
    schoolname: "",
    years: "",
    schoollogo: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneschoolinfo/${id}`
        );
        setSchoolInfoUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  return (
    <div className="container-fluid schoolinfo-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>

        <div className="col-lg-7 col-md-7 col-sm-12 view-sec">
          <Link to="/SchoolInfo" className="back-btn">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <br />
          <br />

          <h4>
            {SchoolInfoUser.schoolname}{" "}
            <Link to={`/SchoolInfo-edit/` + SchoolInfoUser._id}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h4>
          <h5>{SchoolInfoUser.years}</h5>
          <img
            src={`http://gosaviadvanceddentalclinic.com:8003/images/${SchoolInfoUser.schoollogo}`}
            alt="School Logo"
          />
          <br />
        </div>
      </div>
    </div>
  );
};

export const Addschoolinfo = () => {
  const users = {
    schoolname: "",
    years: "",
    heading: "",
    subheading: "",
    para: "",
    description1: "",
    description2: "",
    title: "",
    description3: "",
  };
  const [SchoolInfouser, setSchoolInfoUser] = useState(users);
  const [SchoolInfoImage, setSchoolInfoImage] = useState(null);
  const [SchoolLogo, setSchoolLogo] = useState(null);
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
        Object.values(window.CKEDITOR.instances).forEach((instance) => {
          if (instance) instance.destroy(true);
        });
      }
    };    
  }, []);

  // ✅ Initialize CKEditor when loaded
  useEffect(() => {
    if (editorLoaded && window.CKEDITOR) {
      ["editor1", "editor2", "editor3"].forEach((id) => {
        if (!window.CKEDITOR.instances[id]) {
          window.CKEDITOR.replace(id, { height: 200 });
        }
      });
  
      Object.keys(window.CKEDITOR.instances).forEach((instance) => {
        window.CKEDITOR.instances[instance].on("change", function () {
          setSchoolInfoUser((prev) => ({
            ...prev,
            description1: window.CKEDITOR.instances.editor1?.getData() || "",
            description2: window.CKEDITOR.instances.editor2?.getData() || "",
            description3: window.CKEDITOR.instances.editor3?.getData() || "",
          }));
        });
      });
    }
  }, [editorLoaded]);
  
  

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setSchoolInfoUser({ ...SchoolInfouser, [name]: value });
    console.log(SchoolInfouser);
  };

  const submitForm = async (e) => {
    e.preventDefault();
  
    try {
      if (!SchoolInfoImage) throw new Error("Please select a valid image file.");
      if (!SchoolLogo) throw new Error("Please select a valid logo file.");
  
      const formData = new FormData();
      formData.append("heading", SchoolInfouser.heading);
      formData.append("subheading", SchoolInfouser.subheading);
      formData.append("para", SchoolInfouser.para);
      formData.append("description1", SchoolInfouser.description1);
      formData.append("schoolname", SchoolInfouser.schoolname);
      formData.append("years", SchoolInfouser.years);
      formData.append("description2", SchoolInfouser.description2);
      formData.append("title", SchoolInfouser.title);
      formData.append("description3", SchoolInfouser.description3);
      if (SchoolInfoImage) formData.append("schoolinfoimage", SchoolInfoImage);
      if (SchoolLogo) formData.append("schoollogo", SchoolLogo);
  
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createschoolinfo",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      toast.success("Data Added Successfully!");
      navigate("/SchoolInfo");
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message);
    }
  };
  

  return (
    <div className="container about-details">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 aboutuser">
          <Link to="/SchoolInfo">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h3>School Details</h3>
          <form className="row" onSubmit={submitForm}>
            <h4>Front Side School Details</h4>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="schoollogo">
                School Logo{" "}
                <span style={{ color: "red" }}>
                  ("Logo must be at least 90x100%")
                </span>
              </label>
              <input
                type="file"
                onChange={(e) => setSchoolLogo(e.target.files[0])}
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="schoolname">School Name</label>
              <input
                type="text"
                onChange={inputHandler}
                value={SchoolInfouser.schoolname}
                id="schoolname"
                name="schoolname"
                placeholder="School Name"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="years">Years</label>
              <input
                type="text"
                onChange={inputHandler}
                value={SchoolInfouser.years}
                id="years"
                name="years"
                placeholder="Years"
              />
            </div>
            <h4>All School Details</h4>
            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="heading">Heading</label>
              <input
                type="text"
                onChange={inputHandler}
                value={SchoolInfouser.heading}
                id="heading"
                name="heading"
                placeholder="Heading"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="subheading">Sub Heading</label>
              <input
                type="text"
                onChange={inputHandler}
                value={SchoolInfouser.subheading}
                id="subheading"
                name="subheading"
                placeholder="Sub Heading"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="para">Paragraph</label>
              <input
                type="text"
                onChange={inputHandler}
                value={SchoolInfouser.para}
                id="para"
                name="para"
                placeholder="Paragraph"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="description1">Description1</label>
              <textarea id="editor1"></textarea>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="schoolinfoimage">
                School Info Image{" "}
                <span style={{ color: "red" }}>
                  ("Image must be at least 90x100%")
                </span>
              </label>
              <input
                type="file"
                onChange={(e) => setSchoolInfoImage(e.target.files[0])}
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="description2">Description2</label>
              <textarea id="editor2"></textarea>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                onChange={inputHandler}
                value={SchoolInfouser.title}
                id="title"
                name="title"
                placeholder="Title"
              />
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 aboutinputform">
              <label htmlFor="description3">Description3</label>
              <textarea id="editor3"></textarea>
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

export const EditScholInfo = () => {
  const [SchoolLogo, setSchoolLogo] = useState(null);
  const users = {
    schoolname: "",
    years: "",
  };

  const [SchoolInfouser, setSchoolInfoUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSchoolInfoUser({ ...SchoolInfouser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneschoolinfo/${id}`
        );
        // console.log(response.data);
        setSchoolInfoUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("schoolname", SchoolInfouser.schoolname);
    formData.append("years", SchoolInfouser.years);
    if (SchoolLogo) formData.append("schoollogo", SchoolLogo);

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateschoolinfo/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setSchoolInfoUser(response.data.data);
      navigate("/SchoolInfo");
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
              <Link to="/SchoolInfo">
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
                <label>School Name</label>
                <input
                  type="text"
                  value={SchoolInfouser.schoolname}
                  onChange={changeHandler}
                  className="form-control"
                  name="schoolname"
                />
                <br />
              </div>
              <div className="form-group">
                <label>Years</label>
                <input
                  type="text"
                  value={SchoolInfouser.years}
                  onChange={changeHandler}
                  className="form-control"
                  name="years"
                />
                <br />
              </div>
              <div className="form-group">
                <label>
                  Logo{" "}
                  <span style={{ color: "red" }}>
                    ("Logo must be at least 90x100%")
                  </span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setSchoolLogo(e.target.files[0])}
                />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/SchoolInfo">
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

// // ******************************************************** Redirect Api*************************************************************************
export const RedirectView = () => {
  const [SchoolInfoUser, setSchoolInfoUser] = useState({
    heading: "",
    subheading: "",
    para: "",
    description1: "",
    schoolinfoimage: "",
    description2: "",
    title: "",
    description3: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneschoolinfo/${id}`
        );
        setSchoolInfoUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  return (
    <div className="container-fluid all-school-view">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>
        <div className="col-lg-7 col-md-7 col-sm-12 view-sec-case">
          <Link to="/SchoolInfo" className="redirect-back-btn">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <br />
          <h4>
            {SchoolInfoUser.heading}{" "}
            <Link to={`/School-data-edit/` + SchoolInfoUser._id}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
            <br />
          </h4>
          <div className="row details">
            {SchoolInfoUser.subheading && (
              <div className="col-lg-12">
                <h5>{SchoolInfoUser.subheading}</h5>
              </div>
            )}

            {SchoolInfoUser.para && (
              <div className="col-lg-12">
                <p>{SchoolInfoUser.para}</p>
              </div>
            )}
            {SchoolInfoUser.description1 && (
              <div className="col-lg-12">
                <p
                  dangerouslySetInnerHTML={{
                    __html: SchoolInfoUser.description1,
                  }}
                ></p>
              </div>
            )}
            {SchoolInfoUser.schoolinfoimage && (
              <div className="col-lg-12">
                <img
                  src={`http://gosaviadvanceddentalclinic.com:8003/images/${SchoolInfoUser.schoolinfoimage}`}
                  alt="School Info"
                />
              </div>
            )}

            {SchoolInfoUser.description2 && (
              <div className="col-lg-12">
                <p
                  dangerouslySetInnerHTML={{
                    __html: SchoolInfoUser.description2,
                  }}
                ></p>
              </div>
            )}

            {SchoolInfoUser.title && (
              <div className="col-lg-12">
                <h5>{SchoolInfoUser.title}</h5>
              </div>
            )}

            {SchoolInfoUser.description3 && (
              <div className="col-lg-12">
                <p
                  dangerouslySetInnerHTML={{
                    __html: SchoolInfoUser.description3,
                  }}
                ></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditSchoolData = () => {
  const [SchoolInfoimage, setSchoolInfoImage] = useState(null);
  const users = {
    heading: "",
    subheading: "",
    para: "",
    description1: "",
    description2: "",
    title: "",
    description3: "",
  };

  const [SchoolInfouser, setSchoolInfoUser] = useState(users);
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
      const response = await axios.get(
        `http://gosaviadvanceddentalclinic.com:8003/api/getoneschoolinfo/${id}`
      );
      setSchoolInfoUser(response.data);

      // ✅ Set CKEditor content if instances exist
      if (window.CKEDITOR) {
        if (window.CKEDITOR.instances.editor1) {
          window.CKEDITOR.instances.editor1.setData(
            response.data.description1 || ""
          );
        }
        if (window.CKEDITOR.instances.editor2) {
          window.CKEDITOR.instances.editor2.setData(
            response.data.description2 || ""
          );
        }
        if (window.CKEDITOR.instances.editor3) {
          window.CKEDITOR.instances.editor3.setData(
            response.data.description3 || ""
          );
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
      if (SchoolInfouser.description3 && !window.CKEDITOR.instances.editor3) {
        window.CKEDITOR.replace("editor3");
      }
    }
  }, [editorLoaded, SchoolInfouser.description3]);

  // ✅ Update CKEditor data when DirectorUser changes
  useEffect(() => {
    if (editorLoaded && window.CKEDITOR.instances.editor1) {
      window.CKEDITOR.instances.editor1.setData(
        SchoolInfouser.description1 || ""
      );
    }
    if (editorLoaded && window.CKEDITOR.instances.editor2) {
      window.CKEDITOR.instances.editor2.setData(
        SchoolInfouser.description2 || ""
      );
    }
    if (editorLoaded && window.CKEDITOR.instances.editor3) {
      window.CKEDITOR.instances.editor3.setData(
        SchoolInfouser.description3 || ""
      );
    }
  }, [
    SchoolInfouser.description1,
    SchoolInfouser.description2,
    SchoolInfouser.description3,
    editorLoaded,
  ]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSchoolInfoUser({ ...SchoolInfouser, [name]: value });
    // console.log(user);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // ✅ Get CKEditor content before submitting
    if (window.CKEDITOR.instances.editor1) {
      SchoolInfouser.description1 = window.CKEDITOR.instances.editor1.getData();
    }
    if (window.CKEDITOR.instances.editor2) {
      SchoolInfouser.description2 = window.CKEDITOR.instances.editor2.getData();
    }
    if (window.CKEDITOR.instances.editor3) {
      SchoolInfouser.description3 = window.CKEDITOR.instances.editor3.getData();
    }

    const formData = new FormData();
    formData.append("heading", SchoolInfouser.heading);
    formData.append("subheading", SchoolInfouser.subheading);
    formData.append("para", SchoolInfouser.para);
    formData.append("description1", SchoolInfouser.description1);
    formData.append("description2", SchoolInfouser.description2);
    formData.append("title", SchoolInfouser.title);
    formData.append("description3", SchoolInfouser.description3);

    if (SchoolInfoimage) formData.append("schoolinfoimage", SchoolInfoimage);

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateschoolinfo/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      fetchDirectorData();
      navigate("/SchoolInfo");
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
              <Link to="/SchoolInfo">
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
                  value={SchoolInfouser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>

              {SchoolInfouser.subheading && (
                <div className="form-group">
                  <label>Sub Heading</label>
                  <input
                    type="text"
                    value={SchoolInfouser.subheading}
                    onChange={changeHandler}
                    className="form-control"
                    name="subheading"
                  />
                  <br />
                </div>
              )}

              {SchoolInfouser.para && (
                <div className="form-group">
                  <label>Paragraph</label>
                  <input
                    type="text"
                    value={SchoolInfouser.para}
                    onChange={changeHandler}
                    className="form-control"
                    name="para"
                  />
                  <br />
                </div>
              )}

              <div className="form-group">
                <label>
                  Image{" "}
                  <span style={{ color: "red" }}>
                    ("Image must be at least 90x100%")
                  </span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setSchoolInfoImage(e.target.files[0])}
                />
                <br />
              </div>

              <div className="form-group">
                <label>Description 1</label>
                <textarea id="editor1"></textarea>
                <br />
              </div>

              <div className="form-group">
                <label>Description 2</label>
                <textarea id="editor2"></textarea>
                <br />
              </div>

              {SchoolInfouser.title && (
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={SchoolInfouser.title}
                    onChange={changeHandler}
                    className="form-control"
                    name="title"
                  />
                  <br />
                </div>
              )}

              {SchoolInfouser.description3 && (
                <div className="form-group">
                  <label>Description 3</label>
                  <textarea id="editor3"></textarea>
                  <br />
                </div>
              )}
            </div>

            <div className="modal-footer">
              <Link to="/SchoolInfo">
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

export const EditHeadingData = () => {
  const users = {
    mainheading: "",
  };

  const [SchoolInfo, setSchoolInfo] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSchoolInfo({ ...SchoolInfo, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneschoolinfo/${id}`
        );
        // console.log(response.data);
        setSchoolInfo(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("mainheading", SchoolInfo.mainheading);

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateschoolinfo/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setSchoolInfo(response.data.data);
      navigate("/SchoolInfo");
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
              <Link to="/SchoolInfo">
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
                  value={SchoolInfo.mainheading}
                  onChange={changeHandler}
                  className="form-control"
                  name="mainheading"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/SchoolInfo">
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
