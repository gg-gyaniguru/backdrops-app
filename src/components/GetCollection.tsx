import React, {ReactNode, useState} from 'react';
import {drop} from "../types/drop.ts";
import BottomModal from "./BottomModal.tsx";
import {get} from "../utils/fetch.ts";
import Masonry from "./Masonry.tsx";
import {getKey} from "../utils/local.ts";
import AddDrops from "./AddDrops.tsx";
import Infinite from "./Infinite.tsx";

interface GetCollection {
    button: ReactNode;
    user?: string;
    _id: string;
    name: string;
}

// const data = [
//     {
//         _id: '66f540eacf1e82cf91ba6cf0',
//         src: 'http://res.cloudinary.com/backdrops-storage/image/upload/v1727348979/nqawbjip4bmnauygahb0.jpg',
//     },
//     {
//         _id: '66f540eacf1e82cf91ba6cf0',
//         src: 'http://res.cloudinary.com/backdrops-storage/image/upload/v1727348979/nqawbjip4bmnauygahb0.jpg',
//     },
//     {
//         _id: '66f540eacf1e82cf91ba6cf0',
//         src: 'http://res.cloudinary.com/backdrops-storage/image/upload/v1727348979/nqawbjip4bmnauygahb0.jpg',
//     },
//     {
//         _id: '66f540eacf1e82cf91ba6cf0',
//         src: 'http://res.cloudinary.com/backdrops-storage/image/upload/v1727348979/nqawbjip4bmnauygahb0.jpg',
//     },
//     {
//         _id: '66f540eacf1e82cf91ba6cf0',
//         src: 'http://res.cloudinary.com/backdrops-storage/image/upload/v1727348979/nqawbjip4bmnauygahb0.jpg',
//     },
// ]

const GetCollection = ({button, user, _id, name}: GetCollection) => {

    const [isFetching, setIsFetching] = useState(false);
    const [drops, setDrops] = useState<drop[]>([]);
    const user_id = getKey('_id');
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const action = async () => {
        try {
            setIsFetching(true);
            const response = await get(`/collection/drops/get/${_id}?page=${page}`);
            setIsFetching(false);
            const drop = response.data.drops;
            setDrops(drops => [...drops, ...drop]);
            setPage(page => page + 1);
            setTotalPage(Math.ceil((response?.data?.allDrops) / 10));
        } catch (e) {

        }
    }

    const setAction = () => {
        setDrops([]);
        setPage(1);
        setTotalPage(1);
    }

    return (
        <>
            <BottomModal button={button} action={action} setAction={setAction}>
                <div className={'flex justify-between'}>
                    <div className={'font-medium text-xl'}>{name}</div>
                    {user_id === user &&
                        <div>
                            <AddDrops _id={_id} fetch={action}/>
                        </div>
                    }
                </div>
                <div className={'mt-6 h-full relative overflow-auto'}>
                    <Infinite isFetching={isFetching} fetch={action} page={page} totalPages={totalPage}>
                        <Masonry drops={drops}/>
                    </Infinite>
                </div>
            </BottomModal>
        </>
    );
};

export default GetCollection;