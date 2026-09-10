import { Loader2, MapPin, Wrench } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useCancelServiceRequest } from "../hooks/useCyclistCurrentServiceRequest";

interface CyclistFindingMechanicDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    serviceRequestUuid: string;
}

export default function CyclistFindingMechanicDialog({
    open,
    onOpenChange,
    serviceRequestUuid,
}: CyclistFindingMechanicDialogProps) {
    const queryClient = useQueryClient();
    const cancelMutation = useCancelServiceRequest();

    const handleCancel = async () => {
        if (!serviceRequestUuid) {
            console.error("Service request UUID is missing.");
            return;
        }

        try {
            console.log("Cancelling service request:", serviceRequestUuid);

            await cancelMutation.mutateAsync(serviceRequestUuid);

            await queryClient.invalidateQueries({
                queryKey: ["cyclist-current-service-request"],
            });

            onOpenChange(false);
        } catch (error) {
            console.error("Failed to cancel service request:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                    shadow-sm
                    sm:max-w-[400px]
                "
                onInteractOutside={(event) => event.preventDefault()}
                onEscapeKeyDown={(event) => event.preventDefault()}
            >
                <DialogHeader className="text-center">
                    <DialogTitle className="text-lg font-semibold tracking-tight text-gray-900">
                        Finding a Mechanic
                    </DialogTitle>

                    <DialogDescription className="text-sm text-gray-500">
                        We're looking for an available mechanic near your
                        location.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-5 pt-4">
                    {/* Finding Animation */}
                    <div className="relative flex h-20 w-20 items-center justify-center">
                        <span
                            className="
                                absolute
                                inset-0
                                animate-ping
                                rounded-full
                                bg-[#fc4c02]/10
                            "
                        />

                        <div
                            className="
                                relative
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-full
                                bg-[#fc4c02]/10
                            "
                        >
                            <Wrench className="h-8 w-8 text-[#fc4c02]" />
                        </div>
                    </div>

                    {/* Searching Status */}
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-gray-500
                        "
                    >
                        <Loader2
                            className="
                                h-4
                                w-4
                                animate-spin
                                text-[#fc4c02]
                            "
                        />

                        <span>Searching for nearby mechanics...</span>
                    </div>

                    {/* Location Information */}
                    <div
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-lg
                            border
                            border-gray-200
                            bg-gray-50
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
                            <MapPin className="h-5 w-5 text-[#fc4c02]" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                                Your request location
                            </p>

                            <p className="truncate text-xs text-gray-500">
                                Searching within your nearby area
                            </p>
                        </div>
                    </div>

                    {/* Cancel */}
                    <Button
                        type="button"
                        variant="outline"
                        className="
                            h-11
                            w-full
                            rounded-md
                            border-gray-300
                            bg-white
                            text-sm
                            font-medium
                            text-gray-700
                            hover:border-red-300
                            hover:bg-red-50
                            hover:text-red-600
                        "
                        onClick={handleCancel}
                        disabled={cancelMutation.isPending}
                    >
                        {cancelMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Cancelling...
                            </>
                        ) : (
                            "Cancel Request"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
