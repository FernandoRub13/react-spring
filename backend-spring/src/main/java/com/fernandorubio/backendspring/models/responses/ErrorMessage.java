package com.fernandorubio.backendspring.models.responses;

import java.util.Date;

public class ErrorMessage {
  public Date timestamp;
  public String message;
  
  public ErrorMessage(Date timestamp, String message) {
    this.timestamp = timestamp;
    this.message = message;
  }
  public ErrorMessage() {
    
  }
  public Date getTimestamp() {
    return timestamp;
  }
  public void setTimestamp(Date timestamp) {
    this.timestamp = timestamp;
  }
  public String getMessage() {
    return message;
  }
  public void setMessage(String message) {
    this.message = message;
  }
  
}
