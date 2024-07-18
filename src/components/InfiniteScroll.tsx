import {ReactNode, useState} from "react";

type InfiniteScroll = {
    fetch: () => void,
    children?: ReactNode,
}

const InfiniteScroll = ({fetch, children}: InfiniteScroll) => {

    const [isFetching, setIsFetching] = useState(true);

    return (
        <>
            <div className={''} >

            </div>
        </>
    );
};

export default InfiniteScroll;