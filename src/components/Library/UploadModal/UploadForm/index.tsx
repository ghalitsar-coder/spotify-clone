"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form";
import { Button } from "@/components/Button-shad";
import { Input } from "@/components/Input";
import { toast } from "react-hot-toast";
import { defaultValuesUploadModal } from "../constants";
import { FieldValues, SubmitHandler } from "react-hook-form";

interface FormUpload {
  form: any;
  onSubmit: SubmitHandler<FieldValues>;
}

export function InputReactHookForm({ form, onSubmit }: FormUpload) {
  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  // });

  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   toast.error("You submitted the following values:");
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {defaultValuesUploadModal.map((item) => (
          <FormField
            key={item.name}
            name={item.name}
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="capitalize">{item.name}</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...item} {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
