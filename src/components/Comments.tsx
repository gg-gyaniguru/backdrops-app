import {getKey} from "../utils/local.ts";
import {useState} from "react";
import {comment} from "../types/drop.ts";
import {get, post, put, remove} from "../utils/fetch.ts";
import Modal from "./Modal.tsx";
import commentIcon from '../assets/comment.png';
import send from '../assets/send.png';
import verify from '../assets/verify.png';
import ProfilePicture from "./ProfilePicture.tsx";
import {useNavigate} from "react-router-dom";
import editIcon from '../assets/edit.png';
import removeIcon from '../assets/remove.png';
import {toast} from "sonner";

type Comments = {
    drop_id: string;
}

const Comments = ({drop_id}: Comments) => {

    const [isFetching, setIsFetching] = useState(false);
    const [comments, setComments] = useState<comment[]>([]);
    const [input, setInput] = useState('');
    const [reply_id, setReply_id] = useState('');
    const [page, setPage] = useState(1);

    const _id = getKey('_id');

    const navigate = useNavigate();

    const action = async () => {
        try {
            setIsFetching(true);
            const response = await get(`/drop/comments/${drop_id}?page=${page}`);
            setIsFetching(false);
            setComments(response.data.comments);
            // setPage(page => page + 1);
        } catch (error) {
            setIsFetching(false);
        }
    }

    const setAction = () => {
        setComments([]);
        setInput('');
        setPage(1);
        setReply_id('');
    }

    const reply = async () => {
        try {
            setIsFetching(true);
            const response = await post('/comment/reply', {
                reply: input,
                // _id: _id,
                drop_id: drop_id
            });
            setIsFetching(false);
            toast.success('reply add');
            setInput('');
            action();
        } catch (error: any) {
            setIsFetching(false);
            toast.error(error.message);
        }
    }

    const edit = (reply_id: string, reply: string) => {
        setReply_id(reply_id);
        setInput(reply);
    }

    const editReply = async () => {
        try {
            setIsFetching(true);
            const response = await put(`/comment/edit`, {
                reply_id: reply_id,
                reply: input
            });
            setIsFetching(false);
            toast.success(response.message);
            setReply_id('');
            setInput('');
            action();
        } catch (error: any) {
            setIsFetching(false);
            toast.error(error.message);
        }
    }

    const removeReply = async (comment_id: string) => {
        try {
            setIsFetching(true);
            const response = await remove(`/comment/remove/${comment_id}`);
            setIsFetching(false);
            toast.success(response.message);
            action();
        } catch (error: any) {
            setIsFetching(false);
            toast.error(error.message);
        }
    }

    return (
        <>
            <Modal className={'w-5 h-5'} icon={commentIcon} modalTitle={'comments'} effect={'bottom'} anyAction={action}
                   setAnyAction={setAction} auto={true} large={'w-5 h-5'}>
                <div className={'h-[20rem] relative'}>
                    <div className={'h-[16rem] relative flex flex-col gap-3 overflow-auto rounded-xl'}>
                        {
                            comments.map(comment =>
                                <div className={'w-full flex gap-3 items-center'} key={comment._id}>
                                    <button className={'w-11 h-11 rounded-full'}
                                            onClick={() => navigate(`/@${comment.user.username}`)}>
                                        <ProfilePicture className={'w-full'} src={comment.user.src}/>
                                    </button>
                                    <span className={'w-full flex flex-col'}>
                                        <span className={'w-full flex items-center justify-between'}>
                                            <button className={'w-fit text-sm flex items-center gap-2 opacity-65'}
                                                    onClick={() => navigate(`/@${comment.user.username}`)}>
                                                <span className={'self-center'}>@{comment.user.username}</span>
                                                {comment.user.verified &&
                                                    <img className={'w-5 h-5'} src={verify} alt={''}/>}
                                            </button>
                                            {comment.user._id === _id &&
                                                <span className={'flex gap-3'}>
                                                    <button className={'w-fit'}
                                                            onClick={() => edit(comment._id, comment.reply)}>
                                                        <img className={'w-3 h-3'} src={editIcon} alt={''}/>
                                                    </button>
                                                <button className={'w-fit'} onClick={() => removeReply(comment._id)}
                                                        disabled={isFetching}>
                                                    <img className={'w-3 h-3'} src={removeIcon} alt={''}/>
                                                </button>
                                                </span>
                                            }
                                        </span>
                                        <span>{comment.reply}</span>
                                    </span>
                                </div>
                            )
                        }
                        {
                            isFetching &&
                            <div className={'py-1.5 flex justify-center'}>
                                <div className={'dots-3'}></div>
                            </div>
                        }
                    </div>
                    <div
                        className={'px-3 py-1.5 flex absolute left-0 bottom-0 right-0 bg-gray-800 rounded-xl overflow-hidden'}>
                        <input className={'pr-3 w-full bg-transparent outline-0'} placeholder={'reply...'} value={input}
                               onChange={(e) => setInput(e.target.value)}/>
                        <button className={`absolute w-6 h-6 ${input ? 'right-3' : '-right-9'} transition-all`}
                                onClick={() => reply_id ? editReply() : reply()} disabled={isFetching}>
                            <img className={'w-full'} src={send}/>
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Comments;