import * as z from "zod";
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_SONG_TYPES = [".mp3"];
export const defaultValuesUploadModal = [
  { name: "author" },
  { name: "title" },
  { name: "song", type: "file", accept: ".mp3" },
  { name: "image", type: "file", accept: ACCEPTED_IMAGE_TYPES.join() },
];
export const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  author: z.string().min(2, {
    message: "Author must be at least 2 characters.",
  }),
  song: z
    .any()
    .refine((files: FileList) => files?.length == 1, "Song is required.")
    .refine(
      (files: FileList) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files: FileList) => ACCEPTED_SONG_TYPES.includes(files?.[0]?.type),
      ".mp3 files are accepted."
    ),
  image: z
    .any()
    .refine((files: FileList) => {
      console.log(`THIS IS   files:`, files);
      return files?.length == 1, "Image is required.";
    })
    .refine(
      (files: FileList) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files: FileList) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});
