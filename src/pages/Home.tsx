import {Container, Drop} from "../components";
import {useEffect, useState} from "react";
import {drop} from "../types/drop.ts";
import {get} from "../utils/fetch.ts";

const Home = () => {

    const [drops, setDrops] = useState<drop[]>([])

    const getDrops = async () => {
        try {
            const response = await get('drop/get');
            setDrops(response.data as drop[]);
        } catch (error) {

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
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Home;