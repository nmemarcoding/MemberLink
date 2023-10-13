import React from 'react'
import adminAuth from '../../hooks/adminAuth';
import AdminNavbar from '../../components/adminNavbar/adminNavbar';

export default function adminDashboardPage() {
    adminAuth();
  return (
    <div>
        <AdminNavbar/>
    </div>
  )
}
