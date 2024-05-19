import "./App.css";
import Loading from "./components/Loading";
import { Suspense, lazy, useEffect, useState } from "react";

function App() {
  const DataTable = lazy(() => import("./components/Data.jsx"));
  const Login = lazy(() => import("./components/Login.jsx"));

  const [view, setView] = useState("Login");
  const validate = localStorage.getItem("user_data") !== null;

  useEffect(() => {
    if (validate) {
      if (view !== "data") {
        setView("data");
      }
    } else {
      if (view !== "login") {
        setView("login");
      }
    }
  }, [validate]);
  return (
    <>
      {view === "data" ? (
        <Suspense fallback={<Loading />}>
          <DataTable />
        </Suspense>
      ) : null}
      {view === "login" ? (
        <Suspense fallback={<Loading />}>
          <Login setView={setView} />
        </Suspense>
      ) : null}
    </>
  );
}

export default App;
