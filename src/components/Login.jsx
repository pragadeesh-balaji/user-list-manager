import React, { memo } from "react";
import { useWindowSize } from "./customHook";

const Login = memo(({ setView }) => {
  const size = useWindowSize();

  const onEmailInput = (e) => {
    if (e.target.value.length > 0) {
      let emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      let status = emailRegex.test(e.target.value);

      if (status === true) {
        if (e.target.classList.contains("is-invalid")) {
          e.target.classList.remove("is-invalid");
        }

        e.target.classList.add("is-valid");
      } else {
        if (e.target.classList.contains("is-valid")) {
          e.target.classList.remove("is-valid");
        }
        e.target.classList.add("is-invalid");
      }
    } else {
    }
  };

  const onPasswordInput = (e) => {
    if (e.target.value.length > 0) {
      if (e.target.classList.contains("is-invalid")) {
        e.target.classList.remove("is-invalid");
      }

      e.target.classList.add("is-valid");
    } else {
      if (e.target.classList.contains("is-valid")) {
        e.target.classList.remove("is-valid");
      }
      e.target.classList.add("is-invalid");
    }
  };

  const onSubmit = async (e) => {
    let payload = {
      user_email: "",
      user_pass: "",
    };
    for (let i of e.currentTarget) {
      if (i.id === "email-login") {
        payload.user_email = i.value;
      }
      if (i.id === "password-login") {
        payload.user_pass = i.value;
      }
    }
    e.preventDefault();
    localStorage.clear();
    localStorage.setItem("user_data", JSON.stringify(payload));
    setView("data");
  };

  return (
    <div className="d-flex w-100 min-vh-100 align-items-center justify-content-center">
      <div
        className={`d-flex ${
          size.width > 500 ? "w-75 h-75" : "w-100 h-100"
        } gap-4 rounded rounded-2 border border-1  shadow-lg`}
      >
        <div
          className={`d-flex flex-column ${
            size.width > 500 ? "h-100" : "min-vh-100"
          } gap-4  p-5 flex-1 justify-content-center`}
        >
          <h2 className="fw-bold fs-1 text-start text-dark">Let&#39;s Login</h2>
          <p className="fw-normal fs-8 text-start text-secondary">
            login into your existing account
          </p>
          <form id="login-user" className="row g-3" onSubmit={onSubmit}>
            <div className="col-12">
              <label htmlFor="email-login" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email-login"
                placeholder="eg:sample@email.com"
                onChange={onEmailInput}
                required
              />
            </div>
            <div className="col-12">
              <label htmlFor="password-login" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password-login"
                placeholder="enter your password"
                onChange={onPasswordInput}
                required
              />
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary"
                form="login-user"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
        <div
          className={`${
            size.width > 750 ? "d-flex" : "d-none"
          } w-100 flex-1   rounded-end-2`}
          style={{
            backgroundImage: `url('https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=2000')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
});

export default Login;
