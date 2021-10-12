package com.fernandorubio.backendspring.repositories;

import com.fernandorubio.backendspring.entities.PostEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends CrudRepository<PostEntity, Long> {
  
}
