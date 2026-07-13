"use client"

import { createColumnHelper, type CellContext } from "@tanstack/react-table";
import { indexColumn, selectionColumn } from "../../components/micto/data-table";

type BikeShopOwner = {
    id: string;
    uuid: string;
    name: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    phone: string;
    opening_time: string;
    closing_time: string;
    is_open: boolean;
};

// --- Column Definitions -------------------------------------------------------
const col = createColumnHelper<BikeShopOwner>();
const getColumns = (
    
) => [
    selectionColumn<BikeShopOwner>(),
    indexColumn<BikeShopOwner>(),
    col.accessor("name", {
        header: "Name",
        cell: (info: CellContext<BikeShopOwner, string>) => (
            <span className="font-medium text-foreground">{info.row.original.name}</span>
        ),
    }),
];


export default function BikeShops() {
    return (
        <>
            Bike Shop Owner bike shops
        </>
    );
}