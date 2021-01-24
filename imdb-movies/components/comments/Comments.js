import React, {useEffect, useState} from "react";
import CommentCard from "./CommentCard";
import auth0 from "../../utils/auth0";

const Comments = (props) => {

    const [comments, setComments] = useState(null);
    const [newComment, setNewComment] = useState(null);
    const [userMongo, setUserMongo] = useState([]);

    const fetchComments = () => {
        fetch(
            "http://localhost:3000/api/comments",
        ).then(response => response.json()).then(data => {
            setComments(data.data)
        });

    };

    const  getUserMongoDB = async() => {
        if(!props.user) {
            return;
        }
        await fetch('/api/users', {
            method: 'GET'
        }).then(body => body.json())
            .then(body => setUserMongo({ userMongo: body.data.filter(user => user.id_auth0 === props.user.sub)}))
    };

    const addNewComment = async () => {
        document.getElementById("input").value = "";



        await fetch(
            "http://localhost:3000/api/comments", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    comment : newComment,
                    user_id : userMongo.userMongo[0]._id,
                    movie_id: props.movieId
                }),
            },
        );
        fetchComments();
    }


    useEffect(() => {
        (async () => {
            await fetchComments()
            await getUserMongoDB()
        })()
    }, [])

    return comments !== null ? (
      <div>
        <div className="flex w-full shadow-lg mt-4 mb-2">
          <div className="w-full  bg-gray-700 rounded-lg px-4">
              { props.user ? (
              <div className="flex flex-wrap -mx-3 mb-2">
              <h2 className="px-4 pt-1 text-white text-lg font-allerta">
                Add a new comment
              </h2>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <input
                  type={"text"}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                  id="input"
                  className="bg-gray-600 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-white focus:outline-none focus:bg-white"
                  name="body"
                  placeholder="Type Your Comment"
                  required
                />
              </div>
              <div className="w-full md:w-full flex items-start md:w-full px-3">
                <div>
                  <button
                    onClick={addNewComment}
                    className="px-2 py-1 text-yellow-300 bg-gray-600 rounded-md border border-yellow-300 hover:bg-gray-900"
                  >
                    Post my comment
                  </button>
                </div>
              </div>
            </div>
              ) : (<div/>)}
          </div>
        </div>
        <div className="flex flex-col-reverse">
          {comments.map((comment) => (
            <CommentCard
              comment={comment}
              movieId={props.movieId}
              key={comment._id}
              fetchComments={fetchComments}
              user={props.user}
              userMongo={userMongo}

            />
          ))}
        </div>
      </div>
    ) : (
      <div>Loading Comments</div>
    );
}

export default Comments;
