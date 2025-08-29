import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import NavBar from './components/SideNavBar/NavBar';
import Buyer from './pages/Buyer';
import Product from './pages/Produst';
import Setting from './pages/Setting';
import Profile from './components/Profile/Profile'; 
import { User } from "lucide-react";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <NavBar />

        {/* Right side content */}
        <div className="flex-1 flex flex-col">
          {/* 🔹 Topbar */}
          <header className="flex bg-gray-100 shadow justify-end items-center px-6 py-4">
            <ProfileButton />
          </header>

          {/* 🔹 Page content */}
          <main className="flex-1 p-3 bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/buyers" element={<Buyer />} />
              <Route path="/products" element={<Product />} />
              <Route path="/settings" element={<Setting />} />
              <Route path="/profile" element={<Profile />} /> {/* ✅ fixed profile route */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

// ✅ Small Profile button component
function ProfileButton() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/profile")}
      className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg"
    >

      <User className="text-gray-600" size={20} />
    </div>
  );
}

export default App;
