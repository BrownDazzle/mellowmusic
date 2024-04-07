import { create } from 'zustand';

import { IEvent } from '@/types';

interface PreviewModalStore {
  isOpen: boolean;
  data?: IEvent;
  onOpen: (data: IEvent) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: IEvent) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
