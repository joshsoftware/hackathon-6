import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the type for each ad item
interface Ad {
  AdID: number;
  AdName: string;
}

interface GetAdsResponse {
  ads: Ad[];
}

interface AdAnalysisResponse {
  analysis: {
    ad_id: number;
    ad_name: string;
    result: string;
    reasons: string[];
    insights: string[];
    suggestions: string[];
  };
}

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
    getList: builder.query<GetAdsResponse, void>({
      query: () => "/analysis/list-ads",
    }),
    getAdAnalysis: builder.query<AdAnalysisResponse, { adId: number }>({
      query: ({ adId }) => `/analysis/ad/${adId}`,
    }),
  }),
});

export const { useUploadFileMutation, useGetListQuery, useGetAdAnalysisQuery } =
  fileUploadApi;
