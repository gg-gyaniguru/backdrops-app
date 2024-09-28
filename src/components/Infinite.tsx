import {ReactNode, useEffect, useRef} from "react";

interface Infinite {
    children?: ReactNode | ReactNode[];
    isFetching: boolean;
    fetch: () => void;
    page: number;
    totalPages: number;
}

const Infinite = ({children, isFetching, fetch, page, totalPages}: Infinite) => {

    const container = useRef<HTMLDivElement | null>(null);

    const top = (input: number) => {
        return Math.ceil(input);
    }

    const infinite = () => {
        if (!isFetching && page <= totalPages) {
            if (top(container?.current?.scrollTop as number) + top(container?.current?.clientHeight as number) >= top(container?.current?.scrollHeight as number)) {
                fetch();
            }
        }
    }

    useEffect(() => {
        const current = container?.current;
        current?.addEventListener('scroll', infinite);
        return () => {
            current?.removeEventListener('scroll', infinite);
        }
    }, [page]);

    return (
        <>
            <div className={'w-full h-full absolute left-0 top-0 right-0 bottom-0 rounded-xl overflow-auto'}
                 ref={container}>
                {children}
                {isFetching &&
                    <div className={'py-6 flex justify-center'}>
                        <div className={'dot'}></div>
                    </div>
                }
            </div>
        </>
    );
};

export default Infinite;