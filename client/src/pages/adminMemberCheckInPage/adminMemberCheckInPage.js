import React from 'react'
import adminAuth from '../../hooks/adminAuth';
import AdminNavbar from '../../components/adminNavbar/adminNavbar';
export default function adminMemberCheckInPage() {
    adminAuth();
  return (
    <div><AdminNavbar/></div>
  )
}
