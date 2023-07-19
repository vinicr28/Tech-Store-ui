import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductOffering } from 'src/app/models/productOffering';
import { ProductOfferingService } from 'src/app/services/product-offering.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
  
  product: ProductOffering = {
    id: null,
    productName: '',
    unitPrice: null,
    state: '',
    sellIndicator: null,
  }

  productName = new FormControl(null, Validators.minLength(3));
  unitPrice = new FormControl(null, Validators.nullValidator);
  
  constructor(public dialogRef: MatDialogRef<ProductEditComponent>, 
              private service: ProductOfferingService,
              private toast: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any){ }

  ngOnInit(): void {
    this.service.findById(this.data.id).subscribe((response: any) => {
      this.product = response;
      this.product.sellIndicator = response.notForSale;
    })
  }

  updateProduct(){
    this.service.updateProduct(this.product, this.data.id).subscribe(() => {
      this.toast.info('Product updated');
      this.dialogRef.close();
    })
  }

  deleteProduct(){
    this.service.deleteProduct(this.data.id).subscribe(() => {
      this.toast.warning('Product Deleted');
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
