import { create } from 'zustand';

import { Order } from '@/types';

interface OrderModalStore {
    isOpen: boolean;
    data?: Order;
    onOpen: (data: Order) => void;
    onClose: () => void;
}

const useOrderModal = create<OrderModalStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data: Order) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false }),
}));

export default useOrderModal;
