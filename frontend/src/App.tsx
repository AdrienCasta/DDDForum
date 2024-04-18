import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "./components/ui/toaster";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
