package com.fernandorubio.backendspring.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fernandorubio.backendspring.models.requests.PostCreateRequestModel;
import com.fernandorubio.backendspring.models.responses.OperationStatusModel;
import com.fernandorubio.backendspring.models.responses.PostRest;
import com.fernandorubio.backendspring.services.PostServiceInterface;
import com.fernandorubio.backendspring.services.UserServiceInterface;
import com.fernandorubio.backendspring.shared.dto.PostCreationDto;
import com.fernandorubio.backendspring.shared.dto.PostDto;
import com.fernandorubio.backendspring.shared.dto.UserDto;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
public class PostController {

  @Autowired PostServiceInterface postService;
  @Autowired ModelMapper mapper;
  @Autowired UserServiceInterface userService;

  @PostMapping
  public PostRest createPost(@RequestBody PostCreateRequestModel createRequestModel){



    Authentication authentication  = SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getPrincipal().toString();

    PostCreationDto postCreationDto = mapper.map(createRequestModel, PostCreationDto.class);

    postCreationDto.setUserEmail(email);

    PostDto postDto = postService.createPost(postCreationDto); 

    PostRest postToReturn = mapper.map(postDto, PostRest.class);

    if (postToReturn.getExpiresAt().compareTo(new Date(System.currentTimeMillis())) < 0) {
      postToReturn.setExpired(true);
    }

    return postToReturn;
  }
  @GetMapping(path = "/last")
  public List<PostRest> lastPosts(){
    List<PostDto> posts = postService.getLastPosts();
    List<PostRest> postRests = new ArrayList<>();
    //convertir de lista de post dto a post rest
    for (PostDto post: posts) {
      PostRest postRest = mapper.map(post, PostRest.class);
      postRests.add(postRest);
    }
    return postRests ;

  }
  @GetMapping(path = "/{id}")
  public PostRest getPost(@PathVariable String id) {
    
    PostDto postDto = postService.getPost(id);
    PostRest postRest = mapper.map(postDto, PostRest.class);
    if (postRest.getExpiresAt().compareTo(new Date(System.currentTimeMillis())) < 0) {
      postRest.setExpired(true);
    }

    if(postRest.getExposure().getId() == 1 || postRest.isExpired()){
      Authentication authentication  = SecurityContextHolder.getContext().getAuthentication();
      String email = authentication.getPrincipal().toString();
      UserDto user = userService.getUser(email);
      if (user.getId() != postDto.getUser().getId() ) {
        throw new RuntimeException("No tines permisos para relaizar la acción");
      }

    }
    return postRest;
  } 
  @DeleteMapping(path = "/{id}")
  public OperationStatusModel deletePost(@PathVariable String id){
    Authentication authentication  = SecurityContextHolder.getContext().getAuthentication();
    String email = authentication.getPrincipal().toString();
    UserDto user = userService.getUser(email);
    OperationStatusModel operationStatusModel = new OperationStatusModel();
    operationStatusModel.setName("DELETE");
    
    postService.deletePost(id, user.getId());
    operationStatusModel.setResult("SUCCESS");

    return operationStatusModel;
  }
  @PutMapping(path = "/{id}")
  public PostRest updatePost(@RequestBody PostCreateRequestModel postCreateRequestModel, @PathVariable String id){

    Authentication authentication  = SecurityContextHolder.getContext().getAuthentication();
    String email = authentication.getPrincipal().toString();
    UserDto user = userService.getUser(email);

    PostCreationDto postUpdateDto = mapper.map(postCreateRequestModel, PostCreationDto.class );
    
    PostDto postDto = postService.updatePost(id, user.getId(), postUpdateDto );

    PostRest updatedPost = mapper.map(postDto, PostRest.class);

    return updatedPost;
  }
}
