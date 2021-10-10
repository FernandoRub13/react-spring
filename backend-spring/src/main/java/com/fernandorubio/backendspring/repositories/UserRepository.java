package com.fernandorubio.backendspring.repositories;

import com.fernandorubio.backendspring.entities.UserEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long> {
  public UserEntity findUserByEmail(String email);
}
