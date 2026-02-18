import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Client from './pages/Client';
import InvoiceGenerator from './pages/InvoiceGenerator';
import ClientInvoice from './pages/ClientInvoice';
import Invoices from './pages/Invoices';

// ProtectedRoute Component: Only users who have logged in can access it
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  // If there is no token, it will redirect the user to the login page
  return token ? children : <Navigate to="/login" />;
};

const Layout = ({ children }) => {
  const location = useLocation();

  // Paths where the Navbar should be hidden
  const hideNavbarPaths = ['/login', '/signup'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <main className="main-content-area">
        {children}
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes - Here is where we have added our guard */}
          <Route
            path="/client"
            element={
              <ProtectedRoute>
                <Client />
              </ProtectedRoute>
            }
          />

          <Route
            path="/invoice-generator"
            element={
              <ProtectedRoute>
                <InvoiceGenerator />
              </ProtectedRoute>
            }
          />

          <Route
            path="/client-invoice/:id"
            element={
              <ProtectedRoute>
                <ClientInvoice />
              </ProtectedRoute>
            }
          />

          <Route
            path="/invoices"
            element={
              <ProtectedRoute>
                <Invoices />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;