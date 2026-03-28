"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Mutations } from "../../Api/Mutations";

import {
CollectionTable,
CommonPageHeader,
CommonPagination,
} from "../../Components";
import CommonSearchFilterBar from "../../Components/common/CommonSearchFillterBar";
import { PAGE_TITLE } from "../../Constants";
import CollectionFormPage from "../../Components/Collections/CollectionForm";
import { Queries } from "../../Api/Queries";

const Collection = () => {
const [showForm, setShowForm] = useState(false);
const [editData, setEditData] = useState<any>(null);

const [pagination, setPagination] = useState({
page: 1,
limit: 10,
total: 0,
});

const [filters, setFilters] = useState({
search: "",
});

const [statusToggle, setStatusToggle] = useState(true);

const queryParams = {
page: pagination.page,
limit: pagination.limit,
...(filters.search.trim() && { search: filters.search.trim() }),
status: statusToggle ? "active" : "inactive",
};

const { data, isLoading, refetch } =
Queries.useGetCollections(queryParams);

const collections = data?.data?.collection_data || [];
const total = data?.data?.totalData || 0;

const filteredCollections = useMemo(() => collections, [collections]);

const addCollection = Mutations.useAddCollection();
const updateCollection = Mutations.useUpdateCollection();
const deleteCollection = Mutations.useDeleteCollection();

const handleSubmit = async (values: any) => {
try {
if (editData) {
await updateCollection.mutateAsync({
...values,
collectionId: editData._id,
});
} else {
await addCollection.mutateAsync(values);
}


  setShowForm(false);
  setEditData(null);
  refetch();
} catch (error) {
  console.error(error);
}

};

const handleDelete = async (id: string) => {
if (window.confirm("Are you sure you want to delete this collection?")) {
await deleteCollection.mutateAsync(id);
refetch();
}
};

const handleToggleStatus = async (item: any) => {
await updateCollection.mutateAsync({
collectionId: item._id,
name: item.name,
image: item.image || "",
isActive: !item.isActive,
});
refetch();
};

const handleSearchChange = (value: string) => {
setFilters((prev) => ({ ...prev, search: value }));
setPagination((prev) => ({ ...prev, page: 1 }));
};

const handlePageChange = (page: number) => {
setPagination((prev) => ({ ...prev, page }));
};

const handleLimitChange = (limit: number) => {
setPagination({ page: 1, limit, total });
};

if (showForm) {
return (
<CollectionFormPage
initialValues={editData}
onCancel={() => {
setShowForm(false);
setEditData(null);
}}
onSubmit={handleSubmit}
/>
);
}

return ( <div className="user-page">
<CommonPageHeader
title={PAGE_TITLE.COLLECTION.TITLE}
subtitle={PAGE_TITLE.COLLECTION.SUB_TITLE}
buttonText={PAGE_TITLE.COLLECTION.BUTTON_TEXT}
buttonIcon={<Plus size={18} />}
onButtonClick={() => {
setEditData(null);
setShowForm(true);
}}
/>

```
  <CommonSearchFilterBar
    onStatusChange={(val) => {
      setStatusToggle(val);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }}
    total={total}
    label="collections"
    search={filters.search}
    onSearchChange={handleSearchChange}
    onSearchSubmit={refetch}
    status={statusToggle}
  />

  <CollectionTable
    data={filteredCollections}
    loading={isLoading}
    page={pagination.page}
    limit={pagination.limit}
    onEdit={(item: any) => {
      setEditData(item);
      setShowForm(true);
    }}
    onDelete={handleDelete}
    onToggleStatus={handleToggleStatus}
  />

  <CommonPagination
    page={pagination.page}
    limit={pagination.limit}
    total={total}
    currentCount={filteredCollections.length}
    label="collections"
    onPageChange={handlePageChange}
    onLimitChange={handleLimitChange}
  />
</div>

);
};

export default Collection;
