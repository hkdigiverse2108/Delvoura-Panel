"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { CommonPageHeader } from "../../Components";
import { PAGE_TITLE } from "../../Constants";
import { Mutations } from "../../Api/Mutations";
import TopbarPreview from "../../Components/TopBar/TopBarPreview";
import TopbarFormPage from "../../Components/TopBar/TopBarForm";
import { Queries } from "../../Api/Queries";

const Topbar = () => {
  const [mode, setMode] = useState<"list" | "form">("list");
  const [editData, setEditData] = useState<any>(null);

  const { data, refetch } = Queries.useGetTopbar();
  const topbar = data?.data || null;

  const addEditTopbar = Mutations.useAddEditTopbar();

  const handleSubmit = async (values: any) => {
    await addEditTopbar.mutateAsync(values);
    setMode("list");
    setEditData(null);
    refetch();
  };

  const handleToggle = async () => {
    if (topbar) {
      await addEditTopbar.mutateAsync({
        topbarItems: topbar.topbarItems,
        isActive: !topbar.isActive,
      });
      refetch();
    }
  };

  const handleEdit = () => {
    setEditData(topbar);
    setMode("form");
  };

  const handleAdd = () => {
    setEditData(null);
    setMode("form");
  };

  // Form View
  if (mode === "form") {
    return (
      <TopbarFormPage
        initialValues={editData}
        onSubmit={handleSubmit}
        onCancel={() => {
          setMode("list");
          setEditData(null);
        }}
      />
    );
  }

  // List/Preview View
  return (
    <div className="user-page">
      <CommonPageHeader
        title={PAGE_TITLE.TOPBAR.TITLE}
        subtitle={PAGE_TITLE.TOPBAR.SUB_TITLE}
        buttonText={PAGE_TITLE.TOPBAR.BUTTON_TEXT}
        buttonIcon={<Plus size={18} />}
        onButtonClick={handleAdd}
      />

      <TopbarPreview
        data={topbar}
        onToggle={handleToggle}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Topbar;