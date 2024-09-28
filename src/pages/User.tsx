import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {get, post} from "../utils/fetch.ts";
import {getKey} from "../utils/local.ts";
import {Container, Following, InfiniteScroll, Masonry, ProfileImage, Upload} from "../components";
import edit from '../assets/edit.png';
import {toast} from "sonner";
import verify from '../assets/verify.png';
import {collection, drop} from "../types/drop.ts";
import {shortener} from "../utils/logic.ts";
import Collections from "../components/Collections.tsx";
import CreateDropPopup from "../components/CreateDropModal.tsx";
import CreateCollectionModal from "../components/CreateCollectionModal.tsx";

type user = {
    _id: string;
    src: string | null,
    username: string,
    drops: number,
    collections: number,
    following: number,
    followers: number,
    isFollowing: boolean
    verified: boolean
}

type category = 'drops' | 'collections';

const User = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [user, setUser] = useState<user | null>(null);
    const [category, setCategory] = useState<category>('drops')
    const [drops, setDrops] = useState<drop[]>([]);
    const [collections, setCollections] = useState<collection[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const categories: category[] = ['drops', 'collections'];

    const params = useParams();

    const username = params.username?.substring(1);

    const navigate = useNavigate();
    const location = useLocation();

    const _id = getKey('_id');

    const getUser = async () => {
        if (params.username?.startsWith('@')) {
            try {
                setIsFetching(true);
                const response = await get(`/user/get/${username}`);
                setIsFetching(false);
                setUser(response.data as user);
            } catch (error: any) {
                setIsFetching(false);
                console.error(error.message);
            }
        }
    }

    const getDrops = async () => {
        if (params.username?.startsWith('@')) {
            try {
                setIsFetching(true);
                const response = await get(`/drop/get/${username}?page=${page}`);
                setIsFetching(false);
                const drop = response.data;
                setDrops(drops => [...drops, ...drop]);
                setPage(page => page + 1);
                setTotalPage(Math.ceil((response?.data[0]?.allDrops) / 10));
            } catch (error: any) {
                setIsFetching(false);
                console.error(error.message);
            }
        }
    }

    const getCollections = async () => {
        if (params.username?.startsWith('@')) {
            setIsFetching(true);
            const response = await get(`/collection/get/${username}?page=${page}`);
            setIsFetching(false);
            const collection = response.data.collections;
            setCollections(collections => [...collections, ...collection]);
            setPage(page => page + 1);
            setTotalPage(Math.ceil((response?.data?.allCollections) / 10));
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

    // const getScroll = () => {
    //     if (page <= totalPage) {
    //         if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) >= document.documentElement.scrollHeight) {
    //             getUser();
    //         }
    //     }
    // }

    useEffect(() => {
        setDrops([]);
        setCollections([]);
        setPage(0);
        if (category === 'drops') {
            getDrops();
        }
        if (category === 'collections') {
            getCollections();
        }
    }, [category, location.pathname]);

    // useEffect(() => {
    //     window.addEventListener('scroll', getScroll);
    //     return () => {
    //         window.removeEventListener('scroll', getScroll);
    //     }
    // }, [isFetching, page, totalPage]);

    useEffect(() => {
        setUser(null);
        setDrops([]);
        setCollections([]);
        getUser();
    }, [location.pathname]);

    useEffect(() => {
        if (!params.username?.startsWith('@')) {
            navigate(`/@${params.username}`)
        }
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
                            <span className={'flex justify-center gap-6 md:gap-9'}>
                                {/*<button disabled={true}>{shortener(user.drops)} Drops</button>*/}
                                <Following _id={user._id} title={`${shortener(user.following)} Following`}
                                           from={'following'}/>
                                <Following _id={user._id} title={`${shortener(user.followers)} Followers`}
                                           from={'followers'}/>
                            </span>
                        </div>
                    </div>
                    <div className={'mt-10'}>
                        <div className={'flex gap-10'}>
                            {
                                categories.map(c =>
                                    <div className={''} key={c}>
                                        <button
                                            className={`capitalize ${c === category ? 'opacity-100' : 'opacity-50'} px-3 transition-all`}
                                            onClick={() => setCategory(c)}>
                                            {c === 'drops' && `${user?.drops} drops`}
                                            {c === 'collections' && `${user?.collections} collections`}
                                        </button>
                                        {c === category &&
                                            <div className={'mt-1 w-full h-0.5 bg-white rounded-full'}></div>}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={'mt-6 flex flex-col gap-6'}>

                        {category === 'drops' &&
                            <>
                                {
                                    drops.length > 0 ?
                                        <InfiniteScroll isFetching={isFetching} fetch={getUser} page={page}
                                                        totalPage={totalPage}>
                                            <Masonry drops={drops}/>
                                        </InfiniteScroll>
                                        :
                                        <span className={'opacity-60'}>not drop yet</span>
                                }

                                {user._id === _id && <div
                                    className={'w-[90%] max-w-[30rem] m-auto fixed left-0 right-0 bottom-28 pointer-events-none'}>
                                    <div className={'absolute right-0 w-8 h-8 pointer-events-auto rounded-full'}>
                                        <CreateDropPopup/>
                                    </div>
                                </div>}
                            </>
                        }

                        {category === 'collections' &&
                            <>
                                {
                                    collections.length > 0 ?
                                        <InfiniteScroll isFetching={isFetching} fetch={getCollections} page={page}
                                                        totalPage={totalPage}>
                                            <Collections collections={collections} _id={user?._id}/>
                                        </InfiniteScroll>
                                        :
                                        <span className={'opacity-60'}>not collections yet</span>
                                }
                                {user._id === _id && <div
                                    className={'w-[90%] max-w-[30rem] m-auto fixed left-0 right-0 bottom-28 pointer-events-none'}>
                                    <div
                                        className={'absolute right-0 w-8 h-8 pointer-events-auto rounded-full'}>
                                        <CreateCollectionModal action={getCollections}/>
                                    </div>
                                </div>}
                            </>
                        }
                    </div>
                </Container> :
                <Container className={'h-dvh flex items-center justify-center'}>
                    {
                        isFetching ?
                            <div className={'py-1.5 flex justify-center'}>
                                <div className={'dots-3'}></div>
                            </div> : <div className={'text-xl opacity-65'}>user not found</div>
                    }
                </Container>
            }
        </>
    );
};

export default User;