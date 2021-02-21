# Blog App

## Overview 
This application let users after registration create, delete, like or unlike a blog and add or delete comments. <br/>
The front end is developed in React v17.0.0 with Redux as the state management tool along with custom css.<br/>
The back end is developed in Java v8.1 with MariaDb as the database.
  

## Setup 

Install dependecies:
```
cd client 
npm install 
npm run start 
```

## API's

**User**:
```
 Sign up:   POST api/auth/signup
 Sign in:   POST api/auth/signin
 Load user: GET  api/users
```

**blog**:
```
 Create blog:       POST    api/blogs
 Get all blogs:     GET     api/blogs
 Get blog by ID:    GET     api/blogs/:id
 Delete blog:       DELETE  api/blogs/:id
 Add comment:       POST    api/comments/blogs/:id
 Delete comment:    DELETE  api/comments/:id/blogs/:blogId
 Like blog:         POST    api/thumbsUps/blogs/:blogId
 Unlike blog:       DELETE  api/thumbsUps/:thumbsUpId/blogs/:blogId 
```
