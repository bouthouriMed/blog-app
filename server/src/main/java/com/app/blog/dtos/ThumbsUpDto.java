package com.app.blog.dtos;

import com.app.blog.domain.ThumbsUp;

import static java.util.Objects.nonNull;

public class ThumbsUpDto {

    private String id;
    private UserDto likedBy;

    public ThumbsUpDto(ThumbsUp thumbsUp) {
        if (nonNull(thumbsUp)) {
            this.id = thumbsUp.getId();
            this.likedBy = new UserDto(thumbsUp.getLikedBy());
        }
    }

    public String getId() {
        return id;
    }

    public UserDto getLikedBy() {
        return likedBy;
    }
}
