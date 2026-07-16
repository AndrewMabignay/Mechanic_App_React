"use client"

import { createColumnHelper, type CellContext } from "@tanstack/react-table";
import type { BikeShopService } from "../../../features/bike_shop_service/types/bikeShopService";
import type React from "react";
import { DataTable, indexColumn, rowActionsColumn, selectionColumn } from "../../../components/micto/data-table";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { useBikeShopsService, useDeleteBikeShopServiceByOwner } from "../../../features/bike_shop_service/hooks/useBikeShopService";
import { useState } from "react";
import { ToolbarAction } from "../../../components/micto/table-toolbar";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
// import BikeShopServiceForm from "./BikeShopServiceForm";

const col = createColumnHelper<BikeShopService>();
const getColumns = (
    setEditingBikeShopService: React.Dispatch<React.SetStateAction<BikeShopService | null>>,
    setShowBikeShopService: React.Dispatch<React.SetStateAction<boolean>>,
    deleteBikeShopService: (data: { bikeShopService: string }) => void,
) => [
    selectionColumn<BikeShopService>(),
    indexColumn<BikeShopService>(),
    col.accessor("name", {
        header: "Name",
        cell: (info: CellContext<BikeShopService, string>) => (
            <span className="font-medium text-foreground">{info.row.original.name}</span>
        ),
    }),
    rowActionsColumn<BikeShopService>({
        actions: () => [
            { 
                label: "View Profile", 
                icon: Eye, 
                onClick: (user: BikeShopService) => {
                    console.log(user);
                }
            },
            {
                label: "Edit",
                icon: Pencil,
                onClick: (user: BikeShopService) => {
                    setEditingBikeShopService(user);
                    setShowBikeShopService(true);
                }
            },
            {
                label: "Delete",
                icon: Trash2,
                variant: "destructive",
                onClick: (bikeShopService: BikeShopService) => {
                    deleteBikeShopService({
                        bikeShopService: bikeShopService.uuid,
                    });
                } 
            },  
        ],
    }),
]

export default function BikeShopServiceIndex() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data, isLoading } = useBikeShopsService({
        page,
        per_page: pageSize,
    });
    // const [selectedBikeShopService, setSelectedBikeShopService] = useState<BikeShopService[]>([]);
    const [isTrashed, setIsTrashed] = useState(false);
    const [editingBikeShopService, setEditingBikeShopService] = useState<BikeShopService | null>(null);
    const [showBikeShopServiceForm, setShowBikeShopServiceForm] = useState(false);
    const { mutate: deleteBikeShopServiceMutation } = useDeleteBikeShopServiceByOwner();

    const columns = getColumns(
        setEditingBikeShopService,
        setShowBikeShopServiceForm,
        deleteBikeShopServiceMutation,
    );

    return (
        <>
            <div className="w-full mx-auto py-4 space-y-10">

                {/* -- SECTION 1: FULL FEATURED -- */}
                <section className="space-y-3">
                    <DataTable<BikeShopService> 
                        data={data?.data ?? []}
                        columns={columns}
                        tableId="users"
                        isLoading={isLoading}
                        enableSearch
                        searchPlaceholder="Search..."
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
                        onRowClick={(bikeShopService: BikeShopService) => console.log("Row clicked: ", bikeShopService)}
                        toolbarProps={{
                            actions: (
                                <>
                                    <ToolbarAction 
                                        icon={Plus}
                                        variant="default"
                                        onClick={() => {
                                            setEditingBikeShopService(null);
                                            setShowBikeShopServiceForm(true);
                                        }}
                                    >
                                        Add Service
                                    </ToolbarAction>
                                </>
                            )
                        }}
                    />
                </section>

                <Dialog
                    open={showBikeShopServiceForm}
                    onOpenChange={setShowBikeShopServiceForm}
                >
                    <DialogContent
                        className="
                            w-[95vw]
                            max-h-[90vh]
                            overflow-y-auto
                        "
                    >   
                        {/* <BikeShopServiceForm 
                            bikeShopService={editingBikeShopService}
                        /> */}
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}