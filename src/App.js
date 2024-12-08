import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profiles from './components/Profiles';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import AddExprience from './components/AddExprience';
import AddEducation from './components/AddEducation';
import Dashboard from './components/Dashboard';
import Posts from './components/Posts';
import Comment from './components/Comment';
import NotFound from './components/NotFound';
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="login" exact element={<Login />} />
          <Route path="register" exact element={<Register />} />
          <Route path="profiles" exact element={<Profiles />} />
          <Route path="profile/:profileId" exact element={<Profile />} />
          <Route path="dashboard" exact element={<Dashboard />} />
          <Route path="dashboard/edit-profile" exact element={<EditProfile />} />
          <Route path="dashboard/add-exprience" exact element={<AddExprience />} />
          <Route path="dashboard/add-education" exact element={<AddEducation />} />
          <Route path="dashboard/posts" exact element={<Posts />} />
          <Route path="dashboard/comment/:postId" exact element={<Comment />} />
          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}