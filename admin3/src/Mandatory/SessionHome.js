import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

export const SessionTableHome = () => {
  const [sessions, setSessions] = useState([]);
  const [SessionHeading, setSessionHeading] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newSessionName, setNewSessionName] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    classes: "",
    sectionA1: "",
    sectionA2: "",
    sectionB1: "",
    sectionB2: "",
    sectionC1: "",
    sectionC2: "",
    sectionD: "",
    sectionE: "",
    total: "",
  });

  // Fetch all sessions
  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axios.get(
        "http://gosaviadvanceddentalclinic.com:8003/api/getallsessiontable"
      );

      if (res.data.length > 0) {
        setSessionHeading(res.data[0].mainheading);
        setSessions(res.data.slice(1));
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  // Handle input change
  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add session
  const handleAddSession = async () => {
    if (!newSessionName) return alert("Session name cannot be empty!");

    try {
      await axios.post("http://gosaviadvanceddentalclinic.com:8003/api/createsessiontable", {
        session: newSessionName,
      });
      setShowModal(false);
      setNewSessionName("");
      fetchSessions();
    } catch (error) {
      console.error("Error adding session:", error);
    }
  };

  // Add data to session
  const handleAddData = async (e) => {
    e.preventDefault();
    if (!selectedSession) return alert("Please select a session first!");

    try {
      await axios.post(
        `http://gosaviadvanceddentalclinic.com:8003/api/createsessiondata/${selectedSession}/data`,
        formData
      );
      setFormData({
        classes: "",
        sectionA1: "",
        sectionA2: "",
        sectionB1: "",
        sectionB2: "",
        sectionC1: "",
        sectionC2: "",
        sectionD: "",
        sectionE: "",
        total: "",
      });
      setShowFormModal(false); // Close modal after submitting
      fetchSessions();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const deleteUser = async (userId, sessionName) => {
    try {
      const response = await axios.delete(
        `http://gosaviadvanceddentalclinic.com:8003/api/deletesessiontable/${sessionName}/data`,
        { data: { userId } } // Pass userId in request body
      );

      if (response.status === 200) {
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session.session === sessionName
              ? {
                  ...session,
                  data: session.data.filter((user) => user._id !== userId),
                }
              : session
          )
        );
        toast.success("Data Deleted Successfully!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete data!");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row arpi">
        <div className="col-lg-3 col-md-3 col-sm-12"></div>
        <div className="col-lg-7 col-md-7 col-sm-12 view-sec-case">
          <h2>
            {SessionHeading}{" "}
            <Link to={`/SessionHeading-edit/${"67b46add7632292bfe1c5c40"}`}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </h2>
        </div>

        <button
          type="button"
          className="session-table-add"
          onClick={() => setShowModal(true)}
        >
          <span>
            <i className="fa-solid fa-plus"></i> Add Session{" "}
          </span>
        </button>

        {showModal && (
          <div className="table-modal-overlay">
            <div className="table-modal-content">
              <h3>Add Session</h3>
              <input
                type="text"
                placeholder="Enter session (e.g., 2023-24)"
                value={newSessionName}
                onChange={(e) => setNewSessionName(e.target.value)}
              />
              <div className="table-modal-buttons">
                <button onClick={handleAddSession}>Add</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {sessions.map((session) => {
          return (
            <div className="row" key={session.session}>
              <div className="col-lg-3"></div>
              <div className="col-lg-9 schoolinfo-table">
                <h5 className="strong-session">
                  {session.session}{" "}
                  <Link to={`/Session-edit/${session._id}`}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                </h5>

                <button
                  type="button"
                  className="academic-add"
                  onClick={() => {
                    setSelectedSession(session.session);
                    setShowFormModal(true);
                  }}
                >
                  <span>
                    <i className="fa-solid fa-plus"></i> Add{" "}
                  </span>
                </button>

                {/* Form Popup Modal */}
                {showFormModal && selectedSession === session.session && (
                  <div className="data-modal-overlay">
                    <div className="data-modal-content">
                      <h3>Add Data to {selectedSession}</h3>
                      <form className="row" onSubmit={handleAddData}>
                        <div className="col-lg-12 sessioninputform">
                          <label htmlFor="classes">Class</label>
                          <input
                            type="text"
                            onChange={inputHandler}
                            id="classes"
                            name="classes"
                            placeholder="Class"
                          />
                        </div>
                        {[
                          "sectionA1",
                          "sectionA2",
                          "sectionB1",
                          "sectionB2",
                          "sectionC1",
                          "sectionC2",
                          "sectionD",
                          "sectionE",
                          "total",
                        ].map((section) => (
                          <div
                            className="col-lg-6 sessioninputform"
                            key={section}
                          >
                            <label htmlFor={section}> {section}</label>
                            <input
                              type="number"
                              onChange={inputHandler}
                              id={section}
                              name={section}
                              placeholder={`${section}`}
                            />
                          </div>
                        ))}

                        <div className="data-modal-buttons">
                          <button type="submit">Add User</button>
                          <button
                            type="button"
                            onClick={() => setShowFormModal(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                <table>
                  <thead>
                    <tr>
                      <th className="col-lg-1">Class</th>
                      <th className="col-lg-1">A1</th>
                      <th className="col-lg-1">A2</th>
                      <th className="col-lg-1">B1</th>
                      <th className="col-lg-1">B2</th>
                      <th className="col-lg-1">C1</th>
                      <th className="col-lg-1">C2</th>
                      <th className="col-lg-1">D</th>
                      <th className="col-lg-1">E</th>
                      <th className="col-lg-1">Total</th>
                      <th className="col-lg-1">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {session.data.map((user, index) => (
                      <tr key={index}>
                        <td>
                          <h6>{user.classes}</h6>
                        </td>
                        <td>
                          <h6>{user.sectionA1}</h6>
                        </td>
                        <td>
                          <h6>{user.sectionA2}</h6>
                        </td>
                        <td>
                          <h6>{user.sectionB1}</h6>
                        </td>
                        <td>
                          <h6>{user.sectionB2}</h6>
                        </td>
                        <td>
                          <h6>{user.sectionC1}</h6>
                        </td>
                        <td>
                          <h6>{user.sectionC2}</h6>
                        </td>
                        <td>
                          <h6>{user.sectionD}</h6>
                        </td>
                        <td>
                          <h6>{user.sectionE}</h6>
                        </td>
                        <td>
                          <h6>{user.total}</h6>
                        </td>
                        <td>
                          <Link
                            to={`/SessionData-edit/${session._id}/${user._id}`}
                          >
                            <i
                              className="fa-regular fa-pen-to-square action-sec"
                              style={{ color: "darkblue" }}
                            ></i>
                          </Link>
                          <span
                            onClick={() =>
                              deleteUser(user._id, session.session)
                            }
                          >
                            <i
                              className="fa-solid fa-trash-can action-sec"
                              style={{ color: "red" }}
                            ></i>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>TOTAL</td>
                      <td>
                        {session.data.reduce(
                          (sum, user) => sum + Number(user.sectionA1 || 0),
                          0
                        )}
                      </td>
                      <td>
                        {session.data.reduce(
                          (sum, user) => sum + Number(user.sectionA2 || 0),
                          0
                        )}
                      </td>
                      <td>
                        {session.data.reduce(
                          (sum, user) => sum + Number(user.sectionB1 || 0),
                          0
                        )}
                      </td>
                      <td>
                        {session.data.reduce(
                          (sum, user) => sum + Number(user.sectionB2 || 0),
                          0
                        )}
                      </td>
                      <td>
                        {session.data.reduce(
                          (sum, user) => sum + Number(user.sectionC1 || 0),
                          0
                        )}
                      </td>
                      <td>
                        {session.data.reduce(
                          (sum, user) => sum + Number(user.sectionC2 || 0),
                          0
                        )}
                      </td>
                      <td>
                        {session.data.reduce(
                          (sum, user) => sum + Number(user.sectionD || 0),
                          0
                        )}
                      </td>
                      <td>
                        {session.data.reduce(
                          (sum, user) => sum + Number(user.sectionE || 0),
                          0
                        )}
                      </td>
                      <td>
                        {session.data.reduce(
                          (sum, user) => sum + Number(user.total || 0),
                          0
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const EditTopDataSessionTable = () => {
  const users = {
    mainheading: "",
  };

  const [SessionTableUser, setSessionTableUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSessionTableUser({ ...SessionTableUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SessionTableData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonesessiontable/${id}`
        );
        // console.log(response.data);
        setSessionTableUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SessionTableData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      mainheading: SessionTableUser.mainheading,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatesessiontable/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setSessionTableUser(response.data.data);
      navigate("/MandatoryTable");
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
              <Link to="/MandatoryTable">
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
                  value={SessionTableUser.mainheading}
                  onChange={changeHandler}
                  className="form-control"
                  name="mainheading"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/MandatoryTable">
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

export const EditSessionData = () => {
  const users = {
    classes: "",
    sectionA1: "",
    sectionA2: "",
    sectionB1: "",
    sectionB2: "",
    sectionC1: "",
    sectionC2: "",
    sectionD: "",
    sectionE: "",
    total: "",
  };

  const [SessionTableUser, setSessionTableUser] = useState(users);
  const { sessionId, dataId } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSessionTableUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonesessiontable/${sessionId}`
        );

        const sessionData = response.data;
        const dataEntry = sessionData.data.find((item) => item._id === dataId);

        if (dataEntry) {
          setSessionTableUser(dataEntry);
        } else {
          toast.error("Data entry not found");
          navigate("/MandatoryTable");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      }
    };

    fetchSessionData();
  }, [sessionId, dataId, navigate]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      classes: SessionTableUser.classes,
      sectionA1: SessionTableUser.sectionA1,
      sectionA2: SessionTableUser.sectionA2,
      sectionB1: SessionTableUser.sectionB1,
      sectionB2: SessionTableUser.sectionB2,
      sectionC1: SessionTableUser.sectionC1,
      sectionC2: SessionTableUser.sectionC2,
      sectionD: SessionTableUser.sectionD,
      sectionE: SessionTableUser.sectionE,
      total: SessionTableUser.total,
    };
    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatesessiondata/${sessionId}/${dataId}`,
        formData
      );

      toast.info("Data Updated Successfully!");
      navigate("/MandatoryTable");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data");
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
              <Link to="/MandatoryTable">
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
                <label>Class</label>
                <input
                  type="text"
                  value={SessionTableUser.classes}
                  onChange={changeHandler}
                  className="form-control"
                  name="classes"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Section A1</label>
                <input
                  type="text"
                  value={SessionTableUser.sectionA1}
                  onChange={changeHandler}
                  className="form-control"
                  name="sectionA1"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Section A2</label>
                <input
                  type="text"
                  value={SessionTableUser.sectionA2}
                  onChange={changeHandler}
                  className="form-control"
                  name="sectionA2"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Section B1</label>
                <input
                  type="text"
                  value={SessionTableUser.sectionB1}
                  onChange={changeHandler}
                  className="form-control"
                  name="sectionB1"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Section B2</label>
                <input
                  type="text"
                  value={SessionTableUser.sectionB2}
                  onChange={changeHandler}
                  className="form-control"
                  name="sectionB2"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Section C1</label>
                <input
                  type="text"
                  value={SessionTableUser.sectionC1}
                  onChange={changeHandler}
                  className="form-control"
                  name="sectionC1"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Section C2</label>
                <input
                  type="text"
                  value={SessionTableUser.sectionC2}
                  onChange={changeHandler}
                  className="form-control"
                  name="sectionC2"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Section D</label>
                <input
                  type="text"
                  value={SessionTableUser.sectionD}
                  onChange={changeHandler}
                  className="form-control"
                  name="sectionD"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Section E</label>
                <input
                  type="text"
                  value={SessionTableUser.sectionE}
                  onChange={changeHandler}
                  className="form-control"
                  name="sectionE"
                />
                <br />
              </div>

              <div className="form-group">
                <label>Total</label>
                <input
                  type="text"
                  value={SessionTableUser.total}
                  onChange={changeHandler}
                  className="form-control"
                  name="total"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/MandatoryTable">
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

export const EditSession = () => {
  const users = {
    session: "",
  };

  const [SessionTableUser, setSessionTableUser] = useState(users);
  const { id } = useParams();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSessionTableUser({ ...SessionTableUser, [name]: value });
    // console.log(user);
  };

  useEffect(() => {
    const SessionTableData = async () => {
      try {
        const response = await axios.get(
          `http://gosaviadvanceddentalclinic.com:8003/api/getonesessiontable/${id}`
        );
        // console.log(response.data);
        setSessionTableUser(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    SessionTableData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = {
      session: SessionTableUser.session,
    };

    try {
      const response = await axios.put(
        `http://gosaviadvanceddentalclinic.com:8003/api/updatesessiontable/${id}`,
        formData
      );
      // console.log(response);
      toast.info("Data Updated Successfully!");
      setSessionTableUser(response.data.data);
      navigate("/MandatoryTable");
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
              <Link to="/MandatoryTable">
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
                <label>Session</label>
                <input
                  type="text"
                  value={SessionTableUser.session}
                  onChange={changeHandler}
                  className="form-control"
                  name="session"
                />
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <Link to="/MandatoryTable">
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
