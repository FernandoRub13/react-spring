package com.fernandorubio.backendspring.services;

import java.util.List;

import com.fernandorubio.backendspring.shared.dto.PostDto;
import com.fernandorubio.backendspring.shared.dto.UserDto;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserServiceInterface extends UserDetailsService {
  public UserDto createUser(UserDto user);
  public UserDto getUser(String email);
  public List<PostDto> getUserPosts(String email);

}
