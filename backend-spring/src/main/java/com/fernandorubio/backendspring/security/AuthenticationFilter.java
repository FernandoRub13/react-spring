package com.fernandorubio.backendspring.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fernandorubio.backendspring.SpringApplicationContext;
import com.fernandorubio.backendspring.models.requests.UserLoginRequesModel;
import com.fernandorubio.backendspring.services.UserServiceInterface;
import com.fernandorubio.backendspring.shared.dto.UserDto;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {
  private final AuthenticationManager authenticationManager;

  public AuthenticationFilter(AuthenticationManager authenticationManager) {
    this.authenticationManager = authenticationManager;
  }

  @Override
  public Authentication  attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
    try {
      UserLoginRequesModel userModel = new ObjectMapper().readValue(request.getInputStream(), UserLoginRequesModel.class);
      return authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
          userModel.getEmail(),
          userModel.getPassword(),
          new ArrayList<>()
          ));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication ) throws IOException, ServletException {
    String username = ((User) authentication.getPrincipal()).getUsername();

    String token = Jwts.builder()
    .setSubject(username)
    .setExpiration(new Date(System.currentTimeMillis()+ SecurityConstants.EXPIRATION_DATE))
    .signWith(SignatureAlgorithm.HS512 , SecurityConstants.getTokenSecret())
    .compact();

    //agregar el header con el id publico
    UserServiceInterface userService = (UserServiceInterface) SpringApplicationContext.getBean("userService");
    UserDto userDto = userService.getUser(username);

    response.addHeader("userId", userDto.getUserId() );
    response.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);

  }

}
