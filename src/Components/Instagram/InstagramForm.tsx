"use client";

import { useEffect, useState } from "react";
import {
  CommonFormActions,
  CommonFormCard,
  CommonInput,
  CommonPageHeaderForm,
} from "../common/commonForm";
import { Select } from "antd";

const InstagramForm = ({ onBack, onSubmit, initialValues }: any) => {
  const [form, setForm] = useState({
    type: "img",
    imageUrl: "",
    link: "",
    videoUrl: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const isEdit = !!initialValues;

  useEffect(() => {
    if (initialValues) {
      setForm({
        type: initialValues.type || "img", // ✅ lowercase
        imageUrl: initialValues.imageUrl || "",
        link: initialValues.link || "",
        videoUrl: initialValues.videoUrl || "",
      });
    }
  }, [initialValues]);

  const validate = () => {
    let err: any = {};

    if (!form.link.trim()) err.link = "Link required";

    if (form.type === "img" && !form.imageUrl.trim()) {
      err.imageUrl = "Image URL required";
    }

    if (form.type === "video" && !form.videoUrl.trim()) {
      err.videoUrl = "Video URL required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    await onSubmit({
      ...form,
      type: form.type, 
      imageUrl: form.type === "img" ? form.imageUrl : "",
      videoUrl: form.type === "video" ? form.videoUrl : "",
    });

    setLoading(false);
  };

  return (
    <CommonFormCard>
      <CommonPageHeaderForm
        title={isEdit ? "Edit Instagram" : "Create Instagram"}
        description="Manage Instagram content"
        onBack={onBack}
      />

      <div className="p-8 space-y-6">
        
      <div className="mb-8">
           {/* TYPE SELECT */}
    <Select className="w-full h-12"
  value={form.type}
  onChange={(value) =>
    setForm({
      ...form,
      type: value,
      imageUrl: "",
      videoUrl: "",
    })
  }
  options={[
    { label: "Image", value: "img" },
    { label: "Video", value: "video" },
  ]}
/>
      </div>

        {/* IMAGE URL */}
        {form.type === "img" && (
          <CommonInput  
            label="Image URL" 
            required
            value={form.imageUrl}
            onChange={(val) => {
              setForm({ ...form, imageUrl: val });
              setErrors((p: any) => ({ ...p, imageUrl: "" }));
            }}
            placeholder="https://example.com/image.jpg"
            error={errors.imageUrl}
          />
        )}

        {/* VIDEO URL */}
        {form.type === "video" && (
          <CommonInput
            label="Video URL"
            required
            value={form.videoUrl}
            onChange={(val) => {
              setForm({ ...form, videoUrl: val });
              setErrors((p: any) => ({ ...p, videoUrl: "" }));
            }}
            placeholder="https://youtube.com/video"
            error={errors.videoUrl}
          />
        )}

        {/* LINK */}
        <CommonInput
          label="Link"
          required
          value={form.link}
          onChange={(val) => {
            setForm({ ...form, link: val });
            setErrors((p: any) => ({ ...p, link: "" }));
          }}
          placeholder="https://instagram.com/post"
          error={errors.link}
        />

        <CommonFormActions
          onCancel={onBack}
          onSubmit={handleSubmit}
          submitText={isEdit ? "Update" : "Create"}
          loading={loading}
        />
      </div>
    </CommonFormCard>
  );
};

export default InstagramForm;