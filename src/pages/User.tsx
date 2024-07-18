import {useEffect, useState} from "react";
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

    const [user, setUser] = useState<user | null>(null);
    const [drops, setDrops] = useState<drop[]>([])

    const params = useParams();

    const location = useLocation();

    const _id = getKey('_id');

    const getUser = async () => {
        if (params.username?.startsWith('@')) {
            try {
                const username = params.username?.substring(1);
                const response = await get(`user/get/${username}`);
                setUser(response.data as user);
                try {
                    const response = await get(`drop/get/${username}`);
                    setDrops(response.data as drop[]);
                } catch (error: any) {
                    console.error(error.message);
                }
            } catch (error: any) {
                console.error(error.message);
            }
        }
    }

    /*const getDrops = async () => {
        try {
            if (params.username?.startsWith('@')) {
                const username = params.username?.substring(1);
                const response = await get(`drop/get/${username}`);
                setDrops(response.data as drop[]);
            }
        } catch (error: any) {

        }
    }*/

    // const follower = useMemo(() => user?.followers.filter((follower: string) => follower === _id).length === 1, [user]);

    const follow = async () => {
        try {
            const response = await post('user/follow', {
                _id: _id,
                following_id: user?._id
            });
            getUser();
            toast.success('follow');
        } catch (error: any) {

        }
    }

    const unfollow = async () => {
        try {
            const response = await post('user/unfollow', {
                _id: _id,
                following_id: user?._id
            });
            getUser();
            toast.success('unfollow');
        } catch (error: any) {

        }
    }

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
                                <Following _id={user._id} title={`${shortener(user.following)} Following`} from={'following'}/>
                                <Following _id={user._id} title={`${shortener(user.followers)} Followers`} from={'followers'}/>
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
                                ) :
                                <span className={'opacity-60'}>not drop yet</span>
                        }
                    </div>
                </Container> :
                <Container className={'h-dvh flex items-center justify-center text-xl opacity-50'}>
                    user not found
                </Container>
            }
        </>
    );
};

export default User;