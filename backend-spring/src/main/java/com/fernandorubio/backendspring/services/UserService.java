package com.fernandorubio.backendspring.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fernandorubio.backendspring.entities.PostEntity;
import com.fernandorubio.backendspring.entities.UserEntity;
import com.fernandorubio.backendspring.exceptions.EmailExistsException;
import com.fernandorubio.backendspring.repositories.PostRepository;
import com.fernandorubio.backendspring.repositories.UserRepository;
import com.fernandorubio.backendspring.shared.dto.PostDto;
import com.fernandorubio.backendspring.shared.dto.UserDto;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserServiceInterface {

  @Autowired UserRepository userRepository;
  @Autowired PostRepository postRepository;
  @Autowired BCryptPasswordEncoder bCryptPasswordEncoder;
  @Autowired ModelMapper mapper;

  @Override
  public UserDto createUser(UserDto user) {

    if (userRepository.findByEmail(user.getEmail()) != null ) 
      throw new EmailExistsException("El correo electrónico ya existe");
    
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
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    UserEntity userEntity = userRepository.findByEmail(email);
    
    if(userEntity == null){
      throw new UsernameNotFoundException(email);
    }

    return new User(userEntity.getEmail(), userEntity.getEncryptedPassword(), new ArrayList<>() );
  }

  @Override
  public UserDto getUser(String email) {
    UserEntity userEntity = userRepository.findByEmail(email);
    
    if(userEntity == null){
      throw new UsernameNotFoundException(email);
    }

    UserDto userToReturn  = new UserDto();

    BeanUtils.copyProperties(userEntity, userToReturn);

    return userToReturn;
  }

  @Override
  public List<PostDto> getUserPosts(String email) {
    
    UserEntity userEntity = userRepository.findByEmail(email);
    List<PostEntity> posts = postRepository.getByUserIdOrderByCreatedAtDesc(userEntity.getId());
    List<PostDto> postDtos  = new ArrayList<>();
    for (PostEntity post: posts) {
      PostDto postDto = mapper.map(post, PostDto.class);
      postDtos.add(postDto);
    }
    return postDtos;
  }
  
}
