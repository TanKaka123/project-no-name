import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiHost = process.env.NEXT_PUBLIC_API_HOST;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: apiHost }),
  endpoints: () => ({}),
});

export default apiSlice;
