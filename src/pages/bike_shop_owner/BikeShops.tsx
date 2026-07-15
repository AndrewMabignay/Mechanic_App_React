"use client"

import { useBikeShopsOwner, useDeleteBikeShopByOwner } from "../../features/bike_shop_owner/hooks/useBikeShopOwner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../components/ui/alert-dialog";
import { Separator } from "../../components/ui/seperator";
import { useState } from "react";

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

export default function BikeShops() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = useBikeShopsOwner(page);

    const deleteBikeShopMutation = useDeleteBikeShopByOwner();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Something went wrong.</p>;
    }

    return (
        <div className="space-y-6">

            <section className="flex flex-col gap-4">
                {/* Toolbar */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Bike Shops</h1>
                        <p className="text-muted-foreground">
                            Manage your bike shops.
                        </p>
                    </div>

                    <Button 
                        onClick={() => navigate('/shop/bike-shops/create')}
                    >
                        Add Bike Shop
                    </Button>
                </div>

                <Separator className="my-4" />

                {/* Cards */}
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {data?.data?.map((shop: BikeShopOwner) => (
                        <Card key={shop.uuid}>
                            <CardHeader>
                                <CardTitle>{shop.name}</CardTitle>

                                <CardDescription>
                                    {shop.address}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-2">
                                <p>{shop.description}</p>

                                <p>{shop.phone}</p>

                                <p>
                                    {shop.opening_time} - {shop.closing_time}
                                </p>

                                <span
                                    className={
                                        shop.is_open
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }
                                >
                                    {shop.is_open ? "Open" : "Closed"}
                                </span>
                            </CardContent>

                            <CardFooter className="justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => navigate(`/shop/bike-shops/${shop.uuid}`)}
                                >
                                    View
                                </Button>

                                <Button 
                                    variant="outline"
                                    onClick={() => navigate(`/shop/bike-shops/${shop.uuid}/edit`)}
                                >
                                    Edit
                                </Button>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive">
                                            Delete
                                        </Button>
                                    </AlertDialogTrigger>

                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Delete Bike Shop?
                                            </AlertDialogTitle>

                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your bike shop.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>

                                        <AlertDialogFooter>
                                            <AlertDialogCancel
                                                variant="outline"
                                                size="default"
                                            >
                                                Cancel
                                            </AlertDialogCancel>

                                            <AlertDialogAction
                                                variant="destructive"
                                                size="default"
                                                onClick={() => deleteBikeShopMutation.mutate(shop.uuid)}
                                            >
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="flex gap-2 mt-6">
                    {(data as Paginated)?.links
                        .filter((link: PaginationLink) => link.page !== null)
                        .map((link: PaginationLink) => (
                            <Button
                                key={link.page}
                                variant={link.active ? "default" : "outline"}
                                onClick={() => setPage(link.page!)}
                            >
                                {link.page}
                            </Button>
                        ))}
                </div>
            </section>
        </div>
    );
}