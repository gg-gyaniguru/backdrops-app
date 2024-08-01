import {useEffect, useState} from "react";
import {user} from "../types/drop.ts";
import {get} from "../utils/fetch.ts";
import {UserProfile} from "./index.tsx";


const UsersSearch = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [input, setInput] = useState('');
    const [users, setUsers] = useState<user[]>([]);

    const search = async () => {
        try {
            setIsFetching(true);
            const response = await get(`/user/search/${input}`);
            setIsFetching(false);
            setUsers(response.data);
        } catch (error) {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        if (input.length >= 5) {
            search();
        } else {
            setUsers([])
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

            <div className={'mt-6 flex flex-col gap-6'}>
                {
                    users.map(user =>
                        <UserProfile src={user.src} username={user.username} verified={user.verified}
                                     key={user._id}/>
                    )
                }
                {
                    isFetching &&
                    <div className={'py-1.5 flex justify-center'}>
                        <div className={'dots-3'}></div>
                    </div>
                }
            </div>
            {/*</Container>*/}

        </>
    );
};

export default UsersSearch;