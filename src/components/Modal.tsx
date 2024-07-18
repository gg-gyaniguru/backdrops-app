import {ReactNode, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Container from "./Container.tsx";
import {toast} from "sonner";

type Modal = {
    className?: string,
    title?: string,
    icon?: any,
    effect?: 'top' | 'bottom',
    modalTitle: string,
    children?: ReactNode,
    action?: any,
    btn?: string,
    btnVisible?: boolean,
    anyAction?: any,
    setAnyAction?: any,
    auto?: boolean
}

const Modal = ({
                   className,
                   title = '',
                   icon = null,
                   effect = 'top',
                   modalTitle,
                   children,
                   action,
                   btn = 'save',
                   btnVisible = false,
                   anyAction,
                   setAnyAction,
                   auto = false
               }: Modal) => {

    const [modal, setModal] = useState(false);
    const [toggle, setToggle] = useState(false);

    const location = useLocation();

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
            active()
        }
    }, [location]);

    const setAction = async () => {
        try {
            await action();
            active();
        } catch (e: any) {
            toast.error(e.message);
        }
    }

    useEffect(() => {
        if (toggle) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [toggle]);

    useEffect(() => {
        if (toggle) {
            if (auto) {
                anyAction()
            }
        } else {
            if (auto) {
                setAnyAction()
            }
        }
    }, [toggle]);

    return (
        <>
            <button className={`${className}`} onClick={active}>
                {icon && <img className={'w-5 h-5'} src={icon} alt={''}/>}
                {title && title}
            </button>
            {
                modal &&
                <>
                    <div className={'w-dvw h-dvh fixed left-0 top-0 z-[999999]'}>
                        <div
                            className={`w-dvw h-dvh flex items-center justify-center fixed left-0 ${toggle ? `${effect === 'top' ? 'top-0' : 'bottom-0'}` : `${effect === 'top' ? '-top-[100dvh]' : '-bottom-[100dvh]'}`} right-0 z-[99999] transition-all`}>
                            <Container
                                className={'p-6 flex flex-col gap-6 relative z-[999999] rounded-3xl bg-gray-900'}>
                                <div className={'flex items-center justify-between'}>
                                    <div className={'capitalize'}>{modalTitle}</div>
                                    <div className={'w-6 flex flex-col items-end gap-[.35rem] cursor-pointer'}
                                         onClick={active}>
                                        <div
                                            className={`w-full h-[.1rem] bg-white transition-all duration-300 translate-y-[.45rem] -rotate-45 rounded-full`}></div>
                                        <div
                                            className={`h-[.1rem] bg-white transition-all duration-300 w-0 opacity-0 `}></div>
                                        <div
                                            className={`h-[.1rem] bg-white transition-all duration-300 w-full -translate-y-[.45rem] rotate-45 rounded-full`}></div>
                                    </div>
                                </div>
                                <div className={'relative'}>
                                    {children}
                                </div>
                                {
                                    btnVisible &&
                                    <div className={'flex justify-end gap-6'}>
                                        <button className={'px-3 py-1.5 rounded-lg bg-gray-800'}
                                                onClick={setAction}>{btn}</button>
                                        <button className={'px-3 py-1.5 rounded-lg bg-gray-950'}
                                                onClick={active}>Cancel
                                        </button>
                                    </div>
                                }
                            </Container>
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

export default Modal;