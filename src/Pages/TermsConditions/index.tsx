
"use client";

import { useEffect, useState } from "react";
import { Pencil, Save, X, FileText } from "lucide-react";
import { CommonEditor } from "../../Components/common/commonForm";
import { Mutations } from "../../Api/Mutations";
import { Queries } from "../../Api/Queries";

const TermsConditions = () => {
  const [content, setContent] = useState("");
  const [savedContent, setSavedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const hasChanges = content !== savedContent;
  const [saving, setSaving] = useState(false);
  

  const { data, refetch, error } =
    Queries.useGetTermsConditions();

  const addEditMutation =
    Mutations.useAddEditTermsConditions();
useEffect(() => {
  const rawData = data?.data;

  // Case 1: data.data is an array (legacy/documented format)
  const responseArray = (rawData as any)?.terms_conditions_data;
  if (Array.isArray(responseArray) && responseArray.length > 0) {
    setContent(responseArray[0].content || "");
    setSavedContent(responseArray[0].content || "");
    setIsEditing(false);
    return;
  }

  // Case 2: data.data is the object directly with content field
  if (rawData && typeof rawData === 'object' && 'content' in rawData) {
    const content = (rawData as any).content;
    setContent(content || "");
    setSavedContent(content || "");
    setIsEditing(false);
  }
}, [data]);

  useEffect(() => {
    if (error) {
      setContent("");
      setSavedContent("");
      setIsEditing(true);
    }
  }, [error]);

  const handleEdit = () => {
    setIsEditing(true);
    setContent(savedContent);
  };

  const handleCancel = () => {
    setContent(savedContent);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!content.trim()) return;

    setSaving(true);
    await addEditMutation.mutateAsync({
      content,
    });
    setSaving(false);

    setSavedContent(content);
    setIsEditing(false);
    refetch();
  };
  useEffect(() => {
  const handler = (e: any) => {
    if (hasChanges) {
      e.preventDefault();
      e.returnValue = "";
    }
  };

  window.addEventListener("beforeunload", handler);
  return () => window.removeEventListener("beforeunload", handler);
}, [hasChanges]);
  return (
    <div className="user-page w-full">
      <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-5 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gray-100">
              <FileText size={18} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Terms & Conditions
              </h2>
              <p className="text-sm text-gray-500">
                Manage your legal content
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Last updated: {savedContent ? new Date().toLocaleString() : "—"}
              </p>
            </div>
            
          </div>

          {/* STATUS BADGE */}
          
          <span
            className={`text-xs px-3 py-1 rounded-full border 
            ${
              hasChanges
                ? "bg-orange-50 text-orange-700 border-orange-200"
                : isEditing
                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                : "bg-green-50 text-green-700 border-green-200"
            }`}
          >
            {hasChanges ? "Unsaved" : isEditing ? "Editing" : "Saved"}
          </span>
        </div>
        {/* Editor */}
        <div
          className={`w-full rounded-xl border transition-all duration-200
          ${
            isEditing
              ? "border-[var(--primary)] shadow-sm focus-within:ring-2 focus-within:ring-[var(--primary)]/20"
              : "border-gray-200 bg-gray-50 hover:bg-white"
          }`}
        >
          <CommonEditor
            label=""
            value={content}
            onChange={(val) => {
              if (isEditing) setContent(val);
            }}
            height="500px"
            readOnly={!isEditing}
          />
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-end items-center gap-3">
          
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
              >
                <span className="flex items-center gap-2">
                  <X size={15} />
                  Cancel
                </span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={!content.trim() || !hasChanges}
                className="px-4 py-2 rounded-lg bg-[var(--primary,#7c3aed)] text-white hover:opacity-90 transition disabled:opacity-50"
              >
                <span className="flex items-center gap-2">
                  <Save size={15} />
                  {saving ? "Saving..." : "Save"}
                </span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleEdit}
              className="px-4 py-2 rounded-lg bg-[var(--primary,#7c3aed)] text-white hover:opacity-90 transition"
            >
              <span className="flex items-center gap-2">
                <Pencil size={15} />
                Edit
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;