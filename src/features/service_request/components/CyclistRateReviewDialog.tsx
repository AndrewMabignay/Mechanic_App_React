import { useState } from "react";
import { Star, Wrench } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";

interface CyclistRateReviewDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mechanicName?: string;
    onSubmit: (rating: number, review: string) => Promise<void>;
    isSubmitting?: boolean;
}

export default function CyclistRateReviewDialog({
    open,
    onOpenChange,
    mechanicName = "Mechanic",
    onSubmit,
    isSubmitting = false,
}: CyclistRateReviewDialogProps) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const handleSubmit = async () => {
        if (rating === 0 || isSubmitting) {
            return;
        }

        const startTime = Date.now();

        await onSubmit(rating, review);

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(500 - elapsedTime, 0);

        setTimeout(() => {
            onOpenChange(false);

            setRating(0);
            setReview("");
        }, remainingTime);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="
                    w-[calc(100%-2rem)]
                    max-w-md
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                    data-[state=open]:animate-in
                    data-[state=closed]:animate-out
                    data-[state=open]:fade-in-0
                    data-[state=closed]:fade-out-0
                    data-[state=open]:zoom-in-95
                    data-[state=closed]:zoom-out-95
                    data-[state=open]:slide-in-from-bottom-2
                    data-[state=closed]:slide-out-to-bottom-2
                    duration-300
                    ease-out
                "
                showCloseButton={false}
            >
                <DialogHeader>
                    <div className="flex flex-col items-center text-center">
                        {/* Icon */}
                        <div
                            className="
                                mb-3
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-full
                                bg-[#fc4c02]/10
                                transition-transform
                                duration-300
                            "
                        >
                            <Wrench className="h-7 w-7 text-[#fc4c02]" />
                        </div>

                        <DialogTitle className="text-xl font-semibold text-gray-900">
                            Service Completed
                        </DialogTitle>

                        <p className="mt-1 text-sm text-gray-500">
                            How was your experience with {mechanicName}?
                        </p>
                    </div>
                </DialogHeader>

                <div className="space-y-5 pt-2">
                    {/* Rating */}
                    <div className="flex flex-col items-center">
                        <p className="mb-3 text-sm font-medium text-gray-700">
                            Rate your mechanic
                        </p>

                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    disabled={isSubmitting}
                                    className="
                                        rounded-md
                                        p-0.5
                                        transition-all
                                        duration-200
                                        hover:scale-110
                                        active:scale-95
                                        disabled:cursor-not-allowed
                                    "
                                    aria-label={`Rate ${star} star${
                                        star > 1 ? "s" : ""
                                    }`}
                                >
                                    <Star
                                        className={`
                                            h-9
                                            w-9
                                            transition-all
                                            duration-200
                                            ${
                                                star <= rating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                            }
                                        `}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Rating Label */}
                        <div className="mt-2 h-5">
                            {rating > 0 && (
                                <p className="animate-in fade-in-0 slide-in-from-bottom-1 text-sm text-gray-500 duration-200">
                                    {rating === 5
                                        ? "Excellent!"
                                        : rating === 4
                                          ? "Very Good!"
                                          : rating === 3
                                            ? "Good"
                                            : rating === 2
                                              ? "Needs Improvement"
                                              : "Poor"}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Review */}
                    <div>
                        <label
                            htmlFor="service-review"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Review
                        </label>

                        <textarea
                            id="service-review"
                            value={review}
                            onChange={(event) => setReview(event.target.value)}
                            placeholder="Tell us about your experience..."
                            maxLength={1000}
                            rows={4}
                            disabled={isSubmitting}
                            className="
                                w-full
                                resize-none
                                rounded-md
                                border
                                border-gray-300
                                bg-white
                                px-4
                                py-3
                                text-sm
                                text-gray-900
                                outline-none
                                transition-all
                                duration-200
                                placeholder:text-gray-400
                                focus:border-[#fc4c02]
                                focus:ring-2
                                focus:ring-[#fc4c02]/20
                                disabled:cursor-not-allowed
                                disabled:bg-gray-50
                                disabled:opacity-50
                            "
                        />

                        <p className="mt-1 text-right text-xs text-gray-400">
                            {review.length}/1000
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={rating === 0 || isSubmitting}
                            className="
                                h-11
                                w-full
                                rounded-md
                                bg-[#fc4c02]
                                text-sm
                                font-medium
                                text-white
                                transition-all
                                duration-200
                                hover:bg-[#e64500]
                                active:scale-[0.99]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            {isSubmitting ? "Submitting..." : "Submit Rating"}
                        </button>

                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                            className="
                                w-full
                                py-2
                                text-sm
                                font-medium
                                text-gray-500
                                transition-colors
                                duration-200
                                hover:text-gray-700
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            Skip for now
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
