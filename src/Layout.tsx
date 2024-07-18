import {Toaster} from 'sonner';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {getKey} from './utils/local.ts';
import {FooterNavbar, Navbar, Splash} from "./components";

const Layout = () => {

    const location = useLocation();
    const navigate = useNavigate();

    // useEffect(() => {
        /*if (!getKey('_id') || !getKey('accessToken')) {
            if (location.pathname === '/signin') {
                navigate('/signin');
            } else if (location.pathname === '/signup') {
                navigate('/signup');
            } else {
                navigate('/signin');
            }
        }*/
    // }, [location.pathname]);

    return (
        <>
            <Splash/>
            <Toaster position={'top-right'} expand={true} richColors={true} duration={1500} gap={16}/>
            <Navbar/>
            <Outlet/>
            <FooterNavbar/>
        </>
    );
};

export default Layout;