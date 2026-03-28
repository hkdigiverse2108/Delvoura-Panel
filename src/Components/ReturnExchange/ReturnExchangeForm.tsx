"use client";

import { useEffect, useState } from "react";
import {
    CommonEditor,
  CommonFormActions,
  CommonFormCard,
  CommonInput,
  CommonPageHeaderForm,
} from "../common/commonForm";

const ReturnExchangeForm = ({ onBack, onSubmit, initialValues }: any) => {
  const [form, setForm] = useState({
    question: "",
    answer: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const isEdit = !!initialValues;

  useEffect(() => {
    if (initialValues) {
      setForm({
        question: initialValues.question || "",
        answer: initialValues.answer || "",
      });
    }
  }, [initialValues]);

  const validate = () => {
    let err: any = {};

    if (!form.question.trim()) err.question = "Question is required";
    if (!form.answer.trim()) err.answer = "Answer is required";

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
        title={isEdit ? "Edit Return Exchange" : "Create Return Exchange"}
        description="Manage return & exchange FAQs"
        onBack={onBack}
      />

      <div className="p-8 space-y-6">
        <CommonInput
          label="Question"
          required
          value={form.question}
          onChange={(val) => setForm({ ...form, question: val })}
          error={errors.question}
        />

        <CommonEditor
          label="Answer"
          required
          value={form.answer}
          onChange={(val) => setForm({ ...form, answer: val })}
          error={errors.answer}
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

export default ReturnExchangeForm;