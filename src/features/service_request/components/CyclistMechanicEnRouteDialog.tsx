import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";
import { MapPin, MessageCircle, Phone, Star, Wrench } from "lucide-react";
import type { MechanicProfile } from "../../mechanic/types/mechanicProfile";

interface CyclistMechanicEnRouteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mechanic?: MechanicProfile;
    onChatClick?: () => void;
}

export default function CyclistMechanicEnRouteDialog({
    open,
    onOpenChange,
    mechanic,
    onChatClick,
}: CyclistMechanicEnRouteDialogProps) {
    const mechanicName =
        `${mechanic?.user.first_name ?? ""} ${mechanic?.user.last_name ?? ""}`.trim() ||
        "Mechanic";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Mechanic is on the way
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                    {/* Status */}
                    <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
                            <MapPin className="h-5 w-5 text-green-600" />
                        </div>

                        <div>
                            <p className="font-semibold text-green-700">
                                En Route
                            </p>
                            <p className="text-sm text-green-600">
                                Your mechanic is heading to your location.
                            </p>
                        </div>
                    </div>

                    {/* Mechanic */}
                    <div>
                        <p className="mb-3 text-sm font-medium text-slate-500">
                            Mechanic Details
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100">
                                <Wrench className="h-6 w-6 text-blue-600" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-lg font-semibold text-slate-900">
                                    {mechanicName}
                                </p>

                                {mechanic?.rating !== undefined && (
                                    <div className="mt-1 flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm text-slate-600">
                                            {mechanic.rating.toFixed(1)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    {mechanic?.user.phone && (
                        <div className="flex items-center gap-3 rounded-xl border p-4">
                            <Phone className="h-5 w-5 text-slate-500" />

                            <div>
                                <p className="text-xs text-slate-400">
                                    Contact Number
                                </p>
                                <p className="font-medium text-slate-800">
                                    {mechanic.user.phone}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <button
                    type="button"
                    onClick={onChatClick}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                    <MessageCircle className="h-5 w-5" />
                    Chat with Mechanic
                </button>
            </DialogContent>
        </Dialog>
    );
}
