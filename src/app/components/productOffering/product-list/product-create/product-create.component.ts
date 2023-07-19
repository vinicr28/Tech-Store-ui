import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductOffering } from 'src/app/models/productOffering';
import { ProductOfferingService } from 'src/app/services/product-offering.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit{

  product: ProductOffering = {
    id: null,
    productName: '',
    unitPrice: null,
    state: '',
    sellIndicator: false,
  }

  productName = new FormControl(null, Validators.minLength(3));
  unitPrice = new FormControl(null, Validators.nullValidator);

  constructor(public dialogRef: MatDialogRef<ProductCreateComponent>, 
              private service: ProductOfferingService,
              private toast: ToastrService,){ }

  ngOnInit(): void {
    
  }

  insertProduct(){
    this.product.unitPrice = parseFloat(this.product.unitPrice.toString());
    this.service.insertProduct(this.product).subscribe(() => {
      this.toast.info('Product created')
      this.dialogRef.close();
    }) 
  }

  setSellIndicator(selected: boolean){ 
    if(!selected){
      this.product.state = "Active"
    } else {
      this.product.state = "Inactive"
    }
    this.product.sellIndicator = selected;
  }

  validateField(): boolean {
   return this.productName.valid && this.unitPrice.valid;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
 
}
