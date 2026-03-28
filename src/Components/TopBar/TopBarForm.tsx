"use client";

import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { Plus, Trash2, Type } from "lucide-react";
import { CommonFormCard, CommonPageHeaderForm, CommonFormActions } from "../common/commonForm";

interface TopbarFormPageProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const TopbarFormPage = ({ initialValues, onSubmit, onCancel }: TopbarFormPageProps) => {
  const [items, setItems] = useState<string[]>([""]);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const isEdit = !!initialValues;

  useEffect(() => {
    if (initialValues) {
      setItems(initialValues.topbarItems?.length ? initialValues.topbarItems : [""]);
    } else {
      setItems([""]);
    }
  }, [initialValues]);

  const handleChange = (value: string, index: number) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
    if (errors.items) {
      setErrors((prev: any) => ({ ...prev, items: "" }));
    }
  };

  const addItem = () => {
    setItems([...items, ""]);
  };

  const removeItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated.length ? updated : [""]);
  };

  const validate = () => {
    let newErrors: any = {};
    const filtered = items.filter((i) => i.trim() !== "");

    if (!filtered.length) {
      newErrors.items = "At least one topbar item is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const filtered = items.filter((i) => i.trim() !== "");
    setLoading(true);
    onSubmit({
      topbarItems: filtered,
    });
    setLoading(false);
  };

  return (
    <CommonFormCard>
      <CommonPageHeaderForm
        title={isEdit ? "Edit Topbar" : "Create Topbar"}
        description={
          isEdit
            ? "Update your topbar information"
            : "Add topbar text to display announcements"
        }
        onBack={onCancel}
      />

      <div className="p-8">
        <div className="space-y-8">
          {/* Topbar Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Topbar Items <span className="text-red-500">*</span>
              </label>
              <Button
                icon={<Plus size={16} />}
                onClick={addItem}
                className="rounded-lg border-gray-200 hover:border-gray-300"
              >
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => handleChange(e.target.value, index)}
                    placeholder="Enter topbar text"
                    size="large"
                    prefix={<Type size={16} className="text-gray-400" />}
                    className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 text-base"
                    status={errors.items ? "error" : ""}
                  />
                  <button
                    type="button"
                    className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
                    onClick={() => removeItem(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {errors.items && (
              <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                {errors.items}
              </p>
            )}
          </div>

          <CommonFormActions
            onCancel={onCancel}
            onSubmit={handleSubmit}
            submitText={isEdit ? "Update Topbar" : "Create Topbar"}
            disabled={!items.some((i) => i.trim() !== "")}
            loading={loading}
          />
        </div>
      </div>
    </CommonFormCard>
  );
};

export default TopbarFormPage;