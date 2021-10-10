package com.fernandorubio.backendspring.services;

import com.fernandorubio.backendspring.shared.dto.UserDto;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserServiceInterface extends UserDetailsService {
  public UserDto createUser(UserDto user);
}