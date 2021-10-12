package com.fernandorubio.backendspring.services;

import com.fernandorubio.backendspring.shared.dto.PostCreationDto;
import com.fernandorubio.backendspring.shared.dto.PostDto;

public interface PostServiceInterface {
  public PostDto createPost(PostCreationDto post);
}
