import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { AddressEditComponent } from './address-edit/address-edit.component';

@Component({
  selector: 'app-addresses-list',
  templateUrl: './addresses-list.component.html',
  styleUrls: ['./addresses-list.component.css']
})
export class AddressesListComponent implements OnInit{

  ELEMENT_DATA: Address[] = []

  displayedColumns: string[] = ['id', 'zipCode', 'street', 'number', 'neighborhood', 'country', 'addressType', 'actions'];
  dataSource = new MatTableDataSource<Address>(this.ELEMENT_DATA);

  constructor(private service: AddressService,
              private toast: ToastrService,
              private router: Router,
              public dialog: MatDialog,){ }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findAll(localStorage.getItem('customerId')).subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Address>(response);
    })
  }

  delete(id: any){ 
    this.service.deleteAddress(id).subscribe((response: any) => {
      this.toast.info(`Address deleted - id: ${id}`);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['address']));
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  hideElements(){
    this.service.hideElement = true;
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(AddressEditComponent);
    sessionStorage.setItem('addressId', id)
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['address']));
      console.log('The dialog was closed'); 
    });
  }

  

}
