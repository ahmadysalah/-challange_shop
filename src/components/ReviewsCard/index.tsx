import { ContainerReviewsCard } from "./ReviewsCard.styled";
import Review from "./Review";
import { IReview } from "../../@types/products.types";

interface Iprops {
  reviews: IReview[];
}

export default function ReviewsCard({ reviews }: Iprops) {
  return (
    <>
      <ContainerReviewsCard>
        {reviews.map((review, index) => (
          <Review
            key={`${index}`}
            nameReviewer={review.name as string}
            valueRating={review.rating}
            optionsReviewer={review.comment}
            timeOfReview={
              review.createdAt &&
              new Date(review.createdAt).toLocaleDateString("en-UK")
            }
          />
        ))}
      </ContainerReviewsCard>
    </>
  );
}
