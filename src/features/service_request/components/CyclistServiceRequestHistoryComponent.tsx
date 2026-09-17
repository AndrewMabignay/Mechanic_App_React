import { useState } from "react";

import { useCyclistServiceRequestHistory } from "../hooks/useServiceRequest";

import { createColumnHelper, type CellContext } from "@tanstack/react-table";

import type { ServiceRequest } from "../types/serviceRequest";

import {
    DataTable,
    indexColumn,
    rowActionsColumn,
    selectionColumn,
} from "@/components/micto/data-table";

import { Eye, Star } from "lucide-react";

const col = createColumnHelper<ServiceRequest>();

const formatDateTime = (date: string) => {
    return new Date(date.replace(" ", "T")).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

const getColumns = () => [
    selectionColumn<ServiceRequest>(),
    indexColumn<ServiceRequest>(),

    col.accessor("mechanic", {
        header: "Mechanic",
        cell: (info) => {
            const user = info.row.original.mechanic?.user;

            if (!user) {
                return (
                    <span className="text-sm text-muted-foreground">
                        Not assigned
                    </span>
                );
            }

            const fullName = [user.first_name, user.middle_name, user.last_name]
                .filter(Boolean)
                .join(" ");

            return (
                <span className="font-medium text-foreground">{fullName}</span>
            );
        },
    }),

    col.accessor("description", {
        header: "Description",
        cell: (info: CellContext<ServiceRequest, string>) => (
            <span className="block max-w-[280px] truncate text-sm text-foreground">
                {info.row.original.description || "No description"}
            </span>
        ),
    }),

    col.accessor("status", {
        header: "Status",
        cell: (info: CellContext<ServiceRequest, string>) => {
            const status = info.row.original.status;

            const statusLabel = status
                .replace("_", " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());

            return (
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                        status === "completed"
                            ? "bg-orange-50 text-[#fc4c02]"
                            : status === "cancelled"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-gray-100 text-gray-700"
                    }`}
                >
                    {statusLabel}
                </span>
            );
        },
    }),

    col.accessor("requested_at", {
        header: "Requested At",
        cell: (info: CellContext<ServiceRequest, string>) => (
            <span className="text-sm text-muted-foreground">
                {formatDateTime(info.row.original.requested_at)}
            </span>
        ),
    }),

    col.accessor("rating", {
        header: "Rating",
        cell: (info) => {
            const rating = info.row.original.rating?.rating;

            if (!rating) {
                return (
                    <span className="text-sm text-muted-foreground">
                        Not rated
                    </span>
                );
            }

            return (
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, index) => (
                        <Star
                            key={index}
                            className={`h-4 w-4 ${
                                index < rating
                                    ? "fill-[#fc4c02] text-[#fc4c02]"
                                    : "text-gray-300"
                            }`}
                        />
                    ))}
                </div>
            );
        },
    }),
    rowActionsColumn<ServiceRequest>({
        actions: () => [
            {
                label: "View History",
                icon: Eye,
                onClick: (r: ServiceRequest) => alert(`Viewing ${r.uuid}`),
            },
            // {
            //     label: "Deactivate",
            //     icon: UserX,
            //     onClick: (r: Employee) => alert(`Deactivating ${r.name}`),
            //     separator: true,
            // },
            // {
            //     label: "Delete",
            //     icon: Trash2,
            //     variant: "destructive",
            //     onClick: (r: Employee) => alert(`Deleting ${r.name}`),
            // },
        ],
    }),
];

export default function CyclistServiceRequestHistoryComponent() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [isTrashed, setIsTrashed] = useState(false);

    const { data, isLoading } = useCyclistServiceRequestHistory({
        page,
        per_page: pageSize,
    });

    const columns = getColumns();

    return (
        <div className="mx-auto w-full px-4 py-4 sm:px-6 lg:px-8">
            <DataTable<ServiceRequest>
                data={data?.data ?? []}
                columns={columns}
                tableId="service-request-history"
                isLoading={isLoading}
                enableSearch
                searchPlaceholder="Search service requests..."
                enableRowSelection
                enableColumnVisibility
                enableSorting
                enableTrashed
                trashed={isTrashed}
                onTrashedChange={setIsTrashed}
                pagination="server"
                currentPage={data?.current_page ?? 1}
                totalPages={data?.last_page ?? 1}
                totalCount={data?.total ?? 0}
                pageSize={pageSize}
                pageSizeOptions={[5, 10, 25]}
                onPageChange={setPage}
                onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPage(1);
                }}
                density="default"
                onRowClick={(serviceRequest: ServiceRequest) =>
                    console.log("Row clicked:", serviceRequest)
                }
            />
        </div>
    );
}
