"use client";

import { useEffect, useState } from "react";
import MultipleImageField from "../common/uploads/MultipleImageField";
import { CommonFormActions, CommonFormCard, CommonPageHeaderForm } from "../common/commonForm";

const BannerFormPage = ({ initialValues, onSubmit, onBack }: any) => {
  const [form, setForm] = useState({  bannerImages: [] as string[], });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const isEdit = !!initialValues;

  useEffect(() => {
    if (initialValues) {
     setForm({  bannerImages: initialValues.bannerImages || [],  });
    } else {
      setForm({ bannerImages: [] }); }
  }, [initialValues]);

  const validate = () => {
    let newErrors: any = {};
    if (!form.bannerImages.length) {  newErrors.bannerImages = "At least one banner image is required"; }
    setErrors(newErrors); return Object.keys(newErrors).length === 0;};
  const handleSubmit = () => { if (!validate()) return; setLoading(true); onSubmit(form); setLoading(false);};

  return (
    <CommonFormCard>
      <CommonPageHeaderForm title={isEdit ? "Edit Banner" : "Manage Banner"} description={  isEdit ? "Update your banner images"  : "Add or update banner images for your store" } onBack={onBack} />
      <div className="p-8">
        <div className="space-y-8">
          <div>
            <MultipleImageField label="Banner Images"   value={form.bannerImages}   required  onChange={(urls) => {  setForm({ ...form, bannerImages: urls });  setErrors((prev: any) => ({ ...prev, bannerImages: "" })); }} />
            {errors.bannerImages && (
              <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                {errors.bannerImages}
              </p>
            )}
          </div>
          <CommonFormActions  onCancel={onBack}  onSubmit={handleSubmit} submitText="Save Banner" disabled={!form.bannerImages.length}  loading={loading}/>
        </div>
      </div>
    </CommonFormCard>
  );
};

export default BannerFormPage;