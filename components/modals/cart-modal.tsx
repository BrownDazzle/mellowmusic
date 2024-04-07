'use client';

import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCartModal from "@/hooks/use-cart-modal";

const CartModal = () => {
    const cartModal = useCartModal();
    const [showModal, setShowModal] = useState(cartModal.isOpen);

    useEffect(() => {
        setShowModal(cartModal.isOpen);
    }, [cartModal.isOpen]);

    if (!cartModal.isOpen) {
        return null;
    }

    return (
        <div
            className="
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
        >
            <div className="
          relative 
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2.5/5       
          h-full 
          lg:h-auto
          md:h-auto
          right-0
          "
            >
                {/*content*/}
                <div className={`
            translate
            duration-300
            h-full
           
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
                    <div className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
              right-0
            "
                    >
                        CartPage
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartModal;
