package com.fernandorubio.backendspring.services;

import com.fernandorubio.backendspring.repositories.PostRepository;
import com.fernandorubio.backendspring.shared.dto.PostCreationDto;
import com.fernandorubio.backendspring.shared.dto.PostDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService implements PostServiceInterface {

  @Autowired PostRepository postRepository;

  @Override
  public PostDto createPost(PostCreationDto post) {
    // postRepository.
    return null;
  }
  
}
