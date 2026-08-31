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

            // Refresh current service request
            await queryClient.invalidateQueries({
                queryKey: ["cyclist-current-service-request"],
            });

            // Close dialog
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to cancel service request:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-[400px]"
                onInteractOutside={(event) => event.preventDefault()}
                onEscapeKeyDown={(event) => event.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Finding a Mechanic
                    </DialogTitle>

                    <DialogDescription className="text-center">
                        We're looking for an available mechanic near your
                        location.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center gap-5 py-6">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <Wrench className="h-10 w-10 text-primary" />

                        <span className="absolute inset-0 animate-ping rounded-full bg-primary/10" />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />

                        <span>Searching for nearby mechanics...</span>
                    </div>

                    <div className="flex w-full items-center gap-3 rounded-lg border p-3">
                        <MapPin className="h-5 w-5 shrink-0 text-primary" />

                        <div className="min-w-0">
                            <p className="text-sm font-medium">
                                Your request location
                            </p>

                            <p className="truncate text-xs text-muted-foreground">
                                Searching within your nearby area
                            </p>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleCancel}
                        disabled={cancelMutation.isPending}
                    >
                        {cancelMutation.isPending
                            ? "Cancelling..."
                            : "Cancel Request"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
