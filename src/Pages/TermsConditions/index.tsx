"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  CommonPageHeader,
  CommonPagination,
} from "../../Components";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";

import { Mutations } from "../../Api/Mutations";

import TermsConditionsTable from "../../Components/TermsConditions/TermsConditionsTable";
import TermsConditionsFormPage from "../../Components/TermsConditions/TermsConditionsForm";
import { Queries } from "../../Api/Queries";

const TermsConditionsPage = () => {
  const [mode, setMode] = useState<"list" | "form">("list");
  const [editData, setEditData] = useState<any>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const [filters, setFilters] = useState({ search: "" });
  const [statusToggle, setStatusToggle] = useState(true);

  const queryParams = {
    page: pagination.page,
    limit: pagination.limit,
    search: filters.search,
    status: statusToggle ? "active" : "inactive",
  };

  const { data, isLoading, refetch } =
    Queries.useGetTermsConditions(queryParams);

  const list = data?.data?.terms_conditions_data || [];
  const total = data?.data?.totalData || 0;

  const add = Mutations.useAddTermsConditions();
  const update = Mutations.useUpdateTermsConditions();
  const del = Mutations.useDeleteTermsConditions();

  const handleSubmit = async (values: any) => {
    if (editData) {
      await update.mutateAsync({
        ...values,
        termsConditionsId: editData._id,
      });
    } else {
      await add.mutateAsync(values);
    }

    setMode("list");
    setEditData(null);
    refetch();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this item?")) {
      await del.mutateAsync(id);
      refetch();
    }
  };

  const handleToggle = async (item: any) => {
    await update.mutateAsync({
      termsConditionsId: item._id,
      title: item.title,
      content: item.content,
      isActive: !item.isActive,
    });
    refetch();
  };

  // 🔥 FORM VIEW
  if (mode === "form") {
    return (
      <TermsConditionsFormPage
        initialValues={editData}
        onSubmit={handleSubmit}
        onBack={() => {
          setMode("list");
          setEditData(null);
        }}
      />
    );
  }

  // 🔥 LIST VIEW
  return (
    <div>
      <CommonPageHeader
        title="Terms & Conditions"
        subtitle="Manage legal pages"
        buttonText="Add Terms"
        buttonIcon={<Plus size={18} />}
        onButtonClick={() => {
          setEditData(null);
          setMode("form");
        }}
      />

      <CommonSearchFilterBar
        total={total}
        search={filters.search}
        onSearchChange={(val) => setFilters({ search: val })}
        onSearchSubmit={refetch}
        status={statusToggle}
        onStatusChange={setStatusToggle}
        label="Terms"
      />

      <TermsConditionsTable
        data={list}
        loading={isLoading}
        page={pagination.page}
        limit={pagination.limit}
        onEdit={(item: any) => {
          setEditData(item);
          setMode("form");
        }}
        onDelete={handleDelete}
        onToggleStatus={handleToggle}
      />

      <CommonPagination
        page={pagination.page}
        limit={pagination.limit}
        total={total}
        currentCount={list.length}
        label="Terms"
        onPageChange={(page) =>
          setPagination((prev) => ({ ...prev, page }))
        }
        onLimitChange={(limit) =>
          setPagination({ page: 1, limit, total })
        }
      />
    </div>
  );
};

export default TermsConditionsPage;