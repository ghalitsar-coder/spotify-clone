"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm, FieldValues, SubmitHandler, Field } from "react-hook-form";
import uniqid from "uniqid";

import { BasicModal } from "@/components/Modal/BasicModal";
import useUploadModal from "@/utils/hooks/useUploadModal ";
import { useUser } from "@/utils/hooks/useUser";
import UploadFormV2 from "./UploadFormV2";
import { defaultValuesV2 } from "./constants";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { uploadFile } from "@/utils/uploadFile";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onClose, isOpen } = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, control, reset, formState, watch } =
    useForm<FieldValues>({
      defaultValues: defaultValuesV2,
    });

  const onChange = async (open: boolean) => {
    if (!open && !isLoading) {
      // DONE : Reset Form
      reset();
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values?.image?.[0];
      const songFile = values?.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing Fields");
        return;
      }

      // TODO: Upload Song
      const { data: songData } = await uploadFile({
        file: songFile,
        setIsLoading,
        supabaseClient,
        title: values.title,
        fileFor: "song",
      });

      // TODO: Upload Image
      const { data: imageData } = await uploadFile({
        file: imageFile,
        setIsLoading,
        supabaseClient,
        title: values.title,
        fileFor: "image",
      });

      // TODO: Upload to supabase
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user?.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        toast.error("Uploading Song is Error");
        return;
      }

      router.refresh();
      toast.success("Uploading Song is Success");
      reset();
      onClose();
      // const { data: songData, error: songError } = await supabaseClient.storage
      //   .from("songs")
      //   .upload(`song-${values.title}-${uniqueID}`, songFile, {
      //     cacheControl: "3600",
      //     upsert: false,
      //   });

      // if (songError) {
      //   setIsLoading(false);
      //   toast.error("Song is Failed to upload !");
      //   return;
      // }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BasicModal
      description={"Upload an mp3 file"}
      title={"Add a song"}
      isOpen={isOpen}
      onChange={onChange}
    >
      {/* <InputReactHookForm form={form} onSubmit={onSubmit} /> */}
      <UploadFormV2
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        control={control}
        register={register}
        onSubmit={onSubmit}
      />
    </BasicModal>
  );
};

export default UploadModal;
