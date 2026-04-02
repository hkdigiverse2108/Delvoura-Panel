"use client";

import { useState } from "react";
import { Queries } from "../../Api/Queries";
import { Mutations } from "../../Api/Mutations";
import { CommonPageHeader, CommonPagination } from "../../Components";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";
import ConfirmModal from "../../Components/common/ConfirmModal";
import { PAGE_TITLE } from "../../Constants";
import NewsletterTable from "../../Components/Newsletter/NewsletterTable";

const Newsletter = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [filters, setFilters] = useState({ search: "" });
  const [statusToggle] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryParams = { page: pagination.page, limit: pagination.limit, ...(filters.search && { search: filters.search }), status: statusToggle ? "active" : "inactive" };
  const { data, isLoading, refetch } = Queries.useGetNewsletters(queryParams);
  const newsletters = data?.data?.newsletter_data || [];
  const total = data?.data?.totalData || 0;
  const deleteNewsletter = Mutations.useDeleteNewsletter();

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteNewsletter.mutateAsync(deleteId);
    setDeleteId(null);
    refetch();
  };

  return (
    <div className="user-page">
      <CommonPageHeader title={PAGE_TITLE.NEWSLETTER.TITLE} subtitle={PAGE_TITLE.NEWSLETTER.SUB_TITLE} />
    <CommonSearchFilterBar
  total={total}
  label={PAGE_TITLE.NEWSLETTER.LABEL}

  search={filters.search}
  onSearchChange={(val) => setFilters({ search: val })}
  onSearchSubmit={refetch}

  showStatusToggle={false}   // 🔥 THIS FIX
  showTotal={true}
/>
      <NewsletterTable data={newsletters} loading={isLoading} page={pagination.page} limit={pagination.limit} onDelete={(id: string) => setDeleteId(id)} />
      <ConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleteNewsletter.isPending} />
      <CommonPagination page={pagination.page} limit={pagination.limit} total={total} currentCount={newsletters.length} label={PAGE_TITLE.NEWSLETTER.LABEL} onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))} onLimitChange={(limit) => setPagination({ page: 1, limit, total })} />
    </div>
  );
};

export default Newsletter;