import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './pages/Dashboard';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<AuthForm type="login" />} />
                <Route path="/register" element={<AuthForm type="register" />} />
                <Route
                    path="/"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
