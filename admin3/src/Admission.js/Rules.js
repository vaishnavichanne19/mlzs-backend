import React, { useEffect, useState } from "react";
import { Link, Route, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const RulesHome = () => {
  const [RulesUser, setRulesUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://gosaviadvanceddentalclinic.com:8003/api/getallrules");
      setRulesUser(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid all-school-view">
      <div className="row arpi">
      <div className="col-lg-3 col-md-3 col-sm-12"></div>
      
            {/* <Link to="/Rules-add">
              <button className="add-button">
              <i class="fa-solid fa-plus"></i> Add Rules
              </button>
              </Link> */}
         
            {RulesUser.map((user) => {
              return (
                <div className="col-lg-7 col-md-7 col-sm-12 view-sec-case">
                  <h3>{user.heading}{" "}
                  <Link to={`/Rules-edit/` + user._id}>
                          <i
                            className="fa-regular fa-pen-to-square"
                            title="Edit"
                          ></i>
                        </Link>
                  </h3>
                  <img
                    src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.rulesimage}`}
                    alt="Rules Image"
                    style={{width:"100%", height: "auto" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
  );
};

export const AddRules = () => {
  const [RulesImage, setRulesImage] = useState(null);
  const [error, setError] = useState("");
  const [Rule, setRule] = useState({ heading: "" });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setRule({ ...Rule, [name]: value });
    console.log(Rule);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 100 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
        setRulesImage(null);
        return;
      }

      if (file.size > maxSize) {
        setError("File size exceeds 100MB. Please upload a smaller file.");
        setRulesImage(null);
        return;
      }

      setError("");
      setRulesImage(file);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", Rule.heading);
    if (RulesImage) {
      formData.append("rulesimage", RulesImage);
    }

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/createrules",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Data Added Successfully!");
      navigate("/Rules");
    } catch (error) {
      toast.error("There was an error adding the Rules!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container-fluid popup-container">
      <div className="popup-content">
        <div className="adduser">
          <Link to="/Rules">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h4>Add Rule Data</h4>
          <hr />
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-6 col-md-6 col-sm-12 inputform">
              <label htmlFor="heading">Heading</label>
              <input
                type="text"
                onChange={inputHandler}
                value={Rule.heading}
                id="heading"
                name="heading"
                placeholder="Heading"
              />
            </div>
            <p>Max Upload Image Size - 100MB</p>
            <div className="col-lg-6 col-md-6 col-sm-12 inputform">
              <input type="file" onChange={handleFileChange} />
            </div>
            <div className="submitform">
              {error && <small style={{ color: "red" }}>{error}</small>}
              <button type="submit" disabled={!RulesImage || error}>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const EditRules = () => {
  const [RulesImage, setRulesImage] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [Rule, setRule] = useState({ heading: "" });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setRule({ ...Rule, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const editData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonerules/${id}`
        );
        setRule(response.data); // Update Rule state with fetched data
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
      setError("Invalid file type. Only JPG, JPEG,  WEBP and PNG are allowed.");
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
      setRulesImage(file);
    } else {
      setRulesImage(null);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!RulesImage) {
      setError("Please select a valid image file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("heading", Rule.heading);
    formData.append("rulesimage", RulesImage);

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updaterules/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.info("Data Updated Successfully!");
      navigate("/Rules");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container-fluid rule-container">
      <div className="popup-content">
        <div className="adduser">
          <Link to="/Rules">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h4>Update Rules Image</h4>
          <hr />
          <form className="row" onSubmit={submitForm}>
            <div className="col-lg-12 col-md-12 col-sm-12 inputform">
              <label>Heading</label>
              <input
                type="text"
                value={Rule.heading}
                onChange={changeHandler}
                className="form-control"
                name="heading"
              />
              <br />
            </div>
            <p style={{color: "red"}}>Image must be at least 100x100%</p>
            <div className="col-lg-6 col-md-6 col-sm-12 inputform">
              <input type="file" accept="image/*" onChange={handleFileChange} />
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
