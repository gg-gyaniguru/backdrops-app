import Container from "./Container.tsx";
import {useState} from "react";

const Navbar = () => {

    const [toggle, setToggle] = useState(false)

    return (
        <>
            <Container
                className={`mt-0 p-3 ${toggle ? 'h-36' : 'h-12'} fixed left-0 top-0 right-0 z-[99999] bg-white/30 rounded-b-3xl backdrop-blur-sm transition-all`}>
                <button className={'w-10 h-1.5 m-auto absolute left-0 bottom-2 right-0 bg-white rounded-full'}
                        onClick={() => setToggle(toggle => !toggle)}></button>
            </Container>
        </>
    );
};

export default Navbar;