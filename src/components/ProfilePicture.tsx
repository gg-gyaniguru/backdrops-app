import userProfile from '../assets/user.png'
import {getSrc} from "../utils/fetch.ts";

type ProfilePicture = {
    className: string
    src: string | null;
}

const ProfilePicture = ({className, src}: ProfilePicture) => {
    return (
        <>
            <img className={`${className} rounded-full`} src={src ? getSrc(src) : userProfile} alt={''}/>
        </>
    );
};

export default ProfilePicture;