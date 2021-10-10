package com.fernandorubio.backendspring.services;

import java.util.UUID;

import com.fernandorubio.backendspring.UserRepository;
import com.fernandorubio.backendspring.entities.UserEntity;
import com.fernandorubio.backendspring.shared.dto.UserDto;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserServiceInterface {

  @Autowired UserRepository userRepository;

  @Override
  public UserDto createUser(UserDto user) {

    if (userRepository.findUserByEmail(user.getEmail()) != null ) 
      throw new RuntimeException("El correo electrónico ya existe");
    
    UserEntity userEntity = new UserEntity();
    BeanUtils.copyProperties(user, userEntity);
    
    userEntity.setEncryptedPassword("encryptedPassword");
    UUID userId = UUID.randomUUID();
    userEntity.setUserId(userId.toString());
    
    UserEntity storedUserDetails = userRepository.save(userEntity);
    
    UserDto userToReturn = new UserDto();
    BeanUtils.copyProperties(storedUserDetails, userToReturn );



    return userToReturn;
  }
  
}
