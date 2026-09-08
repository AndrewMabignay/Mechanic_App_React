import { Badge, Bike, Star, Wrench } from "lucide-react";
import { Switch } from "../../../components/ui/switch";
import { useUpdateMechanicAvailability } from "../hooks/useMechanicProfile";
import type { MechanicProfile } from "../types/mechanicProfile";

interface Props {
    profile: MechanicProfile;
}

export default function MechanicProfileContainer({ profile }: Props) {
    const updateAvailabilityMutation = useUpdateMechanicAvailability();

    const handleAvailabilityChange = () => {
        if (!profile?.uuid) return;

        updateAvailabilityMutation.mutate(profile.uuid);
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fc4c02]">
                    <Bike className="h-5 w-5 text-white" />
                </div>

                <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-semibold text-gray-900">
                        {profile?.user?.first_name} {profile?.user?.last_name}
                    </h2>

                    <p className="text-xs text-gray-500">Mechanic</p>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2">
                    <span
                        className={`hidden text-xs font-medium sm:block ${
                            profile?.is_available
                                ? "text-green-600"
                                : "text-gray-400"
                        }`}
                    >
                        {profile?.is_available ? "Available" : "Unavailable"}
                    </span>

                    <Switch
                        checked={profile?.is_available}
                        onCheckedChange={handleAvailabilityChange}
                        disabled={updateAvailabilityMutation.isPending}
                    />
                </div>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-100" />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
                {/* Experience */}
                <div className="rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-1.5">
                        <Wrench className="h-3.5 w-3.5 text-[#fc4c02]" />

                        <span className="text-[11px] text-gray-500">
                            Experience
                        </span>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                        {profile?.years_experience ?? 0}{" "}
                        {profile?.years_experience === 1 ? "year" : "years"}
                    </p>
                </div>

                {/* Rating */}
                <div className="rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 text-[#fc4c02]" />

                        <span className="text-[11px] text-gray-500">
                            Rating
                        </span>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                        {profile?.rating ?? 0}
                    </p>
                </div>

                {/* Jobs */}
                <div className="rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-1.5">
                        <Badge className="h-3.5 w-3.5 text-[#fc4c02]" />

                        <span className="text-[11px] text-gray-500">Jobs</span>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                        {profile?.total_jobs ?? 0}
                    </p>
                </div>
            </div>

            {/* Specializations */}
            {profile?.specializations?.length > 0 && (
                <div className="mt-4">
                    <p className="mb-2 text-xs font-medium text-gray-600">
                        Specializations
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                        {profile?.specializations.map(
                            (specialization: string) => (
                                <span
                                    key={specialization}
                                    className="
                                        rounded-full
                                        bg-[#fc4c02]/10
                                        px-2.5
                                        py-1
                                        text-[11px]
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
    );
}
