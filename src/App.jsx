import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import CreateTrade from "./components/CreateTrade";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import Signals from "./components/Signals";
import Newsletter from "./components/Newsletter";
import AllUsers from "./components/AllUsers";
import Createuser from "./components/Createuser";
import Updateuser from "./components/Updateuser";
import ReportList from "./components/ReportList";
import Logout from "./components/Logout";
import ForgetPassword from "./components/ForgetPassword";
import NewPassword from "./components/NewPassword";
import VerifyEmail from "./components/Verifyemail";
import ShowNewsletter from "./components/ShowNewsletter";

function App() {
  return (
    <div>
      <HashRouter>
        {" "}
        {/* Use HashRouter instead of BrowserRouter */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/signals" element={<Signals />}></Route>
          <Route
            exact
            path="/verify-email/:token"
            element={<VerifyEmail />}
          ></Route>{" "}
          <Route path="/news-letter" element={<Newsletter />}></Route>
          <Route path="/admin/create-trade" element={<CreateTrade />}></Route>
          <Route path="/admin/all-users" element={<AllUsers />}></Route>
          <Route path="/admin/create-new-user" element={<Createuser />}></Route>
          <Route path="/admin/update-user/:id" element={<Updateuser />}></Route>
          <Route path="/admin/report" element={<ReportList />}></Route>
          <Route path="/show-pdf/:name" element={<ShowNewsletter />}></Route>
          <Route
            path="/reset-password/:token"
            element={<NewPassword />}
          ></Route>
        </Routes>
      </HashRouter>{" "}
      {/* Close HashRouter */}
    </div>
  );
}

export default App;
