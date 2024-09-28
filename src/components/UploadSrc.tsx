import {useEffect, useRef, useState} from "react";
import {getKey} from "../utils/local.ts";
import {toast} from "sonner";
import Cropper from "react-easy-crop";
import axios from '../utils/axios.ts';
import Modal from "./Modal.tsx";

type Upload = {
    img:any
}

const Upload = ({img}: Upload) => {

    const [isFetching, setIsFetching] = useState(false);
    const imageRef = useRef(null);
    const [image, setImage] = useState(null);
    const [src, setSrc] = useState<any>(null);
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);

    const _id = getKey('_id');


    const upload = (e: any) => {
        setImage(URL.createObjectURL(e.target.files[0]) as any);
    }

    const uploadImage = async () => {
        if (image) {
            try {
                const file = new FormData()
                file.append('_id', `${_id}`);
                file.append('image', src);
                setIsFetching(true);
                const response = await axios.post(`/user/upload`, file, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                setIsFetching(false);
                toast.success(response.data.message);
            } catch (e: any) {
                setIsFetching(false);
                throw new Error(e.response.data.message)
            }
        } else {
            toast.error('image not selected');
        }
    }

    const onCropComplete = async (_: any, croppedAreaPixels: any) => {
        const croppedImage = await getCroppedImage(imageRef.current, croppedAreaPixels);
        setSrc(croppedImage);
    };

    const getCroppedImage = (image: any, croppedAreaPixels: any) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        const ctx = canvas.getContext('2d');

        ctx?.drawImage(
            image,
            croppedAreaPixels.x * scaleX,
            croppedAreaPixels.y * scaleY,
            croppedAreaPixels.width * scaleX,
            croppedAreaPixels.height * scaleY,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    reject(new Error('Failed to create blob'));
                    return;
                }
                resolve(blob);
            }, 'image/png');
        });
    };

    // useEffect(() => {
    //     if (image) {
    //         img(image);
    //     }
    // }, [image]);

    return (
        <>
            <Modal title={'upload'} className={'px-3 py-1.5 bg-blue-600 rounded-lg'} modalTitle={'thumbnail'}
                   action={uploadImage} isFetching={isFetching} btn={'Upload'} btnVisible={true}>
                <div className={'max-h-[30rem] w-full flex flex-col items-center gap-6 overflow-auto'}>
                    <input
                        className={'file:mr-3 file:px-3 text-sm file:text-base self-start file:py-1.5 file:text-white  file:rounded-full file:bg-indigo-600 file:border-0 cursor-pointer'}
                        type={'file'} accept={'image/png, image/jpeg'} onChange={upload}/>

                    {
                        image &&
                        <Cropper image={image} onCropChange={setCrop} crop={crop} aspect={1} zoom={zoom}
                                 onZoomChange={setZoom} onCropComplete={onCropComplete}/>

                    }

                    {
                        src && <img src={src} alt={''}/>
                    }

                    <img className={'hidden'} ref={imageRef} src={image as any} alt={''}/>

                </div>
            </Modal>
        </>
    );
};

export default Upload;