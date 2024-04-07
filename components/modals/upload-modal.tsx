'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../shared/inputs/Input";
import { Heading } from "../ui/heading";
import Button from "../ui/sign-button";
import useUploadModal from "@/hooks/use-upload-modal";

const UploadModal = () => {
    const router = useRouter();
    const uploadModal = useUploadModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<FieldValues> =
        async (data) => {
            setIsLoading(true);
            signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((callback) => {
                    setIsLoading(false);

                    if (callback?.ok) {
                        toast.success('Logged in');
                        router.refresh();
                        uploadModal.onClose();
                    }

                    if (callback?.error) {
                        console.log("LN_ERR", callback.error)
                        toast.error(callback.error);
                    }
                });
        }

    const onToggle = useCallback(() => {
        uploadModal.onClose();
        registerModal.onOpen();
    }, [uploadModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome back"
                subtitle="Choose Upload Type!"
            />

        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with Facebook"
                icon={AiFillFacebook}
                onClick={() => signIn('facebook')}
            />
            <div className="
      text-neutral-500 text-center mt-4 font-light">
                <p>What are you Uploading?
                    <span
                        onClick={onToggle}
                        className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
                    > Create an account</span>
                </p>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={uploadModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={uploadModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default UploadModal;
