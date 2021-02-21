import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBlogById } from "../../actions/blog";

import Spinner from "../layout/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import BlogItem from "../blogs/BlogItem";

const Blog = ({ match }) => {
  const { blog, loading } = useSelector((state) => state.blog);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogById(match.params.id));
  }, [dispatch, match.params.id]);

  return loading || blog === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/blogs" className="btn btn-primary">
        Back To Blogs
      </Link>
      <BlogItem blog={blog} />
      <CommentForm blogId={blog.id} />
      <div className="comments">
        {blog.comments.length > 0 ? (
          blog.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} blogId={blog.id} />
          ))
        ) : (
          <span>There is no comments yet...</span>
        )}
      </div>
    </Fragment>
  );
};

export default Blog;
