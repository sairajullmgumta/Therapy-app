import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import PromptCreate from "./pages/PromptCreate";
import EmotionSelect from "./pages/EmotionSelect";
import Response from "./pages/Response";
import Reflect from "./pages/Reflect";
import Library from "./pages/Library";
import ReflectionDetail from "./pages/ReflectionDetail";
import Learn from "./pages/Learn";
import CreativeCalm from "./pages/CreativeCalm";
import BreathingSession from "./pages/BreathingSession";
import Analytics from "./pages/Analytics";
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Home" replace />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Create" element={<Create />} />
      <Route path="/PromptCreate" element={<PromptCreate />} />
      <Route path="/EmotionSelect" element={<EmotionSelect />} />
      <Route path="/Response" element={<Response />} />
      <Route path="/Reflect" element={<Reflect />} />
      <Route path="/Library" element={<Library />} />
      <Route path="/ReflectionDetail" element={<ReflectionDetail />} />
      <Route path="/Learn" element={<Learn />} />
      <Route path="/CreativeCalm" element={<CreativeCalm />} />
      <Route path="/BreathingSession" element={<BreathingSession />} />
      <Route path="/Analytics" element={<Analytics />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App