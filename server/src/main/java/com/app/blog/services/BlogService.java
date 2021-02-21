package com.app.blog.services;

import com.app.blog.domain.Blog;
import com.app.blog.domain.User;
import com.app.blog.dtos.BlogDto;
import com.app.blog.repository.BlogRepository;
import com.app.blog.repository.UserRepository;
import com.app.blog.security.services.UserPrinciple;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    public BlogService(BlogRepository blogRepository, UserRepository userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public BlogDto saveBlog(BlogDto blogDto) {
        UserPrinciple userPrinciple = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User createdBy = userRepository.findById(userPrinciple.getId())
                .orElseThrow(RuntimeException::new);
        Blog blog = this.blogRepository.save(new Blog(blogDto.getContent(), createdBy));
        return new BlogDto(blog);
    }

    @Transactional(readOnly = true)
    public BlogDto getBlogById(String id) {
        Blog blog = this.blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Blog not found, %s", id)));
        return new BlogDto(blog);
    }

    @Transactional(readOnly = true)
    public List<BlogDto> getAllBlogs() {
        return this.blogRepository.findAll()
                .stream()
                .map(BlogDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void removeBlog(String id) {
        Blog blog = this.blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        if (!this.isOwnBlog(blog)) {
            throw new RuntimeException("can only delete your blog");
        }
        this.blogRepository.delete(blog);
    }

    private boolean isOwnBlog(Blog blog) {
        UserPrinciple userPrinciple = (UserPrinciple) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        return blog.getCreatedBy().getId().equals(userPrinciple.getId());
    }
}
