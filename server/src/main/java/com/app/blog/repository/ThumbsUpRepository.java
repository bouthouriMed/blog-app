package com.app.blog.repository;

import com.app.blog.domain.ThumbsUp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThumbsUpRepository extends JpaRepository<ThumbsUp, String> {

}
