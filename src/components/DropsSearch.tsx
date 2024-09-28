import {useEffect, useState} from "react";
import {drop} from "../types/drop.ts";
import {get} from "../utils/fetch.ts";
import InfiniteScroll from "./InfiniteScroll.tsx";
import MasonryLayout from "./MasonryLayout.tsx";
import Drops from "./Drops.tsx";
import placeholder from "../assets/placeholder.png";
import GetCollection from "./GetCollection.tsx";
import GetDrops from "./GetDrops.tsx";


const DropsSearch = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [input, setInput] = useState('');
    const [drops, setDrops] = useState<drop[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const search = async () => {
        try {
            setIsFetching(true);
            const response = await get(`/drop/search/${input}`);
            setIsFetching(false);
            const drop = response.data;
            setDrops(drops => [...drops, ...drop]);
            setPage(page => page + 1);
            setTotalPage(Math.ceil((response?.allDrops) / 10));
        } catch (error) {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        if (input.length >= 5) {
            setDrops([]);
            search();
        } else {
            setDrops([]);
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
                <InfiniteScroll isFetching={isFetching} fetch={search} page={page} totalPage={totalPage}>
                    {/*<Masonry drops={drops}/>*/}
                    {/*<MasonryLayout>
                        {
                            drops.map((drop: any) =>
                                (drop.description ?
                                        <div className={'relative rounded-xl'} key={drop._id}>
                                            <img className={'w-full rounded-xl'} src={drop.src} alt={''}/>
                                            <Drops _id={drop._id}/>
                                        </div>
                                        :
                                        <div key={drop._id}>
                                            <GetCollection button={
                                                <div
                                                    className={'w-full relative rounded-xl bg-gray-800 bg-center bg-no-repeat bg-cover'}
                                                    style={{backgroundImage: `url( ${drop.src ? drop.src : placeholder})`}}>
                                                    <img className={'w-full rounded-xl opacity-0'} src={placeholder}/>
                                                    <div
                                                        className={'w-full text-xl flex items-center justify-center absolute left-0 top-0 right-0 bottom-0 rounded-xl backdrop-brightness-[.6] bg-black/30'}>
                                                        {drop.name}
                                                    </div>
                                                </div>
                                            } _id={drop._id} name={drop.name}/>
                                        </div>
                                )
                            )
                        }
                    </MasonryLayout>*/}
                    <GetDrops drops={drops}/>
                </InfiniteScroll>
            </div>

            {/*</Container>*/}
        </>
    );
};

export default DropsSearch;