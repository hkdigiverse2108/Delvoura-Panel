

"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Input, InputNumber, Select } from "antd";
import { Flame, Package, Plus, Trash2 } from "lucide-react";
import { CommonEditor, CommonFormActions, CommonFormCard, CommonImageUpload, CommonInput, CommonPageHeaderForm } from "../common/commonForm";
import ExtraImagesGallery from "../common/commonForm/ExtraImagesGallery";
import { Queries } from "../../Api/Queries";


interface ProductFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const genderOptions = [
  { label: "Men", value: "men" },
  { label: "Woman", value: "women" },
  { label: "Unisex", value: "unisex" },
];

const ProductFormPage = ({ initialValues, onSubmit, onCancel }: ProductFormProps) => {
  const isEdit = !!initialValues;

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
    coverimage: "",
    images: ["", "", "", ""], // 4 empty slots for extra images
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const { data: collectionData } =Queries.useGetCollections({ page: 1, limit: 1000 });
  const { data: seasonData } = Queries.useGetSeasons({ page: 1, limit: 1000 });
  const { data: scentData } = Queries.useGetScents({ page: 1, limit: 1000 });

  const collectionOptions = useMemo(
    () => (collectionData?.data?.collection_data || []).map((item: any) => ({ label: item.name, value: item._id })),
    [collectionData]
  );

  const seasonOptions = useMemo(
    () => (seasonData?.data?.season_data || []).map((item: any) => ({ label: item.name, value: item._id })),
    [seasonData]
  );

  const scentOptions = useMemo(
    () => (scentData?.data?.scent_data || []).map((item: any) => ({ label: item.name, value: item._id })),
    [scentData]
  );

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || "",
        title: initialValues.title || "",
        mrp: initialValues.mrp,
        gender: initialValues.gender || "unisex",
        collectionIds: (initialValues.collectionIds || []).map((item: any) => item._id || item),
        seasonIds: (initialValues.seasonIds || []).map((item: any) => item._id || item),
        scentIds: (initialValues.scentIds || []).map((item: any) => item._id || item),
        variants: initialValues.variants?.length > 0
          ? initialValues.variants.map((item: any) => ({ size: item.size || "", price: item.price }))
          : [{ size: "", price: undefined }],
        ingredients: initialValues.ingredients?.length ? initialValues.ingredients : [""],
        description: initialValues.description || "",
        usageTips: initialValues.usageTips || "",
        scentStory: initialValues.scentStory || "",
        metaTitle: initialValues.metaTitle || "",
        metaDescription: initialValues.metaDescription || "",
        metaKeywords: initialValues.metaKeywords?.length ? initialValues.metaKeywords : [""],
        slug: initialValues.slug || "",
        brandManufacturerInfo: initialValues.brandManufacturerInfo || "",
        isTrending: initialValues.isTrending ?? false,
        coverimage: initialValues.coverimage || "",
        images: initialValues.images?.length ? [...initialValues.images, ...Array(4 - initialValues.images.length).fill("")] : ["", "", "", ""],
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
    setLoading(true);
    onSubmit(form);
    setLoading(false);
  };

  const hasValidVariant = form.variants.some((item: any) => item.size.trim());

  return (
    <CommonFormCard>
      <CommonPageHeaderForm
        title={isEdit ? "Edit Product" : "Create New Product"}
        description={isEdit ? "Update your product information" : "Add a new product to your catalog"}
        onBack={onCancel}
      />

      <div className="p-8">
        <div className="space-y-8">
          {/* Basic Information Grid */}
          <div className="grid grid-cols-2 gap-4">
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
              label="Title"
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
          <div className="grid grid-cols-3 gap-4">
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

          {/* Cover Image - Full Width */}
          <CommonImageUpload
            label="Cover Image"
            required
            value={form.coverimage}
            onChange={handleCoverImageChange}
            error={errors.coverimage}
          />

          <ExtraImagesGallery
  images={form.images}
  setImages={(imgs: string[]) => setForm({ ...form, images: imgs })}
/>

          {/* Variants */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Variants <span className="text-red-500">*</span>
              </label>
              <Button icon={<Plus size={16} />} onClick={addVariant} className="rounded-lg">
                Add Variant
              </Button>
            </div>
            <div className="space-y-3">
              {form.variants.map((variant: any, index: number) => (
                <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-3  rounded-xl p-3">
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
              <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                {errors.variants}
              </p>
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

          {/* Trending Status */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50  border-gray-200">
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-orange-500" />
              <span className="text-sm font-medium text-gray-700">{form.isTrending ? "Trending Product" : "Not Trending"}</span>
            </div>
            <button
              onClick={() => setForm({ ...form, isTrending: !form.isTrending })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                form.isTrending ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  form.isTrending ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
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
    </CommonFormCard>
  );
};

export default ProductFormPage;