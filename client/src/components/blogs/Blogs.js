import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogForm from "./BlogForm";
import BlogItem from "./BlogItem";

import { getAllBlogs } from "../../actions/blog";

const Blogs = () => {
  const { blogs } = useSelector((state) => state.blog);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  return (
    <Fragment>
      <h1 className="large text-primary">Blogs</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      <BlogForm />
      <div className="posts">
        {blogs.length > 0 ? (
          blogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)
        ) : (
          <div> No blogs found... </div>
        )}
      </div>
    </Fragment>
  );
};

export default Blogs;
