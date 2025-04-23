
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Records from "./pages/Records";
import Providers from "./pages/Providers";
import Blockchain from "./pages/Blockchain";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import RequireAuth from "@/components/RequireAuth";
import { AuthProvider } from "@/contexts/AuthProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Landing />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/records"
              element={
                <RequireAuth>
                  <Records />
                </RequireAuth>
              }
            />
            <Route
              path="/providers"
              element={
                <RequireAuth>
                  <Providers />
                </RequireAuth>
              }
            />
            <Route
              path="/blockchain"
              element={
                <RequireAuth>
                  <Blockchain />
                </RequireAuth>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

