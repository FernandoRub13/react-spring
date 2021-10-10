package com.fernandorubio.backendspring.services;

import com.fernandorubio.backendspring.shared.dto.UserDto;

public interface UserServiceInterface {
  public UserDto createUser(UserDto user);
}
