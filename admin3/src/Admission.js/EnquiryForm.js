import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const EnquiryForm = () => {
  const [EnquiryForm, setEnquiryForm] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallenquiryform"
      );
      setEnquiryForm(response.data);
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deleteenquiryform/${userId}`
      );
      setEnquiryForm((prevUser) =>
        prevUser.filter((user) => user._id !== userId)
      );
      console.log(response);
      toast.error("Data Deleted Successfully!");
      navigate("/EnquiryForm");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container all-school-view">
      <div className="row arpi">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 enquiry-table">
          <h4 style={{color:"rgb(6, 74, 118)", marginTop:"-1px"}}>Enquiry Form</h4>
          <table>
            <thead>
              <tr>
              <th className="col-lg-1">Sr. No.</th>
                <th className="col-lg-1">Student Name</th>
                <th className="col-lg-1">Admission Class</th>
                <th className="col-lg-1">Date Of Birth</th>
                <th className="col-lg-1">Admission Year</th>
                <th className="col-lg-1">Parent Name</th>
                <th className="col-lg-1">Email</th>
                <th className="col-lg-1">Mobile No.</th>
                <th className="col-lg-1">State</th>
                <th className="col-lg-1">City</th>
                <th className="col-lg-1">Source</th>
                <th className="col-lg-1">Action</th>
              </tr>
            </thead>

            <tbody>
              {EnquiryForm.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>{user.studentname}</p>
                    </td>
                    <td>
                      <p>{user.admissionclass}</p>
                    </td>
                    <td>
                      <p>{user.dob}</p>
                    </td>
                    <td>
                      <p>{user.admissionyear}</p>
                    </td>
                    <td>
                      <p>{user.parentname}</p>
                    </td>
                    <td>
                      <p>{user.email}</p>
                    </td>
                    <td>
                      <p>{user.mobile}</p>
                    </td>
                    <td>
                      <p>{user.state}</p>
                    </td>
                    <td>
                      <p>{user.city}</p>
                    </td>
                    <td>
                      <p>{user.source}</p>
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
