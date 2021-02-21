package com.app.blog.dtos;

import com.app.blog.domain.Comment;

import static java.time.format.DateTimeFormatter.ofPattern;

public class CommentDto {

    private String id;
    private String content;
    private String commentedAt;
    private UserDto commentedBy;

    private CommentDto() {

    }

    public CommentDto(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.commentedAt = comment.getCommentedAt().format(ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.commentedBy = new UserDto(comment.getCommentedBy());
    }

    public String getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public String getCommentedAt() {
        return commentedAt;
    }

    public UserDto getCommentedBy() {
        return commentedBy;
    }
}
