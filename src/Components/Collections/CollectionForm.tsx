"use client";

import { useEffect, useState } from "react";
import { FolderOpen } from "lucide-react";
import { Mutations } from "../../Api/Mutations";
import { CommonFormActions, CommonFormCard, CommonImageUpload, CommonInput, CommonPageHeaderForm } from "../common/commonForm";



interface Props {
  initialValues?: any;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const CollectionFormPage = ({ initialValues, onSubmit, onCancel }: Props) => {
  const [form, setForm] = useState({
    name: "",
    image: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = Mutations.useUploadFile();
  const isEdit = !!initialValues;

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || "",
        image: initialValues.image || "",
      });
    } else {
      setForm({
        name: "",
        image: "",
      });
    }
  }, [initialValues]);

  const uploadSingleFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadFile.mutateAsync(formData);
    return (res as any)?.data?.images?.[0] || "";
  };

  const validate = () => {
    let newErrors: any = {};

    if (!form.name.trim()) {
      newErrors.name = "Collection name is required";
    }

    if (!form.image && !file) {
      newErrors.image = "Collection image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    if (selectedFile) {
      setForm({ ...form, image: "" });
    } else {
      setForm({ ...form, image: "" });
    }
    setErrors((prev: any) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    let imageUrl = form.image;

    if (file) {
      imageUrl = await uploadSingleFile(file);
    }

    onSubmit({
      ...form,
      image: imageUrl,
    });
    setLoading(false);
  };

  return (
    <CommonFormCard>
      <CommonPageHeaderForm

        title={isEdit ? "Edit Collection" : "Create New Collection"}
        description={
          isEdit
            ? "Update your collection details"
            : "Add a new collection to organize your items"
        }
        onBack={onCancel}
      />

      <div className="p-8">
        <div className="space-y-8">
          <CommonInput

            label="Collection Name"
            required
            value={form.name}
            onChange={(val) => {
              setForm({ ...form, name: val });
              setErrors((prev: any) => ({ ...prev, name: "" }));
            }}
            placeholder="Enter collection name"
            prefix={<FolderOpen size={18} className="text-gray-400" />}
            error={errors.name}
          />

          <CommonImageUpload
            label="Collection Image"
            required
            value={form.image}
            onChange={handleImageChange}
            error={errors.image}
          />

          <CommonFormActions
            onCancel={onCancel}
            onSubmit={handleSubmit}
            submitText={isEdit ? "Update Collection" : "Create Collection"}
            loading={loading}
          />
        </div>
      </div>
    </CommonFormCard>
  );
};

export default CollectionFormPage;