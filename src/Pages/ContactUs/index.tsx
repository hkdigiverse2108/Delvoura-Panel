"use client";

import { useState } from "react";
import { Queries } from "../../Api/Queries";
import { Mutations } from "../../Api/Mutations";
import { CommonPageHeader, CommonPagination } from "../../Components";
import ConfirmModal from "../../Components/common/ConfirmModal";
import ContactUsTable from "../../Components/ContactUs/ContactUsTable";
import { PAGE_TITLE } from "../../Constants";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";

const ContactUs = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [filters, setFilters] = useState({ search: "" });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryParams = { page: pagination.page, limit: pagination.limit, ...(filters.search && { search: filters.search }) };
  const { data, isLoading, refetch } = Queries.useGetContactUs(queryParams);
  const messages = data?.data?.contact_us_data || [];
  const total = data?.data?.totalData || 0;
  const deleteMessage = Mutations.useDeleteContactUs();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMessage.mutateAsync(deleteId);
    setDeleteId(null);
    refetch();
  };

  return (
    <div className="user-page">
      <CommonPageHeader title={PAGE_TITLE.CONTACT_US.TITLE} subtitle={PAGE_TITLE.CONTACT_US.SUB_TITLE} />
      <CommonSearchFilterBar total={total} label="Contact Us" search={filters.search} onSearchChange={(val: string) => setFilters((prev) => ({ ...prev, search: val }))} onSearchSubmit={refetch} status={true} onStatusChange={() => {}} />
      <ContactUsTable data={messages} loading={isLoading} page={pagination.page} limit={pagination.limit} onDelete={(id: string) => setDeleteId(id)} />
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleteMessage.isPending} />
      <CommonPagination page={pagination.page} limit={pagination.limit} total={total} currentCount={messages.length} label={PAGE_TITLE.CONTACT_US.LABEL} onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))} onLimitChange={(limit) => setPagination({ page: 1, limit, total })} />
    </div>
  );
};

export default ContactUs;