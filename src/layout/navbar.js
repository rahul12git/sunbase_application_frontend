import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const listOptions = {
  home: [
    { name: "First Name", value: "first_name" },
    { name: "City", value: "city" },
    { name: "Email", value: "email" },
    { name: "Phone Number", value: "phone" },
  ],
};

export default function Navbar({ page, searchHandler }) {
  const [isListOpen, setListOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchKey, setSearchKey] = useState("");

  console.log("the page is ", page, listOptions[page]);
  console.log("the selectedOption is ", page, selectedOption);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="btn btn-dark me-2" to="/addcustomer">
            Add Customer
          </Link>

          <div className="d-flex align-items-center">
            <div className="dropdown" onClick={() => setListOpen(!isListOpen)}>
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedOption === "" ? "Select By" : selectedOption.name}
              </button>
              <ul
                className={`dropdown-menu ${isListOpen ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton"
              >
                {listOptions[page].map((element) => {
                  return (
                    <li
                      className="dropdown-item"
                      onClick={() => setSelectedOption(element)}
                    >
                      {element.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <input
              type="text"
              className="form-control ms-3"
              placeholder="Search"
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
                console.log("onchange called for search bar");
                searchHandler(selectedOption.value, e.target.value);
              }}
            />
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-light mx-2 sync-btn">Sync</button>
          </div>
        </div>
      </nav>
    </div>
  );
}
