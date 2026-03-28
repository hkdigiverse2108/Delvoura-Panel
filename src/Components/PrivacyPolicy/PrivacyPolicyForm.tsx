"use client";

import { useEffect, useState } from "react";
import {
    CommonEditor,
  CommonFormActions,
  CommonFormCard,
  CommonInput,
  CommonPageHeaderForm,
} from "../common/commonForm";

const PrivacyPolicyForm = ({ onBack, onSubmit, initialValues }: any) => {
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
    }
  }, [initialValues]);

  const validate = () => {
    let err: any = {};

    if (!form.title.trim()) err.title = "Title required";
    if (!form.content.trim()) err.content = "Content required";

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
        title={isEdit ? "Edit Privacy Policy" : "Create Privacy Policy"}
        description="Manage your privacy policy content"
        onBack={onBack}
      />

      <div className="p-8 space-y-6">
        <CommonInput
          label="Title"
          required
          value={form.title}
          onChange={(val) => setForm({ ...form, title: val })}
          error={errors.title}
        />

        <CommonEditor
          label="Content"
          required
          value={form.content}
          onChange={(val) => setForm({ ...form, content: val })}
          error={errors.content}
          height="300px"
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

export default PrivacyPolicyForm;