import useWindowSize from "./hooks/useGetWindowSize";

import "./index.css";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ChatBox from "./pages/ChatBox";
import DashboardPage from "./pages/DashboardPage";
import WelcomePage from "./pages/WelcomePage";
import PageNotFound from "./components/PageNotFound";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const windowSize = useWindowSize();

  return (
    <div className="font-extrabold relative">
      {windowSize <= 768 ? (
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate replace to="welcome" />} />
            <Route path="welcome" element={<WelcomePage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<LoginPage />} />

            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="chatbox"
              element={
                <ProtectedRoute>
                  <ChatBox />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<PageNotFound />} />
            {/* Catch-all route for 404 */}
          </Routes>
        </BrowserRouter>
      ) : (
        <PageNotFound /> // If it's not a mobile view, display PageNotFound
      )}
    </div>
  );
}

export default App;
