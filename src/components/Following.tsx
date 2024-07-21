import Modal from "./Modal.tsx";
import {user} from "../types/drop.ts";
import Users from "./Users.tsx";
import {useState} from "react";
import {get} from "../utils/fetch.ts";

type Following = {
    _id: string,
    title: string,
    from: string,
}

const Following = ({_id, title, from}: Following) => {

    const [users, setUsers] = useState<user[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const action = async () => {
        try {
            const response = await get(`/user/${from}/${_id}?page=${page}`);
            const data = response.data[from];
            setUsers(users => [...users, ...data]);
            setTotalPage(Math.ceil((response?.data?.allUsers) / 10));
            setPage(page => page + 1);
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
            <Modal title={title} modalTitle={from} anyAction={action} setAnyAction={setAction} auto={true}>
                <Users users={users} fetch={action} totalPage={totalPage} page={page}/>
            </Modal>
        </>
    );
};

export default Following;