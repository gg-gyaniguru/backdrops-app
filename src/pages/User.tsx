import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {get, post} from "../utils/fetch.ts";
import {getKey} from "../utils/local.ts";
import {Container, Drop, Following, ProfileImage, Upload} from "../components";
import edit from '../assets/edit.png';
import {toast} from "sonner";
import verify from '../assets/verify.png';
import {drop} from "../types/drop.ts";
import {shortener} from "../utils/logic.ts";

type user = {
    _id: string;
    src: string | null,
    username: string,
    drops: number,
    following: number,
    followers: number,
    isFollowing: boolean
    verified: boolean
}

const User = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [user, setUser] = useState<user | null>(null);
    const [drops, setDrops] = useState<drop[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const params = useParams();

    const location = useLocation();

    const _id = getKey('_id');

    const getUser = async () => {
        if (params.username?.startsWith('@')) {
            try {
                const username = params.username?.substring(1);
                setIsFetching(true);
                const response = await get(`/user/get/${username}`);
                setIsFetching(false);
                setUser(response.data as user);
                try {
                    setIsFetching(true);
                    const response = await get(`/drop/get/${username}`);
                    setIsFetching(false);
                    const drop = response.data;
                    setDrops(drops => [...drops, ...drop]);
                    setTotalPage(Math.ceil((response?.data[0]?.allDrops) / 10));
                    setPage(page => page + 1);
                } catch (error: any) {
                    setIsFetching(false);
                    console.error(error.message);
                }
            } catch (error: any) {
                setIsFetching(false);
                console.error(error.message);
            }
        }
    }

    const follow = async () => {
        try {
            setIsFetching(true);
            const response = await post('user/follow', {
                _id: _id,
                following_id: user?._id
            });
            setIsFetching(false);
            getUser();
            toast.success('follow');
        } catch (error: any) {
            setIsFetching(false);

        }
    }

    const unfollow = async () => {
        try {
            setIsFetching(true);
            const response = await post('user/unfollow', {
                _id: _id,
                following_id: user?._id
            });
            setIsFetching(false);
            getUser();
            toast.success('unfollow');
        } catch (error: any) {
            setIsFetching(false);

        }
    }

    const getScroll = () => {
        if (page <= totalPage) {
            if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) >= document.documentElement.scrollHeight) {
                getUser();
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', getScroll);
        return () => {
            window.removeEventListener('scroll', getScroll);
        }
    }, [isFetching, page, totalPage]);

    useEffect(() => {
        getUser();
        // getDrops();
    }, [location.pathname]);

    return (
        <>
            {user ?
                <Container className={'my-20'}>
                    <div className={'w-full flex items-center gap-5 sm:gap-10'}>
                        <div className={'w-36 relative rounded-full'}>
                            <ProfileImage src={user.src}/>
                            {user._id === _id &&
                                <div className={'w-fit absolute left-0 -bottom-[0.6rem] right-0 m-auto'}>
                                    <Upload refresh={getUser}/>
                                </div>
                            }
                        </div>
                        <div className={'w-full flex flex-col gap-3'}>
                            <span className={'flex items-center justify-between gap-3'}>
                                <span className={'flex items-center gap-3'}>
                                <span className={'text-lg'}>@{user.username}</span>
                                    {
                                        user.verified && <img className={'w-6 h-6 rounded-full'} src={verify} alt={''}/>
                                    }
                                </span>
                                {
                                    user._id === _id ?
                                        <button>
                                            <img className={'w-5 h-5'} src={edit} alt={''}/>
                                        </button>
                                        :
                                        <button className={'w-[50%] px-3 py-1.5 capitalize bg-blue-600 rounded-xl'}
                                                onClick={() => user?.isFollowing ? unfollow() : follow()}>
                                            {
                                                user.isFollowing ? 'unfollow' : 'follow'
                                            }
                                        </button>
                                }
                            </span>
                            <span className={'flex justify-between'}>
                                <button disabled={true}>{shortener(user.drops)} Drops</button>
                                <Following _id={user._id} title={`${shortener(user.following)} Following`}
                                           from={'following'}/>
                                <Following _id={user._id} title={`${shortener(user.followers)} Followers`}
                                           from={'followers'}/>
                            </span>
                        </div>
                    </div>
                    <div className={'mt-10'}>
                        <span>Drops</span>
                    </div>
                    <div className={'mt-6 flex flex-col gap-6'}>
                        {
                            drops.length > 0 ?
                                drops?.map((drop: drop) =>
                                    <Drop drop={drop} action={getUser} key={drop._id}/>
                                )
                                :
                                <span className={'opacity-60'}>not drop yet</span>
                        }
                        {isFetching && <div className={'m-auto dots-3'}></div>}
                    </div>
                </Container> :
                <Container className={'h-dvh flex items-center justify-center text-xl'}>
                    {
                        isFetching ?
                            <div className={'py-1.5 flex justify-center'}>
                                <div className={'dots-3'}></div>
                            </div> : <div>user not found</div>
                    }
                </Container>
            }
        </>
    );
};

export default User;