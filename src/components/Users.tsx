import {user} from "../types/drop.ts";
import UserProfile from "./UserProfile.tsx";
import {useEffect, useRef} from "react";

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

    const infiniteScroll = async () => {
        if (page <= totalPage) {
            if (div?.current.scrollTop + div.current.clientHeight >= div.current.scrollHeight) {
                fetch();
            }
        }
    }

    useEffect(() => {
        const current = div?.current;
        current?.addEventListener('scroll', infiniteScroll);
        return () => {
            current?.removeEventListener('scroll', infiniteScroll);
        }
    }, [isFetching, page, totalPage]);

    return (
        <>
            <div className={'h-[20rem] flex flex-col gap-3 overflow-auto rounded-xl'} ref={div}>
                {
                    users.map(user =>
                        <UserProfile src={user.src} username={user.username} verified={user.verified} key={user._id}/>
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