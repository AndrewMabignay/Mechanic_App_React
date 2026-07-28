import {
    Mail,
    Phone,
    MapPin,
    ShieldAlert,
    Bike,
    Pencil,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import CyclistProfileForm from "../../features/cyclist/components/CyclistProfileForm";
import { useState } from "react";
import { useCyclistProfile } from "../../features/cyclist/hooks/useCyclistProfile";
import { useReverseGeocode } from "../../features/maps/hooks/useReverseGeocode";
import { capitalize } from "../../utils/format";

export default function CyclistProfile() {
    const [showCyclistProfileForm, setShowCyclistProfileForm] = useState(false);

    const { data: cyclistProfile } = useCyclistProfile();

    const {
        data: locationName
    } = useReverseGeocode(
        cyclistProfile?.default_location_lat,
        cyclistProfile?.default_location_lng
    );

    return (
        <div className="container mx-auto max-w-6xl space-y-6 py-6">
            {/* Profile Header */}
            <Card>
                <CardContent className="flex flex-col items-center justify-between gap-6 p-6 md:flex-row">
                    <div className="flex items-center gap-5">
                        {/* <Avatar className="h-28 w-28">
                            <AvatarImage src="/avatar.png" />
                            <AvatarFallback>JM</AvatarFallback>
                        </Avatar> */}

                        <div>
                            <h1 className="text-3xl font-bold">
                                {cyclistProfile?.user.first_name} {cyclistProfile?.user.last_name}
                            </h1>

                            <p className="text-muted-foreground">
                                {capitalize(cyclistProfile?.user.role ?? "")}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                                <Badge>🚴 2 Bicycles</Badge>
                                <Badge>⭐ 4.8 Rating</Badge>
                                <Badge>🔧 18 Service Requests</Badge>
                            </div>
                        </div>
                    </div>

                    <Button onClick={() => setShowCyclistProfileForm(true)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>

                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-center gap-3">
                        <Mail className="text-muted-foreground h-5 w-5" />
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Email
                            </p>
                            <p>
                                {cyclistProfile?.user.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Phone className="text-muted-foreground h-5 w-5" />
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Phone
                            </p>
                            <p>{cyclistProfile?.user.phone}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <ShieldAlert className="text-muted-foreground h-5 w-5" />
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Emergency Contact
                            </p>
                            <p>{cyclistProfile?.emergency_contact}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <MapPin className="text-muted-foreground h-5 w-5" />
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Default Location
                            </p>
                            <p>{locationName ?? "Loading location..."}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* My Bicycles */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>My Bicycles</CardTitle>

                    <Button>Add Bicycle</Button>
                </CardHeader>

                <CardContent className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardContent className="flex items-center justify-between p-5">
                            <div className="flex items-center gap-4">
                                <Bike className="h-8 w-8 text-orange-500" />

                                <div>
                                    <h3 className="font-semibold">
                                        Giant Contend AR2
                                    </h3>

                                    <p className="text-muted-foreground text-sm">
                                        Road Bike • Medium • Black • 2023
                                    </p>
                                </div>
                            </div>

                            <Button variant="outline" size="sm">
                                Edit
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center justify-between p-5">
                            <div className="flex items-center gap-4">
                                <Bike className="h-8 w-8 text-orange-500" />

                                <div>
                                    <h3 className="font-semibold">
                                        Trek Marlin 7
                                    </h3>

                                    <p className="text-muted-foreground text-sm">
                                        Mountain Bike • Large • Blue • 2022
                                    </p>
                                </div>
                            </div>

                            <Button variant="outline" size="sm">
                                Edit
                            </Button>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>

            <Dialog
                open={showCyclistProfileForm}
                onOpenChange={setShowCyclistProfileForm}
            >
                <DialogContent
                    className="
                        w-[95vw]
                        max-h-[90vh]
                        overflow-y-auto
                    "
                >   
                    <CyclistProfileForm 
                        onSuccess={() => setShowCyclistProfileForm(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}