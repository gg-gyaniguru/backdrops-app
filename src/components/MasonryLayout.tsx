import {ReactNode, useState} from "react";

interface MasonryLayout {
    children: ReactNode[];
}

const MasonryLayout = ({children = []}: MasonryLayout) => {

    const [columns, setColumns] = useState(2);

    const getColumns = () => {
        const getColumns: any = Array.from({length: columns}, () => []);
        children.forEach((child, key) => {
            getColumns[key % columns].push(child);
        });
        return getColumns;
    }

    return (
        <>
            <div className={'w-full flex flex-nowrap gap-3'}>
                {
                    getColumns().map((column: [], key: number) => (
                        <div className={'w-1/2 flex flex-col gap-3'} key={key}>
                            {
                                column.map((child, key: number) => (
                                    <div className={'w-full'} key={key}>
                                        {child}
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default MasonryLayout;