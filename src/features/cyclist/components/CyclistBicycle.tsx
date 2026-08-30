import { createColumnHelper, type CellContext } from "@tanstack/react-table";
import type { Bicycle } from "../types/bicycle";
import { DataTable, indexColumn, selectionColumn } from "../../../components/micto/data-table";
import { useState } from "react";
import { useCyclistBicyclesOwner } from "../hooks/useCyclistProfile";
import { ToolbarAction } from "../../../components/micto/table-toolbar";
import { Plus } from "lucide-react";

const col = createColumnHelper<Bicycle>();
const getColumns = (
    
) => [
    selectionColumn<Bicycle>(),
    indexColumn<Bicycle>(),
    col.accessor("brand", {
        header: "Brand",
        cell: (info: CellContext<Bicycle, string>) => (
            <span className="font-medium text-foreground">{info.row.original.brand}</span>
        ),
    }),
]

export default function CyclistBicycle() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data, isLoading } = useCyclistBicyclesOwner({
        page,
        per_page: pageSize,
    });
    const [isTrashed, setIsTrashed] = useState(false);

    const columns = getColumns(
        
    );

    return (
        <>
            <div className="w-full mx-auto py-4 space-y-10">

                {/* -- SECTION 1: FULL FEATURED -- */}
                <section className="space-y-3">
                    <DataTable<Bicycle> 
                        data={data?.data ?? []}
                        columns={columns}
                        tableId="bicycles"
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
                        onRowClick={(bicyle: Bicycle) => console.log("Row clicked: ", bicyle)}
                        toolbarProps={{
                            actions: (
                                <>
                                    <ToolbarAction 
                                        icon={Plus}
                                        variant="default"
                                        onClick={() => {
                                            
                                        }}
                                    >
                                        Add Bicyle
                                    </ToolbarAction>
                                </>
                            )
                        }}
                    />
                </section>
            </div>
        </>
    );
}