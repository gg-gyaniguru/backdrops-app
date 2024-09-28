import {ReactNode, useEffect, useState} from "react";

interface BottomModal {
    button: ReactNode;
    effect?: 'top' | 'bottom';
    children: ReactNode;
    action?: () => void;
    setAction?: () => void;
}

const BottomModal = ({
                         button, effect = 'bottom', children, action = () => {
    }, setAction = () => {
    }
                     }: BottomModal) => {

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
            action()
        } else {
            setAction()
        }
    }, [toggle]);

    return (
        <>
            <div className={'relative rounded-xl cursor-pointer'} onClick={active}>
                {button}
            </div>
            {
                modal &&
                <>
                    <div className={'w-dvw h-dvh fixed left-0 top-0 z-[999999]'}>
                        <div
                            className={`w-dvw h-dvh flex items-center justify-center fixed left-0 ${toggle ? `${effect === 'top' ? 'top-0' : 'bottom-0'}` : `${effect === 'top' ? '-top-[100dvh]' : '-bottom-[100dvh]'}`} right-0 z-[99999] transition-all`}>
                            <div
                                className={'p-6 w-[90%] max-w-[30rem] h-[36rem] absolute bottom-0 z-[999999] rounded-t-3xl bg-slate-900'}>
                                <button
                                    className={'w-9 h-1 m-auto absolute left-0 top-3 right-0 rounded-full bg-white'}
                                    onClick={active}></button>
                                <div className={'mt-3 pb-20 h-full relative'}>
                                    {children}
                                </div>
                            </div>
                            <div
                                className={`w-dvw h-dvh fixed left-0 top-0 z-[99999] ${toggle ? 'backdrop-blur-sm backdrop-brightness-50' : 'backdrop-blur-0 backdrop-brightness-100'} transition-all`}
                                onClick={active}>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default BottomModal;