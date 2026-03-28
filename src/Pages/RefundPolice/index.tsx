"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Mutations } from "../../Api/Mutations";
import { Queries } from "../../Api/Queries";
import {
  CommonPageHeader,
  CommonPagination,
} from "../../Components";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";

import { PAGE_TITLE } from "../../Constants";
import RefundPolicyForm from "../../Components/RefundPolice/RefundPoliceForm";
import RefundPolicyTable from "../../Components/RefundPolice/RefundPoliceTable";

const RefundPolicy = () => {
  const [mode, setMode] = useState<"list" | "form">("list");
  const [editData, setEditData] = useState<any>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const [filters, setFilters] = useState({ search: "" });
  const [statusToggle, setStatusToggle] = useState(true);

  const params = {
    page: pagination.page,
    limit: pagination.limit,
    ...(filters.search && { search: filters.search }),
    status: statusToggle ? "active" : "inactive",
  };

  const { data, isLoading, refetch } =
    Queries.useGetRefundPolicies(params);

  const list = data?.data?.refund_policy_data || [];
  const total = data?.data?.totalData || 0;

  const add = Mutations.useAddRefundPolicy();
  const update = Mutations.useUpdateRefundPolicy();
  const remove = Mutations.useDeleteRefundPolicy();

  const handleSubmit = async (values: any) => {
    if (editData) {
      await update.mutateAsync({
        ...values,
        refundPolicyId: editData._id,
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
      refundPolicyId: item._id,
      title: item.title,
      content: item.content,
      isActive: !item.isActive,
    });
    refetch();
  };

  if (mode === "form") {
    return (
      <RefundPolicyForm
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
    <div>
      <CommonPageHeader
        title={PAGE_TITLE.REFUND_POLICY.TITLE}
        buttonText={PAGE_TITLE.REFUND_POLICY.BUTTON_TEXT}
        buttonIcon={<Plus />}
        onButtonClick={() => setMode("form")}
      />

      <CommonSearchFilterBar
        total={total}
        label="Refund Policies"
        search={filters.search}
        onSearchChange={(val) => setFilters({ search: val })}
        onSearchSubmit={refetch}
        status={statusToggle}
        onStatusChange={setStatusToggle}
      />

      <RefundPolicyTable
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
          setPagination({ page: 1, limit, total })
        }
      />
    </div>
  );
};

export default RefundPolicy;