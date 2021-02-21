package com.app.blog.domain;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

import static javax.persistence.FetchType.LAZY;

@Entity
public class ThumbsUp extends Identity {

    @OneToOne(fetch = LAZY)
    private User likedBy;

    private ThumbsUp() {

    }

    public ThumbsUp(User likedBy) {
        this.likedBy = likedBy;
    }

    public User getLikedBy() {
        return likedBy;
    }
}
