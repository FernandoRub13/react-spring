package com.fernandorubio.backendspring.services;

import java.util.UUID;

import com.fernandorubio.backendspring.UserRepository;
import com.fernandorubio.backendspring.entities.UserEntity;
import com.fernandorubio.backendspring.shared.dto.UserDto;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserServiceInterface {

  @Autowired UserRepository userRepository;
  @Autowired BCryptPasswordEncoder bCryptPasswordEncoder;

  @Override
  public UserDto createUser(UserDto user) {

    if (userRepository.findUserByEmail(user.getEmail()) != null ) 
      throw new RuntimeException("El correo electrónico ya existe");
    
    UserEntity userEntity = new UserEntity();
    BeanUtils.copyProperties(user, userEntity);
    
    userEntity.setEncryptedPassword(
      bCryptPasswordEncoder.encode(user.getPassword())
    );

    UUID userId = UUID.randomUUID();
    userEntity.setUserId(userId.toString());
    
    UserEntity storedUserDetails = userRepository.save(userEntity);
    
    UserDto userToReturn = new UserDto();
    BeanUtils.copyProperties(storedUserDetails, userToReturn );



    return userToReturn;
  }

  @Override
  public UserDetails loadUserByUsername(String arg0) throws UsernameNotFoundException {
    // TODO Auto-generated method stub
    return null;
  }
  
}
