import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import AdminLayout from './layouts/AdminLayout';
import User from './pages/admin/User';
import Login from './pages/auth/Login';

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<Login />} />

                    <Route path='/' element={<AdminLayout />}>
                        <Route path='users' element={<User />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
