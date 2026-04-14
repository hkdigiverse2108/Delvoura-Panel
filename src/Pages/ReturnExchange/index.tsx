"use client";

import { useEffect, useState } from "react";
import { Pencil, Save, X, FileText } from "lucide-react";
import { CommonEditor } from "../../Components/common/commonForm";
import { Mutations } from "../../Api/Mutations";
import { Queries } from "../../Api/Queries";

const ReturnExchange = () => {
  const [content, setContent] = useState("");
  const [savedContent, setSavedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { data, refetch, error } =
    Queries.useGetReturnExchange();

  const addEditMutation =
    Mutations.useAddEditReturnExchange();

 useEffect(() => {
  const rawData = data?.data;

  // Case 1: data.data is an array (legacy/documented format)
  const responseArray = (rawData as any)?.return_exchange_data;
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

    await addEditMutation.mutateAsync({
      content,
    });

    setSavedContent(content);
    setIsEditing(false);
    refetch();
  };

  return (
    <div className="user-page w-full">
      <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gray-100">
            <FileText size={18} />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Return & Exchange
            </h2>
            <p className="text-sm text-gray-500">
              Add, preview and edit content
            </p>
          </div>
        </div>

        {/* Editor */}
        <div className="w-full border border-gray-200 rounded-lg">
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
                disabled={!content.trim()}
                className="px-4 py-2 rounded-lg bg-[var(--primary,#7c3aed)] text-white hover:opacity-90 transition disabled:opacity-50"
              >
                <span className="flex items-center gap-2">
                  <Save size={15} />
                  Save
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

export default ReturnExchange;