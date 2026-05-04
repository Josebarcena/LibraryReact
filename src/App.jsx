import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {AuthProvider} from "./context/AuthContext.jsx";
import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/books" element={<BookList />} />
                        <Route path="/books/:id" element={<BookDetail />} />
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
                                    <CheckoutPage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    )
}

export default App