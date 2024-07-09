import axios from "./axios";

export const getListingsRequest = async () => axios.get(`/listings`);
export const deleteListingByIdRequest = async (id) =>
  axios.delete(`/listings/${id}`);
