"use client";

import { useEffect, useState } from "react";
import { Tag } from "lucide-react";
import { CommonFormActions, CommonFormCard, CommonInput, CommonPageHeaderForm } from "../common/commonForm";


const SeasonFormPage = ({ onBack, onSubmit, initialValues }: any) => {
  const [form, setForm] = useState({ name: "" });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const isEdit = !!initialValues;

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || "",
      });
    } else {
      setForm({ name: "" });
    }
  }, [initialValues]);

  const validate = () => {
    let newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = "Season name is required";
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
        title={isEdit ? "Edit Season" : "Create New Season"}
        description={
          isEdit
            ? "Update your season information"
            : "Add a new season to organize your collections"
        }
        onBack={onBack}
      />

      <div className="p-8">
        <div className="space-y-8">
          <CommonInput
            label="Season Name"
            required
            value={form.name}
            onChange={(val) => {
              setForm({ ...form, name: val });
              setErrors((prev: any) => ({ ...prev, name: "" }));
            }}
            placeholder="e.g., Summer 2024, Winter Collection, Spring Edition"
            prefix={<Tag size={18} className="text-gray-400" />}
            error={errors.name}
          />

          <CommonFormActions
            onCancel={onBack}
            onSubmit={handleSubmit}
            submitText={isEdit ? "Update Season" : "Create Season"}
            disabled={!form.name.trim()}
            loading={loading}
          />
        </div>
      </div>
    </CommonFormCard>
  );
};

export default SeasonFormPage;