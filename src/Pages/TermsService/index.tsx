"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  CommonPageHeader,
  CommonPagination,
} from "../../Components";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";
import { PAGE_TITLE } from "../../Constants";
import { Mutations } from "../../Api/Mutations";
import TermsServiceTable from "../../Components/TermsService/TermsServiceTable";
import TermsServiceFormPage from "../../Components/TermsService/TermsServiceForm";
import { Queries } from "../../Api/Queries";

const TermsService = () => {
  const [mode, setMode] = useState<"list" | "form">("list");
  const [editData, setEditData] = useState<any>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const [search, setSearch] = useState("");
  const [statusToggle, setStatusToggle] = useState(true);

  const { data, isLoading, refetch } =Queries.useGetTermsService({
    page: pagination.page,
    limit: pagination.limit,
    search,
    status: statusToggle ? "active" : "inactive",
  });

  const list = data?.data?.terms_service_data || [];
  const total = data?.data?.totalData || 0;

  const add = Mutations.useAddTermsService();
  const update = Mutations.useUpdateTermsService();
  const remove = Mutations.useDeleteTermsService();

  const handleSubmit = async (values: any) => {
    if (editData) {
      await update.mutateAsync({
        ...values,
        termsServiceId: editData._id,
      });
    } else {
      await add.mutateAsync(values);
    }

    setMode("list");
    setEditData(null);
    refetch();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete?")) {
      await remove.mutateAsync(id);
      refetch();
    }
  };

  const handleToggle = async (item: any) => {
    await update.mutateAsync({
      termsServiceId: item._id,
      title: item.title,
      content: item.content,
      isActive: !item.isActive,
    });
    refetch();
  };

  const handleAdd = () => {
    setEditData(null);
    setMode("form");
  };

  const handleEdit = (item: any) => {
    setEditData(item);
    setMode("form");
  };

  // Form View
  if (mode === "form") {
    return (
      <TermsServiceFormPage
        initialValues={editData}
        onSubmit={handleSubmit}
        onCancel={() => {
          setMode("list");
          setEditData(null);
        }}
      />
    );
  }

  // List View
  return (
    <div className="user-page">
      <CommonPageHeader
        title={PAGE_TITLE.TERMS_SERVICE.TITLE}
        subtitle={PAGE_TITLE.TERMS_SERVICE.SUB_TITLE}
        buttonText={PAGE_TITLE.TERMS_SERVICE.BUTTON_TEXT}
        buttonIcon={<Plus size={18} />}
        onButtonClick={handleAdd}
      />

      <CommonSearchFilterBar
        total={total}
        label="terms"
        search={search}
        onSearchChange={setSearch}
        onSearchSubmit={refetch}
        status={statusToggle}
        onStatusChange={(val) => {
          setStatusToggle(val);
          setPagination((p) => ({ ...p, page: 1 }));
        }}
      />

      <TermsServiceTable
        data={list}
        loading={isLoading}
        page={pagination.page}
        limit={pagination.limit}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggle}
      />

      <CommonPagination
        page={pagination.page}
        limit={pagination.limit}
        total={total}
        currentCount={list.length}
        label="terms"
        onPageChange={(page) => setPagination((p) => ({ ...p, page }))}
        onLimitChange={(limit) => setPagination({ page: 1, limit })}
      />
    </div>
  );
};

export default TermsService;