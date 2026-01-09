import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Experts from "./pages/Experts";
import AskQuestion from "./pages/AskQuestion";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExpertProfile from "./components/experts/ExpertProfile";



import ChatBot from "./components/chat/ChatBox";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* ---------- Public Routes ---------- */}
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ---------- Protected Routes ---------- */}
          <Route
            path="/ask"
            element={
              <ProtectedRoute>
                <AskQuestion />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/experts/:id"
            element={
             <ProtectedRoute>
                <ExpertProfile />
              </ProtectedRoute>} />


          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* AI Assistant (Global) */}
        <ChatBot />
      </Router>
    </AuthProvider>
  );
}

export default App;
