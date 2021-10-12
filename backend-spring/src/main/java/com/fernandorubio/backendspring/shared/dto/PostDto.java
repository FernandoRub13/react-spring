package com.fernandorubio.backendspring.shared.dto;

import java.io.Serializable;
import java.util.Date;

public class PostDto implements Serializable{
  private static final long serialVersionUID = 1L;
  
  private long id;

  private String post_id;
  private String title;
  private String content;
  private Date expires_at;
  private Date created_at;
  private UserDto user;
  private ExposureDto exposure;
  public long getId() {
    return id;
  }
  public void setId(long id) {
    this.id = id;
  }
  public String getPost_id() {
    return post_id;
  }
  public void setPost_id(String post_id) {
    this.post_id = post_id;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getContent() {
    return content;
  }
  public void setContent(String content) {
    this.content = content;
  }
  public Date getExpires_at() {
    return expires_at;
  }
  public void setExpires_at(Date expires_at) {
    this.expires_at = expires_at;
  }
  public Date getCreated_at() {
    return created_at;
  }
  public void setCreated_at(Date created_at) {
    this.created_at = created_at;
  }
  public UserDto getUser() {
    return user;
  }
  public void setUser(UserDto user) {
    this.user = user;
  }
  public ExposureDto getExposure() {
    return exposure;
  }
  public void setExposure(ExposureDto exposure) {
    this.exposure = exposure;
  }
  
}
