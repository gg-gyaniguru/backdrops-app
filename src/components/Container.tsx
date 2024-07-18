import {ReactNode} from "react";

type Container = {
    className?: string,
    children?: ReactNode,
}

const Container = ({className, children}: Container) => {
    return (
        <>
            <div className={`w-[90%] max-w-[30rem] m-auto ${className}`}>
                {children}
            </div>
        </>
    );
};

export default Container;