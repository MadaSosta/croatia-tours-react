import React, { Dispatch, SetStateAction, useEffect } from "react";

import styles from "./Trip.module.css";
import { TComment, TReview, TTrip } from "@/types/typings";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { createPortal } from "react-dom";
import { AiFillCloseCircle, AiFillStar } from "react-icons/ai";
import { auth } from "@/config/firebaseConfig";
import database from "@/services/database/Database";
import { useReviews } from "@/hooks/hooks";
import Loading from "../common/loading/Loading";
import { calculateAverage, formatDate } from "@/lib/utils";
import { dateTimeFormatOptions } from "@/constants/consts";

function ReviewModal({
  tripID,
  setShowReviewModal,
  setReviews,
}: {
  tripID: string;
  setShowReviewModal: Dispatch<SetStateAction<boolean>>;
  setReviews: Dispatch<SetStateAction<{ review: TReview; tripID: string }[]>>;
}) {
  const [comment, setComment] = useState<TComment>({
    text: "",
    rating: 0,
    createdAt: new Date().getTime(),
  });

  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const [review, setReview] = useState<TReview>({
    comment: comment,
    user: user,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!auth.currentUser) return;

    const isValid = validateForm();

    if (!isValid) return;

    try {
      database.AddReview(review, tripID);
      const reviewQueryParams = new URLSearchParams({
        tripID: tripID,
      });
      const response = await fetch("/api/reviews?" + reviewQueryParams);

      if (response.ok) {
        console.log("response", response);
        const data = await response.json();
        console.log("data", data);
        setReviews(data);
        setShowReviewModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUser({
      username: auth.currentUser?.displayName!,
      email: auth.currentUser?.email!,
    });
  }, [auth.currentUser]);

  useEffect(() => {
    setReview((prev) => ({ ...prev, comment: comment, user: user }));
  }, [comment, user]);

  const validateForm = () => {
    let isValid = true;

    if (comment.text === "") isValid = false;
    if (comment.rating === 0) isValid = false;
    if (!user.username) isValid = false;
    if (!user.email) isValid = false;

    return isValid;
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h3>Leave a review</h3>
          <AiFillCloseCircle
            className={styles.closeIcon}
            onClick={() => setShowReviewModal(false)}
          />
        </div>
        <textarea
          className={styles.reviewInput}
          placeholder="Write your review here..."
          onChange={(e) =>
            setComment((prev) => ({ ...prev, text: e.target.value }))
          }
          value={comment.text}
        ></textarea>
        <div className={styles.awardRating}>
          <Rating
            className={styles.userRating}
            name="normal"
            defaultValue={0}
            onChange={(e) =>
              setComment((prev) => ({
                ...prev,
                rating: parseInt((e.target as HTMLInputElement).value),
              }))
            }
            value={comment.rating}
          />
          <button className={styles.awardButton}>Post Comment</button>
        </div>
      </form>
    </div>
  );
}

type TProps = {
  data: TTrip;
};

function Trip({ data }: TProps) {
  const { reviews, isError, isLoading } = useReviews(data.xid);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewsToDisplay, setReviewsToDisplay] = useState<
    {
      review: TReview;
      tripID: string;
    }[]
  >([]);

  const pretify = (str: string) => {
    const kinds = str.split(",");
    const words = kinds.map((kind) => kind.replace("_", " "));
    const capitalized = words.map(
      (word) => word[0].toUpperCase() + word.slice(1)
    );
    return capitalized;
  };

  useEffect(() => {
    if (reviews) {
      setReviewsToDisplay(reviews);
    }
  }, [reviews, isLoading, isError]);

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashboardContainer}>
        <aside className={styles.asideContainer}>
          <h3>{data.name}</h3>
          <img
            src={data.preview?.source}
            alt={data.name}
            className={styles.image}
          />
        </aside>
        <div className={styles.contentContainer}>
          <div className={styles.kind}>
            {pretify(data.kinds).map((kind) => (
              <span key={kind}> | {kind}</span>
            ))}
          </div>
          <p>{data.wikipedia_extracts?.text}</p>
          <div className={styles.ratingScore}>
            <p className={styles.starRating}>
              Rating:{" "}
              {calculateAverage(
                reviewsToDisplay?.map(
                  (review) => review.review.comment.rating || 0
                )
              )}
              <AiFillStar />
            </p>
            <p>Reviews: {reviewsToDisplay?.length || "0"}</p>
            <Link href={`https://www.booking.com/${data.address?.city}`}>
              <button className={styles.hotelButton}>Show nearby hotels</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.reviewContainer}>
        <div className={styles.rating}>
          <h3>Reviews</h3>
          <button
            className={styles.reviewButton}
            type="button"
            disabled={!auth.currentUser}
            onClick={() => setShowReviewModal(true)}
          >
            Leave a review
          </button>
          {showReviewModal &&
            createPortal(
              <ReviewModal
                tripID={data.xid}
                setShowReviewModal={setShowReviewModal}
                setReviews={setReviewsToDisplay}
              />,
              document.body
            )}
        </div>
        {isError && <div>Something went wrong...</div>}
        {isLoading && <Loading />}
        {reviewsToDisplay &&
          reviewsToDisplay.map((review) => (
            <div
              key={review.review.comment.createdAt}
              className={styles.review}
            >
              <div className={styles.reviewAuthor}>
                <div className={styles.authorInfo}>
                  <img
                    src="/images/user.png"
                    className={styles.avatar}
                    alt="avatar"
                  />
                  <p className={styles.authorName}>
                    {review.review.user.username}
                  </p>
                  <p className={styles.authorDate}>
                    {formatDate(
                      new Date(review.review.comment.createdAt),
                      dateTimeFormatOptions
                    )}
                  </p>
                </div>
              </div>
              <div className={styles.reviewContent}>
                <Rating
                  className={styles.userRating}
                  name="size-large"
                  defaultValue={review.review.comment.rating}
                  readOnly
                />
                <p>{review.review.comment.text}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Trip;
