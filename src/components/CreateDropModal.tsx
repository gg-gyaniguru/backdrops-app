import Modal from "./Modal.tsx";
import add from '../assets/add.png'
import CreateDrop from "./CreateDrop.tsx";

interface CreateDropPopup {

}

const CreateDropPopup = () => {
    return (
        <>
            <Modal modalTitle={'create drop'} className={'w-8 h-8 rounded-full'} icon={add}>
                <CreateDrop p={false}/>
            </Modal>
        </>
    );
};

export default CreateDropPopup;