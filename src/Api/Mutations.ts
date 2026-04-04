import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS, URL_KEYS } from "../Constants";
import { Delete } from "./Method/Delete";
import { Post } from "./Method/Post";
import { Put } from "./Method/Put";
import { useMutations } from "./ReactQuery/useMutation";
import type { ApiResponse, StaticPagePayload, StaticPageResponse } from "../Types/common";
import type { MediaListResponse } from "../Types";
import type { TopbarPayload } from "../Types/Topbar";

// ================== MUTATIONS ==================

export const Mutations = {

  // ************ Auth ************
  useSignin: () => useMutations([KEYS.AUTH.SIGNIN], (input) => Post(URL_KEYS.AUTH.SIGNIN, input)),
  useVerifyOtp: () => useMutations([KEYS.AUTH.VERIFY_OTP], (input) => Post(URL_KEYS.AUTH.VERIFY_OTP, input)),

  // ************ Forgot Password ************
  useForgotPassword: () => useMutations([KEYS.AUTH.FORGOT_PASSWORD], (input) =>  Post("/auth/forgot-password", input) ),
 useResetPassword: () =>  useMutations([KEYS.AUTH.RESET_PASSWORD], (input) =>  Post("/auth/reset-password", input) ),

 // ************ Change Password ************
useChangePassword: () => useMutations( [KEYS.AUTH.CHANGE_PASSWORD], (input) => Post(URL_KEYS.AUTH.CHANGE_PASSWORD, input)),

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

   // ************ Upload ************
  useUploadFile: () => useMutations(["upload_file"], (input) => Post(URL_KEYS.UPLOAD.ADD, input)),

   // ************ Instagram ************
  useAddInstagram: () => useMutations([KEYS.INSTAGRAM.ADD], (input) => Post(URL_KEYS.INSTAGRAM.ADD, input),{ invalidateQueryKeys: [[KEYS.INSTAGRAM.GET_ALL]] }),
  useUpdateInstagram: () =>useMutations([KEYS.INSTAGRAM.UPDATE], (input) => Put(URL_KEYS.INSTAGRAM.UPDATE, input),{ invalidateQueryKeys: [[KEYS.INSTAGRAM.GET_ALL]] }),
  useDeleteInstagram: () => useMutations([KEYS.INSTAGRAM.DELETE],(id) => Delete(URL_KEYS.INSTAGRAM.DELETE.replace(":id", id as string)),{ invalidateQueryKeys: [[KEYS.INSTAGRAM.GET_ALL]] }),

  // ************ Topbar ************
useAddEditTopbar: () => { const queryClient = useQueryClient();  return useMutation({ mutationFn: (payload: TopbarPayload) => Post(URL_KEYS.TOPBAR.ADD_EDIT, payload),  onSuccess: () => { queryClient.invalidateQueries({ queryKey: [KEYS.TOPBAR.GET], });  }, });},
   // ************ Term_Condition ************
   useAddEditTermsConditions: () => useMutations<StaticPagePayload,ApiResponse<StaticPageResponse>>( [KEYS.TERMS_CONDITIONS.ADD_EDIT], (input) => Post(URL_KEYS.TERMS_CONDITIONS.ADD_EDIT, input), {invalidateQueryKeys: [ [KEYS.TERMS_CONDITIONS.GET],],}),
  
   // ************ Term_Services ************
   useAddEditTermsService: () =>useMutations<StaticPagePayload,ApiResponse<StaticPageResponse>>(  [KEYS.TERMS_SERVICE.ADD_EDIT], (input) => Post(URL_KEYS.TERMS_SERVICE.ADD_EDIT, input),{invalidateQueryKeys: [[KEYS.TERMS_SERVICE.GET]],}),
   
   // ************ Privacy_Policy ************
    useAddEditPrivacyPolicy: () => useMutations<StaticPagePayload,ApiResponse<StaticPageResponse>>( [KEYS.PRIVACY_POLICY.ADD_EDIT], (input) =>  Post(URL_KEYS.PRIVACY_POLICY.ADD_EDIT, input), {  invalidateQueryKeys: [ [KEYS.PRIVACY_POLICY.GET_ALL],],}),

   // ************ Refund_Policy ************
  useAddEditRefundPolicy: () =>useMutations<StaticPagePayload,ApiResponse<StaticPageResponse>>( [KEYS.REFUND_POLICY.ADD_EDIT],  (input) => Post(URL_KEYS.REFUND_POLICY.ADD_EDIT, input),{ invalidateQueryKeys: [ [KEYS.REFUND_POLICY.GET_ALL],], }),

   // ************ Return_Exchange ************
  useAddEditReturnExchange: () =>useMutations<StaticPagePayload,ApiResponse<StaticPageResponse>>( [KEYS.RETURN_EXCHANGE.ADD_EDIT],(input) => Post(URL_KEYS.RETURN_EXCHANGE.ADD_EDIT, input), { invalidateQueryKeys: [  [KEYS.RETURN_EXCHANGE.GET_ALL],],} ),

   // ************ ContactUs ************
  useDeleteContactUs: () => useMutations(  [KEYS.CONTACT_US.DELETE],  (id) => Delete(URL_KEYS.CONTACT_US.DELETE.replace(":id", id as string)), { invalidateQueryKeys: [[KEYS.CONTACT_US.GET_ALL]], }),

   // ************ Newzlatter ************
  useDeleteNewsletter: () =>  useMutations(   [KEYS.NEWSLETTER.DELETE],   (id) =>  Delete(URL_KEYS.NEWSLETTER.DELETE.replace(":id", id as string)), { invalidateQueryKeys: [[KEYS.NEWSLETTER.GET_ALL]], } ),
  
   // ************  Rating ************
  useAddRating: () => useMutations(  [KEYS.RATING.ADD],  (input) => Post(URL_KEYS.RATING.ADD, input), { invalidateQueryKeys: [[KEYS.RATING.GET_ALL]] } ),
 useUpdateRating: () => useMutations(  [KEYS.RATING.UPDATE], (input) => Put(URL_KEYS.RATING.UPDATE, input),  { invalidateQueryKeys: [[KEYS.RATING.GET_ALL]] }),
 useDeleteRating: () => useMutations( [KEYS.RATING.DELETE], (id) => Delete(URL_KEYS.RATING.DELETE.replace(":id", id as string)), { invalidateQueryKeys: [[KEYS.RATING.GET_ALL]] }),

 
// ************ Settings ************
useAddEditSettings: () => useMutations( [KEYS.SETTINGS.ADD_EDIT], (input) => Post(URL_KEYS.SETTINGS.ADD_EDIT, input), { invalidateQueryKeys: [[KEYS.SETTINGS.GET]] }),


useUpdateProfile: () =>
  useMutations(
    [KEYS.PROFILE.UPDATE],
    (input) => Put(URL_KEYS.PROFILE.UPDATE, input)
  ),
};


// ************ Common uploads ***********
export const MediaMutations = {
  useUploadImages: () => {const queryClient = useQueryClient(); return useMutation<MediaListResponse, Error, File[]>({ mutationFn: async (files) => { const formData = new FormData(); files.forEach((file) => {  formData.append("files", file); }); return Post<FormData, MediaListResponse>("/upload", formData); }, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["media-gallery"] });},});},
  useDeleteImage: () => { const queryClient = useQueryClient(); return useMutation<ApiResponse<boolean>, Error, string>({  mutationFn: async (fileUrl) => {  return Delete<ApiResponse<boolean>, { fileUrl: string }>(  "/upload", { fileUrl }); }, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["media-gallery"] });}});},
};



  