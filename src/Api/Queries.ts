
import { useQuery } from "@tanstack/react-query";
import { KEYS, URL_KEYS } from "../Constants";
import { Get } from "./Method/Get";
import { useQueries } from "./ReactQuery/useQueries";
import api from "./api";


export const Queries =  {

    // ******* Season ********
    useGetSeasons: (params?: any) => useQueries<any>([KEYS.SEASON.GET_ALL, params],() => Get(URL_KEYS.SEASON.GET_ALL, { ...params,search: params?.search || undefined, })),

    // ******* Collection ********
    useGetCollections: (params?: any) =>useQueries<any>([KEYS.COLLECTION.GET_ALL, params],() =>Get(URL_KEYS.COLLECTION.GET_ALL, {...params, search: params?.search || undefined, })),

    // ******* Scent ********
    useGetScents: (params?: any) =>useQueries<any>([KEYS.SCENT.GET_ALL, params],() =>Get(URL_KEYS.SCENT.GET_ALL, {...params,search: params?.search || undefined, })),

    // ******* Product ********
    useGetProducts: (params?: any) => useQueries<any>([KEYS.PRODUCT.GET_ALL, params], () => Get(URL_KEYS.PRODUCT.GET_ALL, { ...params, search: params?.search || undefined,})),useGetProductById: (id?: string) => useQueries<any>( [KEYS.PRODUCT.GET_BY_ID, id],() => Get(URL_KEYS.PRODUCT.GET_BY_ID.replace(":id", id || "")),{ enabled: !!id }),

    // ******* Gallery ********
    useGetGallery: () =>useQuery({queryKey: ["media-gallery"], queryFn: async () => {const response = await api.get("/upload");return response.data;},}),

    // ******* User ********
    useGetUsers: (params?: any) =>useQueries<any>([KEYS.USER.GET_ALL, params], () =>Get(URL_KEYS.USER.GET_ALL, {...params,search: params?.search || undefined, })),useGetUserById: (id?: string) => useQueries<any>([KEYS.USER.GET_BY_ID, id],() => Get(URL_KEYS.USER.GET_BY_ID.replace(":id", id || "")),{ enabled: !!id }),
 
    // ******* Banner ********
    useGetBanner: () => { return useQuery({ queryKey: [KEYS.BANNER.GET], queryFn: async () => { const res = await api.get("/banner");return res.data;},});},
 
    // ******* Blog ********
    useGetBlogs: (params?: any) =>useQueries<any>( [KEYS.BLOG.GET_ALL, params],() => Get(URL_KEYS.BLOG.GET_ALL, { ...params, search: params?.search || undefined,})),

    // ******* Topbar ********
    useGetTopbar: () => useQueries<any>( [KEYS.TOPBAR.GET],() => Get(URL_KEYS.TOPBAR.GET)),
 
    // ******* Terms-Services ********
    useGetTermsService: (params?: any) => useQueries<any>( [KEYS.TERMS_SERVICE.GET_ALL, params], () => Get(URL_KEYS.TERMS_SERVICE.GET_ALL, { ...params, search: params?.search || undefined,})),

    // ******* Instagram ********
    useGetInstagrams: (params?: any) => useQueries<any>( [KEYS.INSTAGRAM.GET_ALL, params], () =>   Get(URL_KEYS.INSTAGRAM.GET_ALL, { ...params,search: params?.search || undefined,})),
 
    // ******* Terms-Condition  ********
    useGetTermsConditions: (params?: any) => useQueries<any>( [KEYS.TERMS_CONDITIONS.GET_ALL, params], () =>  Get(URL_KEYS.TERMS_CONDITIONS.GET_ALL, { ...params, search: params?.search || undefined,})),

    // ******* PrivacyPolocies  ********
    useGetPrivacyPolicies: (params?: any) => useQueries<any>( [KEYS.PRIVACY_POLICY.GET_ALL, params], () =>  Get(URL_KEYS.PRIVACY_POLICY.GET_ALL, { ...params, search: params?.search || undefined,})),

    // ******* RefundPolicies  ********
    useGetRefundPolicies: (params?: any) =>useQueries<any>(  [KEYS.REFUND_POLICY.GET_ALL, params], () => Get(URL_KEYS.REFUND_POLICY.GET_ALL, {...params, search: params?.search || undefined,})),

    // ******* ReturnExchanges  ********
    useGetReturnExchanges: (params?: any) => useQueries<any>( [KEYS.RETURN_EXCHANGE.GET_ALL, params], () => Get(URL_KEYS.RETURN_EXCHANGE.GET_ALL, { ...params,  search: params?.search || undefined,})),
}