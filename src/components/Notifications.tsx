import React, {useState} from 'react';
import Modal from "./Modal.tsx";
import {get} from "../utils/fetch.ts";
import like from '../assets/like.png';
import UserProfile from "./UserProfile.tsx";
import {useNavigate} from "react-router-dom";
import ProfilePicture from "./ProfilePicture.tsx";
import verify from "../assets/verify.png";


const Notifications = () => {

    const [notifications, setNotifications] = useState([]);

    const navigate = useNavigate();

    const action = async () => {
        try {
            const response = await get(`/notification/get`);
            setNotifications(response.data.notifications);
        } catch (e) {

        }
    }

    const setAction = () => {
        setNotifications([]);
    }

    return (
        <>
            <Modal modalTitle={'notifications'} icon={like} auto={true} anyAction={action} setAnyAction={setAction}
                   large={'w-6 h-6'}>
                <div className={'flex flex-col gap-5'}>
                    {
                        notifications.map((notification: any) => (
                            <div className={''} key={notification._id}>
                                {
                                    notification.reference === 'follow' &&
                                    <div className={'flex flex-nowrap items-center gap-3'}>
                                        <UserProfile src={notification.user.src} username={notification.user.username}
                                                     verified={notification.user.verified}/>
                                        <span className={'font-medium'}>started following</span>
                                    </div>
                                }
                                {
                                    notification.reference === 'like' &&
                                    <div className={'flex flex-nowrap items-center gap-3'}>
                                        {/*<UserProfile src={notification.user.src} username={notification.user.username} verified={notification.user.verified}/>*/}
                                        {/*<span className={'font-medium'}>started following</span>*/}
                                        {/*<img className={'w-9 h-9 rounded-xl'} src={getSrc(notification.drop.src)}/>*/}
                                        <UserProfile src={notification.user.src} username={notification.user.username}
                                                     verified={notification.user.verified}/>
                                        <span className={'font-medium'}>liked</span>
                                        <span
                                            className={'w-16 h-16 rounded-xl bg-center bg-no-repeat bg-cover cursor-pointer'}
                                            style={{backgroundImage: `url(${notification.drop.src})`}}
                                            onClick={() => navigate(`/drop/${notification.drop._id}`)}></span>

                                    </div>
                                }
                                {
                                    notification.reference === 'comment' &&
                                    <div className={'flex flex-nowrap items-center gap-3'}>
                                        <ProfilePicture className={'w-9 h-9'} src={notification.user.src}/>
                                        <span className={'flex flex-col gap-1'}>
                                            <span>
                                                <span className={'flex items-center gap-3'}>
                                                    <span> @{notification.user.username} </span>
                                                    {
                                                        notification.user.verified &&
                                                        <img className={'w-6 h-6 rounded-full'} src={verify} alt={''}/>
                                                    }
                                                </span>
                                        <span className={'font-medium'}>comment</span>
                                            </span>
                                            <div className={'w-full'}>{notification.comment.reply}</div>
                                        </span>
                                        <span
                                            className={'w-16 h-16 rounded-xl bg-center bg-no-repeat bg-cover cursor-pointer'}
                                            style={{backgroundImage: `url(${notification.comment.drop.src})`}}
                                            onClick={() => navigate(`/drop/${notification.comment.drop._id}`)}></span>

                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </Modal>
        </>
    );
};

export default Notifications;