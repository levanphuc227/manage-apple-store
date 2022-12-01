import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import FormCategory from './page/FormCategory';
import FormGroupProduct from './page/FormGroupProduct';
import FormOrder from './page/FormOrder';
import FormProductDetail from './page/FormProductDetail';
import ManageCategory from './page/ManageCategory';
import ManageGroupProduct from './page/ManageGroupProduct';
import ManageProductDetail from './page/ManageProductDetail';
import ManageOrder from './page/ManageOrder';
import Login from './page/Login';

import './App.scss'

// import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <ul className="nav__category">
          <li><Link to="/">Home</Link></li>
          <li><Link to="managecategory">Manage category</Link></li>
          <li><Link to="manageGroupProduct">Manage group product</Link></li>
          <li><Link to="manageorder">Manage order</Link></li>
          <li><Link to="login">Login</Link></li>
        </ul>        <Routes>
          <Route exact path="/" element={<h1>Home Page</h1>} />
          <Route exact path="/managecategory" element={<ManageCategory />} />
          <Route exact path="/managecategory/add" element={<FormCategory />} />
          <Route exact path="/manageGroupProduct" element={<ManageGroupProduct />} />
          <Route exact path="/manageorder" element={<ManageOrder />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/manageGroupProduct/addgroupproduct" element={<FormGroupProduct />} />
          <Route exact path="/manageGroupProduct/:id" element={<ManageProductDetail />} />
          <Route exact path="/manageGroupProduct/:id/addproductdetail" element={<FormProductDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;