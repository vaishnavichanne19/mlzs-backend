import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const LanguageHome = () => {
  const [Language, setLanguage] = useState([]);
  const [Hobby, setHobby] = useState([]);
  const [Sport, setSport] = useState([]);
  const [Art, setArt] = useState([]);
  const [mainTitle, setMainTitle] = useState("");
  const [loading, setLoading] = useState({ Language: true, Hobby: true });
  const navigate = useNavigate();
  const [mainHeadingLanguage, setMainHeadingLanguage] = useState("");
const [mainHeadingHobby, setMainHeadingHobby] = useState("");
const [mainHeadingSport, setMainHeadingSport] = useState("");
const [mainHeadingArt, setMainHeadingArt] = useState("");

  // Reusable function to fetch data
  const fetchData = async (url, setState, key, updateLoading, setHeading, setTitle) => {
    try {
      const response = await axios.get(url);
      if (response.data.length > 0) {
        if (key === "Language" && setTitle) {
          setTitle(response.data[0].title); 
        }
        setHeading(response.data[0].heading);
        setState(response.data.slice(1)); 
      }
    } catch (error) {
      console.error(`Error fetching ${key} data:`, error);
    } 
  };

  // Fetch Language data
useEffect(() => {
  fetchData(
    "http://gosaviadvanceddentalclinic.com:8003/api/getalllanguage",
    setLanguage,
    "Language",
    setLoading,
    setMainHeadingLanguage,
    setMainTitle
  );
}, []);

// Fetch Hobby data
useEffect(() => {
  fetchData(
    "http://gosaviadvanceddentalclinic.com:8003/api/getallhobby",
    setHobby,
    "Hobby",
    setLoading,
    setMainHeadingHobby
  );
}, []);

// Fetch Sport data
useEffect(() => {
  fetchData(
    "http://gosaviadvanceddentalclinic.com:8003/api/getallsportData",
    setSport,
    "Sport",
    setLoading,
    setMainHeadingSport
  );
}, []);

// Fetch Art data
useEffect(() => {
  fetchData(
    "http://gosaviadvanceddentalclinic.com:8003/api/getallart",
    setArt,
    "Art",
    setLoading,
    setMainHeadingArt
  );
}, []);

  // Fetch Art data
  useEffect(() => {
    fetchData("http://gosaviadvanceddentalclinic.com:8003/api/getallart", setArt, "Art", setLoading);
  }, []);

  const deleteItem = async (url, id, setState, key) => {
    try {
      await axios.delete(`${url}/${id}`);
      setState((prev) => prev.filter((item) => item._id !== id));
      toast.error(`${key} deleted successfully!`);
      if (key === "Language") navigate("/Learning");
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
            {mainTitle}{" "}
            <Link to={`/heading-Language-edit/679cb5c5d46c07a849d81788`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
        </div>
        <div className="row learning-sec">
          <div className="col-lg-3"></div>
          <div className="col-lg-9 col-md-9 col-sm-12">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 learning-card">
                {mainHeadingLanguage}{" "}
                <Link to={`/Languages/heading/edit/679cb5c5d46c07a849d81788`}>
                <i className="fa-regular fa-pen-to-square"></i>
                </Link>
                <Link to="/Languages-add">
                  <i className="fa-solid fa-plus add" title="Add"></i>
                </Link>
                {Language.map((user) => {
                  return (
                    <div className="language-home">
                      <span>
                        <i class="fa-regular fa-circle-dot"></i>{" "}
                        {user.languages}
                        <span className="action-buttons">
                          <Link to={`/Languages-edit/${user._id}`}>
                            <i
                              title="Edit"
                              className="fa-regular fa-pen-to-square action-edit"
                              style={{ color: "darkblue" }}
                            ></i>
                          </Link>
                          <span 
                                onClick={() =>
                                  deleteItem(
                                    "http://gosaviadvanceddentalclinic.com:8003/api/deletelanguage",
                                    user._id,
                                    setLanguage,
                                    "Language"
                                  )
                                }
                                >
                          <i
                            title="Delete"
                            className="fa-solid fa-trash-can"
                            style={{ color: "red" }}
                          ></i>

                          </span>
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 learning-card">
                {mainHeadingHobby}{" "}
                <Link to={`/Hobby/heading/edit/679ce17c4c1137be6782cb98`}>
                <i className="fa-regular fa-pen-to-square"></i>
                </Link>
                <Link to="/Hobby-add">
                  <i className="fa-solid fa-plus add" title="Add"></i>
                </Link>
                {Hobby.map((user) => {
                  return (
                    <div className="language-home">
                      <span>
                        <i class="fa-regular fa-circle-dot"></i>{" "}
                        {user.hobby}
                        <span className="action-buttons">
                          <Link to={`/Hobby-edit/${user._id}`}>
                            <i
                              title="Edit"
                              className="fa-regular fa-pen-to-square action-edit"
                              style={{ color: "darkblue" }}
                            ></i>
                          </Link>
                          <span 
                                onClick={() =>
                                  deleteItem(
                                    "http://gosaviadvanceddentalclinic.com:8003/api/deletehobby/",
                                    user._id,
                                    setHobby,
                                    "Hobby"
                                  )
                                }
                                >
                          <i
                            title="Delete"
                            className="fa-solid fa-trash-can"
                            style={{ color: "red" }}
                          ></i>

                          </span>
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 learning-card">
                {mainHeadingSport}{" "}
                <Link to={`/Sport/heading/edit/679ce2d97e02be7ab2ac82fd`}>
                <i className="fa-regular fa-pen-to-square"></i>
                </Link>
                <Link to="/Sport-add-data">
                  <i className="fa-solid fa-plus add" title="Add"></i>
                </Link>
                {Sport.map((user) => {
                  return (
                    <div className="language-home">
                    <span>
                      <i class="fa-regular fa-circle-dot"></i>{" "}
                      {user.sportname}
                      <span className="action-buttons">
                        <Link to={`/Sport-edit-data/${user._id}`}>
                          <i
                            title="Edit"
                            className="fa-regular fa-pen-to-square action-edit"
                            style={{ color: "darkblue" }}
                          ></i>
                        </Link>
                        <span 
                              onClick={() =>
                                deleteItem(
                                  "http://gosaviadvanceddentalclinic.com:8003/api/deletesportData",
                                  user._id,
                                  setSport,
                                  "Sport"
                                )
                              }
                              >
                        <i
                          title="Delete"
                          className="fa-solid fa-trash-can"
                          style={{ color: "red" }}
                        ></i>

                        </span>
                      </span>
                    </span>
                  </div>
                  );
                })}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 learning-card">
                {mainHeadingArt}{" "}
                <Link to={`/Art/heading/edit/679ce2114c1137be6782cbc2`}>
                <i className="fa-regular fa-pen-to-square"></i>
                </Link>
                <Link to="/Art-add">
                  <i className="fa-solid fa-plus add" title="Add"></i>
                </Link>
                {Art.map((user) => {
                  return (
                    <div className="language-home">
                    <span>
                      <i class="fa-regular fa-circle-dot"></i>{" "}
                      {user.arts}
                      <span className="action-buttons">
                        <Link to={`/Art-edit/${user._id}`}>
                          <i
                            title="Edit"
                            className="fa-regular fa-pen-to-square action-edit"
                            style={{ color: "darkblue" }}
                          ></i>
                        </Link>
                        <span 
                              onClick={() =>
                                deleteItem(
                                  "http://gosaviadvanceddentalclinic.com:8003/api/deleteart",
                                  user._id,
                                  setArt,
                                  "Art"
                                )
                              }
                              >
                        <i
                          title="Delete"
                          className="fa-solid fa-trash-can"
                          style={{ color: "red" }}
                        ></i>

                        </span>
                      </span>
                    </span>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditTopDataLanguage = () => {
  const users = {
    title: "",
  };

  const [LanguageUser, setLanguageUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLanguageUser({ ...LanguageUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonelanguage/${id}`
        );
        // console.log(response.data);
        setLanguageUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      title: LanguageUser.title,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatelanguage/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setLanguageUser(response.data.data);
      navigate("/Learning");
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
              <Link to="/Learning">
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
                  value={LanguageUser.title}
                  onChange={changeHandler}
                  className="form-control"
                  name="title"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/Learning">
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

// ************************************************* Language Data **********************************************************************
export const AddLanguage = () => {
  const [Language, setLanguage] = useState({
    languages: "",
  });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLanguage({ ...Language, [name]: value });
    console.log(Language);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      languages: Language.languages,
    };

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createlanguage",
        formData
      );

      toast.success("Data Added Successfully!");
      navigate("/Learning");
    } catch (error) {
      toast.error("There was an error adding the slider!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container-fluid popup-container">
      <div className="popup-content">
        <div className="adduser">
          <Link to="/Learning">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h4>Add Language</h4>
          <hr />
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-6 col-md-6 col-sm-12 inputform">
              <input
                type="text"
                onChange={inputHandler}
                value={Language.languages}
                id="languages"
                name="languages"
                placeholder="Language"
              />
            </div>
            <div className="submitform">
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const EditLanguage = () => {
  const [Language, setLanguage] = useState({
    languages: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const editData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonelanguage/${id}`
        );
        setLanguage(response.data); 
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    editData();
  }, [id]);
  

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLanguage({ ...Language, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      languages: Language.languages,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatelanguage/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      navigate("/Learning");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container-fluid popup-container">
      <div className="popup-content">
        <div className="adduser">
          <Link to="/Learning">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h4>Update Language</h4>
          <hr />
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-6 col-md-6 col-sm-12 inputform">
              <input
                type="text"
                value={Language.languages}
                onChange={changeHandler}
                name="languages"
              />
            </div>
            <div className="submitform">
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const EditLanguageHeading = () => {
  const users = {
    heading: "",
  };

  const [LanguageUser, setLanguageUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLanguageUser({ ...LanguageUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonelanguage/${id}`
        );
        // console.log(response.data);
        setLanguageUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: LanguageUser.heading,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatelanguage/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setLanguageUser(response.data.data);
      navigate("/Learning");
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
              <Link to="/Learning">
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
                  value={LanguageUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/Learning">
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
// ************************************************* Hobby Data **********************************************************************
export const AddHobby = () => {
  const [HobbyUser, setHobbyUser] = useState({
    hobby: "",
  });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setHobbyUser({ ...HobbyUser, [name]: value });
    console.log(HobbyUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      hobby: HobbyUser.hobby,
    };

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createhobby",
        formData
      );

      toast.success("Data Added Successfully!");
      navigate("/Learning");
    } catch (error) {
      toast.error("There was an error adding the slider!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container-fluid popup-container">
      <div className="popup-content">
        <div className="adduser">
          <Link to="/Learning">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h4>Add Hobbies</h4>
          <hr />
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-6 col-md-6 col-sm-12 inputform">
              <input
                type="text"
                onChange={inputHandler}
                value={HobbyUser.hobby}
                id="hobby"
                name="hobby"
                placeholder="Hobbies"
              />
            </div>
            <div className="submitform">
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const EditHobbyUser = () => {
  const [HobbyUser, setHobbyUser] = useState({
    hobby: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const editData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonehobby/${id}`
        );
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    editData();
  }, [id]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setHobbyUser({ ...HobbyUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      hobby: HobbyUser.hobby,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatehobby/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      navigate("/Learning");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container-fluid popup-container">
      <div className="popup-content">
        <div className="adduser">
          <Link to="/Learning">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h4>Update Hobbies</h4>
          <hr />
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-6 col-md-6 col-sm-12 inputform">
              <input
                type="text"
                value={HobbyUser.hobby}
                onChange={changeHandler}
                name="hobby"
              />
            </div>
            <div className="submitform">
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const EditHobbyHeading = () => {
  const users = {
    heading: "",
  };

  const [LanguageUser, setLanguageUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLanguageUser({ ...LanguageUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonehobby/${id}`
        );
        // console.log(response.data);
        setLanguageUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: LanguageUser.heading,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatehobby/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setLanguageUser(response.data.data);
      navigate("/Learning");
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
              <Link to="/Learning">
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
                  value={LanguageUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/Learning">
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
// ************************************************* Sport Data **********************************************************************
export const AddSportData = () => {
  const [SportUser, setSportUser] = useState({
    sportname: "",
  });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setSportUser({ ...SportUser, [name]: value });
    console.log(SportUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      sportname: SportUser.sportname,
    };

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createsportData",
        formData
      );

      toast.success("Data Added Successfully!");
      navigate("/Learning");
    } catch (error) {
      toast.error("There was an error adding the slider!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container-fluid popup-container">
      <div className="popup-content">
        <div className="adduser">
          <Link to="/Learning">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h4>Add Sport</h4>
          <hr />
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-6 col-md-6 col-sm-12 inputform">
              <input
                type="text"
                onChange={inputHandler}
                value={SportUser.sportname}
                id="sportname"
                name="sportname"
                placeholder="Sport"
              />
            </div>
            <div className="submitform">
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const EditSportUser = () => {
  const [SportUser, setSportUser] = useState({
    sportname: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const editData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonesportData/${id}`
        );
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    editData();
  }, [id]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSportUser({ ...SportUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      sportname: SportUser.sportname,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatesportData/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      navigate("/Learning");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container-fluid popup-container">
      <div className="popup-content">
        <div className="adduser">
          <Link to="/Learning">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h4>Update sportname</h4>
          <hr />
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-6 col-md-6 col-sm-12 inputform">
              <input
                type="text"
                value={SportUser.sportname}
                onChange={changeHandler}
                name="sportname"
              />
            </div>
            <div className="submitform">
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const EditSportHeading = () => {
  const users = {
    heading: "",
  };

  const [LanguageUser, setLanguageUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLanguageUser({ ...LanguageUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonesportData/${id}`
        );
        // console.log(response.data);
        setLanguageUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: LanguageUser.heading,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatesportData/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setLanguageUser(response.data.data);
      navigate("/Learning");
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
              <Link to="/Learning">
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
                  value={LanguageUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/Learning">
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
// ************************************************* ART Data **********************************************************************
export const AddArt = () => {
  const [ArtUser, setArtUser] = useState({
    arts: "",
  });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setArtUser({ ...ArtUser, [name]: value });
    console.log(ArtUser);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      arts: ArtUser.arts,
    };

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createart",
        formData
      );

      toast.success("Data Added Successfully!");
      navigate("/Learning");
    } catch (error) {
      toast.error("There was an error adding the slider!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container-fluid popup-container">
      <div className="popup-content">
        <div className="adduser">
          <Link to="/Learning">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h4>Add Art</h4>
          <hr />
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-6 col-md-6 col-sm-12 inputform">
              <input
                type="text"
                onChange={inputHandler}
                value={ArtUser.arts}
                id="arts"
                name="arts"
                placeholder="Art"
              />
            </div>
            <div className="submitform">
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const EditArtUser = () => {
  const [ArtUser, setArtUser] = useState({
    arts: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const editData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneart/${id}`
        );
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    editData();
  }, [id]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setArtUser({ ...ArtUser, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      arts: ArtUser.arts,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateart/${id}`,
        formData
      );
      toast.info("Data Updated Successfully!");
      navigate("/Learning");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container-fluid popup-container">
      <div className="popup-content">
        <div className="adduser">
          <Link to="/Learning">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h4>Update arts</h4>
          <hr />
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-6 col-md-6 col-sm-12 inputform">
              <input
                type="text"
                value={ArtUser.arts}
                onChange={changeHandler}
                name="arts"
              />
            </div>
            <div className="submitform">
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const EditArtHeading = () => {
  const users = {
    heading: "",
  };

  const [LanguageUser, setLanguageUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLanguageUser({ ...LanguageUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SchoolInfoData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getoneart/${id}`
        );
        // console.log(response.data);
        setLanguageUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SchoolInfoData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      heading: LanguageUser.heading,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updateart/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setLanguageUser(response.data.data);
      navigate("/Learning");
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
              <Link to="/Learning">
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
                  value={LanguageUser.heading}
                  onChange={changeHandler}
                  className="form-control"
                  name="heading"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/Learning">
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