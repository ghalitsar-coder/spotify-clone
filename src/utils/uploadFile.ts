import { toast } from "react-hot-toast";
import uniqid from "uniqid";
interface IUploadFile {
  file: FileList;
  title: string;
  fileFor: string;
  supabaseClient: any;
  setIsLoading(isLoading: boolean): void;
}
export const uploadFile = async ({
  file,
  title,
  supabaseClient,
  setIsLoading,
  fileFor,
}: IUploadFile) => {
  try {
    const uniqueID = uniqid();
    const { data, error } = await supabaseClient.storage
      .from(`${fileFor}s`)
      .upload(`${fileFor}-${title}-${uniqueID}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      setIsLoading(false);
      toast.error(`${fileFor} is Failed to upload !`);
      throw error;
    }

    return { data };
  } catch (err) {
    throw err;
  }
};
