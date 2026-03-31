package com.vcube.sbapp02.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.vcube.sbapp02.model.Product;

public interface ProductRepo extends JpaRepository<Product, Integer> {


}
