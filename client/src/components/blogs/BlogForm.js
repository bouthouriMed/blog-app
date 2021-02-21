import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../../actions/blog";

const BlogForm = () => {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createBlog(content));
    setContent("");
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form onSubmit={handleSubmit} className="form my-1">
        <textarea
          onChange={(e) => setContent(e.target.value)}
          name="content"
          cols="30"
          rows="5"
          placeholder="Create a blog"
          value={content}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Publish" />
      </form>
    </div>
  );
};

export default BlogForm;
