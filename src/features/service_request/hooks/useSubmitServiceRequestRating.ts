import { useState } from "react";

import { submitServiceRequestRating } from "../api/serviceRequestRatingApi";

export function useSubmitServiceRequestRating() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submitRating = async (
        serviceRequestUuid: string,
        rating: number,
        review: string,
    ) => {
        try {
            setIsSubmitting(true);
            setError(null);

            const response = await submitServiceRequestRating(
                serviceRequestUuid,
                {
                    rating,
                    review: review.trim() || undefined,
                },
            );

            return response;
        } catch (error) {
            console.error("Failed to submit rating:", error);

            setError("Failed to submit rating. Please try again.");

            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        submitRating,
        isSubmitting,
        error,
    };
}