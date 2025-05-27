import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const GetInTouchForm = () => {
  const [GetinTouchForm, setGetinTouchForm] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallgetintouch"
      );
      setGetinTouchForm(response.data);
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deletegetintouch/${userId}`
      );
      setGetinTouchForm((prevUser) =>
        prevUser.filter((user) => user._id !== userId)
      );
      console.log(response);
      toast.error("Data Deleted Successfully!");
      navigate("/GetinTouchForm");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container all-school-view">
      <div className="row arpi">
        <div className="col-lg-2"></div>
        <div className="col-lg-10 schoolinfo-table">
          <h4 style={{color:"rgb(6, 74, 118)"}}>Get In Touch Form</h4>
          <table>
            <thead>
              <tr>
              <th className="col-lg-1">Sr. No.</th>
                <th className="col-lg-1">Parent Name</th>
                <th className="col-lg-1">Email</th>
                <th className="col-lg-1">Mobile No.</th>
                <th className="col-lg-1">City</th>
                <th className="col-lg-1">School</th>
                <th className="col-lg-1">Query</th>
                <th className="col-lg-1">Grade</th>
                <th className="col-lg-1">Residence</th>
                <th className="col-lg-1">Action</th>
              </tr>
            </thead>

            <tbody>
              {GetinTouchForm.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
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
                      <p>{user.city}</p>
                    </td>
                    <td>
                      <p>{user.school}</p>
                    </td>
                    <td>
                      <p>{user.query}</p>
                    </td>
                    <td>
                      <p>{user.grade}</p>
                    </td>
                    <td>
                      <p>{user.residence}</p>
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
