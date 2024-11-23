import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Login/LoginPage.tsx';
import HomePage from './pages/Home/HomePage.tsx';
import RegisterPage from "./pages/Register/RegisterPage.tsx";
function App() {
return (
<Router >
<Routes>
<Route path="/" element={<LoginPage />} />
<Route path="/Login" element={<LoginPage />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
<Route path="/home" element={<HomePage />} />
</Routes>
</Router>
);
}
export default App;