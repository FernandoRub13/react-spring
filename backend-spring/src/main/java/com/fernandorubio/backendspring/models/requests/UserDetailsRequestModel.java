package com.fernandorubio.backendspring.models.requests;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class UserDetailsRequestModel {
  @NotEmpty(message = "El nombre es obligatorio")
  private String firstName;

  @NotEmpty(message = "El apellido es obligatorio")
  private String lastName;

  @NotEmpty(message = "El correo electrónico es obligatorio")
  @Email(message = "El correo electrónico es inválido")
  private String email;
  
  @NotEmpty(message = "La contrasena es obligatoria")
  @Size(min = 8, max = 30, message = "La contrasena debe tener entre 8 y 30 caracteres")
  private String password;
  
  public String getFirstName() {
    return firstName;
  }
  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }
  public String getLastName() {
    return lastName;
  }
  public void setLastName(String lastName) {
    this.lastName = lastName;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }

  
}
