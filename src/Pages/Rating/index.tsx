"use client";

import { useState } from "react";
import { Plus, Star, Filter, ChevronDown, X } from "lucide-react";
import { Queries } from "../../Api/Queries";
import { Mutations } from "../../Api/Mutations";
import {  CommonPageHeader, CommonPagination,} from "../../Components";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";
import ConfirmModal from "../../Components/common/ConfirmModal";
import RatingFormPage from "../../Components/Rating/RatingForm";
import RatingTable from "../../Components/Rating/RatingTable";

import { PAGE_TITLE } from "../../Constants";

const Rating = () => {
  const [mode, setMode] = useState<"list" | "form">("list");
  const [editData, setEditData] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isProductFilterOpen, setIsProductFilterOpen] = useState(false);
  const [pagination, setPagination] = useState({  page: 1,  limit: 10,});
  const [filters, setFilters] = useState({  search: "", });
const queryParams = {
  page: pagination.page,
  limit: pagination.limit,
  ...(selectedProduct ? { productId: selectedProduct } : {}),
  ...(filters.search ? { search: filters.search } : {}),
}; const { data, isLoading, refetch } = Queries.useGetRatings(queryParams);
  const ratings = data?.data?.rating_data || [];
  const total = data?.data?.totalData || 0;
  const addRating = Mutations.useAddRating();
  const updateRating = Mutations.useUpdateRating();
  const deleteRating = Mutations.useDeleteRating();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { data: productData } = Queries.useGetProductDropdown({}, true);
  const productOptions = productData?.data?.product_data?.map((p: any) => ({  label: p.name,  value: p._id,})) || [];


  interface ProductOption {
  label: string;
  value: string;
}
const selectedProductObj = productOptions.find(
  (p: ProductOption) => p.value === selectedProduct
);
  const handleSubmit = async (values: any) => {
    if (editData) { await updateRating.mutateAsync({   ...values,  ratingId: editData._id, });
    } else {  await addRating.mutateAsync(values); } setMode("list");  setEditData(null);  refetch();};

  const handleDelete = async () => {
    if (!deleteId) return;  await deleteRating.mutateAsync(deleteId);  setDeleteId(null);
    refetch(); };

const clearProductFilter = () => { 
  setSelectedProduct(""); 
  setIsProductFilterOpen(false); 
  refetch(); // ✅ ADD THIS
};
  if (mode === "form") {
    return (  <RatingFormPage  initialValues={editData} onSubmit={handleSubmit} onBack={() => {  setMode("list");  setEditData(null);  }} /> );
  }

  // Calculate average rating for stats
  const averageRating = ratings.length > 0  ? (ratings.reduce((acc: number, curr: any) => acc + (curr.starRating || 0), 0) / ratings.length).toFixed(1)  : 0;
  const ratingDistribution = {
    5: ratings.filter((r: any) => r.starRating === 5).length,
    4: ratings.filter((r: any) => r.starRating === 4).length,
    3: ratings.filter((r: any) => r.starRating === 3).length,
    2: ratings.filter((r: any) => r.starRating === 2).length,
    1: ratings.filter((r: any) => r.starRating === 1).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <CommonPageHeader
            title={PAGE_TITLE.RATING.TITLE}
            subtitle={PAGE_TITLE.RATING.SUB_TITLE}
            buttonText={PAGE_TITLE.RATING.BUTTON_TEXT}
            buttonIcon={<Plus size={18} />}
            onButtonClick={() => setMode("form")}
          />
        </div>

       {/* Stats Cards */}
<div className="grid grid-cols-1  items-center sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
  {/* Total Ratings Card */}
  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">Total Ratings</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{total}</p>
      </div>
      <div className="w-12 h-12 bg-primary-10 rounded-xl flex items-center justify-center">
        <Star className="w-6 h-6 text-primary" />
      </div>
    </div>
  </div>

  {/* Average Rating Card */}
  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">Average Rating</p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-3xl font-bold text-gray-900">{averageRating}</p>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={star <= Number(averageRating) ? "star-primary cursor-pointer" : "text-gray-300"}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-12 h-12 bg-primary-10 rounded-xl flex items-center justify-center">
        <Star className="w-6 h-6 text-primary" />
      </div>
    </div>
  </div>

  {/* Active Filters Card */}
  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200 sm:col-span-2 lg:col-span-2">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
      <div>
        <p className="text-sm text-gray-500 font-medium">Active Filters</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedProduct ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-10 rounded-lg text-sm">
              <span className="text-primary font-medium">{selectedProductObj?.label}</span>
              <button
                onClick={clearProductFilter}
                className="hover:bg-primary-20 rounded-full p-0.5 transition-colors"
              >
                <X size={14} className="text-primary" />
              </button>
            </div>
          ) : (
            <span className="text-sm text-gray-400">No active filters</span>
          )}
          {filters.search && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-sm">
              <span className="text-gray-700">Search: {filters.search}</span>
              <button
                onClick={() => setFilters({ search: "" })}
                className="hover:bg-gray-200 rounded-full p-0.5 transition-colors"
              >
                <X size={14} className="text-gray-500" />
              </button>
            </div>
          )}
        </div>
      </div>
      {(selectedProduct || filters.search) && (
        <button
          onClick={() => {
            setSelectedProduct("");
            setFilters({ search: "" });
          }}
          className="text-sm text-primary hover:text-primary-80 font-medium transition-colors"
        >
          Clear All
        </button>
      )}
    </div>
  </div>
