package com.fernandorubio.backendspring.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity(name= "posts")
@EntityListeners(AuditingEntityListener.class)
public class PostEntity implements Serializable {
  private static final long serialVersionUID = 1L; 
  @Id
  @GeneratedValue
  private long id;

  @Column(nullable = false)
  private String post_id;
  @Column(nullable = false)
  private String title;
  @Column(nullable = false, columnDefinition = "TEXT")
  private String content;
  @Column(nullable = false)
  private Date expires_at;
  @CreatedDate
  private Date created_at;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private UserEntity user;

  @ManyToOne
  @JoinColumn(name = "exposure_id")
  private ExposureEntity exposure;

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
  public UserEntity getUser() {
    return user;
  }
  public void setUser(UserEntity user) {
    this.user = user;
  }
  public ExposureEntity getExposure() {
    return exposure;
  }
  public void setExposure(ExposureEntity exposure) {
    this.exposure = exposure;
  }
  

  

}
