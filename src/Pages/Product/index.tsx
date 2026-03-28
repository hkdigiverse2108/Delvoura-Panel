"use client";

import { useMemo, useState } from "react";
import { DatePicker, Select } from "antd";
import { Plus } from "lucide-react";
import dayjs from "dayjs";
import { Mutations } from "../../Api/Mutations";

import {
  CommonFilterPanel,
  CommonPageHeader,
  CommonPagination,
  ProductTable,
} from "../../Components";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";
import { PAGE_TITLE } from "../../Constants";
import ProductFormPage from "../../Components/Products/ProductForm";
import { Queries } from "../../Api/Queries";

const { RangePicker } = DatePicker;

const Product = () => {
  const [mode, setMode] = useState<"list" | "form">("list");
  const [editData, setEditData] = useState<any>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  // STATUS TOGGLE
  const [statusToggle, setStatusToggle] = useState(true);

  const [filters, setFilters] = useState<any>({
    search: "",
    genderFilter: "",
    TrendingFilter: undefined,
    collectionFilter: [],
    seasonFilter: [],
    scentFilter: [],
    startDateFilter: "",
    endDateFilter: "",
    dateRange: null,
  });

  const [appliedFilters, setAppliedFilters] = useState<any>({
    genderFilter: "",
    TrendingFilter: undefined,
    collectionFilter: [],
    seasonFilter: [],
    scentFilter: [],
    startDateFilter: "",
    endDateFilter: "",
  });

  const getProductPayload = (item: any) => {
    return {
      productId: item._id,
      name: item.name,
      title: item.title || "",
      mrp: item.mrp || 0,
      gender: item.gender || "unisex",
      collectionIds: (item.collectionIds || []).map((v: any) => v._id || v),
      seasonIds: (item.seasonIds || []).map((v: any) => v._id || v),
      scentIds: (item.scentIds || []).map((v: any) => v._id || v),
      variants: (item.variants || [])
        .map((v: any) => ({
          size: typeof v === "string" ? v : v.size,
          price: typeof v === "object" ? v.price || 0 : 0,
        }))
        .filter((v: any) => v.size),
      ingredients: item.ingredients || [],
      description: item.description || "",
      usageTips: item.usageTips || "",
      scentStory: item.scentStory || "",
      metaTitle: item.metaTitle || "",
      metaDescription: item.metaDescription || "",
      metaKeywords: item.metaKeywords || [],
      slug: item.slug || "",
      brandManufacturerInfo: item.brandManufacturerInfo || "",
      isTrending: item.isTrending || false,
      coverimage: item.coverimage || "",
      images: item.images || [],
    };
  };

  const queryParams = {
    page: pagination.page,
    limit: pagination.limit,
    ...(filters.search.trim() && { search: filters.search.trim() }),
    status: statusToggle ? "active" : "inactive",
    ...(appliedFilters.genderFilter && { genderFilter: appliedFilters.genderFilter }),
    ...(typeof appliedFilters.TrendingFilter !== "undefined" && { TrendingFilter: appliedFilters.TrendingFilter }),
    ...(appliedFilters.collectionFilter?.length && { collectionFilter: appliedFilters.collectionFilter }),
    ...(appliedFilters.seasonFilter?.length && { seasonFilter: appliedFilters.seasonFilter }),
    ...(appliedFilters.scentFilter?.length && { scentFilter: appliedFilters.scentFilter }),
    ...(appliedFilters.startDateFilter && { startDateFilter: appliedFilters.startDateFilter }),
    ...(appliedFilters.endDateFilter && { endDateFilter: appliedFilters.endDateFilter }),
  };

  const { data, isLoading, refetch } = Queries.useGetProducts(queryParams);

  const { data: collectionData } = Queries.useGetCollections({ page: 1, limit: 1000 });
  const { data: seasonData } = Queries.useGetSeasons({ page: 1, limit: 1000 });
  const { data: scentData } = Queries.useGetScents({ page: 1, limit: 1000 });

  const products = data?.data?.product_data || [];
  const total = data?.data?.totalData || 0;

  const filteredProducts = useMemo(() => products, [products]);

  const addProduct = Mutations.useAddProduct();
  const updateProduct = Mutations.useUpdateProduct();
  const deleteProduct = Mutations.useDeleteProduct();

  // ================= OPTIONS =================

  const collectionOptions =
    collectionData?.data?.collection_data?.map((item: any) => ({
      label: item.name,
      value: item._id,
    })) || [];

  const seasonOptions =
    seasonData?.data?.season_data?.map((item: any) => ({
      label: item.name,
      value: item._id,
    })) || [];

  const scentOptions =
    scentData?.data?.scent_data?.map((item: any) => ({
      label: item.name,
      value: item._id,
    })) || [];

  // ================= HANDLERS =================
  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        gender: typeof values.gender === "string"
          ? values.gender.trim().toLowerCase()
          : values.gender?.value?.toLowerCase() || "unisex",
        coverimage: values.coverimage || "",
        variants: (values.variants || [])
          .map((v: any) => ({
            size: typeof v === "string" ? v.trim() : v.size?.trim(),
            price: typeof v === "object" ? v.price || 0 : 0,
          }))
          .filter((v: any) => v.size),
        collectionIds: (values.collectionIds || []).map((v: any) => v._id || v),
        seasonIds: (values.seasonIds || []).map((v: any) => v._id || v),
        scentIds: (values.scentIds || []).map((v: any) => v._id || v),
        images: (values.images || []).filter((img: string) => img),
        isTrending: !!values.isTrending,
      };

      payload.images = payload.images.filter((img: string) => img);

      if (!payload.coverimage) {
        console.error(" Cover image missing");
        return;
      }

      if (!payload.variants.length) {
        console.error(" Variants required");
        return;
      }

      if (editData) {
        await updateProduct.mutateAsync({
          ...payload,
          productId: editData._id,
        });
      } else {
        await addProduct.mutateAsync(payload);
      }

      // Switch back to list view
      setMode("list");
      setEditData(null);
      refetch();
    } catch (error) {
      console.error("Product submit error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct.mutateAsync(id);
      refetch();
    }
  };

  const handleToggleStatus = async (item: any) => {
    try {
      const payload = getProductPayload(item);
      await updateProduct.mutateAsync({
        ...payload,
        isActive: !item.isActive,
      });
      refetch();
    } catch (error) {
      console.error("Status toggle error:", error);
    }
  };

  const handleSearchChange = (value: string) => {
    setFilters((prev: any) => ({ ...prev, search: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // ================= FILTER =================

  const applyFilters = () => {
    setAppliedFilters({
      genderFilter: filters.genderFilter,
      TrendingFilter: filters.TrendingFilter,
      collectionFilter: filters.collectionFilter,
      seasonFilter: filters.seasonFilter,
      scentFilter: filters.scentFilter,
      startDateFilter: filters.startDateFilter,
      endDateFilter: filters.endDateFilter,
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      genderFilter: "",
      TrendingFilter: undefined,
      collectionFilter: [],
      seasonFilter: [],
      scentFilter: [],
      startDateFilter: "",
      endDateFilter: "",
      dateRange: null,
    });
    setAppliedFilters({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.genderFilter) count++;
    if (typeof filters.TrendingFilter !== "undefined") count++;
    if (filters.collectionFilter?.length) count++;
    if (filters.seasonFilter?.length) count++;
    if (filters.scentFilter?.length) count++;
    if (filters.startDateFilter && filters.endDateFilter) count++;
    return count;
  };

  if (mode === "form") {
    return (
      <ProductFormPage
        initialValues={editData}
        onSubmit={handleSubmit}
        onCancel={() => {
          setMode("list");
          setEditData(null);
        }}
      />
    );
  }

  return (
    <div className="user-page">
      <CommonPageHeader
        title={PAGE_TITLE.PRODUCT.TITLE}
        subtitle={PAGE_TITLE.PRODUCT.SUB_TITLE}
        buttonText={PAGE_TITLE.PRODUCT.BUTTON_TEXT}
        buttonIcon={<Plus size={18} />}
        onButtonClick={() => {
          setEditData(null);
          setMode("form");
        }}
      />

      <CommonFilterPanel
        title="Advanced Filters"
        isOpen={showAdvancedFilters}
        activeCount={getActiveFilterCount()}
        onToggle={() => setShowAdvancedFilters((prev) => !prev)}
      >
        <div className="product-filter-grid">
          <div className="product-filter-field">
            <label>Gender</label>
            <Select
              value={filters.genderFilter || undefined}
              onChange={(value) =>
                setFilters((prev: any) => ({
                  ...prev,
                  genderFilter: value || "",
                }))
              }
              allowClear
              size="large"
              options={[
                { label: "men", value: "men" },
                { label: "women", value: "women" },
                { label: "unisex", value: "unisex" },
              ]}
            />
          </div>

          <div className="product-filter-field">
            <label>Trending</label>
            <Select
              value={
                typeof filters.TrendingFilter === "undefined"
                  ? undefined
                  : filters.TrendingFilter
              }
              onChange={(value) =>
                setFilters((prev: any) => ({
                  ...prev,
                  TrendingFilter: value,
                }))
              }
              allowClear
              size="large"
              options={[
                { label: "Trending", value: true },
                { label: "Normal", value: false },
              ]}
            />
          </div>

          <div className="product-filter-field">
            <label>Collection</label>
            <Select
              mode="multiple"
              value={filters.collectionFilter}
              onChange={(value) =>
                setFilters((prev: any) => ({
                  ...prev,
                  collectionFilter: value,
                }))
              }
              size="large"
              options={collectionOptions}
            />
          </div>

          <div className="product-filter-field">
            <label>Season</label>
            <Select
              mode="multiple"
              value={filters.seasonFilter}
              onChange={(value) =>
                setFilters((prev: any) => ({
                  ...prev,
                  seasonFilter: value,
                }))
              }
              size="large"
              options={seasonOptions}
            />
          </div>

          <div className="product-filter-field">
            <label>Scent</label>
            <Select
              mode="multiple"
              value={filters.scentFilter}
              onChange={(value) =>
                setFilters((prev: any) => ({
                  ...prev,
                  scentFilter: value,
                }))
              }
              size="large"
              options={scentOptions}
            />
          </div>

          <div className="product-filter-field">
            <label>Date Range</label>
            <RangePicker
              showTime
              size="large"
              value={filters.dateRange}
              onChange={(dates) => {
                setFilters((prev: any) => ({
                  ...prev,
                  dateRange: dates,
                  startDateFilter: dates?.[0]
                    ? dayjs(dates[0]).toISOString()
                    : "",
                  endDateFilter: dates?.[1]
                    ? dayjs(dates[1]).toISOString()
                    : "",
                }));
              }}
            />
          </div>

          <div className="product-filter-actions">
            <button onClick={clearFilters} className="product-clear-btn">
              Clear
            </button>
            <button onClick={applyFilters} className="product-apply-btn">
              Apply Filters
            </button>
          </div>
        </div>
      </CommonFilterPanel>

      <CommonSearchFilterBar
        total={total}
        label="products"
        search={filters.search}
        onSearchChange={handleSearchChange}
        onSearchSubmit={refetch}
        status={statusToggle}
        onStatusChange={(val) => {
          setStatusToggle(val);
          setPagination((prev) => ({ ...prev, page: 1 }));
        }}
      />

      <ProductTable
        data={filteredProducts}
        loading={isLoading}
        page={pagination.page}
        limit={pagination.limit}
        onEdit={(item: any) => {
          setEditData(item);
          setMode("form");
        }}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      <CommonPagination
        page={pagination.page}
        limit={pagination.limit}
        total={total}
        currentCount={filteredProducts.length}
        label="products"
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        onLimitChange={(limit) => setPagination({ page: 1, limit })}
      />
    </div>
  );
};

export default Product;