</div>
        {/* Rating Distribution Chart */}
        {ratings.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingDistribution[rating as keyof typeof ratingDistribution];
                const percentage = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium text-gray-700">{rating}</span>
                      <Star size={14} className="star-primary cursor-pointer" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                         className="w-10 h-10 bg-gradient-primary-br rounded-lg flex items-center justify-center"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-12 text-right">
                      <span className="text-sm text-gray-600">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter Bar with Enhanced Product Filter */}
        <div className="bg-white rounded-xl  border border-gray-200 p-4  shadow-sm">
          <div className="flex  items-center flex-col lg:flex-row gap-4">
            {/* Product Filter - Premium Dropdown */}
            <div className="relative lg:w-80">
              <button  onClick={() => setIsProductFilterOpen(!isProductFilterOpen)}  className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-300 rounded-xl hover:border-primary-30 transition-colors " >
                <div className="flex items-center gap-2">  <Filter size={16} className="text-gray-400" /> <span className="text-sm text-gray-700"> {selectedProductObj ? selectedProductObj.label : "All Products"}  </span>  </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isProductFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProductFilterOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProductFilterOpen(false)}
                  />
                  <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="max-h-80 overflow-y-auto">
                      <button onClick={() => {  
  setSelectedProduct("");  
  setIsProductFilterOpen(false); 
  refetch(); // ✅ ADD THIS
}}
                        className={`w-full text-left px-4 py-3 hover:bg-primary-10 transition-colors border-b border-gray-100 ${
                          !selectedProduct ? 'bg-primary-10 text-primary font-medium' : ''
                        }`}
                      > All Products </button>
                      {productOptions.map((product: any) => (  <button key={product.value}   onClick={() => {  setSelectedProduct(product.value);  setIsProductFilterOpen(false); }}
                          className={`w-full text-left px-4 py-3 hover:bg-primary-10 transition-colors border-b border-gray-100 last:border-0 ${
                            selectedProduct === product.value ? 'bg-primary-10 text-primary font-medium' : ''
                          }`}
                        >  {product.label} </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Search Bar */}
            <div className="flex-1 rounded-xl">
                
         <CommonSearchFilterBar
  total={total}
  label={PAGE_TITLE.RATING.LABEL}
  search={filters.search}
  onSearchChange={(val: string) => setFilters({ search: val })}
  onSearchSubmit={refetch}
  status={true}
  onStatusChange={() => {}}
/> </div>
          </div>
        </div>

        {/* Ratings Table */}
        <div className="bg-white  rounded-xl border border-gray-200 shadow-sm overflow-hidden "> <RatingTable  data={ratings} loading={isLoading}  page={pagination.page} limit={pagination.limit}  onEdit={(item: any) => { setEditData(item);  setMode("form");  }}  onDelete={(id: string) => setDeleteId(id)} /></div>
       
        <CommonPagination  page={pagination.page} limit={pagination.limit} total={total} currentCount={ratings.length} label={PAGE_TITLE.RATING.LABEL} onPageChange={(page) => setPagination((prev) => ({ ...prev, page })) } onLimitChange={(limit) =>  setPagination({ page: 1, limit }) } />
        <ConfirmModal open={!!deleteId}  onClose={() => setDeleteId(null)}  onConfirm={handleDelete}  loading={deleteRating.isPending} />
      </div>
    </div>
  );
};

export default Rating;