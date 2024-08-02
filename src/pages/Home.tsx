import {Container, Drop} from "../components";
import React, {useEffect, useState} from "react";
import {drop} from "../types/drop.ts";
import {get} from "../utils/fetch.ts";

const Home = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [drops, setDrops] = useState<drop[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const getDrops = async () => {
        try {
            setIsFetching(true);
            const response = await get(`/drop/get?page=${page}`);
            setIsFetching(false);
            const drop = response.data;
            setDrops(drops => [...drops, ...drop]);
            setTotalPage(Math.ceil((response?.data[0]?.allDrops) / 10));
            setPage(page => page + 1);
        } catch (error) {
            setIsFetching(false);
        }
    }

    const getScroll = () => {
        if (page <= totalPage) {
            if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) >= document.documentElement.scrollHeight) {
                getDrops();
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', getScroll);
        return () => {
            window.removeEventListener('scroll', getScroll);
        }
    }, [isFetching, page, totalPage]);

    useEffect(() => {
        getDrops();
        // getScroll();
    }, []);

    return (
        <>
            <Container className={'my-20'}>
                <div className={''}>
                    <div>All Drops</div>
                    <div className={'mt-6 flex flex-col gap-6'}>
                        {
                            drops.map(drop =>
                                <Drop drop={drop} key={drop._id} action={getDrops}/>
                            )
                        }
                        {isFetching && <div className={'m-auto dots-3'}></div>}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Home;