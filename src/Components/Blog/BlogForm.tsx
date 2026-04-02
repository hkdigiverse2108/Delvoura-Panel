"use client";

import { useEffect, useState } from "react";
import { FolderOpen } from "lucide-react";
import { CommonEditor, CommonFormActions, CommonFormCard, CommonInput, CommonPageHeaderForm, CommonImageUpload,} from "../common/commonForm";

const BlogFormPage = ({ initialValues, onSubmit, onBack }: any) => {
  const [form, setForm] = useState({ title: "", content: "", image: "", });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const isEdit = !!initialValues;

 useEffect(() => {
  if (initialValues) {
    setForm({
      title: initialValues.title || initialValues.name || "",
      content: initialValues.content || initialValues.description || "",
      image: initialValues.image || initialValues.imageUrl || "",
    });
  } else {
    setForm({
      title: "",
      content: "",
      image: "",
    });
  }
}, [initialValues]);
  const validate = () => {
    let newErrors: any = {};
    if (!form.title.trim()) { newErrors.title = "Blog title is required"; }
    if (!form.content.trim()) { newErrors.content = "Blog content is required";    }
    if (!form.image) {  newErrors.image = "Cover image is required";}
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (_file: File | null, preview: string) => {
    setForm((prev) => ({ ...prev,  image: preview, }));
    setErrors((prev: any) => ({ ...prev, image: "",  }));
  };
  const handleSubmit = async () => {   if (!validate()) return;  setLoading(true); onSubmit(form);  setLoading(false);};

  return (
    <CommonFormCard>
      <CommonPageHeaderForm  title={isEdit ? "Edit Blog" : "Create New Blog"}  description={ isEdit  ? "Update your blog content" : "Create engaging blog posts with rich content"  }  onBack={onBack}  />
      <div className="p-8">
        <div className="space-y-8">
          <CommonImageUpload  label="Cover Image"  required value={form.image} onChange={handleImageChange} error={errors.image} />
          <CommonInput  label="Blog Title"   required  value={form.title}  onChange={(val) => {  setForm({ ...form, title: val });  setErrors((prev: any) => ({ ...prev, title: "" })); }}  placeholder="Enter blog title" prefix={<FolderOpen size={18} className="text-gray-400" />}  error={errors.title} />
          <CommonEditor  label="Blog Content"   required  value={form.content}  onChange={(val) => {  setForm({ ...form, content: val });   setErrors((prev: any) => ({ ...prev, content: "" })); }} error={errors.content} height="200px" />
          <CommonFormActions  onCancel={onBack}  onSubmit={handleSubmit}  submitText={isEdit ? "Update Blog" : "Create Blog"}  disabled={!form.title.trim() || !form.content.trim()} loading={loading} />
        </div>
      </div>
    </CommonFormCard>
  );
};

export default BlogFormPage;