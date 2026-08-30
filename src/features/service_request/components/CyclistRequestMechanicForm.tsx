import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Wrench } from "lucide-react";
import { useBikeProblemOptions } from "../hooks/useBikeProblem";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    requestMechanicSchema,
    type RequestMechanicFormData,
} from "../schemas/useRequestMechanicSchema";
import { FieldGroup } from "../../../components/ui/field";

export default function CyclistRequestMechanicForm() {
    const [open, setOpen] = useState(false);
    const { data, isLoading, error } = useBikeProblemOptions();

    const form = useForm({
        resolver: zodResolver(requestMechanicSchema),
        defaultValues: {
            bike_problems: [],
            location_lat: 0,
            location_lng: 0,
            description: "",
            images: [],
        },
    });

    const bikeProblems = data?.data ?? [];

    const selectedProblems = useWatch({
        control: form.control,
        name: "bike_problems",
    });

    async function onSubmit(values: RequestMechanicFormData) {
        try {
            setOpen(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Wrench className="mr-2 h-4 w-4" />
                        Request Mechanic
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle>Request Mechanic</DialogTitle>
                        <DialogDescription>
                            Select the problem with your bicycle.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        id="form-rhf-request-mechanic"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FieldGroup></FieldGroup>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
