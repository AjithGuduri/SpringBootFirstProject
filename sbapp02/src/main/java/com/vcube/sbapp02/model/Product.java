package com.vcube.sbapp02.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "spproduct")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	 Integer pid;
	 String pname;
	 Double price;
	 Integer qty;
	 public Integer getPid() {
		 return pid;
	 }
	 public void setPid(Integer pid) {
		 this.pid = pid;
	 }
	 public String getPname() {
		 return pname;
	 }
	 public void setPname(String pname) {
		 this.pname = pname;
	 }
	 public Double getPrice() {
		 return price;
	 }
	 public void setPrice(Double price) {
		 this.price = price;
	 }
	 public Integer getQty() {
		 return qty;
	 }
	 public void setQty(Integer qty) {
		 this.qty = qty;
	 }



}
