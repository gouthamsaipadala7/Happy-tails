import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Home from "./pages/Home";
import Pets from "./pages/Pets";
import PetDetails from "./pages/PetDetails";
import AdoptionForm from "./pages/AdoptionForm";
import Dashboard from "./pages/Dashboard";
import SuccessStories from "./pages/SuccessStories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/:id" element={<PetDetails />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/adopt/:petId"
          element={
            <ProtectedRoute>
              <AdoptionForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="*" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;