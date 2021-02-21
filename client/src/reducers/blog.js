import {
  DELETE_BLOG,
  CREATE_BLOG,
  GET_ALL_BLOGS,
  GET_SINGLE_BLOG,
  BLOG_ERROR,
  ADD_COMMENT,
  DELETE_COMMENT,
  LIKE_BLOG,
  CLEAR_BLOGS,
  UNLIKE_BLOG,
} from "../actions/type";

const initialState = {
  blog: null,
  blogs: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_BLOGS:
      return {
        ...state,
        blogs: payload,
        loading: false,
      };
    case GET_SINGLE_BLOG:
      return {
        ...state,
        blog: payload,
        loading: false,
      };

    case LIKE_BLOG:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog.id === payload.blogId
            ? { ...blog, likes: [...blog.likes, payload.like] }
            : blog
        ),
        loading: false,
      };
    case UNLIKE_BLOG:
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog.id === payload.blogId
            ? { ...blog, likes: blog.likes.filter(like => like.id !== payload.likeId) }
            : blog
        ),
        loading: false,
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== payload),
        loading: false,
      };
    case CREATE_BLOG:
      return {
        ...state,
        blogs: [payload, ...state.blogs],
      };
    case ADD_COMMENT:
      return {
        ...state,
        blog: { ...state.blog, comments: [payload, ...state.blog.comments] },
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        blog: {
          ...state.blog,
          comments: state.blog.comments.filter(
            (comment) => comment.id !== payload
          ),
        },
        loading: false,
      };
    case BLOG_ERROR:
      return {
        ...state,
        loading: false,
      };
    case CLEAR_BLOGS:
      return {
        ...state,
        loading: false,
        blog: null,
        blogs: []
      };
    default:
      return state;
  }
}
