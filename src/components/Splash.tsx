import {useEffect, useState} from "react";
import drop from '../assets/drop.png';

const Splash = () => {

    const [splash, setSplash] = useState(true);
    const [toggle, setToggle] = useState(true);

    const active = () => {
        if (toggle) {
            setToggle(false);
        } else {
            setSplash(false);
        }
    }

    useEffect(() => {
        const remove = setTimeout(() => {
            active();
        }, 900);
        return () => {
            clearTimeout(remove);
        }
    }, [toggle]);

    return (
        <>
            {
                splash &&
                <div
                    className={`w-dvw h-dvh fixed left-0 ${toggle ? 'top-0' : '-top-[100dvh]'} right-0 z-[99999999999] transition-all bg-gray-950`}>
                    <div className={'w-dvw h-dvh flex flex-col items-center justify-center gap-3'}>
                        <div>
                            <img className={'w-24 h-24'} src={drop} alt={''}/>
                        </div>
                        <div className={'text-3xl'}>
                            backdrops
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Splash;