import {useState} from "react";
import {Container, DropsSearch, UsersSearch} from "../components";

type category = 'users' | 'drops';

const Search = () => {

    const [category, setCategory] = useState<category>('users')

    const categories: category[] = ['users', 'drops']

    return (
        <>
            <Container className={'my-20'}>
                <div className={'flex justify-center gap-10'}>
                    {
                        categories.map(c =>
                            <div className={''} key={c}>
                                <button
                                    className={`capitalize ${c === category ? 'opacity-100' : 'opacity-50'} px-3 transition-all`}
                                    onClick={() => setCategory(c)}>{c}</button>
                                {c === category && <div className={'mt-1 w-full h-0.5 bg-white rounded-full'}></div>}
                            </div>
                        )
                    }
                </div>
                <div className={`opacity-0 ${category === 'users' && 'opacity-100'} ${category === 'drops' && 'opacity-100'}`}>
                    {
                        category === 'users' && <UsersSearch/>
                    }
                    {
                        category === 'drops' && <DropsSearch/>
                    }
                </div>
            </Container>
        </>
    );
};

export default Search;