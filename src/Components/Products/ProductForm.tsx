"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Input, InputNumber, Select } from "antd";
import { Flame, Package, Plus, Trash2, Eye, Edit, ShoppingBag, X, Star, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { CommonEditor, CommonFormActions, CommonImageUpload, CommonInput } from "../common/commonForm";
import { Queries } from "../../Api/Queries";
import type { Collection, Scent, Season } from "../../Types";
import { ExtraImagesGallery } from "../common/commonForm/ExtraImagesGallery";

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

const ProductPreview = ({ form }: { form: any }) => {
  const images = [
    form.coverimage,
    ...(form.images?.filter((img: string) => img) || [])
  ].filter(Boolean);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  useEffect(() => {
    const validVariants = form.variants?.filter((v: any) => v.size.trim()) || [];
    if (validVariants.length > 0 && !selectedVariant) {
      setSelectedVariant(validVariants[0]);
    }
  }, [form.variants, selectedVariant]);

  const getFirstCollectionName = () => {
    // This would need collection data passed down or use context
    // For now, we'll just show a placeholder
    return "";
  };

  const firstCollection = getFirstCollectionName();


  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  return (
    <div className="max-w-md mx-auto bg-white">
      {/* IMAGE */}
      <div className="relative rounded-2xl overflow-hidden">
        {images[activeImage] ? (
          <img
            src={images[activeImage]}
            className="w-full aspect-square object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/600x600?text=No+Image";
            }}
          />
        ) : (
          <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
            <Package size={48} className="text-gray-300" />
          </div>
        )}

        {/* arrows - only show if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveImage(p => p === 0 ? images.length - 1 : p - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setActiveImage(p => (p + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* gender */}
        <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
          {form.gender?.toUpperCase() || "UNISEX"}
        </span>

        {/* trending/featured badges */}
        <div className="absolute top-3 right-3 flex gap-1">
          {form.isTrending && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">🔥</span>
          )}
          {form.isFeatured && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">⭐</span>
          )}
        </div>
      </div>

      {/* thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setActiveImage(i)}
              className={`w-16 h-16 rounded-lg object-cover cursor-pointer border-2 transition-all
                ${activeImage === i ? 'border-orange-500' : 'border-gray-200 hover:border-gray-300'}`}
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/100x100?text=No+Image";
              }}
            />
          ))}
        </div>
      )}

      {/* PRODUCT INFO */}
      <div className="mt-4 space-y-3">
        {/* Brand/Collection Name */}
        {firstCollection && (
          <div className="flex items-center gap-0.5">
            <span className="text-base font-bold tracking-tight text-gray-800">{firstCollection}</span>
            <span className="text-[10px] align-top text-gray-400">™</span>
          </div>
        )}

        <h1 className="text-2xl font-bold text-gray-900">
          {form.name || "Product Name"}
        </h1>

        {form.title && (
          <p className="text-gray-500 text-sm italic">
            {form.title}
          </p>
        )}

        {/* rating - placeholder */}
        <div className="flex items-center gap-1 text-gray-400">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={14} fill="currentColor" className="text-yellow-400" />
            ))}
          </div>
          <span className="text-xs text-gray-400">(0 reviews)</span>
        </div>

        {/* ingredients/chips */}
        {form.ingredients?.some((i: string) => i.trim()) && (
          <div className="text-sm text-orange-600 font-medium flex flex-wrap gap-2">
            {form.ingredients.filter((i: string) => i.trim()).slice(0, 4).map((i: string, idx: number) => (
              <span key={idx} className="bg-orange-50 px-2 py-0.5 rounded-full text-xs">
                {i}
              </span>
            ))}
          </div>
        )}

        {/* buttons */}
        <div className="flex gap-2">
          {form.scentStory && (
            <button className="px-3 py-1 border rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              Scent Story
            </button>
          )}
          {form.usageTips && (
            <button className="px-3 py-1 border rounded-full text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              Usage Tips
            </button>
          )}
        </div>

        {/* scent story preview */}
        {form.scentStory && (
          <p className="text-gray-500 text-sm italic">
            Inspired by {decodeHtml(form.scentStory)
              .replace(/<[^>]*>/g, "")
              .substring(0, 60)}
          </p>
        )}
        {/* price */}
        <div>
        <div className="flex items-end gap-3">
  <span className="text-3xl font-bold text-orange-500">
    ₹{selectedVariant?.price || 0}
  </span>

  {selectedVariant?.mrp && (
    <span className="text-gray-400 line-through text-lg">
      ₹{selectedVariant.mrp}
    </span>
  )}
