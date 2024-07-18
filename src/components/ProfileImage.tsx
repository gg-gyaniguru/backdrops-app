import {useEffect, useState} from "react";
import ProfilePicture from "./ProfilePicture.tsx";
import Container from "./Container.tsx";

type ProfileImage = {
    src: string | null;
}

const ProfileImage = ({src}: ProfileImage) => {

    const [modal, setModal] = useState(false);
    const [toggle, setToggle] = useState(false);

    const active = () => {
        if (toggle) {
            setToggle(false)
        } else {
            if (!modal) {
                setModal(true)
            }
        }
    }

    useEffect(() => {
        if (modal) {
            setTimeout(() => {
                setToggle(true)
            }, 15);
        }
    }, [modal]);

    useEffect(() => {
        if (!toggle) {
            if (modal) {
                setTimeout(() => {
                    setModal(false)
                }, 150);
            }
        }
    }, [toggle]);

    useEffect(() => {
        if (toggle) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [toggle]);

    return (
        <>
            <button className={'w-full'} onClick={active}>
                <ProfilePicture className={'w-full'} src={src}/>
            </button>
            {
                modal &&
                <>
                    <div className={'w-dvw h-dvh fixed left-0 top-0 z-[999999]'}>
                        <div className={`w-dvw h-dvh flex items-center justify-center fixed left-0 top-0 right-0 z-[99999] transition-all ${toggle?'backdrop-blur-sm backdrop-brightness-50 opacity-100':'backdrop-blur-0 backdrop-brightness-100 opacity-0'}`} onClick={active}>
                            <Container className={'relative z-[999999]'}>
                                <Container className={''}>
                                    <ProfilePicture className={'w-full'} src={src}/>
                                </Container>
                            </Container>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default ProfileImage;