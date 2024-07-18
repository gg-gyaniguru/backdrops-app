import {useNavigate} from "react-router-dom";
import ProfilePicture from "./ProfilePicture.tsx";
import verify from '../assets/verify.png';

type UserProfile = {
    src: string | null,
    username: string,
    verified: boolean
}

const UserProfile = ({src, username, verified}: UserProfile) => {

    const navigate = useNavigate();

    return (
        <>
            <button className={'w-fit flex items-center gap-3'} onClick={() => navigate(`/@${username}`)}>
                <ProfilePicture className={'w-9 h-9'} src={src}/>
                <span>@{username}</span>
                {verified && <img className={'w-6 h-6 rounded-full'} src={verify} alt={''}/>}
            </button>
        </>
    );
};

export default UserProfile;