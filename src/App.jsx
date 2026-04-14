import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {AuthProvider} from "./context/AuthContext.jsx";
import HomePage from './pages/HomePage'
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <p>Profile (placeholder)</p>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <ProtectedRoute>
                                <p>Checkout (placeholder)</p>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App