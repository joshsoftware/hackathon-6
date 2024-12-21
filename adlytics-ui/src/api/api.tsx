import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fileUploadApi = createApi({
  reducerPath: "fileUploadApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation<void, { name: string; file: File }>({
      query: ({ name, file }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("file", file);

        return {
          url: "/analysis/upload-file",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadFileMutation } = fileUploadApi;
