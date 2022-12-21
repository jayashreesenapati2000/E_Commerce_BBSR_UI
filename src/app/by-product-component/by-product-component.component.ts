import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-product-component',
  templateUrl: './by-product-component.component.html',
  styleUrls: ['./by-product-component.component.css']
})
export class ByProductComponentComponent implements OnInit {

	productDetails: Product[] = [];
	orderDetails: OrderDetails = {
		fullName: '',
		fullAddress: '',
		contactNumber: '',
		alternateContactNumber: '',
		orderProductQuantityList: []
	}
  constructor(private activatedRoute: ActivatedRoute,
	private productService: ProductService,
  private router: Router) { }

  ngOnInit(): void {
	  this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
	  this.productDetails?.forEach(
		  x => this.orderDetails.orderProductQuantityList.push(
			  {productId: x.productId, quantity: 1}
		  )
	  );
	  console.log(this.productDetails);
	  console.log(this.orderDetails);
  }
  public placeOrder(orderForm: NgForm) {
	  console.log(this.orderDetails);
	  this.productService.placeOrder(this.orderDetails).subscribe(
		  (resp) => {
			  console.log(resp);
			  orderForm.reset();
			  this.router.navigate(["/orderConform"]);
		  },
		  (err) => {
			  console.log(err);
		  }
	  );
  }

  public getQuantityForProduct(productId){

	const filteredProduct =  this.orderDetails.orderProductQuantityList.filter(
		(productQuantity) => productQuantity.productId === productId
	);
	return filteredProduct[0].quantity;
  }

  public getCalculatedTotal(productId,productDiscountedPrice) {
	  const filteredProduct =  this.orderDetails.orderProductQuantityList.filter(
		  (productQuantity) => productQuantity.productId === productId
	  );
	  return filteredProduct[0].quantity * productDiscountedPrice;
  }

  public onQuantityChanged(quantity, productId) {

	this.orderDetails.orderProductQuantityList.filter(
		(orderProduct) => orderProduct.productId === productId
	)[0].quantity = quantity;
  }

  public getCalculatedGrandTotal() {
	  let grandTotal = 0;
	  this.orderDetails.orderProductQuantityList.forEach(
		  (productQuantity) => {
			  const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice;
			  grandTotal = grandTotal + price * productQuantity.quantity;
		  }
	  );
	  return grandTotal;
  }

}
