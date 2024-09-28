import {useEffect, useState} from "react";
import drop from '../assets/drop.png';
import {get} from "../utils/fetch.ts";

const Splash = () => {

    const [isFetching, setIsFetching] = useState(true);
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
            (async () => {
                try {
                    await get('');
                    setIsFetching(false);
                    active();
                } catch (e) {

                }
            })()
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
                        {isFetching && <div className={'mx-auto dots-3'}></div>}
                    </div>
                </div>
            }
        </>
    );
};

export default Splash;