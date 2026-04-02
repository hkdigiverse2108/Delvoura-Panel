
import { KEYS, URL_KEYS } from "../Constants";
import { Get } from "./Method/Get";
import { useQueries } from "./ReactQuery/useQueries";
import type {  BlogListResponse, CollectionListResponse, ContactUsListResponse, InstagramListResponse, MediaListResponse, NewsletterListResponse, OrderListResponse, OrderResponse, ProductListResponse, ProductResponse, RatingListResponse, ScentListResponse, SeasonListResponse,  StaticPageListResponse, TopbarResponse, UserListResponse, UserResponse } from "../Types";
import type { ApiResponse, Params } from "../Types/common";
import type { SettingsResponse } from "../Types/Settings";




export const Queries =  {

    // ******* Season ********
    useGetSeasons: (params?: Params) => useQueries<SeasonListResponse>( [KEYS.SEASON.GET_ALL, params], () => Get(URL_KEYS.SEASON.GET_ALL, { ...params,search: params?.search || undefined,})),
   
 
   // ******* Collection ********
   useGetCollections: (params?: Params) =>useQueries<CollectionListResponse>( [KEYS.COLLECTION.GET_ALL, params],   () =>  Get(URL_KEYS.COLLECTION.GET_ALL, { ...params,  search: params?.search || undefined,})),
    
   
   // ******* Scent ********
   useGetScents: (params?: Params) => useQueries<ScentListResponse>( [KEYS.SCENT.GET_ALL, params], () => Get(URL_KEYS.SCENT.GET_ALL, { ...params,  search: params?.search || undefined,})),
   
   
   // ******* Product ********
  useGetProducts: (params?: Params) => useQueries<ProductListResponse>( [KEYS.PRODUCT.GET_ALL, params], () => Get(URL_KEYS.PRODUCT.GET_ALL, { ...params, search: params?.search || undefined, })),
  useGetProductById: (id?: string) =>  useQueries<ProductResponse>( [KEYS.PRODUCT.GET_BY_ID, id],   () => Get(URL_KEYS.PRODUCT.GET_BY_ID.replace(":id", id || "")),{ enabled: !!id }),
   

   // ******* Gallery ********
  useGetGallery: () => useQueries<MediaListResponse>( ["media-gallery"],() => Get("/upload")),
   

   // ******* User ********
   useGetUsers: (params?: Params) => useQueries<UserListResponse>( [KEYS.USER.GET_ALL, params],  () => Get(URL_KEYS.USER.GET_ALL, { ...params, search: params?.search || undefined,})),
   useGetUserById: (id?: string) => useQueries<UserResponse>( [KEYS.USER.GET_BY_ID, id], () => Get(URL_KEYS.USER.GET_BY_ID.replace(":id", id || "")),  { enabled: !!id }),
    
    
   // ******* Banner ********
   useGetBanner: () => useQueries<ApiResponse>( [KEYS.BANNER.GET], () => Get("/banner")),
   
   
   // ******* Blog ********
    useGetBlogs: (params?: Params) =>useQueries<BlogListResponse>( [KEYS.BLOG.GET_ALL, params],  () =>  Get(URL_KEYS.BLOG.GET_ALL, {  ...params, search: params?.search || undefined, })),


    // ******* Topbar ********
    useGetTopbar: () => useQueries<TopbarResponse>( [KEYS.TOPBAR.GET], () => Get(URL_KEYS.TOPBAR.GET)),

    // ******* Terms-Services ********
    useGetTermsService: () =>useQueries<StaticPageListResponse>( [KEYS.TERMS_SERVICE.GET],() => Get(URL_KEYS.TERMS_SERVICE.GET)),
   
   
    // ******* Instagram ********
    useGetInstagrams: (params?: Params) => useQueries<InstagramListResponse>(  [KEYS.INSTAGRAM.GET_ALL, params], () => Get(URL_KEYS.INSTAGRAM.GET_ALL, { ...params, search: params?.search || undefined, })),
    
    
    // ******** TERMS CONDITIONS ********
     useGetTermsConditions: () => useQueries<StaticPageListResponse>( [KEYS.TERMS_CONDITIONS.GET], () => Get(URL_KEYS.TERMS_CONDITIONS.GET)),
    

    // ******** PRIVACY POLICY ********
    useGetPrivacyPolicy: (params?: Params) =>useQueries<StaticPageListResponse>( [KEYS.PRIVACY_POLICY.GET_ALL, params], () => Get(URL_KEYS.PRIVACY_POLICY.GET_ALL)),


    // ******** REFUND POLICY ********
    useGetRefundPolicy: (params?: Params) => useQueries<StaticPageListResponse>( [KEYS.REFUND_POLICY.GET_ALL, params], () => Get(URL_KEYS.REFUND_POLICY.GET_ALL)),


    // ******** REFUND EXCHANGE ********
    useGetReturnExchange: (params?: Params) => useQueries<StaticPageListResponse>(  [KEYS.RETURN_EXCHANGE.GET_ALL, params], () => Get(URL_KEYS.RETURN_EXCHANGE.GET_ALL)),
   

   // ************ ContactUs ************
    useGetContactUs: (params?: Params) => useQueries<ContactUsListResponse>( [KEYS.CONTACT_US.GET_ALL, params],  () =>   Get(URL_KEYS.CONTACT_US.GET_ALL, {  ...params, search: params?.search || undefined,})),


   // ************ Newsletter ************
    useGetNewsletters: (params?: Params) => useQueries<NewsletterListResponse>(  [KEYS.NEWSLETTER.GET_ALL, params],  () =>  Get(URL_KEYS.NEWSLETTER.GET_ALL, {  ...params, search: params?.search || undefined,})),


   // ************ Rating ************
    useGetRatings: (params?: Params) => useQueries<RatingListResponse>( [KEYS.RATING.GET_ALL, params],   () => Get(URL_KEYS.RATING.GET_ALL, { ...params, search: params?.search || undefined, })),

     
   // ************ Product Dropdown ************
   useGetProductDropdown: (params?: Params, enabled?: boolean) => useQueries<any>( ["product_dropdown", params], () => Get("/product/", { page: 1, limit: 100 }), { enabled }),

   // ************ Settings ************
   useGetSettings: () => useQueries<SettingsResponse>( [KEYS.SETTINGS.GET],  () => Get(URL_KEYS.SETTINGS.GET) ),


   // ************ Orders ************

useGetOrders: (params?: Params) => useQueries<OrderListResponse>(  [KEYS.ORDER.GET_ALL, params], () => Get(URL_KEYS.ORDER.GET_ALL, params)),
useGetOrderById: (id?: string) => useQueries<OrderResponse>( [KEYS.ORDER.GET_ONE, id], () => Get(URL_KEYS.ORDER.GET_ONE.replace(":id", id as string)), { enabled: !!id }),


}