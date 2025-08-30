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


export default App;
