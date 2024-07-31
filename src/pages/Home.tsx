import {Container, Drop} from "../components";
import React, {useEffect, useState} from "react";
import {drop} from "../types/drop.ts";
import {get} from "../utils/fetch.ts";

const Home = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [drops, setDrops] = useState<drop[]>([])

    const getDrops = async () => {
        try {
            setIsFetching(true);
            const response = await get('/drop/get');
            setIsFetching(false);
            setDrops(response.data as drop[]);
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