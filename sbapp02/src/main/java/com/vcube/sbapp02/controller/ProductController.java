package com.vcube.sbapp02.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.vcube.sbapp02.model.Product;
import com.vcube.sbapp02.repo.ProductRepo;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ProductController {

	@Autowired
	private ProductRepo productrepo;

	// ✅ INSERT
	// http://localhost:1343/api/v1/insertp
	@PostMapping("/insertp")
	public Product insertpro(@RequestBody Product product) {
		return productrepo.save(product);
	}

	// ✅ GET ALL
	// http://localhost:1343/api/v1/getpro
	@GetMapping("/getpro")
	public List<Product> getpro() {
		return productrepo.findAll();
	}

	// ✅ GET BY ID
	// http://localhost:1343/api/v1/getid/1
	@GetMapping("/getid/{id}")
	public Product getproductById(@PathVariable Integer id) {
		return productrepo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
	}

	// ✅ UPDATE (PUT)
	// http://localhost:1343/api/v1/updatepro/1
	@PutMapping("/updatepro/{id}")
	public Product update(@PathVariable Integer id, @RequestBody Product product) {

		Product existing = productrepo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));

		existing.setPname(product.getPname());
		existing.setPrice(product.getPrice());
		existing.setQty(product.getQty());

		return productrepo.save(existing);
	}

	// ✅ PATCH (Partial Update)
	// http://localhost:1343/api/v1/patch/1
	@PatchMapping("/patch/{id}")
	public Product patch(@PathVariable Integer id, @RequestBody Product product) {

		Product existing = productrepo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));

		if (product.getPname() != null)
			existing.setPname(product.getPname());

		if (product.getPrice() != 0)
			existing.setPrice(product.getPrice());

		if (product.getQty() != 0)
			existing.setQty(product.getQty());

		return productrepo.save(existing);
	}

	// ✅ DELETE
	// http://localhost:1343/api/v1/delete/1
	@DeleteMapping("/delete/{id}")
	public String deleteById(@PathVariable Integer id) {
		productrepo.deleteById(id);
		return "Product deleted successfully: " + id;
	}
}