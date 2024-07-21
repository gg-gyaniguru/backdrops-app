import {user} from "../types/drop.ts";
import UserProfile from "./UserProfile.tsx";
import {useEffect, useRef, useState} from "react";

type Users = {
    isFetching: boolean,
    users: user[],
    fetch: () => void,
    page: number,
    totalPage: number,
}

const Users = ({isFetching, users, fetch, page, totalPage}: Users) => {

    // const [isFetching, setIsFetching] = useState(false);
    const div: any = useRef(null);

    const getScroll = async () => {
        if (page <= totalPage) {
            if (div?.current.scrollTop + div.current.clientHeight >= div.current.scrollHeight) {
                await fetch();
            }
        }
    }

    useEffect(() => {
        const current = div?.current;
        current?.addEventListener('scroll', getScroll);
        return () => {
            current?.removeEventListener('scroll', getScroll);
        }
    }, [isFetching, totalPage]);

    return (
        <>
            <div className={'h-[20rem] flex flex-col gap-5 overflow-auto rounded-xl'} ref={div}>
                {
                    users.map((user, key) =>
                        <UserProfile src={user.src} username={user.username} verified={user.verified} key={key}/>
                    )
                }
                {
                    isFetching &&
                    <div className={'py-1.5 flex justify-center'}>
                        <div className={'dots-3'}></div>
                    </div>
                }
            </div>
        </>
    );
};

export default Users;