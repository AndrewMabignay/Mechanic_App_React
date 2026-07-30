import { Briefcase, Mail, MapPin, Pencil, Phone, Wrench } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useReverseGeocode } from "../../features/maps/hooks/useReverseGeocode";
import { useMechanicProfile } from "../../features/mechanic/hooks/useMechanicProfile";
import { useState } from "react";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import MechanicProfileForm from "../../features/mechanic/components/MechanicProfileForm";
import { capitalize } from "../../utils/format";

export default function MechanicProfile() {
    const [showMechanicProfileForm, setShowMechanicProfileForm] = useState(false);
    
    const { data: mechanicProfile } = useMechanicProfile();

    const {
        data: locationName
    } = useReverseGeocode(
        mechanicProfile?.data.latitude,
        mechanicProfile?.data.longitude
    );

    return (
        <div className="container mx-auto max-w-6xl space-y-6 py-6">
            {/* Profile Header */}
            <Card>
                <CardContent className="flex flex-col items-center justify-between gap-6 p-6 md:flex-row">
                    <div className="flex items-center gap-5">
                        <div>
                            <h1 className="text-3xl font-bold">
                                {mechanicProfile?.data.user.first_name}{" "}
                                {mechanicProfile?.data.user.last_name}
                            </h1>

                            <p className="text-muted-foreground">
                                {capitalize(mechanicProfile?.data.user.role)}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                                <Badge>
                                    ⭐ {mechanicProfile?.data.rating}
                                </Badge>

                                <Badge>
                                    🔧 {mechanicProfile?.data.total_jobs} Jobs
                                </Badge>

                                <Badge
                                    variant={
                                        mechanicProfile?.data.is_available
                                            ? "default"
                                            : "secondary"
                                    }
                                >
                                    {mechanicProfile?.data.is_available
                                        ? "Available"
                                        : "Unavailable"}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <Button onClick={() => setShowMechanicProfileForm(true)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Mechanic Information</CardTitle>
                </CardHeader>

                <CardContent className="grid gap-6 md:grid-cols-2">

                    <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Email
                            </p>

                        <p>{mechanicProfile?.data.user.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Phone
                            </p>

                            <p>{mechanicProfile?.data.user.phone}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Briefcase className="h-5 w-5 text-muted-foreground" />

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Years of Experience
                            </p>

                            <p>{mechanicProfile?.data.years_experience} years</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Default Location
                            </p>

                            <p>{locationName}</p>
                        </div>
                    </div>

                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Skill Description</CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="text-muted-foreground">
                        {mechanicProfile?.data.skill_description}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Specializations</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-wrap gap-2">
                    {mechanicProfile?.data.specializations.map((item: string) => (
                        <Badge key={item} variant="secondary">
                            <Wrench className="mr-1 h-3 w-3" />
                            {item}
                        </Badge>
                    ))}
                </CardContent>
            </Card>

            <Dialog
                open={showMechanicProfileForm}
                onOpenChange={setShowMechanicProfileForm}
            >
                <DialogContent
                    className="
                        w-[95vw]
                        max-h-[90vh]
                        overflow-y-auto
                    "
                >
                    <MechanicProfileForm
                        onSuccess={() => setShowMechanicProfileForm(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}