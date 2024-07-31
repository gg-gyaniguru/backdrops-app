import Container from "./Container.tsx";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {post} from "../utils/fetch.ts";
import {toast} from "sonner";
import {setKey} from "../utils/local.ts";
import Modal from "./Modal.tsx";
import random from "../utils/random.ts";
import {lower, trim} from "../utils/input.ts";

type Account = {
    from: string
}

type Response = {
    _id: string,
    username: string,
    accessToken: string
}

const Account = ({from}: Account) => {

    const [isFetching, setIsFetching] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [otp, setOtp] = useState('');
    const [inputOtp, setInputOtp] = useState('');

    const navigate = useNavigate();

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(input => ({...input, [e.target.name]: e.target.value}))
    }

    const action = (response: Response) => {
        setKey('_id', response._id);
        setKey('accessToken', response.accessToken);
        navigate(`/@${response.username}`);
    }

    const sendOtp = async () => {
        try {
            const otp = random(6);
            setOtp(otp);
            setSendingOtp(true);
            const response = await post('user/otp', {email: lower(input.email), otp: otp});
            setSendingOtp(false);
            toast.success('otp send');
        } catch (error: any) {
            setSendingOtp(false);
            toast.error(error.message);
        }
    }

    const signUp = async () => {
        if (otp) {
            if (otp === inputOtp) {
                try {
                    setIsFetching(true);
                    const response: Response = await post('/user/signup', {
                        username: lower(input.username),
                        email: lower(input.email),
                        password: trim(input.password)
                    });
                    setIsFetching(false);
                    toast.success('account create');
                    action(response);
                } catch (error: any) {
                    setIsFetching(false);
                    throw new Error(error.message);
                }
            } else {
                throw new Error('incorrect otp');
            }
        } else {
            throw new Error('incorrect otp');
        }
    }

    const signIn = async () => {
        try {
            setIsFetching(true);
            const response: Response = await post('/user/signin', {
                email: lower(input.email),
                password: trim(input.password)
            });
            setIsFetching(false);
            action(response);
            toast.success('continue account');
        } catch (error: any) {
            setIsFetching(false);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setOtp('');
        }, 300000)
        return () => {
            clearTimeout(timeOut);
        }
    }, [otp]);

    return (
        <>
            <div className={'w-dvw h-dvh fixed left-0 top-0 right-0 z-[999999] bg-gray-950'}>
                <Container className={'h-dvh flex items-center'}>
                    <div className={'w-full p-6 bg-gray-900 rounded-3xl'}>
                        <form className={'w-full flex flex-col gap-6'} onSubmit={(e) => {
                            e.preventDefault()
                        }}>
                            <div className={''}>
                                <h1 className={'text-center text-2xl font-medium'}>
                                    {from === 'signup' && 'Sign Up'}
                                    {from === 'signin' && 'Sign In'}
                                </h1>
                            </div>
                            <div className={'flex flex-col gap-6'}>
                                {from === 'signup' && <div className={'flex flex-col gap-3'}>
                                    <span className={'px-3 opacity-[.69]'}>Username</span>
                                    <span className={'px-3 py-1.5 flex bg-gray-800 rounded-xl'}>
                                        <span>@</span>
                                    <input
                                        className={'w-full bg-gray-800 outline-0 rounded-tr-xl rounded-br-xl'}
                                        name={'username'} autoComplete={"off"} value={input.username}
                                        onChange={(e) => inputChange(e)}/>
                                    </span>
                                </div>}
                                <div className={'flex flex-col gap-3'}>
                                    <span className={'px-3 opacity-[.69]'}>Email</span>
                                    <input
                                        className={'px-3 py-1.5 bg-gray-800 outline-0 rounded-xl'}
                                        name={'email'} autoComplete={"off"} value={input.email}
                                        onChange={(e) => inputChange(e)}/>
                                </div>
                                <div className={'flex flex-col gap-3'}>
                                    <span className={'px-3 opacity-[.69]'}>Password</span>
                                    <input
                                        className={'px-3 py-1.5 bg-gray-800 outline-0 rounded-xl'}
                                        name={'password'} autoComplete={"off"} value={input.password}
                                        onChange={(e) => inputChange(e)}/>
                                </div>
                            </div>
                            {from === 'signup' && <div className={'mt-3'}>
                                {/*<button className={'w-full px-3 py-1.5 bg-blue-600 rounded-xl'}
                                        onClick={() => from === 'signup' ? signUp() : signIn()} disabled={isFetching}>
                                    {isFetching ?
                                        <div className={'m-auto dots-3'}></div> : 'Send Otp'}
                                </button>*/}
                                <Modal className={'w-full px-3 py-1.5 bg-blue-600 rounded-xl'} title={'Create'}
                                       modalTitle={'verification'} btn={'Verify'} btnVisible={true}
                                       isFetching={isFetching} action={signUp}>
                                    <div className={'w-full flex flex-col gap-3'}>
                                        <div className={''}>
                                            <button className={'w-full px-3 py-1.5 bg-blue-600 rounded-xl'}
                                                    onClick={sendOtp} disabled={isFetching || sendingOtp}>
                                                {sendingOtp ? <div className={'m-auto dots-3'}></div> : 'Send OTP'}
                                            </button>
                                        </div>
                                        <div className={'w-full flex flex-col gap-3'}>
                                            <span className={'px-3 opacity-[.69]'}>Enter 6 Digits OTP</span>
                                            <input
                                                className={'px-3 py-1.5 bg-gray-800 outline-0 rounded-xl'}
                                                autoComplete={"off"} value={inputOtp}
                                                onChange={(e) => setInputOtp(e.target.value)}/>
                                        </div>
                                    </div>
                                </Modal>
                            </div>}
                            {from === 'signin' && <div className={'mt-3'}>
                                <button className={'w-full px-3 py-1.5 bg-blue-600 rounded-xl'}
                                        onClick={signIn} disabled={isFetching}>
                                    {isFetching ? <div className={'m-auto dots-3'}></div> : 'Continue'}
                                </button>
                            </div>}
                            <div>
                                {from === 'signup' && <Link to={'/signin'}>I have an account</Link>}
                                {from === 'signin' && <Link to={'/signup'}>I don't have an account</Link>}
                            </div>
                        </form>
                    </div>
                </Container>
            </div>
        </>
    )
        ;
};

export default Account;