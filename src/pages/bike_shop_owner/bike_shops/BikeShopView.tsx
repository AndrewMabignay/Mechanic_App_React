import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { MapPin, Phone, Clock, Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useBikeShopOwner } from "../../../features/bike_shop_owner/hooks/useBikeShopOwner";
import LocationPicker from "../../../components/maps/LocationPicker";
import { formatTime } from "../../../lib/formatTime";

export default function BikeShopView() {
    const navigate = useNavigate();
    const { uuid } = useParams();
    const { data, isLoading, error } = useBikeShopOwner(uuid!);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Something went wrong.</p>;
    }

    const shop = data.data;

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        <h1>{shop.name}</h1>
                    </h1>

                    <p className="text-muted-foreground">
                        View and manage your bike shop information.
                    </p>
                </div>

                <Button
                    variant="outline"
                    onClick={() => navigate(`/shop/bike-shops/${shop.uuid}/edit`)}
                >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </Button>
            </div>

            {/* Shop Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Shop Information</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Shop Name
                            </p>

                            <p className="font-medium">
                                {shop.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Status
                            </p>

                            <Badge>{shop.is_open ? "Open" : "Closed"}</Badge>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                Phone
                            </p>

                            <p>{shop.phone}</p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Business Hours
                            </p>

                            <p>
                                {formatTime(shop.opening_time)} - {formatTime(shop.closing_time)}
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <p className="text-sm text-muted-foreground">
                                Description
                            </p>

                            <p>
                                {shop.description}
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Address
                            </p>

                            <p>
                                {shop.address}
                            </p>
                        </div>

                    </div>
                </CardContent>
            </Card>

            {/* Location */}
            <Card>
                <CardHeader>
                    <CardTitle>Location</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="rounded-lg border flex items-center justify-center">
                        <LocationPicker
                            latitude={shop.latitude}
                            longitude={shop.longitude}
                            readonly
                        />
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}