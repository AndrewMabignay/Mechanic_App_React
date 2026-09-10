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
        `${mechanic?.user.first_name ?? ""} ${
            mechanic?.user.last_name ?? ""
        }`.trim() || "Mechanic";

    const specializations = mechanic?.specializations ?? [];

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
                            Mechanic is on the way
                        </DialogTitle>
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
                        pt-4
                        sm:px-8
                        sm:pb-8

                        [scrollbar-width:thin]
                        [scrollbar-color:#fc4c02_transparent]
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-[#fc4c02]
                        [&::-webkit-scrollbar-thumb:hover]:bg-[#e64500]
                    "
                >
                    <div className="min-w-0 space-y-5">
                        {/* Status */}
                        <div
                            className="
                                flex
                                min-w-0
                                items-center
                                gap-3
                                rounded-lg
                                border
                                border-[#fc4c02]/20
                                bg-[#fc4c02]/5
                                p-4
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#fc4c02]/10
                                "
                            >
                                <MapPin className="h-5 w-5 text-[#fc4c02]" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-[#fc4c02]">
                                    En Route
                                </p>

                                <p className="mt-0.5 break-words text-sm text-gray-500">
                                    Your mechanic is heading to your location.
                                </p>
                            </div>
                        </div>

                        {/* Mechanic Details */}
                        <div className="min-w-0">
                            <p className="mb-3 text-sm font-medium text-gray-700">
                                Mechanic Details
                            </p>

                            <div className="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white">
                                {/* Basic Information */}
                                <div className="flex min-w-0 items-center gap-4 p-4">
                                    <div
                                        className="
                                            flex
                                            h-14
                                            w-14
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-[#fc4c02]/10
                                        "
                                    >
                                        <Wrench className="h-6 w-6 text-[#fc4c02]" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p
                                            className="
                                                truncate
                                                text-base
                                                font-semibold
                                                text-gray-900
                                            "
                                        >
                                            {mechanicName}
                                        </p>

                                        <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
                                            <div className="flex shrink-0 items-center gap-1">
                                                <Star
                                                    className="
                                                        h-4
                                                        w-4
                                                        fill-[#fc4c02]
                                                        text-[#fc4c02]
                                                    "
                                                />

                                                <span className="text-sm text-gray-600">
                                                    {mechanic?.rating?.toFixed(
                                                        1,
                                                    ) ?? "0.0"}
                                                </span>
                                            </div>

                                            <span className="text-xs text-gray-300">
                                                •
                                            </span>

                                            <span className="text-sm text-gray-500">
                                                {mechanic?.total_jobs ?? 0}{" "}
                                                {mechanic?.total_jobs === 1
                                                    ? "job"
                                                    : "jobs"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Experience */}
                                <div className="border-t border-gray-100 px-4 py-3">
                                    <p className="text-xs font-medium text-gray-500">
                                        Experience
                                    </p>

                                    <p className="mt-1 break-words text-sm font-medium text-gray-800">
                                        {mechanic?.years_experience ?? 0}{" "}
                                        {mechanic?.years_experience === 1
                                            ? "year"
                                            : "years"}{" "}
                                        of experience
                                    </p>
                                </div>

                                {/* Specializations */}
                                {specializations.length > 0 && (
                                    <div className="min-w-0 border-t border-gray-100 px-4 py-3">
                                        <p className="text-xs font-medium text-gray-500">
                                            Specializations
                                        </p>

                                        <div className="mt-2 flex min-w-0 flex-wrap gap-2">
                                            {specializations.map(
                                                (specialization) => (
                                                    <span
                                                        key={specialization}
                                                        className="
                                                            max-w-full
                                                            break-words
                                                            rounded-md
                                                            border
                                                            border-[#fc4c02]/20
                                                            bg-[#fc4c02]/5
                                                            px-2.5
                                                            py-1
                                                            text-xs
                                                            font-medium
                                                            text-[#fc4c02]
                                                        "
                                                    >
                                                        {specialization}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* About */}
                        {mechanic?.skill_description && (
                            <div className="min-w-0">
                                <p className="mb-2 text-sm font-medium text-gray-700">
                                    About
                                </p>

                                <div
                                    className="
                                        min-w-0
                                        overflow-hidden
                                        rounded-lg
                                        border
                                        border-gray-200
                                        bg-gray-50
                                        px-4
                                        py-3
                                    "
                                >
                                    <p
                                        className="
                                            break-words
                                            text-sm
                                            leading-relaxed
                                            text-gray-600
                                        "
                                    >
                                        {mechanic.skill_description}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Contact */}
                        {mechanic?.user.phone && (
                            <div className="min-w-0">
                                <p className="mb-2 text-sm font-medium text-gray-700">
                                    Contact
                                </p>

                                <div
                                    className="
                                        flex
                                        min-w-0
                                        items-center
                                        gap-3
                                        overflow-hidden
                                        rounded-lg
                                        border
                                        border-gray-200
                                        p-4
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-gray-100
                                        "
                                    >
                                        <Phone className="h-5 w-5 text-gray-600" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-gray-500">
                                            Contact Number
                                        </p>

                                        <p className="truncate text-sm font-medium text-gray-800">
                                            {mechanic.user.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Chat */}
                        <button
                            type="button"
                            onClick={onChatClick}
                            className="
                                flex
                                h-11
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-md
                                bg-[#fc4c02]
                                px-4
                                font-medium
                                text-white
                                shadow-sm
                                transition-colors
                                hover:bg-[#e64500]
                            "
                        >
                            <MessageCircle className="h-5 w-5" />
                            Chat with Mechanic
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
