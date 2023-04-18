import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Auth } from "../helpers/Auth";
import Rating from "@mui/material/Rating";

function ViewEvent() {
    let { id } = useParams();
    const [eventObject, setEventObject] = useState({});
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [newRating, setNewRating] = useState({});
    const { authState } = useContext(Auth);

    useEffect(() => {
        axios.get(`http://localhost:3001/events/byId/${id}`).then((response) => {
            setEventObject(response.data);
        });

        axios.get(`http://localhost:3001/reviews/byId/${id}`).then((response) => {
            setReviews(response.data);
        });
    }, [id]);

    const addReview = () => {
        axios.post("http://localhost:3001/reviews", {
            comment: newReview,
            EventId: id,
            rating: newRating,
        }, {
            headers: {
                access: localStorage.getItem("access"),
            }
        })
        .then((response) => {
            if (response.data.error)
            {
                alert(response.data.error);
            }
            else {
                const reviewToAdd = {
                    comment: newReview,
                    username: response.data.username
                };
                setReviews([...reviews, reviewToAdd]);
                setNewReview("");
            }

        });
    };

    const deleteReview = (id) => {
        axios.delete(`http://localhost:3001/reviews/${id}`, {
            headers: {
                access: localStorage.getItem("access")
            },
        }).then(() => {
            setReviews(reviews.filter((val) => {
                return val.id !== id;
            }))
        });
    };

return (
    <div className="eventPage">
        <div className="eventDisplay">
            <div className="event" id="individual">
                <div className="name">{eventObject.name}</div>
                <div className="description">{eventObject.description}</div>
                <div className="category">{eventObject.category} Event</div>
                <div className="category">Time: {eventObject.time} | Date: {eventObject.date}</div>
                <div className="category">Hosted by: {eventObject.contact_email}</div>
                <div className="category">Contact: {eventObject.contact_phone}</div>
            </div>
        </div>
        <div className="reviews">
            <div className="addReviewContainer">
                <input
                    type="text"
                    placeholder="Leave a review..."
                    autoComplete="off"
                    value={newReview}
                    onChange={(event) => {
                        setNewReview(event.target.value);
                }}
                />

            <Rating
                value={newRating}
                onChange={(event) => {
                    setNewRating(event.target.value);
                }}>
            </Rating>

            <button onClick={addReview}>Submit Review</button>
        </div>
        <div className="listOfReviews">
          {reviews.map((review, key) => {
            return (
              <div key={key} className="review">
                {reviews.comment}
                <label> Username: {review.username}</label>
                {authState.username === review.username && (
                  <button className="delete"
                    onClick={() => {
                      deleteReview(review.id);
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ViewEvent;