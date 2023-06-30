"use client";

import { BasicModal } from "@/components/Modal/BasicModal";
import useUploadModal from "@/utils/hooks/useUploadModal ";
import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { FormSchema, defaultValuesUploadModal } from "./constants";
import { InputReactHookForm } from "./UploadForm";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const UploadModal = () => {
  const { onClose, isOpen } = useUploadModal();
  const form = useForm<z.infer<typeof FormSchema>>({
    // defaultValues: defaultValuesUploadModal
    //   .map((item) => item.name)
    //   .reduce((obj, key) => {
    //     return { ...obj, [key]: "" };
    //   }, {}),
    resolver: zodResolver(FormSchema),
  });

  //   const { register, handleSubmit, reset } = useForm<FieldValues>({
  //     defaultValues: defaultValuesUploadModal,
  //   });
  const onChange = (open: boolean) => {
    if (!open) {
      // TODO : Reset Form
      form.reset();
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    console.log(`THIS IS   values:`, values);
    // TODO: Upload to supabase
  };

  return (
    <BasicModal title={"Add a song"} isOpen={isOpen} onChange={onChange}>
      <InputReactHookForm form={form} onSubmit={onSubmit} />
    </BasicModal>
  );
};

export default UploadModal;
