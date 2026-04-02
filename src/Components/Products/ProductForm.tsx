"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Input, InputNumber, Select } from "antd";
import { Flame, Package, Plus, Trash2, Eye, Edit, ShoppingBag, X, Star, Minus, Plus as PlusIcon, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { CommonEditor, CommonFormActions, CommonImageUpload, CommonInput } from "../common/commonForm";
import ExtraImagesGallery from "../common/commonForm/ExtraImagesGallery";
import { Queries } from "../../Api/Queries";
import type { Collection,  Scent, Season } from "../../Types";

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
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    let collectionIds = [];
    if (initialValues.collectionIds) {
      collectionIds = initialValues.collectionIds.map((item: any) => item._id || item);
    }

    let seasonIds = [];
    if (initialValues.seasonIds) {
      seasonIds = initialValues.seasonIds.map((item: any) => item._id || item);
    }

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

  // Reset image index when form.images changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [form.coverimage, form.images]);

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

    if (isEdit && initialValues?._id) {
      (submitData as any).productId = initialValues._id;
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

  // Get all images for preview (cover + extra images)
  const getAllPreviewImages = () => {
    const images = [];
    if (form.coverimage) {
      images.push(form.coverimage);
    }
    if (form.images && Array.isArray(form.images)) {
      const validImages = form.images.filter((img: string) => img && img.trim() !== "");
      images.push(...validImages);
    }
    return images;
  };

  const allImages = getAllPreviewImages();
  const currentImage = allImages[currentImageIndex] || "";

  const nextImage = () => {
    if (allImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    if (allImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  // Get first collection name for brand display
  const getFirstCollectionName = () => {
    if (form.collectionIds.length > 0 && collectionOptions.length > 0) {
      const collection = collectionOptions.find((c: any) => c.value === form.collectionIds[0]);
      return collection?.label || "";
    }
    return "";
  };

  const firstCollection = getFirstCollectionName();

  // Get selected variant
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  useEffect(() => {
    const validVariants = form.variants.filter((v: any) => v.size.trim());
    if (validVariants.length > 0 && !selectedVariant) {
      setSelectedVariant(validVariants[0]);
    }
  }, [form.variants, selectedVariant]);

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

          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-sm"
            style={{
              backgroundColor: showPreview ? '#1a1a1a' : 'white',
              color: showPreview ? 'white' : '#4b5563',
              border: !showPreview ? '1px solid #e5e7eb' : 'none'
            }}
          >
            {showPreview ? (
              <><Edit size={18} /><span className="text-sm font-medium">Edit Mode</span></>
            ) : (
              <><Eye size={18} /><span className="text-sm font-medium">Preview Mode</span></>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 h-full overflow-y-auto scrollbar-hide">
        <div className={`${showPreview ? 'block' : 'lg:grid lg:grid-cols-2'} gap-8 p-6 max-w-7xl mx-auto`}>

          {/* Form Section */}
          <div className={showPreview ? "block" : "block"}>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-8">
                <div className="space-y-8">
                  {/* Basic Information */}
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
                    />

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">MRP</label>
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

                  {/* Collections, Seasons, Scents */}
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
                      <label className="block text-sm font-semibold text-gray-700">Variants (Size & Price)</label>
                      <Button icon={<Plus size={16} />} onClick={addVariant} className="rounded-lg">Add Variant</Button>
                    </div>
                    <div className="space-y-3">
                      {form.variants.map((variant: any, index: number) => (
                        <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-3 rounded-xl p-3 bg-gray-50">
                          <Input value={variant.size} onChange={(e) => updateVariant(index, "size", e.target.value)} placeholder="Size e.g. 50ml" size="large" className="rounded-lg" />
                          <InputNumber value={variant.price} onChange={(value) => updateVariant(index, "price", value)} placeholder="Price" size="large" className="w-full rounded-lg" />
                          <button type="button" className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100" onClick={() => removeVariant(index)}><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                    {errors.variants && <p className="text-red-500 text-xs mt-2">{errors.variants}</p>}
                  </div>

                  {/* Ingredients */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700">Ingredients</label>
                      <Button icon={<Plus size={16} />} onClick={() => addArrayField("ingredients")} className="rounded-lg">Add Ingredient</Button>
                    </div>
                    <div className="space-y-2">
                      {form.ingredients.map((item: string, index: number) => (
                        <div key={index} className="flex gap-2">
                          <Input value={item} onChange={(e) => updateArrayField("ingredients", index, e.target.value)} placeholder="Enter ingredient" size="large" className="rounded-lg" />
                          <button type="button" className="bg-red-50 text-red-600 p-2 rounded-lg" onClick={() => removeArrayField("ingredients", index)}><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Editors */}
                  <CommonEditor label="Description" value={form.description} onChange={(val) => setForm({ ...form, description: val })} height="200px" />
                  <CommonEditor label="Usage Tips" value={form.usageTips} onChange={(val) => setForm({ ...form, usageTips: val })} height="150px" />
                  <CommonEditor label="Scent Story" value={form.scentStory} onChange={(val) => setForm({ ...form, scentStory: val })} height="150px" />
                  <CommonEditor label="Brand Manufacturer Info" value={form.brandManufacturerInfo} onChange={(val) => setForm({ ...form, brandManufacturerInfo: val })} height="150px" />

                  {/* SEO */}
                  <div className="grid grid-cols-2 gap-4">
                    <CommonInput label="Meta Title" value={form.metaTitle} onChange={(val) => setForm({ ...form, metaTitle: val })} placeholder="Enter meta title" />
                    <CommonInput label="Slug" value={form.slug} onChange={(val) => setForm({ ...form, slug: val })} placeholder="Enter slug" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Description</label>
                    <Input.TextArea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} rows={3} placeholder="Enter meta description" className="rounded-lg border-gray-200" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700">Meta Keywords</label>
                      <Button icon={<Plus size={16} />} onClick={() => addArrayField("metaKeywords")} className="rounded-lg">Add Keyword</Button>
                    </div>
                    <div className="space-y-2">
                      {form.metaKeywords.map((item: string, index: number) => (
                        <div key={index} className="flex gap-2">
                          <Input value={item} onChange={(e) => updateArrayField("metaKeywords", index, e.target.value)} placeholder="Enter keyword" size="large" className="rounded-lg" />
                          <button type="button" className="bg-red-50 text-red-600 p-2 rounded-lg" onClick={() => removeArrayField("metaKeywords", index)}><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Toggles */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                      <div className="flex items-center gap-2"><Flame size={18} className="text-orange-500" /><span className="text-sm font-medium">{form.isTrending ? "Trending" : "Not Trending"}</span></div>
                      <button onClick={() => setForm({ ...form, isTrending: !form.isTrending })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.isTrending ? "bg-gray-900" : "bg-gray-300"}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.isTrending ? "translate-x-6" : "translate-x-1"}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                      <div className="flex items-center gap-2"><Star size={18} className="text-yellow-500" /><span className="text-sm font-medium">{form.isFeatured ? "Featured" : "Not Featured"}</span></div>
                      <button onClick={() => setForm({ ...form, isFeatured: !form.isFeatured })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.isFeatured ? "bg-gray-900" : "bg-gray-300"}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.isFeatured ? "translate-x-6" : "translate-x-1"}`} />
                      </button>
                    </div>
                  </div>

                  <CommonFormActions onCancel={onCancel} onSubmit={handleSubmit} submitText={isEdit ? "Update Product" : "Create Product"} disabled={!form.name.trim() || !hasValidVariant || !form.coverimage} loading={loading} />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section - EXACT MATCH to screenshot with ALL images */}
          <div className={showPreview ? "block" : "block"}>
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                {/* Preview Header */}
                <div className="px-5 py-3 border-b border-gray-100 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center">
                        <ShoppingBag size={14} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900">Live Preview</h3>
                        <p className="text-[10px] text-gray-400">Real-time product view</p>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {form.isTrending && <span className="px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 text-[10px] font-medium">🔥 Trending</span>}
                      {form.isFeatured && <span className="px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-600 text-[10px] font-medium">⭐ Featured</span>}
                    </div>
                  </div>
                </div>

                {/* Product Card - with image carousel for multiple images */}
                <div className="max-h-[calc(100vh-160px)] overflow-y-auto">
                  {!form.name && !form.coverimage ? (
                    <div className="text-center py-16 px-6">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-200">
                        <Package size={36} className="text-gray-300" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">No product yet</h3>
                      <p className="text-sm text-gray-400">Fill the form to see preview</p>
                    </div>
                  ) : (
                    <div className="p-5">
                      {/* Product Image Container - with carousel for multiple images */}
                      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 mb-4">
                        {currentImage ? (
                          <>
                            <img 
                              src={currentImage} 
                              alt={form.name} 
                              className="w-full aspect-square object-cover"
                              onError={(e) => {
                                console.error("Image failed to load:", currentImage);
                                e.currentTarget.src = "https://placehold.co/600x600?text=No+Image";
                              }}
                            />
                            {/* Image Navigation Arrows - only show if multiple images */}
                            {allImages.length > 1 && (
                              <>
                                <button
                                  onClick={prevImage}
                                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all"
                                >
                                  <ChevronLeft size={16} />
                                </button>
                                <button
                                  onClick={nextImage}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all"
                                >
                                  <ChevronRight size={16} />
                                </button>
                                {/* Image Counter */}
                                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                                  {currentImageIndex + 1} / {allImages.length}
                                </div>
                              </>
                            )}
                            {/* Thumbnail strip for extra images */}
                            {allImages.length > 1 && (
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                                {allImages.slice(0, 5).map(( idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${currentImageIndex === idx ? 'bg-white w-3' : 'bg-white/50'}`}
                                  />
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                            <Package size={48} className="text-gray-300" />
                          </div>
                        )}
                        {/* Gender Badge on Image */}
                        <div className="absolute top-3 left-3">
                          <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                            {form.gender === "men" ? "MEN" : form.gender === "women" ? "WOMEN" : "UNISEX"}
                          </span>
                        </div>
                      </div>

                      {/* Product Info - Exact layout from screenshot */}
                      <div className="space-y-3">
                        {/* Brand/Collection Name - Like "EM5™" */}
                        {firstCollection && (
                          <div className="flex items-center gap-0.5">
                            <span className="text-base font-bold tracking-tight text-gray-800">{firstCollection}</span>
                            <span className="text-[10px] align-top text-gray-400">™</span>
                          </div>
                        )}

                        {/* Product Name */}
                        <h2 className="text-xl font-bold text-gray-900 leading-tight">
                          {form.name || "Product Name"}
                        </h2>

                        {/* Subtitle - Like "em is melting good?" */}
                        {form.title && (
                          <p className="text-xs text-gray-400 italic -mt-0.5">
                            {form.title}
                          </p>
                        )}

                        {/* Perfume Name with concentration */}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800">
                            {form.name || "Perfume"} Eau De Parfum
                          </h3>
                          {form.scentStory && (
                            <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                              {form.scentStory.replace(/<[^>]*>/g, '').substring(0, 60)}
                            </p>
                          )}
                        </div>

                        {/* Gender tag */}
                        <div className="inline-block">
                          <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {form.gender === "men" ? "MEN" : form.gender === "women" ? "WOMEN" : "UNISEX"}
                          </span>
                        </div>

                        {/* Perfume name line - Like "Midnight Musk Perfume" */}
                        {form.name && (
                          <p className="text-sm font-medium text-gray-800">
                            {form.name} Perfume
                          </p>
                        )}

                        {/* Description line */}
                        {form.description && (
                          <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
                            {form.description.replace(/<[^>]*>/g, '').substring(0, 100)}
                          </p>
                        )}

                        {/* Ingredients/Notes - Like "Alcohol | Musk Oil | Essential Oils" */}
                        {form.ingredients.some((i: string) => i.trim()) && (
                          <div className="flex flex-wrap items-center gap-0 text-[10px] text-gray-400">
                            {form.ingredients.filter((i: string) => i.trim()).slice(0, 3).map((ing: string, idx: number) => (
                              <span key={idx} className="flex items-center">
                                {idx > 0 && <span className="mx-1 text-gray-300">|</span>}
                                <span>{ing}</span>
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Scent Story & Usage Tips section */}
                        <div className="space-y-0.5 text-[10px]">
                          {form.scentStory && (
                            <p className="text-gray-500">
                              <span className="font-semibold text-gray-600">Scent Story:</span> {form.scentStory.replace(/<[^>]*>/g, '').substring(0, 50)}
                            </p>
                          )}
                          {form.usageTips && (
                            <p className="text-gray-500">
                              <span className="font-semibold text-gray-600">Usage Tips:</span> {form.usageTips.replace(/<[^>]*>/g, '').substring(0, 50)}
                            </p>
                          )}
                        </div>

                        {/* Inspired by line */}
                        {form.scentStory && (
                          <p className="text-[10px] text-gray-400 italic">
                            Inspired by {form.scentStory.replace(/<[^>]*>/g, '').substring(0, 45)}
                          </p>
                        )}

                        {/* Price Section */}
                        <div className="pt-1">
                          {form.mrp && (
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="text-2xl font-bold text-gray-900">₹{form.mrp}</span>
                              {lowestPrice !== null && lowestPrice < form.mrp && (
                                <>
                                  <span className="text-sm text-gray-400 line-through">₹{form.mrp}</span>
                                  <span className="text-[11px] text-green-600 font-medium">Save ₹{form.mrp - lowestPrice}</span>
                                </>
                              )}
                            </div>
                          )}
                          {form.mrp && (
                            <>
                              <div className="text-[10px] text-gray-400">M.R.P. {form.mrp}</div>
                              <div className="text-[9px] text-gray-400">Inclusive of all taxes</div>
                            </>
                          )}
                        </div>

                        {/* Sizes/Variants - Like "50ml | 100ml" */}
                        {form.variants.some((v: any) => v.size) && (
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            {form.variants.filter((v: any) => v.size).map((variant: any, idx: number) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedVariant(variant)}
                                className={`px-2 py-0.5 rounded text-xs transition-all ${selectedVariant?.size === variant.size
                                  ? 'bg-gray-900 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                              >
                                {variant.size} {variant.price && `₹${variant.price}`}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Quantity and Add to Cart */}
                        <div className="flex items-center gap-3 pt-2">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                            <button
                              onClick={() => setQuantity(quantity + 1)}
                              className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors"
                            >
                              <PlusIcon size={14} />
                            </button>
                          </div>
                          <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                            Add To Cart
                          </button>
                        </div>

                        {/* Expandable sections - Product Description, Usage Tips, Ingredients, Brand & Manufacturer Info */}
                        <div className="border-t border-gray-100 pt-3 space-y-2">
                          {form.description && (
                            <details className="group">
                              <summary className="text-[11px] font-semibold text-gray-700 cursor-pointer list-none flex items-center justify-between">
                                Product Description
                                <ChevronDown size={12} className="text-gray-400 group-open:rotate-180 transition-transform" />
                              </summary>
                              <div className="text-[10px] text-gray-500 mt-1 pl-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: form.description }} />
                            </details>
                          )}
                          {form.usageTips && (
                            <details className="group">
                              <summary className="text-[11px] font-semibold text-gray-700 cursor-pointer list-none flex items-center justify-between">
                                Usage Tips
                                <ChevronDown size={12} className="text-gray-400 group-open:rotate-180 transition-transform" />
                              </summary>
                              <div className="text-[10px] text-gray-500 mt-1 pl-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: form.usageTips }} />
                            </details>
                          )}
                          {form.ingredients.some((i: string) => i.trim()) && (
                            <details className="group">
                              <summary className="text-[11px] font-semibold text-gray-700 cursor-pointer list-none flex items-center justify-between">
                                Ingredients
                                <ChevronDown size={12} className="text-gray-400 group-open:rotate-180 transition-transform" />
                              </summary>
                              <div className="text-[10px] text-gray-500 mt-1 pl-2">
                                {form.ingredients.filter((i: string) => i.trim()).map((ing: string, idx: number) => (
                                  <div key={idx}>• {ing}</div>
                                ))}
                              </div>
                            </details>
                          )}
                          {form.brandManufacturerInfo && (
                            <details className="group">
                              <summary className="text-[11px] font-semibold text-gray-700 cursor-pointer list-none flex items-center justify-between">
                                Brand & Manufacturer Info
                                <ChevronDown size={12} className="text-gray-400 group-open:rotate-180 transition-transform" />
                              </summary>
                              <div className="text-[10px] text-gray-500 mt-1 pl-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: form.brandManufacturerInfo }} />
                            </details>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormPage;