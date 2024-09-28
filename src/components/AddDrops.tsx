import Modal from "./Modal.tsx";
import {useState} from "react";
import add from "../assets/add.png";
import {get, post} from "../utils/fetch.ts";
import MasonryLayout from "./MasonryLayout.tsx";
import {toast} from "sonner";

interface AddDrops {
    _id: string;
    fetch: any
}

const AddDrops = ({_id, fetch}: AddDrops) => {

    const [drops, setDrops] = useState([]);
    const [select, setSelect] = useState<string[]>([]);

    const action = async () => {
        try {
            const response = await post('/collection/drops/add', {
                collection_id: _id,
                drops: select
            });
            fetch()
            toast.success(response.message);
        } catch (error: any) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    const anyAction = async () => {
        try {
            const response = await get('/drop/get/_id');
            setDrops(response.data);
        } catch (e) {
        }
    }

    const getSelect = (_id: string) => {
        setSelect(select => [...select, _id]);
    }

    const removeSelect = (_id: string) => {
        const get = select.filter(select => select !== _id);
        setSelect(get);
    }

    const setAnyAction = () => {
        setDrops([]);
        setSelect([]);
    }

    return (
        <>
            <Modal modalTitle={'add drops'} className={'w-8 h-8 rounded-full '} icon={add} auto={true}
                   action={action} anyAction={anyAction} setAnyAction={setAnyAction} btnVisible={true}
                   btn={'add drops'}>
                <MasonryLayout>
                    {
                        drops.map((drop: any) => (
                            <div className={`relative rounded-xl ${select.includes(drop._id) && 'brightness-50'}`}
                                 key={drop._id} onClick={() => {
                                select.includes(drop._id) ? removeSelect(drop._id) : getSelect(drop._id)
                            }}>
                                <img className={'w-full rounded-xl'} src={drop.src} alt={''}/>
                            </div>
                        ))
                    }
                </MasonryLayout>
            </Modal>
        </>
    );
};

export default AddDrops;