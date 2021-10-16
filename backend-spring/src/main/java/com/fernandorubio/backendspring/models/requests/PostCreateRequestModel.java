package com.fernandorubio.backendspring.models.requests;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

public class PostCreateRequestModel {
  @NotEmpty(message = "El titulo es obligatorio")
  private String title;

  @NotEmpty(message = "El contenido es obligatorio")
  private String content;

  @NotNull(message = "El exposure es obligatorio")
  @Range(min=1,max=2,message = "El exposure es inválida")
  private long exposureId;

  @NotNull(message = "El tiempo de expiracion es obligatorio")
  @Range(min=0,max=1440,message = "El tiempo de expiracion es inválido")
  private int expirationTime;

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
  public long getExposureId() {
    return exposureId;
  }
  public void setExposureId(long exposureId) {
    this.exposureId = exposureId;
  }
  public int getExpirationTime() {
    return expirationTime;
  }
  public void setExpirationTime(int expirationTime) {
    this.expirationTime = expirationTime;
  }
  
}
