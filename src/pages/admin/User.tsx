"use client"

import { createColumnHelper } from "@tanstack/react-table";
import type React from "react";
import { DataTable, indexColumn, rowActionsColumn, selectionColumn } from "../../components/micto/data-table";
import { useDeleteUser, useUsers } from "../../features/user/hooks/useUser";
import { useState } from "react";
import { ToolbarAction } from "../../components/micto/table-toolbar";
import { Download, Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import UserForm from "../../features/user/components/UserForm";

type User = {
    id: string;
    uuid: string;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phone: string;
    role: "admin" | "cyclist" | "mechanic" | "bike_shop_owner" | "cyclist_mechanic";
};

// --- Column Definitions -------------------------------------------------------
const col = createColumnHelper<User>();
const getColumns = (
    setEditingUser: React.Dispatch<React.SetStateAction<User | null>>,
    setShowUserForm: React.Dispatch<React.SetStateAction<boolean>>,
    deleteUser: (data: { user: string }) => void,
) => [
    selectionColumn<User>(),
    indexColumn<User>(),
    col.accessor("firstName", {
        header: "First Name",
        cell: (info: CellContext<User, string>) => (
            <span className="font-medium text-foreground">{info.row.original.first_name}</span>
        ),
    }),
    col.accessor("lastName", {
        header: "Last Name",
        cell: (info: CellContext<User, string>) => (
            <span className="font-medium text-foreground">{info.row.original.last_name}</span>
        ),
    }),
    col.accessor("middleName", {
        header: "Middle Name",
        cell: (info: CellContext<User, string>) => (
            <span className="font-medium text-foreground">{info.row.original.middle_name}</span>
        ),
    }),
    col.accessor("email", {
        header: "Email",
        cell: (info: CellContext<User, string>) => (
            <span className="font-medium text-foreground">{info.row.original.email}</span>
        ),
    }),
    col.accessor("phone", {
        header: "Phone",
        cell: (info: CellContext<User, string>) => (
            <span className="font-medium text-foreground">{info.row.original.phone}</span>
        ),
    }),
    col.accessor("role", {
        header: "Role",
        cell: (info: CellContext<User, string>) => (
            <span className="font-medium text-foreground">{info.row.original.role}</span>
        ),
    }),
    rowActionsColumn<User>({
        actions: () => [
            { 
                label: "View Profile", 
                icon: Eye, 
                onClick: (user: User) => {
                    console.log(user);
                }
            },
            {
                label: "Edit",
                icon: Pencil,
                onClick: (user: User) => {
                    setEditingUser(user);
                    setShowUserForm(true);
                }
            },
            {
                label: "Delete",
                icon: Trash2,
                variant: "destructive",
                onClick: (user: User) => {
                    const confirmed = window.confirm(
                        `Delete ${user.first_name} ${user.last_name}`
                    );

                    if (!confirmed) return;

                    deleteUser({
                        user: user.uuid,
                    });
                } 
            },  
        ],
    }),
];

// --- Main ----------------------------------------------------------------
export default function User() {
    const { data, isLoading, error } = useUsers();
    const [selectedUser, setSelectedUser] = useState<User[]>([]);
    const [isTrashed, setIsTrashed] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [showUserForm, setShowUserForm] = useState(false);
    const { mutate: deleteUserMutation } = useDeleteUser();

    const columns = getColumns(
        setEditingUser,
        setShowUserForm,
        deleteUserMutation,
    );

    return (
        <>
            <div className="w-full mx-auto py-4 space-y-10">

                {/* -- SECTION 1: FULL FEATURED -- */}
                <section className="space-y-3">
                    <DataTable<User> 
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
                        pagination="client"
                        pageSize={5}
                        pageSizeOptions={[5, 10, 25]}
                        density="default"
                        onRowSelectionChange={setSelectedUser}
                        onRowClick={(user: User) => console.log("Row clicked: ", user)}
                        toolbarProps={{
                            actions: (
                                <>
                                    <ToolbarAction icon={Download}>Export</ToolbarAction>
                                    <ToolbarAction 
                                        icon={Plus}
                                        variant="default"
                                        onClick={() => {
                                            setEditingUser(null);
                                            setShowUserForm(true);
                                        }}
                                    >
                                        Add User
                                    </ToolbarAction>
                                </>
                            )
                        }}
                    />
                </section>

                <Dialog
                    open={showUserForm}
                    onOpenChange={setShowUserForm}
                >
                    <DialogContent
                        className="
                            w-[95vw]
                            max-h-[90vh]
                            overflow-y-auto
                        "
                    >   
                        <UserForm 
                            user={editingUser}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}