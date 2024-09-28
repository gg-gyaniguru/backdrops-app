import {useEffect, useState} from "react";
import type {drop} from "../types/drop.ts";
import {useLocation, useParams} from "react-router-dom";
import {get} from "../utils/fetch.ts";
import {Container, Drop} from "../components";

const Drops = () => {

    const [isFetching, setIsFetching] = useState(false);
    const [drop, setDrop] = useState<drop | null>(null);

    const {_id} = useParams();

    const location = useLocation();

    const getDrop = async () => {
        try {
            setIsFetching(true);
            const response = await get(`/drop/${_id}`);
            setIsFetching(false);
            setDrop(response.data);
        } catch (error: any) {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        getDrop();
    }, [location.pathname]);

    return (
        <>
            {
                drop ?
                    <Container className={'my-20 bg-gray-900 rounded-3xl'}>
                        <Drop drop={drop} action={getDrop}/>
                    </Container> :
                    <Container className={'h-dvh flex items-center justify-center'}>
                        {isFetching ? <div className={'m-auto dots-3'}></div> :
                            <div className={'text-xl opacity-65'}>drop not found</div>}
                    </Container>
            }
        </>
    );
};

export default Drops;