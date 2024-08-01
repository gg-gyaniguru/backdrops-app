import {useEffect, useState} from "react";
import {drop} from "../types/drop.ts";
import {Container, Drop} from "../components";
import {get} from "../utils/fetch.ts";


const Likes = () => {

    const [drops, setDrops] = useState<drop[]>([]);
    const [page, setPage] = useState(1);

    const getDrops = async () => {
        /*try {
            const response = await get(`/user/likes?page=${page}`);
            setDrops(response.data.drops);
            // setPage(page => page + 1);
        } catch (error) {
            setDrops([]);
        }*/
    }

    useEffect(() => {
        getDrops()
    }, []);

    return (
        <>
            <Container className={'my-20'}>
                <div>
                    Likes History
                </div>
                <div className={'mt-6 flex flex-col gap-6'}>
                    {
                        drops.map((drop: drop) =>
                            <Drop drop={drop} key={drop._id} action={getDrops}/>
                        )
                    }
                </div>
            </Container>
        </>
    );
};

export default Likes;