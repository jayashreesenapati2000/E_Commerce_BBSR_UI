import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	productDetails = [];
  constructor(private productService: ProductService,
			  private imageProcessingService: ImageProcessingService,
			  private router: Router
				) { }

  ngOnInit(): void {
	  this.getAllProducts();
  }

  public getAllProducts(){
	  this.productService.getAllProducts()
	  .pipe(
		map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
	  )
	  .subscribe(
		  (resp: Product[]) => {
			  console.log(resp)
			  this.productDetails=resp;
		  }, (error: HttpErrorResponse) => {
			  console.log(error);
		  }
	  );
  }

  showProductDetails(productId) {
	  this.router.navigate(['/productViewDetails', {productId: productId}]);
  }

}
