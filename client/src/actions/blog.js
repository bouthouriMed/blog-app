import {
  GET_ALL_BLOGS,
  GET_SINGLE_BLOG,
  BLOG_ERROR,
  DELETE_BLOG,
  CREATE_BLOG,
  ADD_COMMENT,
  DELETE_COMMENT,
  LIKE_BLOG,
  UNLIKE_BLOG,
} from "./type";

import axios from "axios";
import { toast } from "react-toastify";

// Get All blogs
export const getAllBlogs = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/blogs");

    dispatch({
      type: GET_ALL_BLOGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
    });
  }
};

// Get blog by ID
export const getBlogById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/blogs/${id}`);

    dispatch({
      type: GET_SINGLE_BLOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
    });
  }
};

// Post a blog
export const createBlog = (content) => async (dispatch) => {
  try {
    const res = await axios.post("/api/blogs", { content });
    console.log(content);

    dispatch({
      type: CREATE_BLOG,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
    });
  }
};

// Like a blog
export const likeBlog = (blogId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/thumbsUps/blogs/${blogId}`);
    dispatch({
      type: LIKE_BLOG,
      payload: { blogId, like: res.data },
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
    });
  }
};

// Unlike a blog
export const unlikeBlog = (likeId, blogId) => async (dispatch) => {
  try {
    await axios.delete(`/api/thumbsUps/${likeId}/blogs/${blogId}`);
    dispatch({
      type: UNLIKE_BLOG,
      payload: { blogId, likeId },
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
    });
  }
};

// Add a comment
export const addComment = (blogId, content) => async (dispatch) => {
  try {
    console.log(content);
    const res = await axios.post(`/api/comments/blogs/${blogId}`, { content });

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
    });
  }
};

// Delete a comment
export const deleteComment = (blogId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/comments/${commentId}/blogs/${blogId}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,
    });

    toast.success("Comment deleted");
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete blog
export const deleteBlog = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/blogs/${id}`);
    dispatch({
      type: DELETE_BLOG,
      payload: id,
    });

    toast.success("Post deleted");
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
