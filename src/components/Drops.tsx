import Modal from "./Modal.tsx";
import {useState} from "react";
import type {drop} from "../types/drop.ts";
import {get} from "../utils/fetch.ts";
import Drop from "./Drop.tsx";

type Drops = {
    _id: string
}

const Drops = ({_id}: Drops) => {

    const [isFetching, setIsFetching] = useState(false);
    const [drop, setDrop] = useState<drop | null>(null);

    const action = async () => {
        try {
            setIsFetching(true);
            const response = await get(`/drop/${_id}`);
            setIsFetching(false);
            setDrop(response.data);
        } catch (error: any) {
            setIsFetching(false);
        }
    }

    const setAction = () => {
        setDrop(null);
    }

    return (
        <>
            <Modal className={'absolute left-0 top-0 right-0 bottom-0 rounded-xl'} modalTitle={'drop'}
                   anyAction={action} setAnyAction={setAction} auto={true}>
                {drop && <Drop drop={drop} action={action}/>}
                {isFetching && <div className={'m-auto dots-3'}></div>}
            </Modal>
        </>
    );
};

export default Drops;