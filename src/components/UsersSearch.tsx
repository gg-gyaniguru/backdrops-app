import {useEffect, useState} from "react";
import {user} from "../types/drop.ts";
import {get} from "../utils/fetch.ts";
import {UserProfile} from "./index.tsx";
import InfiniteScroll from "./InfiniteScroll.tsx";


const UsersSearch = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [input, setInput] = useState('');
    const [users, setUsers] = useState<user[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const search = async () => {
        try {
            setIsFetching(true);
            const response = await get(`/user/search/${input}?page=${page}`);
            setIsFetching(false);
            const user = response.data;
            setUsers(users => [...users, ...user]);
            setPage(page => page + 1);
            setTotalPage(Math.ceil((response.allDrops) / 10));
        } catch (error) {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        setPage(1);
        if (input.length >= 5) {
            search();
        } else {
            setUsers([]);
        }
    }, [input]);

    return (
        <>

            {/*<Container className={'my-20'}>*/}
            <div className={'mt-6 px-3 py-1.5 flex bg-gray-800 rounded-xl'}>
                <span>@</span><input className={'w-full bg-transparent outline-0'} placeholder={'username'}
                                     value={input} autoFocus={true}
                                     onChange={(e) => setInput(e.target.value)}/>
            </div>

            <div className={'mt-6'}>
                <InfiniteScroll style={'flex flex-col gap-3'} isFetching={isFetching} fetch={search} page={page} totalPage={totalPage}>
                    {
                        users.map(user =>
                            <UserProfile src={user.src} username={user.username} verified={user.verified}
                                         key={user._id}/>
                        )
                    }
                </InfiniteScroll>
            </div>
            {/*</Container>*/}

        </>
    );
};

export default UsersSearch;