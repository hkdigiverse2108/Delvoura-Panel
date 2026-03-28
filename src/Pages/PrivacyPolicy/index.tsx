"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  CommonPageHeader,
  CommonPagination,
} from "../../Components";


import { Queries } from "../../Api/Queries";
import { Mutations } from "../../Api/Mutations";
import { PrivacyPolicyForm, PrivacyPolicyTable } from "../../Components/PrivacyPolicy";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";

const PrivacyPolicy = () => {
  const [mode, setMode] = useState("list");
  const [editData, setEditData] = useState<any>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const [filters, setFilters] = useState({ search: "" });
  const [statusToggle, setStatusToggle] = useState(true);

  const queryParams = {
    page: pagination.page,
    limit: pagination.limit,
    ...(filters.search && { search: filters.search }),
    status: statusToggle ? "active" : "inactive",
  };

  const { data, isLoading, refetch } =
    Queries.useGetPrivacyPolicies(queryParams);

  const list = data?.data?.privacy_policy_data || [];
  const total = data?.data?.totalData || 0;

  const add = Mutations.useAddPrivacyPolicy();
  const update = Mutations.useUpdatePrivacyPolicy();
  const remove = Mutations.useDeletePrivacyPolicy();

  const handleSubmit = async (values: any) => {
    if (editData) {
      await update.mutateAsync({
        ...values,
        privacyPolicyId: editData._id,
      });
    } else {
      await add.mutateAsync(values);
    }

    setMode("list");
    setEditData(null);
    refetch();
  };

  const handleDelete = async (id: string) => {
    await remove.mutateAsync(id);
    refetch();
  };

  const handleToggle = async (item: any) => {
    await update.mutateAsync({
      privacyPolicyId: item._id,
      title: item.title,
      content: item.content,
      isActive: !item.isActive,
    });
    refetch();
  };

  if (mode === "form") {
    return (
      <PrivacyPolicyForm
        initialValues={editData}
        onSubmit={handleSubmit}
        onBack={() => {
          setMode("list");
          setEditData(null);
        }}
      />
    );
  }

  return (
    <>
      <CommonPageHeader
        title="Privacy Policy"
        buttonText="Add Privacy Policy"
        buttonIcon={<Plus />}
        onButtonClick={() => setMode("form")}
      />

      <CommonSearchFilterBar
        total={total}
        search={filters.search}
        onSearchChange={(val) => setFilters({ search: val })}
        onSearchSubmit={refetch}
        status={statusToggle}
        onStatusChange={setStatusToggle}
      />

      <PrivacyPolicyTable
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
        onPageChange={(page) =>
          setPagination((p) => ({ ...p, page }))
        }
        onLimitChange={(limit) =>
          setPagination({ page: 1, limit })
        }
      />
    </>
  );
};

export default PrivacyPolicy;