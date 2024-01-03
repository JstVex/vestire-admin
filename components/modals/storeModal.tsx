'use client'

import useStoreModal from "@/hooks/useStoreModal";
import Modal from "@/components/ui/modal";

const StoreModal = () => {
    const storeModal = useStoreModal();

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Form
        </Modal>
    );
}

export default StoreModal;