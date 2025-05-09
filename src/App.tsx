
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import EstablishmentPage from "./pages/EstablishmentPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import BusinessPage from "./pages/BusinessPage";
import ContactPage from "./pages/ContactPage";
import AddBusinessPage from "./pages/AddBusinessPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CurrentTurns from "./pages/dashboard/CurrentTurns";
import Appointments from "./pages/dashboard/Appointments";
import Clients from "./pages/dashboard/Clients";
import Settings from "./pages/dashboard/Settings";
import Support from "./pages/dashboard/Support";
import UserAppointments from "./pages/UserAppointments";
import UserSettings from "./pages/UserSettings";
import MainDashboard from "./components/dashboard/MainDashboard";

// Admin components
import AdminLayout from "./components/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBusinesses from "./pages/admin/AdminBusinesses";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSecurity from "./pages/admin/AdminSecurity";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminSupport from "./pages/admin/AdminSupport";

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
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/establishment/:id" element={<EstablishmentPage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/add-business" element={<AddBusinessPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<LoginPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Dashboard routes with DashboardLayout as parent */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<MainDashboard />} />
              <Route path="home" element={<DashboardHome />} />
              <Route path="turns" element={<CurrentTurns />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="clients" element={<Clients />} />
              <Route path="settings" element={<Settings />} />
              <Route path="support" element={<Support />} />
            </Route>
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="overview" element={<AdminOverview />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="businesses" element={<AdminBusinesses />} />
              <Route path="analytics" element={<AdminOverview />} />
              <Route path="appointments" element={<AdminAppointments />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="security" element={<AdminSecurity />} />
              <Route path="support" element={<AdminSupport />} />
            </Route>
            
            <Route path="/appointments" element={<UserAppointments />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
