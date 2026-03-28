"use client";

import { useEffect, useState } from "react";
import { CommonEditor, CommonFormActions, CommonFormCard, CommonInput, CommonPageHeaderForm } from "../common/commonForm";


const TermsConditionsFormPage = ({
  onBack,
  onSubmit,
  initialValues,
}: any) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const isEdit = !!initialValues;

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || "",
        content: initialValues.content || "",
      });
    } else {
      setForm({
        title: "",
        content: "",
      });
    }
  }, [initialValues]);

  const validate = () => {
    let newErrors: any = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!form.content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        title={isEdit ? "Edit Terms & Conditions" : "Add Terms & Conditions"}
        description={
          isEdit
            ? "Update your legal content"
            : "Create professional terms and conditions for your store"
        }
        onBack={onBack}
      />

      <div className="p-8">
        <div className="space-y-8">
          <CommonInput
            label="Title"
            required
            value={form.title}
            onChange={(val) => {
              setForm({ ...form, title: val });
              setErrors((prev: any) => ({ ...prev, title: "" }));
            }}
            placeholder="Enter title (e.g., Terms and Conditions, Terms of Service)"
            error={errors.title}
          />

          <CommonEditor
            label="Content"
            required
            value={form.content}
            onChange={(val) => {
              setForm({ ...form, content: val });
              setErrors((prev: any) => ({ ...prev, content: "" }));
            }}
            error={errors.content}
            height="200px"
          />

          <CommonFormActions
            onCancel={onBack}
            onSubmit={handleSubmit}
            submitText={isEdit ? "Update Terms" : "Create Terms"}
            disabled={!form.title.trim() || !form.content.trim()}
            loading={loading}
          />
        </div>
      </div>
    </CommonFormCard>
  );
};

export default TermsConditionsFormPage;