import React from "react";

const Loading = () => {
  return (
    <div
      id="loading-page"
      className="position-absolute z-1 top-0 start-0 d-none w-100 align-items-center justify-content-center min-vh-100 pe-none"
      style={{
        background: "rgba(166, 166, 166, 0.11)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(8.9px)",
        WebkitBackdropFilter: "blur(8.9px)",
      }}
    >
      <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
        <div
          class="spinner-border text-dark "
          role="status"
          style={{ width: "80px", height: "80px" }}
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <p className="mb-0 fw-semibold fs-4 text-dark">processing...</p>
      </div>
    </div>
  );
};

export default Loading;
