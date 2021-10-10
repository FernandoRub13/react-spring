package com.fernandorubio.backendspring.controllers;

import com.fernandorubio.backendspring.models.requests.UserDetailsRequestModel;
import com.fernandorubio.backendspring.models.responses.UserRest;
import com.fernandorubio.backendspring.services.UserService;
import com.fernandorubio.backendspring.services.UserServiceInterface;
import com.fernandorubio.backendspring.shared.dto.UserDto;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

  @Autowired UserServiceInterface userService;
  
  @GetMapping
  public String getUser(){
    return "get user details";
  }
  @PostMapping
  public UserRest postUser(@RequestBody UserDetailsRequestModel userDetails){
    UserRest userToReturn = new UserRest();
    UserDto userDto = new UserDto();

    BeanUtils.copyProperties(userDetails, userDto);
    UserDto createdUser = userService.createUser(userDto);

    BeanUtils.copyProperties(createdUser, userToReturn);
    return  userToReturn;
  }
}
