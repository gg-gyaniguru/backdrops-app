import {user} from "../types/drop.ts";
import UserProfile from "./UserProfile.tsx";
import {useEffect, useRef, useState} from "react";

type Users = {
    users: user[],
    fetch: () => void,
    allUsers: number
}

const Users = ({users, fetch, allUsers}: Users) => {

    const [isFetching, setIsFetching] = useState(true);

    const div: any = useRef(null);

    const getScroll = async () => {
        if (users.length <= allUsers) {
            if (div?.current.scrollTop + div.current.clientHeight >= div.current.scrollHeight) {
                setIsFetching(true);
                await fetch();
                setIsFetching(false);
            }
        }
    }

    useEffect(() => {
        const current = div?.current;
        current?.addEventListener('scroll', getScroll);
        return () => {
            current?.removeEventListener('scroll', getScroll);
        }
    }, [users, isFetching, fetch, allUsers]);

    return (
        <>
            <div className={'h-[20rem] flex flex-col gap-5 overflow-auto rounded-xl'} ref={div}>
                {isFetching ?
                    users.map((user, key) =>
                        <UserProfile src={user.src} username={user.username} verified={user.verified} key={key}/>
                    )
                    :
                    <div className={'py-1.5 flex justify-center'}>
                        <div className={'dots-3'}></div>
                    </div>
                }
            </div>
        </>
    );
};

export default Users;