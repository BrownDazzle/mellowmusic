import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware";

import { Order, Product } from '@/types';
import { AlertTriangle } from 'lucide-react';

interface CartStore {
  items: Product[];
  shipping: {
    province: '',
    city: '',
    address: '',
    phone: ''
  };
  addShipping: (data: Order) => void;
  removeShipping: () => void;
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    shipping: {
      province: '',
      city: '',
      address: '',
      phone: ''
    },
    addShipping: (data: Order) => {
      set({
        shipping: {
          province: '',
          city: '',
          address: '',
          phone: ''
        }
      })
    },
    removeShipping: () => {
      set({
        shipping: {
          province: '',
          city: '',
          address: '',
          phone: ''
        }
      })
    },
    addItem: (data: Product) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === data.id);

      if (existingItem) {
        return toast('Item already in cart.');
      } else {
        const item = { ...data, quantity: 1 }

        set({ items: [...get().items, item] });
        toast.success('Item added to cart.');
      }
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] });
      toast.success('Item removed from cart.');
    },
    removeAll: () => set({ items: [] }),
    incrementItem: (id: string) => {
      const currentItems = get().items;
      const selectedItem = currentItems.find((item) => item.id === id);

      if (selectedItem) {
        const updatedItems = currentItems.map((item) =>
          item.id === id ? { ...item, quantity: Number(item.quantity) + 1 } : item
        );
        set({ items: updatedItems });
        toast.success('Item quantity increased !.');
      }
    },
    decrementItem: (id: string) => {
      const currentItems = get().items;
      const selectedItem = currentItems.find((item) => item.id === id);

      if (selectedItem && Number(selectedItem.quantity) > 1) {
        const updatedItems = currentItems.map((item) =>
          item.id === id ? { ...item, quantity: Number(item.quantity) - 1 } : item
        );
        set({ items: updatedItems });
      } else {
        // Remove item if quantity is 1 or less
        set({ items: [...currentItems.filter((item) => item.id !== id)] });
        toast.success('Item quantity decreased !.');
      }
    },
  }), {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage)
  }));

export default useCart;
