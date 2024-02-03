import axios from "axios";
import React, { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import Navbar from "../layout/navbar";


export default function Home() {
  const token = localStorage.getItem("jwtToken");
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const fetchCustomersByCity = async (searchKey) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/customerByCity/${searchKey}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCustomers(data);
      console.log("customers-------------", customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchCustomersByEmail = async (searchKey) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/customerByEmail/${searchKey}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      setCustomers(data);

      console.log("customers-------------", customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  const fetchCustomersByPhone = async (searchKey) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/customerByPhone/${searchKey}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      setCustomers(data);

      console.log("customers-------------", customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchCustomersByFirstName = async (searchKey) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/customerByName/${searchKey}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      setCustomers(data);

      console.log("customers-------------", customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const loadCustomers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/getAllCustomer`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("--------------data---------------------", response.data);
      setCustomers(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching customers:", err);
    }
  };

  const deleteCustomer = async (custId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/delete/${custId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        loadCustomers();
      } catch (err) {
        setError(err.message);
        console.error("Error deleting customer:", err);
      }
    }
  };

  const searchHandler = async (option, searchParam) => {
    if (searchParam !== "") {
      if (option === "city") {
        fetchCustomersByCity(searchParam);
      } else if (option === "first_name") {
        fetchCustomersByFirstName(searchParam);
        console.log("the options and search params are", option, searchParam);
      } else if (option === "email") {
        fetchCustomersByEmail(searchParam);
        console.log("the options and search params are", option, searchParam);
      } else if (option === "phone") {
        fetchCustomersByPhone(searchParam);
        console.log("the options and search params are", option, searchParam);
      }
    } else {
      loadCustomers();
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <Navbar page="home" searchHandler={searchHandler} />
        <table className="table table-dark table border shadow">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First_Name</th>
              <th scope="col">Last_Name</th>
              <th scope="col">Address</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.address}</td>
                <td>{customer.city} </td>
                <td>{customer.state}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <Link
                    className="btn btn-danger fa fa-trash"
                    onClick={() => deleteCustomer(customer.custId)}
                  />
                  <Link
                    className="btn btn-secondary mx-1 fa fa-pencil"
                    to={`/editCustomer/${customer.custId}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}