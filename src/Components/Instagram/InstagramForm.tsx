"use client";

import { useEffect, useState } from "react";
import {
  CommonFormActions,
  CommonFormCard,
  CommonInput,
  CommonPageHeaderForm,
  CommonImageUpload,
} from "../common/commonForm";

const InstagramForm = ({ onBack, onSubmit, initialValues }: any) => {
  const [form, setForm] = useState({
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
        imageUrl: initialValues.imageUrl || "",
        link: initialValues.link || "",
        videoUrl: initialValues.videoUrl || "",
      });
    }
  }, [initialValues]);

  const validate = () => {
    let err: any = {};
    if (!form.imageUrl) err.imageUrl = "Image required";
    if (!form.link.trim()) err.link = "Link required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setLoading(true);
    onSubmit(form);
    setLoading(false);
  };

  return (
    <CommonFormCard>
      <CommonPageHeaderForm
        title={isEdit ? "Edit Instagram" : "Create Instagram"}
        description="Manage instagram content"
        onBack={onBack}
      />

      <div className="p-8 space-y-6">
        <CommonImageUpload
          label="Image"
          required
          value={form.imageUrl}
          onChange={(_, url) =>
            setForm({ ...form, imageUrl: url })
          }
          error={errors.imageUrl}
        />

        <CommonInput
          label="Link"
          required
          value={form.link}
          onChange={(val) => setForm({ ...form, link: val })}
          error={errors.link}
        />

        <CommonInput
          label="Video URL"
          value={form.videoUrl}
          onChange={(val) => setForm({ ...form, videoUrl: val })}
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