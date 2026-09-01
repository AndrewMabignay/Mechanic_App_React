import { CheckCircle2, Clock, Wrench } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";

interface CyclistServiceInProgressDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mechanicName?: string;
}

export default function CyclistServiceInProgressDialog({
    open,
    onOpenChange,
    mechanicName = "Mechanic",
}: CyclistServiceInProgressDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Service in Progress
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                    {/* Status */}
                    <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100">
                            <Wrench className="h-5 w-5 text-blue-600" />
                        </div>

                        <div>
                            <p className="font-semibold text-blue-700">
                                Service in Progress
                            </p>

                            <p className="text-sm text-blue-600">
                                Your mechanic is currently working on your
                                bicycle.
                            </p>
                        </div>
                    </div>

                    {/* Mechanic */}
                    <div>
                        <p className="mb-3 text-sm font-medium text-slate-500">
                            Mechanic
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100">
                                <Wrench className="h-6 w-6 text-blue-600" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-lg font-semibold text-slate-900">
                                    {mechanicName}
                                </p>

                                <div className="mt-1 flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-slate-400" />

                                    <span className="text-sm text-slate-500">
                                        Currently servicing your bike
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Service Status */}
                    <div className="rounded-xl border bg-white p-4">
                        <p className="mb-3 text-sm font-medium text-slate-700">
                            Service Status
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />

                                <span className="text-sm text-slate-700">
                                    Mechanic arrived
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="h-5 w-5 rounded-full border-2 border-blue-500" />

                                <span className="text-sm font-medium text-blue-600">
                                    Repair in progress
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="h-5 w-5 rounded-full border-2 border-slate-300" />

                                <span className="text-sm text-slate-400">
                                    Service completed
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
