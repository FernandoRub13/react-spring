package com.fernandorubio.backendspring.controllers;

import com.fernandorubio.backendspring.models.requests.PostCreateRequestModel;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
public class PostController {
  @PostMapping
  public String createPost(@RequestBody PostCreateRequestModel createRequestModel){
    return createRequestModel.getTitle();
  }
}
