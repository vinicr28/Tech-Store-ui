import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductOffering } from 'src/app/models/productOffering';
import { ProductOfferingService } from 'src/app/services/product-offering.service';
import { OrderCreateComponent } from '../../order/order-create/order-create.component';
import { AuthService } from 'src/app/services/auth.service';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  token: string;

  pageIndex = 0;

  ELEMENT_DATA: ProductOffering[] = []

  role: boolean;

  iconColor = 'primary';

  displayedColumns: string[] = ['id', 'name', 'price', 'status', 'options'];
  dataSource = new MatTableDataSource<ProductOffering>(this.ELEMENT_DATA);

  constructor(private service: ProductOfferingService,
              private authService: AuthService,
              private router: Router,
              public dialog: MatDialog){ }

  ngOnInit(): void {
    this.findAll();
    this.role =  this.authService.getRole();
  }

  findAll(){
    this.service.findAll(this.pageIndex).subscribe(response => {
      this.ELEMENT_DATA = response
      this.dataSource = new MatTableDataSource<ProductOffering>(response);
      this.token = localStorage.getItem('token');
      let tokenContent: any = JSON.parse(atob(this.token.split(".")[1]))
      console.log(tokenContent)
    })
  }

  hiddeInactive(state: string): boolean{
    this.iconColor = 'primary'

    if (state == 'Inactive'){
      this.iconColor = 'basic'
      return true
    }
    return false
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  previousPage(){
    this.pageIndex -= 1;

    if(this.pageIndex < 0){
      this.pageIndex = 0
    }

    this.findAll();
  }

  nextPage() {
    this.pageIndex += 1;
    
    if(this.pageIndex > 100){
      this.pageIndex = 100
    }

    this.findAll();
  }

  //------------------------------add to cart--------------------------//
  openDialog(id: any): void { //create order
    sessionStorage.setItem('productId', id);
    const dialogRef = this.dialog.open(OrderCreateComponent);

    dialogRef.afterClosed().subscribe(() => {
      sessionStorage.removeItem('productId');
      this.dialog.closeAll;
      console.log('The dialog was closed');
    });
  }

  openDialogCreate(): void { //adm crate product
    const dialogRef = this.dialog.open(ProductCreateComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['products']));
      this.dialog.closeAll;
      console.log('The dialog was closed');
    });
  }

  openDialogEdit(id: any): void { //adm edit product
    const dialogRef = this.dialog.open(ProductEditComponent, {
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['products']));
      this.dialog.closeAll;
      console.log('The dialog was closed');
    });
  }
}