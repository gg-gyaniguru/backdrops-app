import {collection} from "../types/drop.ts";
import placeholder from '../assets/placeholder.png';
import {useState} from "react";
import GetCollection from "./GetCollection.tsx";

interface Collections {
    collections: collection[];
    _id: string;
}


const Collections = ({collections, _id}: Collections) => {
    const [columns, setColumns] = useState(2);

    const getColumns = () => {
        const getColumns: any = Array.from({length: columns}, () => []);
        collections.forEach((drop, key) => {
            getColumns[key % columns].push(drop);
        });
        return getColumns;
    }

    const getCollections = getColumns();

    return (
        <>
            <div className={'flex flex-nowrap gap-3'}>
                {
                    getCollections.map((collections: any, key: number) => (
                        <div className={'relative w-1/2 flex flex-col gap-3'} key={key}>
                            {
                                collections.map((collection: collection, key: number) => (
                                    <GetCollection button={
                                        <div
                                            className={'w-full relative rounded-xl bg-gray-800 bg-center bg-no-repeat bg-cover'}
                                            style={{backgroundImage: `url( ${collection.src ? collection.src : placeholder})`}}>
                                            <img className={'w-full rounded-xl opacity-0'} src={placeholder}/>
                                            <div
                                                className={'w-full text-xl flex items-center justify-center absolute left-0 top-0 right-0 bottom-0 rounded-xl backdrop-brightness-[.6] bg-black/30'}>
                                                {collection.name}
                                            </div>
                                        </div>
                                    } _id={collection._id} user={_id} name={collection.name} key={key}/>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default Collections;