import type {drop} from "../types/drop.ts";
import UserProfile from "./UserProfile.tsx";
import {getSrc, post, remove} from "../utils/fetch.ts";
import {getKey} from "../utils/local.ts";
import likeIcon from '../assets/like.png';
import likedIcon from '../assets/liked.png';
import downloadIcon from '../assets/download.png';
import removeIcon from '../assets/remove.png';
import Carousel from "./Carousel.tsx";
import {toast} from "sonner";
import {useMemo, useState} from "react";
import Likes from "./Likes.tsx";
import Comments from "./Comments.tsx";
import {shortener} from "../utils/logic.ts";

type Drop = {
    drop: drop,
    action: any
}

const Drop = ({drop, action}: Drop) => {

    // here fix re render
    const [image, setImage] = useState(0);

    const _id = getKey('_id');

    const user = useMemo(() => drop.user._id === _id, [drop]);

    const like = async () => {
        try {
            const response = await post('drop/like', {
                drop_id: drop._id
            })
            action()
            toast.success(response.message);
        } catch (error) {

        }
    }

    const unlike = async () => {
        try {
            const response = await post('drop/unlike', {
                drop_id: drop._id
            })
            action()
            toast.success(response.message);
        } catch (error) {

        }
    }

    const downloadDrop = async () => {
        try {
            const png = `${drop.src[image]}.png`;
            const response = await fetch(`/api/static/${png}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${png}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error('downloadIcon fail');
        }
    }

    const removeDrop = async (_id: string) => {
        try {
            const response = await remove(`drop/remove/${drop._id}`);
            action()
            toast.success(response.message);
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className={'p-3 flex flex-col gap-3 rounded-3xl bg-gray-900'}>
                <div className={'w-fit px-3'}>
                    <UserProfile src={drop.user.src} username={drop.user.username} verified={drop.user.verified}/>
                </div>
                <div className={'p-3 flex flex-col gap-3 rounded-xl bg-gray-800'}>
                    <Carousel slides={drop.src.map(drop => getSrc(drop))} effect={'slide'} action={setImage}/>
                    <div className={''}>
                        {drop.description}
                    </div>
                </div>
                <div className={'px-3 flex items-center justify-between'}>
                    <div className={'flex items-center gap-6'}>
                        <div className={'flex items-center gap-3'}>
                            <button
                                onClick={() => drop.isLike ? unlike() : like()}>
                                {/*{
                                    drop.isLike ?
                                        <img className={'w-5 h-5'} src={likedIcon}/> :
                                        <img className={'w-5 h-5'} src={likeIcon}/>
                                }*/}
                                <img className={'w-5 h-5'} src={drop.isLike ? likedIcon : likeIcon}/>
                            </button>
                            <Likes _id={drop._id} likes={drop.likes}/>
                        </div>
                        <div className={'flex items-center gap-3'}>
                            {/*<button><img className={'w-5 h-5'} src={commentIcon}/></button>*/}
                            <Comments drop_id={drop._id}/>
                            <button>{shortener(drop.comments)}</button>
                        </div>
                    </div>
                    <div className={'self-end'}>
                        <button className={''} onClick={() => user ? removeDrop(drop._id) : downloadDrop()}>
                            <img
                                className={'w-5 h-5'}
                                src={user ? removeIcon : downloadIcon}
                                alt={''}/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export type {Drop};
export default Drop;