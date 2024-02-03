import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCustomer() {


  const token = localStorage.getItem("jwtToken");
  console.log("home directory--->>>", token);


  let navigate = useNavigate();

  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    street: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
  });

  const {first_name,last_name,street,address,city,state,email,phone}=customer;

  const onInputChange = (e) => {

    setCustomer({ ...customer,[e.target.name]:e.target.value });

  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8080/api/v1/createCustomer`, customer,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    navigate("/home");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Customer Details</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <div className="row g-3">
                <div className="col">
                  <label htmlFor="first_name" className="form-lable">
                    Firstname
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your first_name"
                    name="first_name"
                    value={first_name}
                    onChange={(e) => onInputChange(e)}
                  ></input>
                </div>
                <div className="col">
                  <label htmlFor="last_name" className="form-lable">
                    Lastname
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your last_name"
                    name="last_name"
                    value={last_name}
                    onChange={(e) => onInputChange(e)}
                  ></input>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="row g-3">
                <div className="col">
                  <label htmlFor="street" className="form-lable">
                    Street
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your Street"
                    name="street"
                    value={street}
                    onChange={(e) => onInputChange(e)}
                  ></input>
                </div>
                <div className="col">
                  <label htmlFor="address" className="form-lable">
                    Address
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your Address"
                    name="address"
                    value={address}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="row g-3">
                <div className="col">
                  <label htmlFor="city" className="form-lable">
                    City
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your City"
                    name="city"
                    value={city}
                    onChange={(e) => onInputChange(e)}
                  ></input>
                </div>
                <div className="col">
                  <label htmlFor="state" className="form-lable">
                    State
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your State"
                    name="state"
                    value={state}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="row g-3">
                <div className="col">
                  <label htmlFor="email" className="form-lable">
                    Email
                  </label>
                  <input
                    type={"email"}
                    className="form-control"
                    placeholder="Enter your Email"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                  ></input>
                </div>
                <div className="col">
                  <label htmlFor="phone" className="form-lable">
                    Phone
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your Phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <button  type="submit"className="btn btn-outline-danger mx-2"
              onClick={() => navigate("/home")}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
