import {useEffect, useState} from "react";
import {get} from "../utils/fetch.ts";
import {Container, DropsSearch, UsersSearch} from "../components";
import {user} from "../types/drop.ts";

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
                                    className={`${c === category ? 'opacity-100' : 'opacity-50'} px-3`}
                                    onClick={() => setCategory(c)}>{c}</button>
                                {c === category && <div className={'mt-1 w-full h-0.5 bg-white rounded-full'}></div>}
                            </div>
                        )
                    }
                </div>

                {
                    category === 'users' && <UsersSearch/>
                }
                {
                    category === 'drops' && <DropsSearch/>
                }
            </Container>
        </>
    );
};

export default Search;