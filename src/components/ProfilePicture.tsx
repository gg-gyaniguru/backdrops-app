import userProfile from '../assets/user.png'

type ProfilePicture = {
    className: string
    src: string | null;
}

const ProfilePicture = ({className, src}: ProfilePicture) => {
    return (
        <>
            <img className={`${className} rounded-full`} src={src ? src : userProfile} alt={''}/>
        </>
    );
};

export default ProfilePicture;