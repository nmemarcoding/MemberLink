import { useEffect } from 'react';
import Navbar from '../../components/navbar';
import useAuthRedirect from '../../hooks/useAuthRedirect';

export default function HomePage() {
    useAuthRedirect();
  return (
    <div><Navbar/></div>
  )
}
