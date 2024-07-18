import Container from "./Container.tsx";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {post} from "../utils/fetch.ts";
import {toast} from "sonner";
import {setKey} from "../utils/local.ts";

type Account = {
    from: string
}

type Response = {
    _id: string,
    username: string,
    accessToken: string
}

const Account = ({from}: Account) => {

    const [input, setInput] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(input => ({...input, [e.target.name]: e.target.value}))
    }

    const action = (response: Response) => {
        setKey('_id', response._id);
        setKey('accessToken', response.accessToken);
        navigate(`/@${response.username}`);
    }

    const signUp = async () => {
        try {
            const response: Response = await post('user/signup', input);
            action(response);
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const signIn = async () => {
        try {
            const response: Response = await post('user/signin', input);
            action(response);
        } catch (error: any) {
            toast.error(error.message);
        }
    }

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
                            <div className={'mt-3'}>
                                <button className={'w-full px-3 py-1.5 bg-blue-600 rounded-xl'}
                                        onClick={() => from === 'signup' ? signUp() : signIn()}>
                                    {from === 'signup' && 'Create'}
                                    {from === 'signin' && 'Continue'}
                                </button>
                            </div>
                            <div>
                                {from === 'signup' && <Link to={'/signin'}>I have an account</Link>}
                                {from === 'signin' && <Link to={'/signup'}>{`I don't have an account`}</Link>}
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