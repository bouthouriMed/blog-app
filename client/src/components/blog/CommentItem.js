import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteComment } from "../../actions/blog";
import Moment from "react-moment";
import { capitalize } from "@material-ui/core";

const CommentItem = ({
  blogId,
  comment: { id, commentedBy, content, commentedAt },
}) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  return (
    <div className="post bg-white p-2 my-1">
      <div>
        <h4>{capitalize(commentedBy.firstname)}</h4>
      </div>
      <div>
        <p className="my-1">{content}</p>
        <p className="post-date">
          Posted on <Moment format="yyyy-MM-dd HH:mm:ss">{commentedAt}</Moment>
        </p>
        {!auth.loading && auth.user.id === commentedBy.id && (
          <button
            onClick={() => dispatch(deleteComment(blogId, id))}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
