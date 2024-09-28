import {ReactNode, useEffect} from "react";
import {drop} from "../types/drop.ts";
import Masonry from "./Masonry.tsx";

type InfiniteScroll = {
    style?: string;
    children?: ReactNode,
    isFetching: boolean,
    fetch: () => void,
    page: number,
    totalPage: number,
}

const InfiniteScroll = ({style, children, isFetching, fetch, page, totalPage}: InfiniteScroll) => {

    const infiniteScroll = () => {
        if (!isFetching && page <= totalPage) {
            if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) >= document.documentElement.scrollHeight) {
                fetch()
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', infiniteScroll);
        return () => {
            window.removeEventListener('scroll', infiniteScroll);
        }
    }, [isFetching, page, totalPage]);

    return (
        <>
            <div className={`${style}`}>
                {children}
                {isFetching && <div className={'m-auto dots-3'}></div>}
            </div>
        </>
    );
};

export default InfiniteScroll;