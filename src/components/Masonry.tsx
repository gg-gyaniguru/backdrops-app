import {useState} from "react";
import type {drop} from "../types/drop.ts";
import Drops from "./Drops.tsx";

type Masonry = {
    drops: any[]
}

const Masonry = ({drops}: Masonry) => {

    const [columns, setColumns] = useState(2);

    // const navigate = useNavigate();

    const getColumns = () => {
        const getColumns: any = Array.from({length: columns}, () => []);
        drops.forEach((drop, key) => {
            getColumns[key % columns].push(drop);
        });
        return getColumns;
    }

    const getDrops = getColumns();
    return (
        <>
            <div className={'flex flex-nowrap gap-3'}>
                {
                    getDrops.map((drops: any, keys: any) => (
                        <div className={'w-1/2 flex flex-col gap-3'} key={keys}>
                            {
                                drops.map((drop: drop, key: number) => (
                                    <div className={'relative rounded-xl'} key={key}>
                                        <img className={'w-full rounded-xl'} src={drop.src} alt={''}/>
                                        <Drops _id={drop._id}/>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default Masonry;