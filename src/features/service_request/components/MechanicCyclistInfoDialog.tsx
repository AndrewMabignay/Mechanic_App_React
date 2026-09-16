import { Bike, MapPin, Phone, Wrench } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";

import { Button } from "../../../components/ui/button";

import type { ServiceRequest } from "../types/serviceRequest";

import { getImageUrl } from "../../../lib/imageUrl";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../components/ui/avatar";

import MapComponent from "../../../components/Map";

interface MechanicCyclistInfoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    request?: ServiceRequest;

    mechanicLatitude?: number;
    mechanicLongitude?: number;
}

export default function MechanicCyclistInfoDialog({
    open,
    onOpenChange,
    request,
    mechanicLatitude,
    mechanicLongitude,
}: MechanicCyclistInfoDialogProps) {
    if (!request) {
        return null;
    }

    const cyclist = request.cyclist?.user;

    const cyclistName =
        `${cyclist?.first_name ?? ""} ${cyclist?.last_name ?? ""}`.trim() ||
        "Unknown Cyclist";

    const cyclistInitials =
        `${cyclist?.first_name?.charAt(0) ?? ""}${
            cyclist?.last_name?.charAt(0) ?? ""
        }` || "C";

    const hasMechanicLocation =
        mechanicLatitude !== undefined && mechanicLongitude !== undefined;

    const hasCyclistLocation =
        request.location_lat !== undefined &&
        request.location_lng !== undefined;

    const showMap = hasMechanicLocation && hasCyclistLocation;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="
                    flex
                    max-h-[90vh]
                    w-[calc(100%-2rem)]
                    max-w-md
                    flex-col
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-0
                    shadow-sm
                    sm:max-w-md
                "
            >
                {/* Header */}
                <div className="shrink-0 px-6 pt-7 sm:px-8 sm:pt-8">
                    <DialogHeader>
                        <DialogTitle
                            className="
                                text-lg
                                font-semibold
                                tracking-tight
                                text-gray-900
                            "
                        >
                            Cyclist Information
                        </DialogTitle>

                        <DialogDescription className="text-sm text-gray-500">
                            Review the cyclist's information and service request
                            details.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {/* Scrollable Content */}
                <div
                    className="
                        min-h-0
                        flex-1
                        overflow-y-auto
                        overflow-x-hidden
                        px-6
                        pb-7
                        pt-5
                        sm:px-8
                        sm:pb-8

                        [scrollbar-width:thin]
                        [scrollbar-color:#fc4c02_transparent]
                        [&::-webkit-scrollbar]:w-1.5
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-[#fc4c02]
                        [&::-webkit-scrollbar-thumb:hover]:bg-[#e64500]
                    "
                >
                    <div className="min-w-0 space-y-4">
                        {/* Cyclist Profile */}
                        <div
                            className="
                                flex
                                min-w-0
                                items-center
                                gap-4
                                rounded-lg
                                border
                                border-gray-200
                                bg-white
                                p-4
                            "
                        >
                            <Avatar className="h-14 w-14 shrink-0 border border-gray-200">
                                <AvatarImage
                                    src={
                                        getImageUrl(cyclist?.profile_picture) ??
                                        ""
                                    }
                                    alt={cyclistName}
                                />

                                <AvatarFallback
                                    className="
                                        bg-[#fc4c02]/10
                                        text-base
                                        font-semibold
                                        text-[#fc4c02]
                                    "
                                >
                                    {cyclistInitials}
                                </AvatarFallback>
                            </Avatar>

                            <div className="min-w-0 flex-1">
                                <p
                                    className="
                                        truncate
                                        text-base
                                        font-semibold
                                        text-gray-900
                                    "
                                >
                                    {cyclistName}
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        text-xs
                                        font-medium
                                        text-[#fc4c02]
                                    "
                                >
                                    Cyclist
                                </p>

                                {cyclist?.email && (
                                    <p className="mt-1 truncate text-xs text-gray-500">
                                        {cyclist.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Contact */}
                        {cyclist?.phone && (
                            <div
                                className="
                                    flex
                                    min-w-0
                                    items-center
                                    gap-3
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-white
                                    p-3
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-md
                                        bg-[#fc4c02]/10
                                    "
                                >
                                    <Phone className="h-4 w-4 text-[#fc4c02]" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-gray-500">
                                        Contact Number
                                    </p>

                                    <p className="mt-0.5 truncate text-sm font-medium text-gray-900">
                                        {cyclist.phone}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Bike Problem */}
                        {request.bike_problem && (
                            <div
                                className="
                                    flex
                                    min-w-0
                                    items-center
                                    gap-3
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-white
                                    p-3
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-md
                                        bg-[#fc4c02]/10
                                    "
                                >
                                    <Wrench className="h-4 w-4 text-[#fc4c02]" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-gray-500">
                                        Bike Problem
                                    </p>

                                    <p className="mt-0.5 truncate text-sm font-medium text-gray-900">
                                        {request.bike_problem.name}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Service Location */}
                        <div
                            className="
                                flex
                                min-w-0
                                items-start
                                gap-3
                                rounded-lg
                                border
                                border-gray-200
                                bg-white
                                p-3
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-md
                                    bg-[#fc4c02]/10
                                "
                            >
                                <MapPin className="h-4 w-4 text-[#fc4c02]" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-gray-500">
                                    Service Location
                                </p>

                                <p className="mt-0.5 text-sm font-medium text-gray-900">
                                    Cyclist's requested service location
                                </p>
                            </div>
                        </div>

                        {/* Service Map */}
                        {showMap && (
                            <div
                                className="
                                    overflow-hidden
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-white
                                "
                            >
                                <div className="border-b border-gray-100 px-3 py-3">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="
                                                flex
                                                h-8
                                                w-8
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-md
                                                bg-[#fc4c02]/10
                                            "
                                        >
                                            <MapPin className="h-4 w-4 text-[#fc4c02]" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                Service Route
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                Mechanic to cyclist
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-64 w-full">
                                    <MapComponent
                                        latitude={mechanicLatitude}
                                        longitude={mechanicLongitude}
                                        mechanicLatitude={mechanicLatitude}
                                        mechanicLongitude={mechanicLongitude}
                                        cyclistLatitude={request.location_lat}
                                        cyclistLongitude={request.location_lng}
                                        showRoute={true}
                                        showMechanicMarker={true}
                                        followMechanic={false}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Bike Photos */}
                        {request.images && request.images.length > 0 && (
                            <div
                                className="
                                    min-w-0
                                    overflow-hidden
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-white
                                    p-3
                                "
                            >
                                <div className="mb-3 flex items-center gap-2">
                                    <div
                                        className="
                                            flex
                                            h-8
                                            w-8
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-md
                                            bg-[#fc4c02]/10
                                        "
                                    >
                                        <Bike className="h-4 w-4 text-[#fc4c02]" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-900">
                                            Bike Photos
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {request.images.length}{" "}
                                            {request.images.length === 1
                                                ? "photo"
                                                : "photos"}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="
                                        flex
                                        min-w-0
                                        max-w-full
                                        gap-2
                                        overflow-x-auto
                                        overflow-y-hidden
                                        pb-1

                                        [scrollbar-width:thin]
                                        [scrollbar-color:#fc4c02_transparent]
                                        [&::-webkit-scrollbar]:h-1
                                        [&::-webkit-scrollbar-track]:bg-transparent
                                        [&::-webkit-scrollbar-thumb]:rounded-full
                                        [&::-webkit-scrollbar-thumb]:bg-[#fc4c02]
                                    "
                                >
                                    {request.images.map((image, index) => (
                                        <img
                                            key={image.id ?? index}
                                            src={getImageUrl(image.image_path)}
                                            alt={`Bike photo ${index + 1}`}
                                            className="
                                                h-24
                                                w-24
                                                shrink-0
                                                rounded-lg
                                                border
                                                border-gray-200
                                                object-cover
                                            "
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Additional Details */}
                        {request.description && (
                            <div
                                className="
                                    min-w-0
                                    overflow-hidden
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-gray-50
                                    p-3
                                "
                            >
                                <div className="mb-2 flex items-center gap-2">
                                    <div
                                        className="
                                            flex
                                            h-8
                                            w-8
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-md
                                            bg-[#fc4c02]/10
                                        "
                                    >
                                        <Wrench className="h-4 w-4 text-[#fc4c02]" />
                                    </div>

                                    <p className="text-sm font-medium text-gray-900">
                                        Additional Details
                                    </p>
                                </div>

                                <p
                                    className="
                                        break-words
                                        text-sm
                                        leading-relaxed
                                        text-gray-600
                                    "
                                >
                                    {request.description}
                                </p>
                            </div>
                        )}

                        {/* Close */}
                        <Button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="
                                h-11
                                w-full
                                rounded-md
                                border
                                border-[#fc4c02]
                                bg-white
                                px-4
                                text-sm
                                font-medium
                                text-[#fc4c02]
                                shadow-none
                                transition-colors
                                hover:bg-[#fc4c02]/5
                                hover:text-[#fc4c02]
                            "
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
