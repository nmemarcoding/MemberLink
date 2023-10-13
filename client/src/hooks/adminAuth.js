import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import store from '../store.js';

function useAdminAuth() {
    const navigate = useNavigate();
    useEffect(() => {
        const userInfo = store.getState().userInf;
        
        if (Object.keys(userInfo).length === 0) {
            navigate('/login');
            return;
        }
        if(userInfo.isAdmin === false){
            navigate('/');
            return;
        }
    }, []);
}

export default useAdminAuth;
