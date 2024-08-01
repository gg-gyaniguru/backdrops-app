import {Container} from "../components";
import {removeKey} from "../utils/local.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

const Settings = () => {

    const navigate = useNavigate();

    const signOut = () => {
        removeKey('_id');
        removeKey('accessToken');
        navigate('/signin');
    }

    return (
        <>
            <Container className={'my-20'}>
                <div>
                    <div className={'flex flex-col gap-3.5'}>
                        {/*<button className={'w-full px-3 py-1.5 bg-gray-800 rounded-xl'} onClick={() => navigate('/likes')}>Likes History
                        </button>*/}
                        <button className={'w-full px-3 py-1.5 bg-gray-800 rounded-xl'} onClick={signOut}>Sign Out
                        </button>
                        <button className={'w-full px-3 py-1.5 bg-red-600 rounded-xl'}
                                onClick={() => toast.info('not working')}>Delete Account
                        </button>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Settings;