import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Badge } from "@material-ui/core";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

import { deleteBlog, likeBlog, unlikeBlog } from "../../actions/blog";
import { capitalize } from "../../utils/capitalize";

const BlogItem = ({
  blog: { id, createdBy, createdAt, content, likes, comments, user },
}) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  return (
    <Fragment>
      <div className="post bg-white p-1 my-1">
        <div>
          <h4>{capitalize(createdBy.firstname)}</h4>
        </div>
        <div>
          <p className="my-1">{content}</p>
          <p className="post-date">{`Posted on ${createdAt}`}</p>
          <Fragment>
            <Badge
              badgeContent={likes.length}
              color="primary"
              style={{ marginRight: "20px" }}
            >
              <ThumbUpAltOutlinedIcon
                style={{
                  cursor: "pointer",
                  color: likes
                    .map((like) => like.likedBy.toString())
                    .indexOf(auth.user.id.toString())
                    ? "black"
                    : "blue",
                }}
                onClick={() => {
                  const likedBlog = likes.find((like) => {
                    return like.likedBy.id === auth.user.id;
                  });

                  likedBlog ? dispatch(unlikeBlog(likedBlog.id, id)) : dispatch(likeBlog(id))
                }}  
              />
            </Badge>
            <Link to={`/blogs/${id}`} className="btn btn-primary">
              Discussion{" "}
              <span className="comment-count">{comments.length}</span>
            </Link>
            {auth.loading === false && createdBy.id === auth.user.id && (
              <button
                onClick={(e) => dispatch(deleteBlog(id))}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogItem;
