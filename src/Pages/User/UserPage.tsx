"use client";

import { useMemo, useState } from "react";
import { Mutations } from "../../Api/Mutations";
import {
  CommonPageHeader,
  CommonPagination,
} from "../../Components";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";
import UserTable from "../../Components/User/UserTable";
import UserForm from "../../Components/User/UserForm";
import { PAGE_TITLE } from "../../Constants";
import { Queries } from "../../Api/Queries";
import ConfirmModal from "../../Components/common/ConfirmModal";

const User = () => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);
 const [deleteId, setDeleteId] = useState<string | null>(null);
 const [debouncedSearch, setDebouncedSearch] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  const [filters, setFilters] = useState({
    search: "",
  });

  const [statusToggle, setStatusToggle] = useState(true);

  const queryParams = {
  page: pagination.page,
  limit: pagination.limit,
  ...(debouncedSearch && { search: debouncedSearch }),
  status: statusToggle ? "active" : "inactive",
};

  const { data, isLoading, refetch } =
    Queries.useGetUsers(queryParams);

  const users = data?.data?.user_data || [];
  const total = data?.data?.totalData || 0;

  const filteredUsers = useMemo(() => users, [users]);

  const updateUser = Mutations.useUpdateUser();
  const deleteUser = Mutations.useDeleteUser();

  // ✅ ONLY EDIT USER
  const handleSubmit = async (values: any) => {
    try {
      await updateUser.mutateAsync({
        ...values,
        userId: editData._id,
      });

      setOpen(false);
      setEditData(null);
      refetch();
    } catch (error) {
      console.error("Update error:", error);
    }
  };
const handleDelete = async () => {
  if (!deleteId) return;

  try {
    await deleteUser.mutateAsync(deleteId);
    setDeleteId(null);
    refetch();
  } catch (error) {
    console.error("Delete error:", error);
  }
};

  const handleToggleStatus = async (item: any) => {
    try {
      await updateUser.mutateAsync({
        userId: item._id,
        firstName: item.firstName || "",
        lastName: item.lastName || "",
        email: item.email,
        contact: item.contact || {},
        roles: item.roles,
        isActive: !item.isActive,
      });

      refetch();
    } catch (error) {
      console.error("Toggle error:", error);
    }
  };

  const handleSearchChange = (value: string) => {
  setFilters((prev) => ({ ...prev, search: value }));

  clearTimeout((window as any).searchTimer);

  (window as any).searchTimer = setTimeout(() => {
    setDebouncedSearch(value.trim());
  }, 500);
};

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  };

  return (
    <div className="user-page">

      {/* ❌ REMOVE BUTTON */}
     <CommonPageHeader
  title={PAGE_TITLE.USERS.TITLE}
  subtitle={PAGE_TITLE.USERS.SUB_TITLE}
/>

      <CommonSearchFilterBar
        total={total}
        label={PAGE_TITLE.USERS.LABEL}
        search={filters.search}
        onSearchChange={handleSearchChange}
        onSearchSubmit={refetch}
        status={statusToggle}
        onStatusChange={(val) => {
          setStatusToggle(val);
          setPagination((prev) => ({ ...prev, page: 1 }));
        }}
      />

      <UserTable
        data={filteredUsers}
        loading={isLoading}
        page={pagination.page}
        limit={pagination.limit}
        onEdit={(item: any) => {
          setEditData(item);
          setOpen(true);
        }}
        onDelete={(id: string) => setDeleteId(id)}
        onToggleStatus={handleToggleStatus}
      />

      <CommonPagination
        page={pagination.page}
        limit={pagination.limit}
        total={total}
        currentCount={filteredUsers.length}
        label={PAGE_TITLE.USERS.LABEL}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />

      <ConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={deleteUser.isPending}
      />

      {/* ✅ ONLY EDIT FORM */}
      <UserForm
        open={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        initialValues={editData}
      />
    </div>
  );
};

export default User;


// if (search) {
//       criteria.$or = [
//         { firstName: { $regex: search, $options: 'si' } },
//         { lastName: { $regex: search, $options: 'si' } },
//         { email: { $regex: search, $options: 'si' } },
//         // { 'contact.phoneNo': { $regex: search, $options: 'si' } },
//         {
//           $expr: {
//             $regexMatch: {
//               input: { $toString: "$contact.phoneNo" },
//               regex: search,
//               options: "i"
//             }
//           }
//         }
//       ]
//     }