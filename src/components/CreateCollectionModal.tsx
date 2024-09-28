import Modal from "./Modal.tsx";
import CreateCollection from "./CreateCollection.tsx";
import add from "../assets/add.png";

interface CreateCollectionModal {
    action: any
}

const CreateCollectionModal = ({action}:CreateCollectionModal) => {



    return (
        <>
            <Modal modalTitle={'create collection'} className={'w-8 h-8 rounded-full'} icon={add}>
                <CreateCollection action={action} p={false}/>
            </Modal>
        </>
    );
};

export default CreateCollectionModal;