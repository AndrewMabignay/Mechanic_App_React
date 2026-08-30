import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import {
    Mail,
    Phone,
    MapPin,
    Pencil,
    Shield,
    Bike,
    Palette,
    Tag,
} from "lucide-react";
import CyclistProfile from "../features/cyclist/components/CyclistProfile";

export default function Profile() {
    const role = localStorage.getItem("bike_mechanic_role");

    if (role === "cyclist") {
        return <CyclistProfile />;
    }

    if (role === "mechanic") {
        // return <MechanicProfile />;
    }

    return null;

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div>
                <div></div>
            </div>
            <div className="mx-auto max-w-5xl space-y-6">
                {/* Page Header */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        My Profile
                    </h1>

                    <p className="text-sm text-slate-500">
                        Manage your personal information, bike, and account
                        settings.
                    </p>
                </div>

                {/* Profile Header */}
                <Card className="overflow-hidden border-0 shadow-sm">
                    <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-600" />

                    <CardContent className="relative px-6 pb-6">
                        <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div className="flex items-end gap-4">
                                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                                    <AvatarImage src="" alt="Profile" />

                                    <AvatarFallback className="bg-slate-200 text-2xl font-semibold text-slate-700">
                                        JA
                                    </AvatarFallback>
                                </Avatar>

                                <div className="pb-1">
                                    <h2 className="text-xl font-semibold text-slate-900">
                                        John Andrew
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Cyclist
                                    </p>
                                </div>
                            </div>

                            <Button variant="outline">
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Personal Information */}
                        <Card className="border-0 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Personal Information
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>First Name</Label>

                                        <Input value="John" readOnly />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Last Name</Label>

                                        <Input value="Andrew" readOnly />
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-slate-400" />
                                            Email
                                        </Label>

                                        <Input
                                            value="john@example.com"
                                            readOnly
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-slate-400" />
                                            Phone Number
                                        </Label>

                                        <Input value="09123456789" readOnly />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-slate-400" />
                                        Address
                                    </Label>

                                    <Input value="Binangonan, Rizal" readOnly />
                                </div>

                                <Separator />

                                <div className="flex justify-end">
                                    <Button>Save Changes</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* My Bike */}
                        <Card className="border-0 shadow-sm">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <Bike className="h-5 w-5 text-slate-600" />
                                            My Bike
                                        </CardTitle>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Information about your bicycle.
                                        </p>
                                    </div>

                                    <Button variant="outline" size="sm">
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit Bike
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <Bike className="h-4 w-4 text-slate-400" />
                                            Bike Type
                                        </Label>

                                        <Input value="Road Bike" readOnly />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <Tag className="h-4 w-4 text-slate-400" />
                                            Brand
                                        </Label>

                                        <Input value="Giant" readOnly />
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Model</Label>

                                        <Input value="Contend AR" readOnly />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <Palette className="h-4 w-4 text-slate-400" />
                                            Color
                                        </Label>

                                        <Input value="Black" readOnly />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Account */}
                        <Card className="border-0 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Account
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">
                                        Role
                                    </span>

                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                        Cyclist
                                    </span>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">
                                        Status
                                    </span>

                                    <span className="flex items-center gap-2 text-sm font-medium text-green-600">
                                        <span className="h-2 w-2 rounded-full bg-green-500" />
                                        Active
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Security */}
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-5">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-slate-100 p-2">
                                        <Shield className="h-5 w-5 text-slate-600" />
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-slate-900">
                                            Account Security
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Keep your account secure by updating
                                            your password regularly.
                                        </p>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-4"
                                        >
                                            Change Password
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            {/* <CyclistProfile /> */}

            {/* <CyclistBicycle /> */}
        </div>
    );
}
