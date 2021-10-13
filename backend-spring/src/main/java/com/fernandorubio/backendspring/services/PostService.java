package com.fernandorubio.backendspring.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fernandorubio.backendspring.entities.ExposureEntity;
import com.fernandorubio.backendspring.entities.PostEntity;
import com.fernandorubio.backendspring.entities.UserEntity;
import com.fernandorubio.backendspring.repositories.ExposureRepository;
import com.fernandorubio.backendspring.repositories.PostRepository;
import com.fernandorubio.backendspring.repositories.UserRepository;
import com.fernandorubio.backendspring.shared.dto.PostCreationDto;
import com.fernandorubio.backendspring.shared.dto.PostDto;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService implements PostServiceInterface {

  @Autowired PostRepository postRepository;

  @Autowired UserRepository userRepository;
  
  @Autowired ExposureRepository exposureRepository;
  @Autowired ModelMapper mapper;

  @Override
  public PostDto createPost(PostCreationDto post) {
    
    UserEntity userEntity = userRepository.findByEmail(post.getUserEmail());
    ExposureEntity exposureEntity = exposureRepository.findById(post.getExposureId());
    PostEntity postEntity = new PostEntity();
    postEntity.setUser(userEntity);
    postEntity.setExposure(exposureEntity);
    postEntity.setTitle(post.getTitle());
    postEntity.setContent(post.getContent());
    postEntity.setPostId(UUID.randomUUID().toString());
    postEntity.setExpiresAt(new Date(System.currentTimeMillis() + (post.getExpirationTime() * 60000)));

    PostEntity createdPost = postRepository.save(postEntity);

    PostDto postToReturn = mapper.map(createdPost, PostDto.class);

    return postToReturn;
  }

  @Override
  public List<PostDto> getLastPosts() {
    long publicExposureId = 2; 
    List<PostEntity> postEntities = postRepository.getLastPublicPost(publicExposureId, new Date(System.currentTimeMillis()));

    List<PostDto> postsDtos = new ArrayList<>();
    for (PostEntity post : postEntities) {
      PostDto postDto = mapper.map(post, PostDto.class);
      postsDtos.add(postDto);
    }
    
    return postsDtos;
  }

  @Override
  public PostDto getPost(String postId) {

    PostEntity postEntity = postRepository.findByPostId(postId);
    PostDto postDto = mapper.map(postEntity, PostDto.class);

    return postDto;
  }

  @Override
  public void deletePost(String postId, long userId) {
    PostEntity postEntity = postRepository.findByPostId(postId);
    if (postEntity.getUser().getId() != userId ) {
      throw new RuntimeException("No tienes permitido realizar esta acción");
    }
    postRepository.delete(postEntity);    
  }

  @Override
  public PostDto updatePost(String postId, long userId, PostCreationDto postUpdateDto) {
    PostEntity postEntity = postRepository.findByPostId(postId);
    if (postEntity.getUser().getId() != userId ) {
      throw new RuntimeException("No tienes permitido realizar esta acción");
    }
    ExposureEntity exposureEntity = exposureRepository.findById(postUpdateDto.getExposureId());
    
    postEntity.setExposure(exposureEntity);
    postEntity.setTitle(postUpdateDto.getTitle());
    postEntity.setContent(postUpdateDto.getContent());
    postEntity.setExpiresAt(new Date(System.currentTimeMillis() + (postUpdateDto.getExpirationTime() * 60000)));
    
    PostEntity updatedPost =  postRepository.save(postEntity);

    PostDto postDto = mapper.map(updatedPost, PostDto.class);

    return postDto;
  }
  
}
