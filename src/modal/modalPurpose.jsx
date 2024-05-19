import { createUser, deleteUser, updateUsers } from "../api/api";
import { generateAlert } from "../components/Data";

const parser = new DOMParser();
export const ModalContent = (title, buttonText, data) => {
  let modalContent = parser.parseFromString(
    `<div class="modal-content">
   <div class="modal-header">
     <h5 class="modal-title fw-bold fs-2">${title} ${
      data?._id
        ? `<span id="crud-id-badge" class="badge text-bg-light border border-1 fs-6">${data?._id}</span>`
        : ""
    }</h5>
     <button id="crud-modal-close" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
   </div>
   <div class="modal-body">
   <form id="crud-form" class="col" >
   <div id="form-ui-change" class="row mb-2 w-100">
     <div class="col">
       <label htmlFor="name-crud" class="form-label">
         Name
       </label>
       <input
       required
         type="text"
         class="form-control"
         id="name-crud"
         placeholder="eg:Jason Dupasquier"
         value="${data?.user_name ? data?.user_name : ""}"
       />
     </div>
     <div class="col">
       <label htmlFor="mobile-crud" class="form-label">
         Mobile No
       </label>
       <input
       required
         type="number"
         class="form-control"
         id="mobile-crud"
         placeholder="eg:+9175345433444"
         value="${data?.user_mobile ? data?.user_mobile : null}"
       />
     </div>
   </div>
   <div class="row w-100 align-items-center justify-content-start px-2">
     <label htmlFor="role-crud" class="form-label">
       Role
     </label>
     <select
     required
       id="role-crud"
       class="form-select w-100 "
       aria-label="Large select example"
     >
       <option ${!data?.user_role ? "selected" : null} disabled>
         select a role
       </option>
       <option ${
         data?.user_role === "Rather not say" ? "selected" : null
       } value="Rather not say">Rather not say</option>
       <option ${
         data?.user_role === "Developer" ? "selected" : null
       } value="Developer">Developer</option>
       <option ${
         data?.user_role === "Designer" ? "selected" : null
       } value="Designer">Designer</option>
       <option ${
         data?.user_role === "Content Writer" ? "selected" : null
       } value="Content Writer">Content Writer</option>
     </select>
   </div>
 </form>
   </div>
   <div class="modal-footer">
     <button type="submit" form="crud-form"  class="d-flex align-items-center justify-content-center gap-2 btn btn-primary">
     <p class="mb-0 fw-semibold fs-6">${buttonText} </p><div id="crud-request-load" class="d-none spinner-border text-light" role="status">
     <span class="visually-hidden">Loading...</span>
   </div></button>
   </div>
 </div>`,
    "text/html"
  ).body.childNodes[0];

  return modalContent;
};

export const addUserModal = (e) => {
  e.preventDefault();
  let modalContent = ModalContent("Add User", "Add", {});
  let modalDialog = document.querySelector("#modal-general");
  modalDialog.childNodes[0].innerHTML = "";
  modalDialog.childNodes[0].appendChild(modalContent);
  let formCRUD = document.querySelector("#crud-form");
  formCRUD.onsubmit = addUser;
};

export const addUser = async (e) => {
  e.preventDefault();
  let payload = {
    user_name: "",
    user_mobile: "",
    user_role: "",
  };
  for (let i of e.currentTarget) {
    if (i.id === "name-crud") {
      payload.user_name = i.value;
    }
    if (i.id === "mobile-crud") {
      payload.user_mobile = i.value;
    }
    if (i.id === "role-crud") {
      payload.user_role = i.value;
    }
  }
  let load = document.querySelector("#crud-request-load");
  let close = document.querySelector("#crud-modal-close");

  load.classList.remove("d-none");
  await createUser(payload)
    .then((Res) => {
      generateAlert("User created successfully", "success");
      load.classList.add("d-none");
      close.click();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((err) => {
      generateAlert("Error occured while creating user", "danger");
      load.classList.remove("d-none");
      console.error(err);
      close.click();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
};

export const updateUserModal = (e, data) => {
  e.preventDefault();
  let modalContent = ModalContent("Update User", "Update", data);
  let modalDialog = document.querySelector("#modal-general");
  modalDialog.childNodes[0].innerHTML = "";
  modalDialog.childNodes[0].appendChild(modalContent);
  let formCRUD = document.querySelector("#crud-form");
  formCRUD.onsubmit = updateUser;
};
export const updateUser = async (e) => {
  e.preventDefault();
  let payload = {
    user_name: "",
    user_mobile: "",
    user_role: "",
  };
  for (let i of e.currentTarget) {
    if (i.id === "name-crud") {
      payload.user_name = i.value;
    }
    if (i.id === "mobile-crud") {
      payload.user_mobile = i.value;
    }
    if (i.id === "role-crud") {
      payload.user_role = i.value;
    }
  }
  let load = document.querySelector("#crud-request-load");
  let close = document.querySelector("#crud-modal-close");
  let idToUpdate = document.querySelector("#crud-id-badge");

  load.classList.remove("d-none");
  await updateUsers(payload, idToUpdate.innerHTML.toString())
    .then((Res) => {
      generateAlert("Updated user successfully", "success");
      load.classList.add("d-none");
      close.click();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((err) => {
      generateAlert("Error occured while updating user", "danger");
      load.classList.remove("d-none");
      console.error(err);
      close.click();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
};

export const deleteUsers = async (e, id) => {
  await deleteUser(id)
    .then((res) => {
      generateAlert("Deleted user successfully", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((err) => {
      generateAlert("Error occured while deleting user", "danger");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      console.error(err);
    });
};
