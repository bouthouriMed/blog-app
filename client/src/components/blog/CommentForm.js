import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../actions/blog";

const CommentForm = ({ blogId }) => {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addComment(blogId, content));

    setContent("");
  };

  return (
    <div>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form onSubmit={handleSubmit} className="form my-1">
          <textarea
            onChange={(e) => setContent(e.target.value)}
            name="content"
            cols="30"
            rows="5"
            placeholder="Comment on this blog"
            required
            value={content}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Comment" />
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
