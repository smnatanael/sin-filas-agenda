
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EstablishmentPage from "./pages/EstablishmentPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import BusinessPage from "./pages/BusinessPage";
import BusinessDashboard from "./pages/BusinessDashboard";
import ContactPage from "./pages/ContactPage";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CurrentTurns from "./pages/dashboard/CurrentTurns";
import Appointments from "./pages/dashboard/Appointments";
import Clients from "./pages/dashboard/Clients";
import Settings from "./pages/dashboard/Settings";
import Support from "./pages/dashboard/Support";
import UserAppointments from "./pages/UserAppointments";
import UserSettings from "./pages/UserSettings";

// Mock user authentication
export const MOCK_USERS = [
  {
    username: "admin",
    password: "admin",
    role: "business"
  }
];

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/establishment/:id" element={<EstablishmentPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<BusinessDashboard />} />
          <Route path="/dashboard/home" element={<DashboardHome />} />
          <Route path="/dashboard/turns" element={<CurrentTurns />} />
          <Route path="/dashboard/appointments" element={<Appointments />} />
          <Route path="/dashboard/clients" element={<Clients />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/support" element={<Support />} />
          <Route path="/appointments" element={<UserAppointments />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
