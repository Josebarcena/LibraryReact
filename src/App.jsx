// App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import BookDetail from './components/BookDetail.jsx';
import Checkout from './components/Checkout.jsx';

function App() {
    const [search, setSearch] = useState('');

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage search={search} setSearch={setSearch} />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile" element={<ProtectedRoute> <p>Profile (placeholder)</p> </ProtectedRoute>}/>
                    {/*<Route path="/checkout" element={<ProtectedRoute> <p>Checkout (placeholder)</p> </ProtectedRoute>} />*/}
                    <Route path="/libro/:id" element={<BookDetail search={search} setSearch={setSearch} />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;