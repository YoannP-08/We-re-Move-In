import React, { useState } from "react";

export default function StarsRating(props) {
  const stars = [1, 2, 3, 4, 5];
  const [isRating, setIsRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverState, setHoverState] = useState(0);
  const movie = props.movie;

  const saveRating = async (e) => {
    const res = await fetch(`http://localhost:3000/api/movies/${movie._id}`, {
      method: "PUT",
      body: JSON.stringify({
        ratings: [...movie.ratings, rating],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsRating(0);
    setRating(0);
    props.getMovieFromId();
  };

  return (
    <div>
      {!isRating ? (
        <div className="flex items-center font-fira">
          {movie.ratings.length
            ? Math.round((movie.ratings.reduce((a, b) => a + b, 0) / movie.ratings.length) * 100)/100
            : "No rating"}
          <svg
            className="h-6 w-6 text-yellow-300 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
            { props.user ? (
          <a
            href="#"
            className="ml-3 px-2 py-1 text-yellow-300 bg-gray-600 rounded-md border border-yellow-300 hover:bg-gray-900"
            onClick={() => setIsRating(true)}
          >
            Rate this movie
          </a>) : (<div/>)
            }
        </div>
      ) : (
        <div className="flex items-center font-fira">
          {stars.map((star, index) => (
            <svg
              key={index}
              onMouseEnter={() => setHoverState(index)}
              onMouseLeave={() => setHoverState(0)}
              onClick={() => setRating(index+1)}
              className={`h-6 w-6 text-gray-300 ml-2 hover:text-yellow-400 ${
                (hoverState || rating) > index
                  ? "text-yellow-400"
                  : "text-grey-300"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <a
            onClick={(e) => saveRating(e)}
            href="#"
            className="ml-3 px-2 py-1 text-yellow-300 bg-gray-600 rounded-md border border-yellow-300 hover:bg-gray-900"
          >
            Save rating
          </a>
          <a
            onClick={() => {setIsRating(0); setRating(0)}}
            href="#"
            className="ml-3 px-2 py-1 text-red-400 bg-gray-600 rounded-md border border-red-400 hover:bg-gray-900"
          >
            Cancel
          </a>
        </div>
      )}
    </div>
  );
}

// {
//   !rating ? (
//     <div className="flex items-center font-fira">
//       {movie.ratings.length
//         ? movie.ratings.reduce((a, b) => a + b, 0) / movie.ratings.length
//         : "No rating"}
//       <svg
//         className="h-6 w-6 text-yellow-300 ml-2"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//       >
//         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//       </svg>
//       <a
//         href="#"
//         className="ml-3 px-2 py-1 text-yellow-300 bg-gray-600 rounded-md border border-yellow-300 hover:bg-gray-900"
//         onClick={() => setRating(true)}
//       >
//         Rate this movie
//       </a>
//     </div>
//   ) : (
//     <StarsRating></StarsRating>
//   );
// }

// <div className="flex items-center font-fira">
//   {stars.map((star, index) => (
//     <svg
//       key={index}
//       onMouseEnter={() => setHoverState(index)}
//       onMouseLeave={() => setHoverState(0)}
//       className="h-6 w-6 text-gray-300 ml-2"
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 20 20"
//       fill="currentColor"
//     >
//       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//     </svg>
//   ))}
//   <a
//     href="#"
//     className="ml-3 px-2 py-1 text-yellow-300 bg-gray-600 rounded-md border border-yellow-300 hover:bg-gray-900"
//   >
//     Save rating
//   </a>
// </div>;
