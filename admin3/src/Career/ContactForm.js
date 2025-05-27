import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const ContactForm = () => {
  const [ContactForm, setContactForm] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallcontactform"
      );
      setContactForm(response.data);
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deletecontactform/${userId}`
      );
      setContactForm((prevUser) =>
        prevUser.filter((user) => user._id !== userId)
      );
      console.log(response);
      toast.error("Data Deleted Successfully!");
      navigate("/ContactForm");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container all-school-view">
      <div className="row arpi">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 schoolinfo-table">
          <h4 style={{color:"rgb(6, 74, 118)"}}>Contact Form</h4>
          <table>
            <thead>
              <tr>
              <th className="col-lg-1">Sr. No.</th>
                <th className="col-lg-2">Full Name</th>
                <th className="col-lg-1">Email</th>
                <th className="col-lg-1">Mobile No.</th>
                <th className="col-lg-1">Subject</th>
                <th className="col-lg-3">Message</th>
                <th className="col-lg-1">Action</th>
              </tr>
            </thead>

            <tbody>
              {ContactForm.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>{user.name}</p>
                    </td>
                    <td>
                      <p>{user.email}</p>
                    </td>
                    <td>
                      <p>{user.phone}</p>
                    </td>
                    <td>
                      <p>{user.subject}</p>
                    </td>
                    <td>
                      <p>{user.message}</p>
                    </td>
                    <td>
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
  );
};
