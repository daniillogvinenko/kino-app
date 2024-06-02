import { Review } from "@/types/types";
import cls from "./ReviewCard.module.scss";
import { cn } from "@/shared/helpers/classNames/classNames";

interface ReviewCardProps {
    review: Review;
    className?: string;
}

export const ReviewCard = ({ review, className }: ReviewCardProps) => {
    return (
        <div className={cn(cls.ReviewCard, {}, [className])} key={review.id}>
            <p>{review.userId}</p>
            <p>{review.text}</p>
        </div>
    );
};
