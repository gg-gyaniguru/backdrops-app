import {getKey} from "../utils/local.ts";
import Container from "./Container.tsx";
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {get} from "../utils/fetch.ts";
import home from '../assets/home.png';
import search from '../assets/search.png';
import add from '../assets/add.png';
import user from '../assets/user.png';
import setting from '../assets/setting.png';


const FooterNavbar = () => {

    const [username, setUsername] = useState('');

    const _id = getKey('_id');

    const location = useLocation();
    const navigate = useNavigate();

    const getUsername = async () => {
        if (_id) {
            try {
                const response = await get(`/user/get`);
                setUsername(response.data.username);
            } catch (error) {
                navigate(`/signin`);
            }
        } else {
            navigate(`/signin`);
        }
    }

    // useEffect(() => {
    //     if (location.pathname.startsWith('/create')) {
    //         if (username !== 'radha') {
    //             navigate('/')
    //         }
    //     }
    // }, [location.pathname]);

    useEffect(() => {
        getUsername();
    }, []);

    return (
        <>
            <Container
                className={'p-3 fixed left-0 bottom-0 right-0 z-[999] bg-white/30 rounded-t-3xl backdrop-blur-sm'}>
                <div className={'flex justify-center gap-9 sm:gap-12'}>
                    <Link to={'/'}>
                        <img className={'w-6 h-6'} src={home} alt={''}/>
                    </Link>
                    <Link to={'/search'}>
                        <img className={'w-6 h-6'} src={search} alt={''}/>
                    </Link>
                    <Link to={'/create'}>
                        <img className={'w-6 h-6'} src={add} alt={''}/>
                    </Link>
                    <Link to={`/@${username}`}>
                        <img className={'w-6 h-6'} src={user} alt={''}/>
                    </Link>
                    <Link to={'/settings'}>
                        <img className={'w-6 h-6'} src={setting} alt={''}/>
                    </Link>
                </div>
            </Container>
        </>
    );
};

export default FooterNavbar;