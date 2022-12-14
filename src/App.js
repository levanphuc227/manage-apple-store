import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import FormCategory from "./page/FormCategory";
import FormGroupProduct from "./page/FormGroupProduct";
import OrderDetail from "./page/OrderDetail";
import FormProductDetail from "./page/FormProductDetail";
import ManageCategory from "./page/ManageCategory";
import ManageGroupProduct from "./page/ManageGroupProduct";
import ManageProductDetail from "./page/ManageProductDetail";
import ManageOrder from "./page/ManageOrder";
import Login from "./page/Login";
import Profile from "./page/Profile";
import Register from "./page/Register";
import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";

import "./App.scss";
import { useEffect, useState } from "react";

// import Header from "./components/Header";

function App() {
  // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      // setShowModeratorBoard(user.listRules.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.listRules.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    // setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div className="App">
      <Router>
        <ul className="nav__category">
          {currentUser ? (
            <li className="wrap-login">
              <div className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Hello {currentUser.username}
                </Link>
              </div>
              <div className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </div>
            </li>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          <li>
            <Link to="/">Home</Link>
          </li>
          {showAdminBoard ? (
            <>
              <li>
                <Link to="managecategory">Manage category</Link>
              </li>
              <li>
                <Link to="manageGroupProduct">Manage group product</Link>
              </li>
              <li>
                <Link to="manageorder">Manage order</Link>
              </li>
            </>
          ) : (
            <></>
          )}

          {/* <li><Link to="login">Login</Link></li> */}
        </ul>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div className="wrap-table">
                <h1>Welcome back page Admin ! </h1>
              </div>
            }
          />
          <Route exact path="/managecategory" element={<ManageCategory />} />
          <Route exact path="/managecategory/add" element={<FormCategory />} />
          <Route
            exact
            path="/manageGroupProduct"
            element={<ManageGroupProduct />}
          />
          <Route exact path="/manageorder" element={<ManageOrder />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/manageGroupProduct/addgroupproduct"
            element={<FormGroupProduct />}
          />
          <Route
            exact
            path="/manageGroupProduct/:id"
            element={<ManageProductDetail />}
          />
          <Route
            exact
            path="/manageGroupProduct/:id/addproductdetail"
            element={<FormProductDetail />}
          />
          <Route
            exact
            path="/manageorder/:idorder/"
            element={<OrderDetail />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
