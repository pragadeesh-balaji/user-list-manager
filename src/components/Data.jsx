import React, { memo, useEffect, useState } from "react";
import Header from "./Header";
import {
  addUserModal,
  deleteUsers,
  updateUserModal,
} from "../modal/modalPurpose";
import { getUsers } from "../api/api";
import Modal from "./Modal";
import Loading from "./Loading";
import { useWindowSize } from "./customHook";

export const generateAlert = (message, type) => {
  let parser = new DOMParser();
  let rootDiv = document.querySelector("#content-table");
  const wrapper = parser.parseFromString(
    `<div class="position-absolute top-0 end-0"></div>`,
    "text/html"
  ).body.childNodes[0];

  const alertBlock = parser.parseFromString(
    `<div class="alert alert-${type} alert-dismissible" role="alert">
    <div>${message}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`,
    "text/html"
  ).body.childNodes[0];

  wrapper.appendChild(alertBlock);

  rootDiv.appendChild(wrapper);

  setTimeout(() => {
    rootDiv.removeChild(wrapper);
  }, 5000);
};

const Data = memo(() => {
  const size = useWindowSize();
  const [users, setUsers] = useState([]);
  const [toggleAPICall, setToggleAPICall] = useState(false);

  useEffect(() => {
    let load = document.querySelector("#loading-page");
    load.classList.remove("d-none");
    load.classList.add("d-flex");
    getUsers().then((res) => {
      if (users.length !== res.length) {
        setUsers(res.reverse());
        setTimeout(() => {
          load.classList.remove("d-flex");
          load.classList.add("d-none");
        }, 1000);
      }
    });
  }, [toggleAPICall]);

  return (
    <>
      <Header />
      <Loading />
      <div id="content-table" className="container-md py-4 position-relative">
        <div className="d-flex w-100 gap-2 mb-2 align-items-center justify-content-between p-2 border border-1 rounded-2">
          <h3 className="fw-bold px-3 py-2 fs-4 mb-0">User Datas</h3>
          <button
            className="btn btn-primary fw-semibold fs-6"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modal-general"
            onClick={(e) => {
              addUserModal(e, {
                toggle: toggleAPICall,
                setToggle: setToggleAPICall,
              });
            }}
          >
            ADD USER <i class="bi bi-plus-square-dotted"></i>
          </button>
        </div>
        <div
          className="d-flex w-100 border border-1 rounded-2 overflow-x-auto p-2 overflow-y-auto"
          style={{
            maxHeight:
              size.width > 450
                ? size.width > 900
                  ? "75svh"
                  : "50svh"
                : "75svh",
          }}
        >
          <table className="table table-hover table-striped">
            <thead className={`${size.width < 540 ? "d-none" : ""}`}>
              <tr>
                <th scope="col fw-semibold">#</th>
                <th scope="col fw-semibold text-start">Name</th>
                <th scope="col fw-semibold">Mobile No</th>
                <th scope="col fw-semibold">Role</th>
                <th scope="col fw-semibold">Edit &#38; Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) &&
                users.length > 0 &&
                users.map((user, index) => {
                  return (
                    <>
                      <tr key={user?._id}>
                        <th scope="row">{index + 1}</th>
                        <td data-cell="NAME">{user?.user_name}</td>
                        <td data-cell="MOBILE NO">{user?.user_mobile}</td>
                        <td data-cell="ROLE">{user?.user_role}</td>
                        <td>
                          <tr>
                            <td>
                              <button
                                className="btn btn-outline-success me-2 mb-2 fw-semibold "
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#modal-general"
                                onClick={(e) => {
                                  updateUserModal(e, user);
                                }}
                              >
                                <i class="bi bi-pencil"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-outline-danger fw-semibold "
                                onClick={(e) => {
                                  deleteUsers(e, user?._id);
                                }}
                              >
                                <i class="bi bi-trash3"></i>
                              </button>
                            </td>
                          </tr>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/*Modal*/}
      <Modal />
    </>
  );
});

export default Data;
