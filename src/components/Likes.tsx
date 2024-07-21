import {user} from "../types/drop.ts";
import Modal from "./Modal.tsx";
import Users from "./Users.tsx";
import {useState} from "react";
import {get} from "../utils/fetch.ts";
import {shortener} from "../utils/logic.ts";

type Likes = {
    _id: string;
    likes: number
}

const Likes = ({_id, likes}: Likes) => {

    const [users, setUsers] = useState<user[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const action = async () => {
        try {
            const response = await get(`/drop/likes/${_id}?page=${page}`);
            const data = response.data.likes;
            setUsers(users => [...users, ...data]);
            setPage(page => page + 1);
            setTotalPage(Math.ceil((response?.data?.allUsers) / 10));
        } catch (error) {

        }
    }

    const setAction = () => {
        setUsers([]);
        setPage(1);
        setTotalPage(1);
    }

    return (
        <>
            <Modal className={''} title={shortener(likes)} modalTitle={'likes'} effect={'bottom'} anyAction={action}
                   setAnyAction={setAction} auto={true}>
                <Users users={users} page={page} totalPage={totalPage} fetch={action}/>
            </Modal>
        </>
    );
};

export default Likes;