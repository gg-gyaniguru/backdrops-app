import {Toaster} from 'sonner';
import {Outlet} from 'react-router-dom';
import {FooterNavbar, Navbar, Splash} from "./components";

const Layout = () => {

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