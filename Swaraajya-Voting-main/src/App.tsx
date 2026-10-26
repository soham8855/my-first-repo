
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VotingProvider } from "@/context/VotingContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import VoterDashboard from "./pages/VoterDashboard";
import VoterLogin from "./pages/VoterLogin";
import ManageParties from "./pages/ManageParties";
import ManageCandidates from "./pages/ManageCandidates";
import ManageVoters from "./pages/ManageVoters";
import CastVote from "./pages/CastVote";
import ElectionResults from "./pages/ElectionResults";
import ConstituencyResults from "./pages/ConstituencyResults";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <VotingProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/voter-login" element={<VoterLogin />} />
              <Route path="/voter-dashboard" element={<VoterDashboard />} />
              <Route path="/manage-parties" element={<ManageParties />} />
              <Route path="/manage-candidates" element={<ManageCandidates />} />
              <Route path="/manage-voters" element={<ManageVoters />} />
              <Route path="/cast-vote" element={<CastVote />} />
              <Route path="/election-results" element={<ElectionResults />} />
              <Route path="/constituency/:id" element={<ConstituencyResults />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </VotingProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
