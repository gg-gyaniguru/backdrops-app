import {useEffect, useState} from "react";
import {toast} from "sonner";
import axios from "axios";
import {getKey} from "../utils/local.ts";
import {useNavigate} from "react-router-dom";
import Carousel from "./Carousel.tsx";

const CreateDrop = () => {

    const [image, setImage] = useState<any>([]);
    const [preview, setPreview] = useState<any>([]);
    const [input, setInput] = useState('');


    const _id = getKey('_id');
    const accessToken = getKey('accessToken');

    const navigate = useNavigate();

    const upload = (e: any) => {
        Object.keys(e.target.files).forEach(file => {
            setImage((image: any) => [...image, e.target.files[file]])
        })
    }

    const createPost = async () => {
        try {
            const file = new FormData()
            file.append('_id', _id);
            file.append('description', input);
            image?.forEach((src: any) => {
                file.append('image', src);
            });
            const response = await axios.post(`/api/drop/create`, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            toast.success(response.data.message);
            setImage([]);
            setPreview([]);
            setInput('');
            navigate('/');
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        setPreview([])
        image.forEach((image: any) => {
            const reader = new FileReader();
            if (image) {
                reader.readAsDataURL(image);
            }
            reader.onload = (e: any) => {
                setPreview((preview: any) => [...preview, e.target.result])
            }
        })
    }, [image]);

    return (
        <>
            <div className={'w-full p-5 flex flex-col gap-3 bg-gray-900 rounded-3xl'}>
                <span className={'px-3'}>{`What's on your mind ?`}</span>
                <input
                    className={'file:mr-3 file:px-3 text-sm file:text-base file:py-1.5 file:text-white  file:rounded-full file:bg-indigo-600 file:border-0 cursor-pointer'}
                    type={'file'} multiple={true} accept={'image/png, image/jpeg'} onChange={upload}/>
                <div className={'p-3  flex flex-col gap-3 bg-gray-800 rounded-xl'}>
                    {
                        preview.length > 0 &&
                        <Carousel slides={preview} action={() => {
                        }}/>
                    }
                    <textarea
                        className={'w-full outline-0 resize-none bg-transparent'}
                        placeholder={'Say something...!'}
                        value={input} onChange={(e) => setInput(e.target.value)}/>
                </div>
                <button className={'w-full px-3 py-1.5 bg-blue-600 rounded-xl'} onClick={createPost}>
                    Create Drop
                </button>
            </div>
        </>
    );
};

export default CreateDrop;