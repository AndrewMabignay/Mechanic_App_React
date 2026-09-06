import { useEffect, useState } from "react";
import { MapPin, Star } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../components/ui/avatar";

import MapComponent from "../../../components/Map";
import EditPersonalInformationDialog from "../../user/components/EditPersonalInformationDialog";
// import EditMechanicProfileDialog from "./EditMechanicProfileDialog";
import { useMechanicProfile } from "../hooks/useMechanicProfile";
import { getImageUrl } from "../../../lib/imageUrl";

export default function MechanicProfile() {
    const { data, isLoading, error } = useMechanicProfile();

    const [locationAddress, setLocationAddress] =
        useState("Loading address...");

    const latitude = Number(data?.data?.latitude);
    const longitude = Number(data?.data?.longitude);

    useEffect(() => {
        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            return;
        }

        const fetchAddress = async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
                );

                if (!response.ok) {
                    throw new Error("Failed to get address");
                }

                const result = await response.json();

                setLocationAddress(
                    result.display_name || "Address not available",
                );
            } catch (error) {
                console.error("Reverse geocoding error:", error);
                setLocationAddress("Address not available");
            }
        };

        fetchAddress();
    }, [latitude, longitude]);

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-sm text-[#8A94A6]">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-sm text-[#D32F2F]">
                    Failed to load profile...
                </p>
            </div>
        );
    }

    const user = data.data?.user;

    console.log(user.profile_picture);

    if (!user) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-sm text-[#8A94A6]">Profile not found.</p>
            </div>
        );
    }

    const fullName = [user.first_name, user.middle_name, user.last_name]
        .filter(Boolean)
        .join(" ");

    const initials = `${user.first_name?.charAt(0) ?? ""}${
        user.last_name?.charAt(0) ?? ""
    }`;

    console.log(user.profile_picture);

    return (
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#121212]">
            <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
                {/* Header */}
                <div className="mb-5 sm:mb-6">
                    <h1 className="text-xl font-bold text-[#111827] dark:text-[#F9FAFB] sm:text-2xl">
                        My Profile
                    </h1>

                    <p className="mt-1 text-xs text-[#8A94A6] dark:text-[#9CA3AF] sm:text-sm">
                        Manage your personal information and mechanic profile.
                    </p>
                </div>

                {/* Profile Header */}
                <Card className="overflow-hidden border-[#EEEEEE] bg-white shadow-sm dark:border-[#3A3A3A] dark:bg-[#1E1E1E]">
                    <div className="h-24 bg-gradient-to-r from-[#111827] via-[#374151] to-[#FC4C02] sm:h-32" />

                    <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
                        <div className="relative -mt-10 sm:-mt-12">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div className="flex min-w-0 items-end gap-3 sm:gap-4">
                                    <Avatar className="h-20 w-20 shrink-0 border-4 border-white shadow-md dark:border-[#1E1E1E] sm:h-24 sm:w-24">
                                        <AvatarImage
                                            src={
                                                getImageUrl(
                                                    user.profile_picture,
                                                ) ?? ""
                                            }
                                            alt={fullName}
                                        />

                                        <AvatarFallback className="bg-[#F8FAFC] text-lg font-semibold text-[#374151] dark:bg-[#252525] dark:text-[#F9FAFB] sm:text-2xl">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="min-w-0 pb-1">
                                        <h2 className="truncate text-lg font-semibold text-[#111827] dark:text-[#F9FAFB] sm:text-xl">
                                            {fullName}
                                        </h2>

                                        <p className="text-xs capitalize text-[#8A94A6] dark:text-[#9CA3AF] sm:text-sm">
                                            {user.role}
                                        </p>
                                    </div>
                                </div>

                                {/* <EditMechanicProfileDialog profile={data} /> */}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Information */}
                <div className="mt-5 grid items-stretch gap-6 lg:grid-cols-3">
                    {/* Left */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Personal Information */}
                        <Card className="h-full border-[#EEEEEE] bg-white shadow-sm dark:border-[#3A3A3A] dark:bg-[#1E1E1E]">
                            <CardHeader>
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-lg text-[#111827] dark:text-[#F9FAFB]">
                                            Personal Information
                                        </CardTitle>

                                        <p className="mt-1 text-sm text-[#8A94A6] dark:text-[#9CA3AF]">
                                            Your personal and contact
                                            information.
                                        </p>
                                    </div>

                                    <EditPersonalInformationDialog
                                        user={user}
                                        profileQueryKey={["mechanic-profile"]}
                                    />
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-6 sm:space-y-10">
                                {/* Name */}
                                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-[#8A94A6] dark:text-[#9CA3AF]">
                                            First Name
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-[#111827] dark:text-[#F9FAFB]">
                                            {user.first_name || "—"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-[#8A94A6] dark:text-[#9CA3AF]">
                                            Middle Name
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-[#111827] dark:text-[#F9FAFB]">
                                            {user.middle_name || "—"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-[#8A94A6] dark:text-[#9CA3AF]">
                                            Last Name
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-[#111827] dark:text-[#F9FAFB]">
                                            {user.last_name || "—"}
                                        </p>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-[#8A94A6] dark:text-[#9CA3AF]">
                                            Email
                                        </p>

                                        <p className="mt-1 break-all text-sm font-medium text-[#111827] dark:text-[#F9FAFB]">
                                            {user.email || "—"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-[#8A94A6] dark:text-[#9CA3AF]">
                                            Phone Number
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-[#111827] dark:text-[#F9FAFB]">
                                            {user.phone || "—"}
                                        </p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-[#657386] dark:text-[#B0B8C4]" />

                                        <p className="text-xs font-medium uppercase tracking-wide text-[#8A94A6] dark:text-[#9CA3AF]">
                                            Address
                                        </p>
                                    </div>

                                    <p className="mt-1 text-sm font-medium text-[#111827] dark:text-[#F9FAFB]">
                                        {locationAddress}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right - Location */}
                    <div className="h-full">
                        <Card className="overflow-hidden border-[#EEEEEE] bg-white shadow-sm dark:border-[#3A3A3A] dark:bg-[#1E1E1E]">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg text-[#111827] dark:text-[#F9FAFB]">
                                    <MapPin className="h-5 w-5 text-[#FC4C02]" />
                                    My Location
                                </CardTitle>

                                <p className="text-sm text-[#8A94A6] dark:text-[#9CA3AF]">
                                    Your registered location.
                                </p>
                            </CardHeader>

                            <CardContent className="p-0">
                                <div className="h-[280px] w-full">
                                    <MapComponent
                                        latitude={latitude}
                                        longitude={longitude}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Mechanic Information */}
                <Card className="mt-5 grid items-stretch gap-6 border-[#EEEEEE] bg-white shadow-sm dark:border-[#3A3A3A] dark:bg-[#1E1E1E]">
                    <CardHeader>
                        <CardTitle className="text-lg text-[#111827] dark:text-[#F9FAFB]">
                            Mechanic Information
                        </CardTitle>

                        <p className="text-sm text-[#8A94A6] dark:text-[#9CA3AF]">
                            Your professional mechanic information.
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6 sm:space-y-8">
                        {/* Skill & Experience */}
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-[#8A94A6] dark:text-[#9CA3AF]">
                                    Skill Description
                                </p>

                                <p className="mt-1 text-sm font-medium text-[#111827] dark:text-[#F9FAFB]">
                                    {data.data?.skill_description || "—"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-[#8A94A6] dark:text-[#9CA3AF]">
                                    Years of Experience
                                </p>

                                <p className="mt-1 text-sm font-medium text-[#111827] dark:text-[#F9FAFB]">
                                    {data.data?.years_experience ?? 0}{" "}
                                    {data.data?.years_experience === 1
                                        ? "year"
                                        : "years"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-[#8A94A6] dark:text-[#9CA3AF]">
                                    Availability
                                </p>

                                <p
                                    className={`mt-1 text-sm font-semibold ${
                                        data.data?.is_available
                                            ? "text-green-600"
                                            : "text-[#D32F2F]"
                                    }`}
                                >
                                    {data.data?.is_available
                                        ? "Available"
                                        : "Unavailable"}
                                </p>
                            </div>
                        </div>

                        {/* Specializations */}
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-[#8A94A6] dark:text-[#9CA3AF]">
                                Specializations
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">
                                {data.data?.specializations?.length ? (
                                    data.data?.specializations.map(
                                        (
                                            specialization: string,
                                            index: number,
                                        ) => (
                                            <span
                                                key={index}
                                                className="rounded-full bg-[#FFF1EB] px-3 py-1.5 text-xs font-medium text-[#FC4C02] dark:bg-[#3A241D] dark:text-[#FF7043]"
                                            >
                                                {specialization}
                                            </span>
                                        ),
                                    )
                                ) : (
                                    <p className="text-sm text-[#8A94A6]">
                                        No specializations listed.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Statistics */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="rounded-xl border border-[#EEEEEE] p-4 dark:border-[#3A3A3A]">
                                <p className="text-xs font-medium uppercase tracking-wide text-[#8A94A6] dark:text-[#9CA3AF]">
                                    Rating
                                </p>

                                <div className="mt-1 flex items-center gap-2">
                                    <Star className="h-4 w-4 fill-[#FC4C02] text-[#FC4C02]" />

                                    <p className="text-sm font-semibold text-[#111827] dark:text-[#F9FAFB]">
                                        {data.data?.rating ?? 0}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-xl border border-[#EEEEEE] p-4 dark:border-[#3A3A3A]">
                                <p className="text-xs font-medium uppercase tracking-wide text-[#8A94A6] dark:text-[#9CA3AF]">
                                    Total Jobs
                                </p>

                                <p className="mt-1 text-sm font-semibold text-[#111827] dark:text-[#F9FAFB]">
                                    {data.total_jobs ?? 0}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
