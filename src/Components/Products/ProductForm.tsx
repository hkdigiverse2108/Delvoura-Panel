"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Input, InputNumber, Select } from "antd";
import { Flame, Package, Plus, Trash2, Eye, Edit, Tag,ShoppingBag, X, Star } from "lucide-react";
import { CommonEditor, CommonFormActions,  CommonImageUpload, CommonInput,  } from "../common/commonForm";
import ExtraImagesGallery from "../common/commonForm/ExtraImagesGallery";
import { Queries } from "../../Api/Queries";
import type { Collection, ProductSubmitData, Scent, Season } from "../../Types";
interface ProductFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const genderOptions = [
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Unisex", value: "unisex" },
];

const ProductFormPage = ({ initialValues, onSubmit, onCancel }: ProductFormProps) => {
  const isEdit = !!initialValues;
  const [showPreview, setShowPreview] = useState(false);

  const [form, setForm] = useState<any>({
    name: "",
    title: "",
    mrp: undefined,
    gender: "unisex",
    collectionIds: [],
    seasonIds: [],
    scentIds: [],
    variants: [{ size: "", price: undefined }],
    ingredients: [""],
    description: "",
    usageTips: "",
    scentStory: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [""],
    slug: "",
    brandManufacturerInfo: "",
    isTrending: false,
    isFeatured: false,
    isActive: true,
    coverimage: "",
    images: ["", "", "", ""],
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const { data: collectionData } = Queries.useGetCollections({ page: 1, limit: 100 });
  const { data: seasonData } = Queries.useGetSeasons({ page: 1, limit: 100 });
  const { data: scentData } = Queries.useGetScents({ page: 1, limit: 100 });

  const collectionOptions =
    collectionData?.data?.collection_data?.map((item: Collection) => ({
      label: item.name,
      value: item._id,
    })) ?? [];

  const seasonOptions = useMemo(
    () =>
      (seasonData?.data?.season_data ?? []).map((item: Season) => ({
        label: item.name,
        value: item._id,
      })),
    [seasonData]
  );

  const scentOptions = useMemo(
    () =>
      (scentData?.data?.scent_data ?? []).map((item: Scent) => ({
        label: item.name,
        value: item._id,
      })),
    [scentData]
  );

  useEffect(() => {
    if (!initialValues) return;

    const images = Array.isArray(initialValues.images) && initialValues.images.length
      ? initialValues.images
      : ["", "", "", ""];

    // Handle collectionIds - could be array of objects or strings
    let collectionIds = [];
    if (initialValues.collectionIds) {
      collectionIds = initialValues.collectionIds.map((item: any) => item._id || item);
    }

    // Handle seasonIds
    let seasonIds = [];
    if (initialValues.seasonIds) {
      seasonIds = initialValues.seasonIds.map((item: any) => item._id || item);
    }

    // Handle scentIds
    let scentIds = [];
    if (initialValues.scentIds) {
      scentIds = initialValues.scentIds.map((item: any) => item._id || item);
    }

    setForm({
      name: initialValues.name || "",
      title: initialValues.title || "",
      mrp: initialValues.mrp,
      gender: initialValues.gender || "unisex",
      collectionIds: collectionIds,
      seasonIds: seasonIds,
      scentIds: scentIds,
      variants: initialValues.variants?.length > 0
        ? initialValues.variants.map((v: any) => ({ size: v.size || "", price: v.price }))
        : [{ size: "", price: undefined }],
      ingredients: initialValues.ingredients?.length > 0 ? initialValues.ingredients : [""],
      description: initialValues.description || "",
      usageTips: initialValues.usageTips || "",
      scentStory: initialValues.scentStory || "",
      metaTitle: initialValues.metaTitle || "",
      metaDescription: initialValues.metaDescription || "",
      metaKeywords: initialValues.metaKeywords?.length > 0 ? initialValues.metaKeywords : [""],
      slug: initialValues.slug || "",
      brandManufacturerInfo: initialValues.brandManufacturerInfo || "",
      isTrending: initialValues.isTrending ?? false,
      isFeatured: initialValues.isFeatured ?? false,
      isActive: initialValues.isActive ?? true,
      coverimage: initialValues.coverimage || "",
      images: images,
    });
  }, [initialValues]);

  const updateArrayField = (field: string, index: number, value: string) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addArrayField = (field: string) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeArrayField = (field: string, index: number) => {
    const updated = form[field].filter((_: any, i: number) => i !== index);
    setForm({ ...form, [field]: updated.length ? updated : [""] });
  };

  const updateVariant = (index: number, key: "size" | "price", value: any) => {
    const updated = [...form.variants];
    updated[index] = { ...updated[index], [key]: value };
    setForm({ ...form, variants: updated });
  };

  const addVariant = () => {
    setForm({ ...form, variants: [...form.variants, { size: "", price: undefined }] });
  };

  const removeVariant = (index: number) => {
    const updated = form.variants.filter((_: any, i: number) => i !== index);
    setForm({ ...form, variants: updated.length ? updated : [{ size: "", price: undefined }] });
  };

  const handleCoverImageChange = (file: File | null, preview: string) => {
    setCoverFile(file);
    setForm({ ...form, coverimage: preview });
    setErrors((prev: any) => ({ ...prev, coverimage: "" }));
  };

  const handleImagesChange = (images: string[]) => {
    setForm({ ...form, images: images });
  };

  const validate = () => {
    let newErrors: any = {};
    if (!form.name.trim()) newErrors.name = "Product name is required";
    if (!form.variants.some((item: any) => item.size.trim())) newErrors.variants = "At least one variant is required";
    if (!form.coverimage && !coverFile) newErrors.coverimage = "Cover image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    
    // Prepare data for API
    const submitData = {
      name: form.name,
      title: form.title,
      mrp: form.mrp,
      gender: form.gender,
      collectionIds: form.collectionIds,
      seasonIds: form.seasonIds,
      scentIds: form.scentIds,
      variants: form.variants.filter((v: any) => v.size.trim()),
      ingredients: form.ingredients.filter((i: string) => i.trim()),
      description: form.description,
      usageTips: form.usageTips,
      scentStory: form.scentStory,
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      metaKeywords: form.metaKeywords.filter((k: string) => k.trim()),
      slug: form.slug,
      brandManufacturerInfo: form.brandManufacturerInfo,
      isTrending: form.isTrending,
      isFeatured: form.isFeatured,
      isActive: form.isActive,
      coverimage: form.coverimage,
      images: form.images.filter((img: string) => img),
    };

    if (isEdit) {
     const submitData: ProductSubmitData = { ...form };

if (initialValues?._id) {
  submitData.productId = initialValues._id;
}
    }

    setLoading(true);
    await onSubmit(submitData);
    setLoading(false);
  };

  const hasValidVariant = form.variants.some((item: any) => item.size.trim());

  const getLowestPrice = () => {
    const prices = form.variants.filter((v: any) => v.price).map((v: any) => v.price);
    return prices.length > 0 ? Math.min(...prices) : null;
  };
      const lowestPrice = getLowestPrice();

  return (
    <div className="fixed inset-0 bg-gray-50 overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {isEdit ? "Edit Product" : "Create New Product"}
              </h1>
              <p className="text-sm text-gray-500">
                {isEdit ? "Update your product information" : "Add a new product to your catalog"}
              </p>
            </div>
          </div>
          
          {/* Preview Toggle Button */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm"
            style={{
              backgroundColor: showPreview ? 'var(--primary-dark)' : 'white',
              color: showPreview ? 'white' : 'var(--gray-dark)',
              border: !showPreview ? '1px solid var(--gray-border)' : 'none'
            }}
          >
            {showPreview ? (
              <>
                <Edit size={18} />
                <span className="text-sm font-medium">Edit Mode</span>
              </>
            ) : (
              <>
                <Eye size={18} />
                <span className="text-sm font-medium">Preview Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content - Scrollable without scrollbar */}
      <div className="pt-20 h-full overflow-y-auto scrollbar-hide">
        <div className={`${showPreview ? 'block' : 'lg:grid lg:grid-cols-2'} gap-8 p-6 max-w-7xl mx-auto`}>
          
          {/* Form Section */}
          <div className={showPreview ? "block" : "block"}>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-8">
                <div className="space-y-8">
                  {/* Basic Information Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CommonInput
                      label="Product Name"
                      required
                      value={form.name}
                      onChange={(val) => {
                        setForm({ ...form, name: val });
                        setErrors((prev: any) => ({ ...prev, name: "" }));
                      }}
                      placeholder="Enter product name"
                      prefix={<Package size={18} className="text-gray-400" />}
                      error={errors.name}
                    />

                    <CommonInput
                      label="Title (Subtitle)"
                      value={form.title}
                      onChange={(val) => setForm({ ...form, title: val })}
                      placeholder="Enter product title"
                      error={errors.title}
                    />

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        MRP <span className="text-red-500">*</span>
                      </label>
                      <InputNumber
                        value={form.mrp}
                        onChange={(value) => setForm({ ...form, mrp: value })}
                        placeholder="Enter MRP"
                        size="large"
                        className="w-full block rounded-lg border-gray-200 h-12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                      <Select
                        value={form.gender}
                        onChange={(value) => setForm({ ...form, gender: value })}
                        options={genderOptions}
                        size="large"
                        className="w-full rounded-lg h-12"
                      />
                    </div>
                  </div>

                  {/* Collections, Seasons, Scents Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Collections</label>
                      <Select
                        mode="multiple"
                        value={form.collectionIds}
                        onChange={(value) => setForm({ ...form, collectionIds: value })}
                        options={collectionOptions}
                        size="large"
                        placeholder="Select collections"
                        className="w-full rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Seasons</label>
                      <Select
                        mode="multiple"
                        value={form.seasonIds}
                        onChange={(value) => setForm({ ...form, seasonIds: value })}
                        options={seasonOptions}
                        size="large"
                        placeholder="Select seasons"
                        className="w-full rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Scents</label>
                      <Select
                        mode="multiple"
                        value={form.scentIds}
                        onChange={(value) => setForm({ ...form, scentIds: value })}
                        options={scentOptions}
                        size="large"
                        placeholder="Select scents"
                        className="w-full rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Cover Image */}
                  <CommonImageUpload
                    label="Cover Image"
                    required
                    value={form.coverimage}
                    onChange={handleCoverImageChange}
                    error={errors.coverimage}
                  />

                  <ExtraImagesGallery
                    images={form.images}
                    setImages={handleImagesChange}
                  />

                  {/* Variants */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Variants (Size & Price) <span className="text-red-500">*</span>
                      </label>
                      <Button icon={<Plus size={16} />} onClick={addVariant} className="rounded-lg">
                        Add Variant
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {form.variants.map((variant: any, index: number) => (
                        <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-3 rounded-xl p-3 bg-gray-50">
                          <Input
                            value={variant.size}
                            onChange={(e) => updateVariant(index, "size", e.target.value)}
                            placeholder="Size e.g. 50ml"
                            size="large"
                            className="rounded-lg"
                          />
                          <InputNumber
                            value={variant.price}
                            onChange={(value) => updateVariant(index, "price", value)}
                            placeholder="Price"
                            size="large"
                            className="w-full rounded-lg"
                          />
                          <button
                            type="button"
                            className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
                            onClick={() => removeVariant(index)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    {errors.variants && (
                      <p className="text-red-500 text-xs mt-2">{errors.variants}</p>
                    )}
                  </div>

                  {/* Ingredients */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700">Ingredients</label>
                      <Button icon={<Plus size={16} />} onClick={() => addArrayField("ingredients")} className="rounded-lg">
                        Add Ingredient
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {form.ingredients.map((item: string, index: number) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => updateArrayField("ingredients", index, e.target.value)}
                            placeholder="Enter ingredient"
                            size="large"
                            className="rounded-lg"
                          />
                          <button
                            type="button"
                            className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
                            onClick={() => removeArrayField("ingredients", index)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rich Text Editors */}
                  <CommonEditor
                    label="Description"
                    value={form.description}
                    onChange={(val) => setForm({ ...form, description: val })}
                    height="200px"
                  />

                  <CommonEditor
                    label="Usage Tips"
                    value={form.usageTips}
                    onChange={(val) => setForm({ ...form, usageTips: val })}
                    height="150px"
                  />

                  <CommonEditor
                    label="Scent Story"
                    value={form.scentStory}
                    onChange={(val) => setForm({ ...form, scentStory: val })}
                    height="150px"
                  />

                  <CommonEditor
                    label="Brand Manufacturer Info"
                    value={form.brandManufacturerInfo}
                    onChange={(val) => setForm({ ...form, brandManufacturerInfo: val })}
                    height="150px"
                  />

                  {/* SEO Section */}
                  <div className="grid grid-cols-2 gap-4">
                    <CommonInput
                      label="Meta Title"
                      value={form.metaTitle}
                      onChange={(val) => setForm({ ...form, metaTitle: val })}
                      placeholder="Enter meta title"
                    />

                    <CommonInput
                      label="Slug"
                      value={form.slug}
                      onChange={(val) => setForm({ ...form, slug: val })}
                      placeholder="Enter slug"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Description</label>
                    <Input.TextArea
                      value={form.metaDescription}
                      onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                      rows={3}
                      placeholder="Enter meta description"
                      className="rounded-lg border-gray-200"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700">Meta Keywords</label>
                      <Button icon={<Plus size={16} />} onClick={() => addArrayField("metaKeywords")} className="rounded-lg">
                        Add Keyword
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {form.metaKeywords.map((item: string, index: number) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => updateArrayField("metaKeywords", index, e.target.value)}
                            placeholder="Enter keyword"
                            size="large"
                            className="rounded-lg"
                          />
                          <button
                            type="button"
                            className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
                            onClick={() => removeArrayField("metaKeywords", index)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Toggles */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <div className="flex items-center gap-2">
                        <Flame size={18} className="text-orange-500" />
                        <span className="text-sm font-medium text-gray-700">
                          {form.isTrending ? "Trending Product" : "Not Trending"}
                        </span>
                      </div>
                      <button
                        onClick={() => setForm({ ...form, isTrending: !form.isTrending })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                          form.isTrending ? "bg-primary-dark" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            form.isTrending ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <div className="flex items-center gap-2">
                        <Star size={18} className="text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">
                          {form.isFeatured ? "Featured Product" : "Not Featured"}
                        </span>
                      </div>
                      <button
                        onClick={() => setForm({ ...form, isFeatured: !form.isFeatured })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                          form.isFeatured ? "bg-primary-dark" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            form.isFeatured ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <CommonFormActions
                    onCancel={onCancel}
                    onSubmit={handleSubmit}
                    submitText={isEdit ? "Update Product" : "Create Product"}
                    disabled={!form.name.trim() || !hasValidVariant || !form.coverimage}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {(!showPreview || showPreview) && (
            <div className={showPreview ? "block" : "block"}>
              <div className="sticky top-24">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  {/* Preview Header */}
                  <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg" style={{ backgroundColor: 'var(--primary-10)' }}>
                          <ShoppingBag size={18} style={{ color: 'var(--primary-dark)' }} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Live Preview</h3>
                          <p className="text-xs text-gray-500">Real-time updates as you type</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {form.isTrending && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-50 text-orange-600 text-xs">
                            <Flame size={12} />
                            Trending
                          </div>
                        )}
                        {form.isFeatured && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-50 text-yellow-600 text-xs">
                            <Star size={12} />
                            Featured
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className="p-6">
                    {!form.name && !form.coverimage ? (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-200">
                          <Package size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 mb-1">No product yet</h3>
                        <p className="text-sm text-gray-500">Start filling the form to see preview</p>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {/* Product Image */}
                        {form.coverimage && (
                          <div className="relative rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={form.coverimage}
                              alt={form.name}
                              className="w-full h-56 object-cover"
                            />
                          </div>
                        )}

                        {/* Product Info */}
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 mb-1">
                            {form.name || "Product Name"}
                          </h2>
                          {form.title && (
                            <p className="text-xs text-gray-500 mb-2">{form.title}</p>
                          )}
                          
                          {/* Gender Badge */}
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mb-3" style={{ backgroundColor: 'var(--primary-10)', color: 'var(--primary-dark)' }}>
                            <Tag size={10} />
                            {form.gender === "men" ? "For Men" : form.gender === "women" ? "For Women" : "Unisex"}
                          </div>


{/* Price */}
{form.mrp && (
  <div className="mb-3">
    <span className="text-xl font-bold text-gray-900">
      ₹{form.mrp}
    </span>

    {lowestPrice !== null && lowestPrice < form.mrp && (
      <>
        <span className="text-xs text-gray-400 line-through ml-2">
          ₹{form.mrp}
        </span>
        <span className="text-xs text-green-600 ml-1">
          Save ₹{form.mrp - lowestPrice}
        </span>
      </>
    )}
  </div>
)}

                          {/* Variants */}
                          {form.variants.some((v: any) => v.size) && (
                            <div className="mb-3">
                              <h4 className="text-xs font-semibold text-gray-600 mb-1">Sizes</h4>
                              <div className="flex flex-wrap gap-1">
                                {form.variants.filter((v: any) => v.size).slice(0, 3).map((variant: any, idx: number) => (
                                  <span key={idx} className="px-2 py-0.5 rounded text-xs border" style={{ borderColor: 'var(--primary-30)' }}>
                                    {variant.size} {variant.price && `₹${variant.price}`}
                                  </span>
                                ))}
                                {form.variants.filter((v: any) => v.size).length > 3 && (
                                  <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                                    +{form.variants.filter((v: any) => v.size).length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Description Preview */}
                          {form.description && (
                            <div className="mb-3">
                              <h4 className="text-xs font-semibold text-gray-600 mb-1">Description</h4>
                              <div 
                                className="text-xs text-gray-600 line-clamp-2"
                                dangerouslySetInnerHTML={{ __html: form.description }}
                              />
                            </div>
                          )}

                          {/* Ingredients */}
                          {form.ingredients.some((i: string) => i.trim()) && (
                            <div className="mb-3">
                              <h4 className="text-xs font-semibold text-gray-600 mb-1">Key Ingredients</h4>
                              <div className="flex flex-wrap gap-1">
                                {form.ingredients.filter((i: string) => i.trim()).slice(0, 3).map((ingredient: string, idx: number) => (
                                  <span key={idx} className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: 'var(--primary-10)', color: 'var(--primary-dark)' }}>
                                    {ingredient}
                                  </span>
                                ))}
                                {form.ingredients.filter((i: string) => i.trim()).length > 3 && (
                                  <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                                    +{form.ingredients.filter((i: string) => i.trim()).length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Collections & Seasons */}
                          {(form.collectionIds.length > 0 || form.seasonIds.length > 0) && (
                            <div className="flex gap-3 pt-2 text-xs text-gray-500">
                              {form.collectionIds.length > 0 && <span>{form.collectionIds.length} collections</span>}
                              {form.seasonIds.length > 0 && <span>{form.seasonIds.length} seasons</span>}
                              {form.scentIds.length > 0 && <span>{form.scentIds.length} scents</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFormPage;


