import { Bike, MapPin, Phone, Wrench } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "../../../components/ui/dialog";

import { Button } from "../../../components/ui/button";
import type { IncomingRequest } from "../types/incomingRequest";
import { getImageUrl } from "../../../lib/imageUrl";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../components/ui/avatar";

interface MechanicCyclistInfoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    request?: IncomingRequest;
}

export default function MechanicCyclistInfoDialog({
    open,
    onOpenChange,
    request,
}: MechanicCyclistInfoDialogProps) {
    if (!request) {
        return null;
    }

    const cyclist = request.service_request?.cyclist?.user;

    const cyclistName =
        `${cyclist?.first_name ?? ""} ${cyclist?.last_name ?? ""}`.trim() ||
        "Unknown Cyclist";

    const cyclistInitials = `${cyclist?.first_name?.charAt(0) ?? ""}${
        cyclist?.last_name?.charAt(0) ?? ""
    }`;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[400px] p-4">
                <DialogHeader className="p-2">
                    <h2 className="text-base font-semibold text-slate-900">
                        Cyclist Information
                    </h2>
                    <DialogDescription className="text text-slate-500">
                        Review the cyclist's information and service request
                        details.
                    </DialogDescription>
                </DialogHeader>

                <div className="box-border flex w-full min-w-0 max-w-full flex-col gap-4 p-1">
                    {/* Cyclist Profile */}
                    <div className="box-border flex w-full min-w-0 max-w-full items-center gap-4 rounded-xl border p-3">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange-50">
                            <Avatar className="h-18 w-18 shrink-0 border dark:border-[#1E1E1E] sm:h-18 sm:w-18">
                                <AvatarImage
                                    src={
                                        getImageUrl(cyclist.profile_picture) ??
                                        ""
                                    }
                                    alt={cyclistName}
                                />

                                <AvatarFallback className="bg-[#F8FAFC] text-lg font-semibold text-[#374151] dark:bg-[#252525] dark:text-[#F9FAFB] sm:text-2xl">
                                    {cyclistInitials}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="min-w-0 flex-1 overflow-hidden">
                            <p className="truncate text-base font-semibold text-slate-900">
                                {cyclistName}
                            </p>

                            {cyclist?.email && (
                                <p className="truncate text-sm text-slate-500">
                                    {cyclist.email}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Contact */}
                    {cyclist?.phone && (
                        <div className="box-border flex w-full min-w-0 max-w-full items-center gap-3 rounded-lg border p-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                                <Phone className="h-5 w-5 text-orange-500" />
                            </div>

                            <div className="min-w-0 flex-1 overflow-hidden">
                                <p className="text-sm font-medium text-slate-900">
                                    Contact Number
                                </p>

                                <p className="truncate text-xs text-slate-500">
                                    {cyclist.phone}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Bike Problem */}
                    {request.service_request?.bike_problem && (
                        <div className="box-border flex w-full min-w-0 max-w-full items-center gap-3 rounded-lg border p-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                                <Wrench className="h-5 w-5 text-orange-500" />
                            </div>

                            <div className="min-w-0 flex-1 overflow-hidden">
                                <p className="text-sm font-medium text-slate-900">
                                    Bike Problem
                                </p>

                                <p className="truncate text-xs text-slate-500">
                                    {request.service_request.bike_problem.name}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Location */}
                    <div className="box-border flex w-full min-w-0 max-w-full items-center gap-3 rounded-lg border p-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                            <MapPin className="h-5 w-5 text-orange-500" />
                        </div>

                        <div className="min-w-0 flex-1 overflow-hidden">
                            <p className="text-sm font-medium text-slate-900">
                                Service Location
                            </p>

                            <p className="truncate text-xs text-slate-500">
                                Cyclist's requested service location
                            </p>
                        </div>
                    </div>

                    {/* Images */}
                    {request.service_request?.images &&
                        request.service_request.images.length > 0 && (
                            <div className="box-border w-full min-w-0 max-w-full rounded-lg border p-3">
                                <div className="mb-2 flex items-center gap-2">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                                        <Bike className="h-4 w-4 text-orange-500" />
                                    </div>

                                    <p className="text-sm font-medium text-slate-900">
                                        Bike Photos
                                    </p>
                                </div>

                                <div className="flex w-full min-w-0 gap-2 overflow-x-auto pb-1">
                                    {request.service_request.images.map(
                                        (image, index) => (
                                            <img
                                                key={image.id ?? index}
                                                src={getImageUrl(
                                                    image.image_path,
                                                )}
                                                alt={`Bike photo ${index + 1}`}
                                                className="h-24 w-24 shrink-0 rounded-lg border object-cover"
                                            />
                                        ),
                                    )}
                                </div>
                            </div>
                        )}

                    {/* Description */}
                    {request.service_request?.description && (
                        <div className="box-border w-full min-w-0 max-w-full rounded-lg border p-3">
                            <div className="mb-2 flex items-center gap-2">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                                    <Bike className="h-4 w-4 text-orange-500" />
                                </div>

                                <p className="text-sm font-medium text-slate-900">
                                    Additional Details
                                </p>
                            </div>

                            <p className="break-words text-sm text-slate-500">
                                {request.service_request.description}
                            </p>
                        </div>
                    )}

                    {/* Close */}
                    <Button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className="flex-1 rounded-lg border border-orange-500 bg-white px-4 py-3 text-sm font-medium text-orange-500 transition hover:bg-orange-50"
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
