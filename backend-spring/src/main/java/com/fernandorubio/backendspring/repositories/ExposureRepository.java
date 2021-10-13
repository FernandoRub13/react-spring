package com.fernandorubio.backendspring.repositories;

import com.fernandorubio.backendspring.entities.ExposureEntity;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExposureRepository extends CrudRepository<ExposureEntity, Long> {
   ExposureEntity findById(long id);
}
