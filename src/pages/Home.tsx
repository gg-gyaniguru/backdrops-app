import {Container, InfiniteScroll, Masonry} from "../components";
import {useEffect, useState} from "react";
import {get} from "../utils/fetch.ts";
import GetDrops from "../components/GetDrops.tsx";

const Home = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [drops, setDrops] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const getDrops = async () => {
        try {
            setIsFetching(true);
            const response = await get(`/drop/get?page=${page}`);
            setIsFetching(false);
            const drop = response.data;
            setPage(page => page + 1);
            setTotalPage(Math.ceil((response?.allDrops) / 10));
            setDrops((drops:any) => [...drops, ...drop]);
        } catch (error) {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        getDrops();
    }, []);

    return (
        <>
            <Container className={'my-20'}>
                <div className={''}>
                    <div>All Drops</div>
                    <div className={'mt-6'}>
                        <InfiniteScroll isFetching={isFetching} fetch={getDrops} page={page}
                                        totalPage={totalPage}>
                            {/*<Masonry drops={drops}/>*/}
                            <GetDrops drops={drops}/>
                        </InfiniteScroll>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Home;