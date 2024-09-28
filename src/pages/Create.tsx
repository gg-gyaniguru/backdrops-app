import {Container, CreateCollection, CreateDrop} from "../components";
import {useState} from "react";

type category = 'drop' | 'collection';

const Create = () => {

    const [category, setCategory] = useState<category>('drop');

    const categories: category[] = ['drop', 'collection'];

    return (
        <>
            <Container className={'my-20'}>

                <div className={'flex gap-10 justify-center'}>
                    {
                        categories.map(c =>
                            <div className={''} key={c}>
                                <button
                                    className={`capitalize ${c === category ? 'opacity-100' : 'opacity-50'} px-3 transition-all`}
                                    onClick={() => setCategory(c)}>{c}</button>
                                {c === category &&
                                    <div className={'mt-1 w-full h-0.5 bg-white rounded-full'}></div>}
                            </div>
                        )
                    }
                </div>
                <div className={`mt-10 opacity-0 ${category === 'drop' && 'opacity-100'} ${category === 'collection' && 'opacity-100'} transition-all`}>
                    {category === 'drop' && <CreateDrop/>}
                    {category === 'collection' && <CreateCollection/>}
                </div>

            </Container>
        </>
    );
};

export default Create;