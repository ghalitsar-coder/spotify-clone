import React from "react";
import { defaultValuesUploadModal } from "../constants";

import Input from "@/components/Input/CustomInput";
import Button from "@/components/Button";
interface IUploadFormV2 {
  control: any;
  register: any;
  isLoading: boolean;
  onSubmit: any;
  handleSubmit: any;
}
const UploadFormV2 = ({
  control,
  register,
  isLoading,
  onSubmit,
  handleSubmit,
}: IUploadFormV2) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-3.5">
      {defaultValuesUploadModal.map((item) => (
        <fieldset className="grid gap-y-1" key={item.name}>
          <label htmlFor="" className="capitalize ">
            {item.name}
          </label>
          <Input {...item} {...register(item.name, { required: true })} />
        </fieldset>
      ))}

      <Button disabled={isLoading} isLoading={isLoading} type={"submit"}>
        Create
      </Button>
    </form>
  );
};

export default UploadFormV2;
