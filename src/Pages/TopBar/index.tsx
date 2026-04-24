"use client";

import { useEffect, useState } from "react";
import { Pencil, Save, X, Plus, Trash2 } from "lucide-react";
import { Queries } from "../../Api/Queries";
import { Mutations } from "../../Api/Mutations";

const Topbar = () => {
  const [items, setItems] = useState<string[]>([]);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const { data, refetch } = Queries.useGetTopbar();
  const addEditMutation = Mutations.useAddEditTopbar();

  useEffect(() => {
    const response = data?.data;

    if (response?.topbarItems) {
      setItems(response.topbarItems);
      setSavedItems(response.topbarItems);
      setIsEditing(false);
    }
  }, [data]);

  const handleAddItem = () => {
    setItems([...items, ""]);
  };

  const handleRemoveItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const handleChange = (value: string, index: number) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setItems(savedItems);
    setIsEditing(false);
  };

  const handleSave = async () => {
    await addEditMutation.mutateAsync({
      topbarItems: items,
      isActive: true,
    });

    setSavedItems(items);
    setIsEditing(false);
    refetch();
  };

  return (

    <div className="user-page">

    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Topbar Items
            </h2>
            <p className="text-sm text-gray-500">
              Manage topbar announcement messages
            </p>
          </div>

          {isEditing && (
            <button
              onClick={handleAddItem}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 transition"
            >
              <Plus size={16} />
              Add Item
            </button>
          )}
        </div>

        {/* ITEMS */}
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
  key={index}
  draggable={isEditing}
  onDragStart={() => setDragIndex(index)}
  onDragOver={(e) => {
    e.preventDefault();
    setOverIndex(index);
  }}
  onDragLeave={() => setOverIndex(null)}
  onDrop={() => {
    if (dragIndex === null) return;

    const updated = [...items];
    const draggedItem = updated[dragIndex];

    updated.splice(dragIndex, 1);
    updated.splice(index, 0, draggedItem);

    setItems(updated);
    setDragIndex(null);
    setOverIndex(null);
  }}
  onDragEnd={() => {
    setDragIndex(null);
    setOverIndex(null);
  }}
  className={`group flex items-center gap-3 rounded-xl px-4 py-3 
  border transition-all duration-200
  ${dragIndex === index ? "opacity-40 scale-[0.98]" : ""}
  ${overIndex === index ? "border-blue-400 bg-blue-50" : "bg-gray-50 border-gray-100 hover:bg-white hover:shadow-sm hover:border-gray-200"}
`}
>
              <span
  draggable={isEditing}
  onDragStart={() => setDragIndex(index)}
  className="text-gray-300 text-xs cursor-grab active:cursor-grabbing"
>
  ⋮⋮
</span>
              <span className="text-xs text-gray-400 w-6">
                {index + 1}
              </span>

              <input
                value={item}
                disabled={!isEditing}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                placeholder="Enter topbar message..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400 py-1"
              />

              {isEditing && (
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="opacity-0 group-hover:opacity-100 transition 
           p-1 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center text-gray-400 text-sm py-8">
              No items yet. Click <span className="font-medium text-gray-600">“Add Item”</span> to get started.
            </div>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 text-gray-700 hover:bg-gray-50"
              >
                <X size={16} />
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg flex items-center gap-2 hover:opacity-90"
              >
                <Save size={16} />
                Save
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg flex items-center gap-2 hover:opacity-90"
            >
              <Pencil size={16} />
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Topbar;