import {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {post} from "../utils/fetch.ts";
import {toast} from "sonner";

const CreateCollection = ({action, p=true}: { action?: any, p?:boolean }) => {

    const [isFetching, setIsFetching] = useState(false);
    const [input, setInput] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const createCollection = async () => {
        try {
            const response = await post('/collection/create', {
                name: input,
            });
            toast.success(response.message);
            if (location.pathname !== '/drop/create') {

            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    return (
        <>
            <div className={`w-full ${p && 'p-5'} flex flex-col gap-3 bg-gray-900 rounded-3xl`}>
                <span className={'px-3 text-start'}>What's on your mind ?</span>
                <div className={'mt-3 bg-gray-800 rounded-xl'}>
                    <input className={'px-3 py-1.5 w-full bg-transparent outline-0'} value={input}
                           placeholder={'collection name'} onChange={(e: any) => setInput(e.target.value)}/>
                </div>
                <button className={'w-full px-3 py-1.5 bg-blue-600 rounded-xl'} onClick={createCollection}
                        disabled={isFetching}>
                    {isFetching ?
                        <div className={'m-auto dots-3'}></div> : 'Create Collection'}
                </button>
            </div>
        </>
    );
};

export default CreateCollection;