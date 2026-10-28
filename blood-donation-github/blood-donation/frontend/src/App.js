import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard"; // ✅ add this
import AdminDashboard from "./pages/AdminDashboard";
import ManageDonors from "./pages/Donors";
import AddDonor from "./pages/AddDonor";
import EditDonor from "./pages/EditDonor";
import Appointments from "./pages/Appointments";
import DonationHistory from "./pages/DonationHistory";
import Notifications from "./pages/Notifications";
import BloodInventory from "./pages/BloodInventory";
import AppointmentsAdmin from "./pages/AppointmentsAdmin";
import BloodRequests from "./pages/BloodRequests";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import RequestBlood from "./pages/RequestBlood";
import RequestBloodConfirm from "./pages/RequestBloodConfirm";
import EligibilityCriteria from "./pages/EligibilityCriteria";
import DonationProcess from "./pages/DonationProcess";
import FAQs from "./pages/FAQs";
import PrivacyPolicy from "./pages/PrivacyPolicy";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/donors" element={<ManageDonors />} />
        <Route path="/add-donor" element={<AddDonor />} />
        <Route path="/edit-donor/:id" element={<EditDonor />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/donation-history" element={<DonationHistory />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/blood-inventory" element={<BloodInventory />} />
        <Route path="/appointments-admin" element={<AppointmentsAdmin />} />
        <Route path="/blood-requests" element={<BloodRequests />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/request-blood" element={<RequestBlood />} />
        <Route path="/request-blood-confirm" element={<RequestBloodConfirm />} />
        <Route path="/eligibility-criteria" element={<EligibilityCriteria />} />
        <Route path="/donation-process" element={<DonationProcess />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;