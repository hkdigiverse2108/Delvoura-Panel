import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS, URL_KEYS } from "../Constants";
import { Delete } from "./Method/Delete";
import { Post } from "./Method/Post";
import { Put } from "./Method/Put";
import { useMutations } from "./ReactQuery/useMutation";
import api from "./api";

// ================== MUTATIONS ==================

export const Mutations = {

  // ************ Auth ************
  useSignin: () => useMutations([KEYS.AUTH.SIGNIN], (input) => Post(URL_KEYS.AUTH.SIGNIN, input)),
  useVerifyOtp: () => useMutations([KEYS.AUTH.VERIFY_OTP], (input) => Post(URL_KEYS.AUTH.VERIFY_OTP, input)),

  // ************ Season ************
  useAddSeason: () => useMutations([KEYS.SEASON.ADD], (input) => Post(URL_KEYS.SEASON.ADD, input), { invalidateQueryKeys: [[KEYS.SEASON.GET_ALL]] }),
  useUpdateSeason: () => useMutations([KEYS.SEASON.UPDATE], (input) => Put(URL_KEYS.SEASON.UPDATE, input), { invalidateQueryKeys: [[KEYS.SEASON.GET_ALL]] }),
  useDeleteSeason: () => useMutations([KEYS.SEASON.DELETE], (id) => Delete(URL_KEYS.SEASON.DELETE.replace(":id", id as string)), { invalidateQueryKeys: [[KEYS.SEASON.GET_ALL]] }),

  // ************ Collection ************
  useAddCollection: () => useMutations([KEYS.COLLECTION.ADD], (input) => Post(URL_KEYS.COLLECTION.ADD, input), { invalidateQueryKeys: [[KEYS.COLLECTION.GET_ALL]] }),
  useUpdateCollection: () => useMutations([KEYS.COLLECTION.UPDATE], (input) => Put(URL_KEYS.COLLECTION.UPDATE, input), { invalidateQueryKeys: [[KEYS.COLLECTION.GET_ALL]] }),
  useDeleteCollection: () => useMutations([KEYS.COLLECTION.DELETE], (id) => Delete(URL_KEYS.COLLECTION.DELETE.replace(":id", id as string)), { invalidateQueryKeys: [[KEYS.COLLECTION.GET_ALL]] }),

  // ************ Scent ************
  useAddScent: () => useMutations([KEYS.SCENT.ADD], (input) => Post(URL_KEYS.SCENT.ADD, input), { invalidateQueryKeys: [[KEYS.SCENT.GET_ALL]] }),
  useUpdateScent: () => useMutations([KEYS.SCENT.UPDATE], (input) => Put(URL_KEYS.SCENT.UPDATE, input), { invalidateQueryKeys: [[KEYS.SCENT.GET_ALL]] }),
  useDeleteScent: () => useMutations([KEYS.SCENT.DELETE], (id) => Delete(URL_KEYS.SCENT.DELETE.replace(":id", id as string)), { invalidateQueryKeys: [[KEYS.SCENT.GET_ALL]] }),

  // ************ Product ************
  useAddProduct: () => useMutations([KEYS.PRODUCT.ADD], (input) => Post(URL_KEYS.PRODUCT.ADD, input), { invalidateQueryKeys: [[KEYS.PRODUCT.GET_ALL]] }),
  useUpdateProduct: () => useMutations([KEYS.PRODUCT.UPDATE], (input) => Put(URL_KEYS.PRODUCT.UPDATE, input), { invalidateQueryKeys: [[KEYS.PRODUCT.GET_ALL]] }),
  useDeleteProduct: () => useMutations([KEYS.PRODUCT.DELETE], (id) => Delete(URL_KEYS.PRODUCT.DELETE.replace(":id", id as string)), { invalidateQueryKeys: [[KEYS.PRODUCT.GET_ALL]] }),

  // ************ Blog (FIXED) ************
  useAddBlog: () => useMutations( [KEYS.BLOG.ADD],(input) => Post(URL_KEYS.BLOG.ADD, input),{ invalidateQueryKeys: [[KEYS.BLOG.GET_ALL]] }),
  useUpdateBlog: () => useMutations([KEYS.BLOG.UPDATE],(input) => Put(URL_KEYS.BLOG.UPDATE, input), { invalidateQueryKeys: [[KEYS.BLOG.GET_ALL]] }),
  useDeleteBlog: () => useMutations([KEYS.BLOG.DELETE], (id) => Delete(URL_KEYS.BLOG.DELETE.replace(":id", id as string)), { invalidateQueryKeys: [[KEYS.BLOG.GET_ALL]] }),

  // ************ Banner ************
  useAddEditBanner: () => useMutations([KEYS.BANNER.ADD_EDIT], (input) => Post(URL_KEYS.BANNER.ADD_EDIT, input), { invalidateQueryKeys: [[KEYS.BANNER.GET]] }),

  // ************ User ************
  useAddUser: () => useMutations([KEYS.USER.ADD], (input) => Post(URL_KEYS.USER.ADD, input), { invalidateQueryKeys: [[KEYS.USER.GET_ALL]] }),
  useUpdateUser: () => useMutations([KEYS.USER.UPDATE], (input) => Put(URL_KEYS.USER.UPDATE, input), { invalidateQueryKeys: [[KEYS.USER.GET_ALL]] }),
  useDeleteUser: () => useMutations([KEYS.USER.DELETE], (id) => Delete(URL_KEYS.USER.DELETE.replace(":id", id as string)), { invalidateQueryKeys: [[KEYS.USER.GET_ALL]] }),

  // ************ Topbar ************
  useAddEditTopbar:  () =>useMutations<any, any>( [KEYS.TOPBAR.ADD_EDIT], (input) => Post(URL_KEYS.TOPBAR.ADD_EDIT, input), {invalidateQueryKeys: [[KEYS.TOPBAR.GET]],}),

  // ************ User ************
  useAddTermsService : () =>useMutations<any, any>( [KEYS.TERMS_SERVICE.ADD],(input) => Post(URL_KEYS.TERMS_SERVICE.ADD, input),{ invalidateQueryKeys: [[KEYS.TERMS_SERVICE.GET_ALL]],}),
  useUpdateTermsService :() =>useMutations<any, any>( [KEYS.TERMS_SERVICE.UPDATE],(input) => Put(URL_KEYS.TERMS_SERVICE.UPDATE, input), {invalidateQueryKeys: [[KEYS.TERMS_SERVICE.GET_ALL]],}),
  useDeleteTermsService : () =>useMutations<string, any>( [KEYS.TERMS_SERVICE.DELETE], (id) => Delete(URL_KEYS.TERMS_SERVICE.DELETE.replace(":id", id)),{ invalidateQueryKeys: [[KEYS.TERMS_SERVICE.GET_ALL]],}),

   // ************ Upload ************
  useUploadFile: () => useMutations(["upload_file"], (input) => Post(URL_KEYS.UPLOAD.ADD, input)),

   // ************ Instagram ************
  useAddInstagram: () => useMutations([KEYS.INSTAGRAM.ADD], (input) => Post(URL_KEYS.INSTAGRAM.ADD, input),{ invalidateQueryKeys: [[KEYS.INSTAGRAM.GET_ALL]] }),
  useUpdateInstagram: () =>useMutations([KEYS.INSTAGRAM.UPDATE], (input) => Put(URL_KEYS.INSTAGRAM.UPDATE, input),{ invalidateQueryKeys: [[KEYS.INSTAGRAM.GET_ALL]] }),
  useDeleteInstagram: () => useMutations([KEYS.INSTAGRAM.DELETE],(id) => Delete(URL_KEYS.INSTAGRAM.DELETE.replace(":id", id as any)),{ invalidateQueryKeys: [[KEYS.INSTAGRAM.GET_ALL]] }),

   // ************ Term_Condition ************
  useAddTermsConditions: () =>  useMutations<any, any>( [KEYS.TERMS_CONDITIONS.ADD],(input) => Post(URL_KEYS.TERMS_CONDITIONS.ADD, input),{invalidateQueryKeys: [[KEYS.TERMS_CONDITIONS.GET_ALL]],}),
  useUpdateTermsConditions: () =>useMutations<any, any>( [KEYS.TERMS_CONDITIONS.UPDATE], (input) => Put(URL_KEYS.TERMS_CONDITIONS.UPDATE, input), {invalidateQueryKeys: [[KEYS.TERMS_CONDITIONS.GET_ALL]],}),
  useDeleteTermsConditions: () => useMutations<string, any>( [KEYS.TERMS_CONDITIONS.DELETE], (id) => Delete(URL_KEYS.TERMS_CONDITIONS.DELETE.replace(":id", id)),{ invalidateQueryKeys: [[KEYS.TERMS_CONDITIONS.GET_ALL]],}),

   // ************ Privacy_Policy ************
  useAddPrivacyPolicy: () => useMutations( [KEYS.PRIVACY_POLICY.ADD], (input) => Post(URL_KEYS.PRIVACY_POLICY.ADD, input), { invalidateQueryKeys: [[KEYS.PRIVACY_POLICY.GET_ALL]] }),
  useUpdatePrivacyPolicy: () => useMutations([KEYS.PRIVACY_POLICY.UPDATE], (input) => Put(URL_KEYS.PRIVACY_POLICY.UPDATE, input), { invalidateQueryKeys: [[KEYS.PRIVACY_POLICY.GET_ALL]] }),
  useDeletePrivacyPolicy: () =>  useMutations(  [KEYS.PRIVACY_POLICY.DELETE], (id) => Delete(URL_KEYS.PRIVACY_POLICY.DELETE.replace(":id", id as any)),{ invalidateQueryKeys: [[KEYS.PRIVACY_POLICY.GET_ALL]] }),

   // ************ Refund_Policy ************
  useAddRefundPolicy: () => useMutations([KEYS.REFUND_POLICY.ADD], (input) => Post(URL_KEYS.REFUND_POLICY.ADD, input),  { invalidateQueryKeys: [[KEYS.REFUND_POLICY.GET_ALL]] }),
  useUpdateRefundPolicy: () => useMutations( [KEYS.REFUND_POLICY.UPDATE], (input) => Put(URL_KEYS.REFUND_POLICY.UPDATE, input), { invalidateQueryKeys: [[KEYS.REFUND_POLICY.GET_ALL]] } ),
  useDeleteRefundPolicy: () => useMutations( [KEYS.REFUND_POLICY.DELETE], (id) =>Delete(URL_KEYS.REFUND_POLICY.DELETE.replace(":id", id as string)),{ invalidateQueryKeys: [[KEYS.REFUND_POLICY.GET_ALL]] }),

   // ************ Return_Exchange ************
  useAddReturnExchange: () =>useMutations([KEYS.RETURN_EXCHANGE.ADD],(input) => Post(URL_KEYS.RETURN_EXCHANGE.ADD, input),{ invalidateQueryKeys: [[KEYS.RETURN_EXCHANGE.GET_ALL]] }),
  useUpdateReturnExchange: () => useMutations( [KEYS.RETURN_EXCHANGE.UPDATE],(input) => Put(URL_KEYS.RETURN_EXCHANGE.UPDATE, input), { invalidateQueryKeys: [[KEYS.RETURN_EXCHANGE.GET_ALL]] }),
  useDeleteReturnExchange: () => useMutations( [KEYS.RETURN_EXCHANGE.DELETE], (id) => Delete(URL_KEYS.RETURN_EXCHANGE.DELETE.replace(":id", id as string)), { invalidateQueryKeys: [[KEYS.RETURN_EXCHANGE.GET_ALL]] }),
};



// ************ Common uploads ***********
export const MediaMutations = {
  useUploadImages: () => { const queryClient = useQueryClient();return useMutation({mutationFn: async (files: File[]) => {const formData = new FormData();files.forEach((file) => {formData.append("files", file);});const response = await api.post("/upload", formData, {headers: {"Content-Type": "multipart/form-data",}, });return response.data;},onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["media-gallery"] });},});},
  useDeleteImage: () => {const queryClient = useQueryClient();return useMutation({mutationFn: async (fileUrl: string) => { const response = await api.delete("/upload", {data: { fileUrl },});return response.data;},onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["media-gallery"] });},});},
};


