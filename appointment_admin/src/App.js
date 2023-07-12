import Login from "./pages/Login";
import Register from "./pages/Register"
import Home from "./pages/Home";
import { BrowserRouter, Navigate, Route, Routes, Router, createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Users from "./pages/Users";
import Requests from "./pages/Requests";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import './App.css'
import PageLayout from './PageLayout'
import Programs from "./pages/Programs";
import StudioConfigure from "./pages/StudioConfigure";
import Manage from "./pages/Manage";

function App() {
  const { user } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user?.isAdmin ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={user?.isAdmin ?<Home/>:<Login />} />
        <Route path="/register" element={user?.isAdmin ?<Home/>:<Register />} />
        <Route path="/users" element={user?.isAdmin ?<Users />: <Login/>} />
        <Route path="/requests" element={user?.isAdmin ?<Requests />: <Login/>} />
        <Route path="/programs" element={user?.isAdmin ?<Programs />: <Login/>} />
        <Route path="/configure" element={user?.isAdmin ?<StudioConfigure />: <Login/>} />
        <Route path="/manage" element={user?.role==='manager' ?<Manage />: <Home/>} />
      </Routes>
    </BrowserRouter>
  );
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/register" element={<Register />} />
  //       <Route path="/" element={<PageLayout />} >
  //         <Route element={user?.isAdmin ? <Home /> : <Navigate to="/login" />} />
  //         <Route path="/users" element={<Users />} />
  //         <Route path="/requests" element={<Requests />} />
  //       </Route>
  //     </Routes>
  //   </Router>
  // )
}

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);

export default App;
