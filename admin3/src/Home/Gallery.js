import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const GalleryHome = () => {
  const [GalleryUser, setGalleryUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallgallery"
      );
      setGalleryUser(response.data);
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
      try {
        const response = await axios.delete(
          `http://gosaviadvanceddentalclinic.com:8003/api/deletegallery/${userId}`
        );
        setGalleryUser((prevUser) =>
          prevUser.filter((user) => user._id !== userId)
        );
        console.log(response);
        toast.error("Data Deleted Successfully!");
        navigate("/gallery");
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 slider-home">
          <div>
            <h3 className="slider-heading">Gallery Image</h3>
            <Link to="/gallery-add">
              <button className="add-button">
                <i class="fa-solid fa-plus"></i> Add Gallery
              </button>
            </Link>
          </div>
          <div className="row image-details">
            {GalleryUser.map((user) => {
              return (
                <div className="col-lg-4 slider-image">
                  <img
                    src={`http://gosaviadvanceddentalclinic.com:8003/images/${user.galleryimage}`}
                    alt="Gallery Image"
                  />
                  <div className="icons">
                    <ul>
                      <li>
                        <Link to={`/gallery-view/` + user._id}>
                          <i className="fa-regular fa-eye" title="View"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={`/gallery-edit/` + user._id}>
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
  );
};

export const AddGallery = () => {
  const [GalleryImage, setGalleryImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      const maxSize = 1 * 1024 * 1024; 
  
      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Only JPG, JPEG, WEBP and PNG are allowed.");
        setGalleryImage(null);
        return;
      }
  
      if (file.size > maxSize) {
        setError("File size exceeds 1MB. Please upload a smaller file.");
        setGalleryImage(null);
        return;
      }
  
      setError("");
      setGalleryImage(file);
    }
  };
  

  const submitForm = async (e) => {
    e.preventDefault();

    if (!GalleryImage) {
      setError("Please select a valid image file before submitting.");
      return;
    }

    const formData = new FormData();
    if (GalleryImage) {
      formData.append("galleryimage", GalleryImage);
    }

    try {
      const response = await axios.post(
        "http://gosaviadvanceddentalclinic.com:8003/api/creategallery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Data Added Successfully!");
      navigate("/gallery");
    } catch (error) {
      toast.error("There was an error adding the Gallery!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container-fluid popup-container">
      <div className="popup-content">
        <div className="adduser">
          <Link to="/gallery">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h4>Add Gallery Image</h4>
          <hr />
          <form className="row" onSubmit={submitForm}>
          <p style={{color: "red"}}>Image must be at least Width-100% Height-500 pixels!</p>
            <div className="col-lg-6 col-md-6 col-sm-12 inputform">
              <input type="file" onChange={handleFileChange} />
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


export const EditGallery = () => {
  const [GalleryImage, setGalleryImage] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const editData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonegallery/${id}`
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
      setGalleryImage(file);
    } else {
      setGalleryImage(null);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!GalleryImage) {
      setError("Please select a valid image file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("galleryimage", GalleryImage);

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updategallery/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.info("Data Updated Successfully!");
      navigate("/gallery");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container-fluid popup-container">
      <div className="popup-content">
        <div className="adduser">
          <Link to="/gallery">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <h4>Update Gallery Image</h4>
          <hr />
          <form className="row" onSubmit={submitForm}>
          <p style={{color: "red"}}>Image must be at least Width-100% Height-500 pixels!</p>
            <div className="col-lg-6 col-md-6 col-sm-12 inputform">
              <input
                type="file"
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


export const ViewGallery = () => {
    const [GalleryUser, setGalleryUser] = useState({
        galleryimage: "",
      });
      const { id } = useParams();
    
      useEffect(() => {
        const GalleryData = async () => {
          try {
            const response = await axios.get(
              `http://gosaviadvanceddentalclinic.com:8003/api/getonegallery/${id}`
            );
            setGalleryUser(response.data);
          } catch (error) {
            console.error("There was an error!", error);
          }
        };
        GalleryData();
      }, [id]);

      return(
        <div className="view-image">
                    <Link to="/gallery">
            <i className="fa-solid fa-xmark"></i>
          </Link>
          <img
            src={`http://gosaviadvanceddentalclinic.com:8003/images/${GalleryUser.galleryimage}`}
            alt="Gallery"
          />
      </div>
      )
    
}
