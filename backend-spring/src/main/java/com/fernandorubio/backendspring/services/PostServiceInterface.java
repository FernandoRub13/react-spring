package com.fernandorubio.backendspring.services;

import java.util.List;

import com.fernandorubio.backendspring.shared.dto.PostCreationDto;
import com.fernandorubio.backendspring.shared.dto.PostDto;

public interface PostServiceInterface {
  public PostDto createPost(PostCreationDto post);
  public List<PostDto> getLastPosts();
  public PostDto getPost(String id);
  public void deletePost(String postId, long userId);
  public PostDto updatePost(String postId, long userId, PostCreationDto postUpdateDto);

}