</div>
          <p className="text-xs text-gray-400 mt-0.5">
            Inclusive of all taxes
          </p>
        </div>

        {/* variants */}
        {form.variants?.some((v: any) => v.size) && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {form.variants.filter((v: any) => v.size.trim()).map((v: any, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedVariant(v)}
                className={`px-4 py-2 border rounded-xl text-sm transition-all
                  ${selectedVariant?.size === v.size
                    ? 'border-orange-500 bg-orange-50 text-orange-600'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
              >
                {v.size} {v.price && `· ₹${v.price}`}
              </button>
            ))}
          </div>
        )}

        {/* quantity and add to cart */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center border rounded-xl overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-10 text-center text-sm font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          <button className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors">
            Add To Cart
          </button>
        </div>

        {/* ACCORDION */}
        <div className="mt-6 space-y-3">
          {form.description && (
            <details className="border rounded-xl p-3">
              <summary className="font-semibold cursor-pointer text-gray-800">
                Product Description
              </summary>
              <div
                className="mt-2 text-sm text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: form.description?.replace(/&nbsp;/g, ' ')
                }}
              />
            </details>
          )}

          {form.usageTips && (
            <details className="border rounded-xl p-3">
              <summary className="font-semibold cursor-pointer text-gray-800">
                Usage Tips
              </summary>
              <div
                className="mt-2 text-sm text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: form.usageTips?.replace(/&nbsp;/g, ' ')
                }}
              />
            </details>
          )}

          {form.ingredients?.some((i: string) => i.trim()) && (
            <details className="border rounded-xl p-3">
              <summary className="font-semibold cursor-pointer text-gray-800">
                Ingredients
              </summary>
              <ul className="list-disc pl-4 mt-2 text-sm text-gray-600 space-y-1">
                {form.ingredients.filter((i: string) => i.trim()).map((i: string, idx: number) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </details>
          )}

          {form.brandManufacturerInfo && (
            <details className="border rounded-xl p-3">
              <summary className="font-semibold cursor-pointer text-gray-800">
                Brand & Manufacturer Info
              </summary>
              <div
                className="mt-2 text-sm text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: form.brandManufacturerInfo?.replace(/&nbsp;/g, ' ')
                }}
              />
            </details>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductFormPage = ({ initialValues, onSubmit, onCancel }: ProductFormProps) => {
  const isEdit = !!initialValues;
  const [showPreview, setShowPreview] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [form, setForm] = useState<any>(() => {
    if (initialValues) {
      return {
        name: initialValues.name || "",
        title: initialValues.title || "",
        gender: initialValues.gender || "unisex",
        collectionIds: (initialValues.collectionIds || []).map((v: any) => v._id || v),
        seasonIds: (initialValues.seasonIds || []).map((v: any) => v._id || v),
        scentIds: (initialValues.scentIds || []).map((v: any) => v._id || v),
        variants: initialValues.variants?.length
          ? initialValues.variants.map((v: any) => ({
              size: v.size || "",
              price: v.price,
              mrp: v.mrp,
            }))
          : [{ size: "", mrp: undefined, price: undefined }],
        ingredients: initialValues.ingredients?.length
          ? initialValues.ingredients
          : [""],
        description: initialValues.description || "",
        usageTips: initialValues.usageTips || "",
        scentStory: initialValues.scentStory || "",
        metaTitle: initialValues.metaTitle || "",
        metaDescription: initialValues.metaDescription || "",
        metaKeywords: initialValues.metaKeywords?.length
          ? initialValues.metaKeywords
          : [""],
        slug: initialValues.slug || "",
        brandManufacturerInfo: initialValues.brandManufacturerInfo || "",
        isTrending: !!initialValues.isTrending,
        isFeatured: !!initialValues.isFeatured,
        isActive: initialValues.isActive !== false,
        coverimage: initialValues.coverimage || "",
        images: Array.isArray(initialValues.images) ? initialValues.images : [],
      };
    }
    return {
      name: "",
      title: "",
      gender: "unisex",
      collectionIds: [],
      seasonIds: [],
      scentIds: [],
      variants: [{ size: "", mrp: undefined, price: undefined }],
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
      images: [],
    };
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

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
    if (initialValues) {
      setForm({
        name: initialValues.name || "",
        title: initialValues.title || "",
        gender: initialValues.gender || "unisex",
        collectionIds: (initialValues.collectionIds || []).map((v: any) => v._id || v),
        seasonIds: (initialValues.seasonIds || []).map((v: any) => v._id || v),
        scentIds: (initialValues.scentIds || []).map((v: any) => v._id || v),
        variants: initialValues.variants?.length
          ? initialValues.variants.map((v: any) => ({
              size: v.size || "",
              price: v.price,
              mrp: v.mrp,
            }))
          : [{ size: "", mrp: undefined, price: undefined }],
        ingredients: initialValues.ingredients?.length
          ? initialValues.ingredients
          : [""],
        description: initialValues.description || "",
        usageTips: initialValues.usageTips || "",
        scentStory: initialValues.scentStory || "",
        metaTitle: initialValues.metaTitle || "",
        metaDescription: initialValues.metaDescription || "",
        metaKeywords: initialValues.metaKeywords?.length
          ? initialValues.metaKeywords
          : [""],
        slug: initialValues.slug || "",
        brandManufacturerInfo: initialValues.brandManufacturerInfo || "",
        isTrending: !!initialValues.isTrending,
        isFeatured: !!initialValues.isFeatured,
        isActive: initialValues.isActive !== false,
        coverimage: initialValues.coverimage || "",
        images: Array.isArray(initialValues.images) ? initialValues.images : [],
      });
    }
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

  const updateVariant = (
    index: number,
    key: "size" | "price" | "mrp",
    value: any
  ) => {
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
                        <div key={index} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 rounded-xl p-3 bg-gray-50">

                          <Input
                            value={variant.size}
                            onChange={(e) =>
                              updateVariant(index, "size", e.target.value)
                            }
                            placeholder="Size e.g. 50ml"
                          />

                          <InputNumber
                            value={variant.mrp}
                            onChange={(value) =>
                              updateVariant(index, "mrp", value)
                            }
                            placeholder="MRP"
                            className="w-full"
                          />

                          <InputNumber
                            value={variant.price}
                            onChange={(value) =>
                              updateVariant(index, "price", value)
                            }
                            placeholder="Selling Price"
                            className="w-full"
                          />

                          <button
                            type="button"
                            onClick={() => removeVariant(index)}
                          >
                            <Trash2 size={16} />
                          </button>

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

          {/* Preview Section - Using ProductPreview component */}
          <div className={showPreview ? "block" : "block"}>
            <div className="sticky top-1">
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

                {/* Product Preview Component */}
                <div className="max-h-[calc(100vh-160px)] overflow-y-auto p-5">
                  {!form.name && !form.coverimage ? (
                    <div className="text-center py-16 px-6">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-200">
                        <Package size={36} className="text-gray-300" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">No product yet</h3>
                      <p className="text-sm text-gray-400">Fill the form to see preview</p>
                    </div>
                  ) : (
                    <ProductPreview form={form} />
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