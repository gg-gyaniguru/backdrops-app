import {useEffect, useState} from "react";
import {drop} from "../types/drop.ts";
import {get} from "../utils/fetch.ts";
import Drop from "./Drop.tsx";


const DropsSearch = () => {

    const [input, setInput] = useState('');
    const [drops, setDrops] = useState<drop[]>([]);

    const search = async () => {
        try {
            const response = await get(`drop/search/${input}`);
            setDrops(response.data);
        } catch (error) {

        }
    }

    useEffect(() => {
        if (input.length >= 5) {
            search();
        } else {
            setDrops([])
        }
    }, [input]);

    return (
        <>
            {/*<Container className={'my-20'}>*/}

            <div className={'mt-6 bg-gray-800 rounded-xl'}>
                <input className={' px-3 py-1.5 w-full bg-transparent outline-0'} placeholder={'description'}
                       value={input} autoFocus={true}
                       onChange={(e) => setInput(e.target.value)}/>
            </div>

            <div className={'mt-6 flex flex-col gap-6'}>
                {
                    drops.map(drop =>
                        <Drop drop={drop} action={search} key={drop._id}/>
                    )
                }
            </div>

            {/*</Container>*/}
        </>
    );
};

export default DropsSearch;