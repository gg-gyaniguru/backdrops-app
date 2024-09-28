import Container from "./Container.tsx";
import Notifications from "./Notifications.tsx";

const Navbar = () => {
    // mt-0 p-3 h-12 fixed left-0 top-0 right-0 z-[99999] bg-white/30 rounded-b-3xl backdrop-blur-sm
    return (
        <>
            <Container
                className={`p-3 h-12 fixed left-0 top-0 right-0 z-[999] bg-white/30 rounded-b-3xl backdrop-blur-sm`}>


            </Container>
            <Container className={'p-3 pr-9 fixed left-0 top-0 right-0 z-[99999]'}>
                <div className={'w-fit ms-auto'}>
                    <Notifications/>
                </div>
            </Container>
        </>
    );
};

export default Navbar;