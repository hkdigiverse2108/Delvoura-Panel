"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Mutations } from "../../Api/Mutations";
import { Queries } from "../../Api/Queries";
import {
  CommonPageHeader,
  CommonPagination,
} from "../../Components";

import { PAGE_TITLE } from "../../Constants";
import { ReturnExchangeForm, ReturnExchangeTable } from "../../Components/ReturnExchange";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";

const ReturnExchange = () => {
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
    Queries.useGetReturnExchanges(params);

  const list = data?.data?.return_exchange_data || [];
  const total = data?.data?.totalData || 0;

  const add = Mutations.useAddReturnExchange();
  const update = Mutations.useUpdateReturnExchange();
  const remove = Mutations.useDeleteReturnExchange();

  const handleSubmit = async (values: any) => {
    if (editData) {
      await update.mutateAsync({
        ...values,
        returnExchangeId: editData._id,
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
      returnExchangeId: item._id,
      question: item.question,
      answer: item.answer,
      isActive: !item.isActive,
    });
    refetch();
  };

  if (mode === "form") {
    return (
      <ReturnExchangeForm
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
        title={PAGE_TITLE.RETURN_EXCHANGE.TITLE}
        buttonText={PAGE_TITLE.RETURN_EXCHANGE.BUTTON_TEXT}
        buttonIcon={<Plus />}
        onButtonClick={() => setMode("form")}
      />

      <CommonSearchFilterBar
        total={total}
        label="Return Exchanges"
        search={filters.search}
        onSearchChange={(val) => setFilters({ search: val })}
        onSearchSubmit={refetch}
        status={statusToggle}
        onStatusChange={setStatusToggle}
      />

      <ReturnExchangeTable
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

export default ReturnExchange;