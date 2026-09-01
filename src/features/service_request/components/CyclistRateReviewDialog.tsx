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

        await onSubmit(rating, review);

        setRating(0);
        setReview("");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl">
                <DialogHeader>
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                            <Wrench className="h-7 w-7 text-green-600" />
                        </div>

                        <DialogTitle className="text-xl">
                            Service Completed
                        </DialogTitle>

                        <p className="mt-1 text-sm text-slate-500">
                            How was your experience with {mechanicName}?
                        </p>
                    </div>
                </DialogHeader>

                <div className="space-y-5 pt-2">
                    {/* Rating */}
                    <div className="flex flex-col items-center">
                        <p className="mb-3 text-sm font-medium text-slate-700">
                            Rate your mechanic
                        </p>

                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    disabled={isSubmitting}
                                    className="transition hover:scale-110 disabled:cursor-not-allowed"
                                >
                                    <Star
                                        className={`h-9 w-9 ${
                                            star <= rating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-slate-300"
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>

                        {rating > 0 && (
                            <p className="mt-2 text-sm text-slate-500">
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

                    {/* Review */}
                    <div>
                        <label
                            htmlFor="service-review"
                            className="mb-2 block text-sm font-medium text-slate-700"
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
                            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
                        />

                        <p className="mt-1 text-right text-xs text-slate-400">
                            {review.length}/1000
                        </p>
                    </div>

                    {/* Submit */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={rating === 0 || isSubmitting}
                        className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Rating"}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
