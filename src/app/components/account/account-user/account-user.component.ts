import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserEditComponent } from './user-edit/user-edit.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.component.html',
  styleUrls: ['./account-user.component.css']
})
export class AccountUserComponent implements OnInit{
  user: User = {
    id: parseInt(localStorage.getItem('userId')),
    email: '',
    password: '',
    customer: {
      customerName: '',
      documentNumber: null,
      customerStatus: '',
      customerType: '',
      creditScore: '',
      userId: null,
    },
  }
  
  constructor(private service: UserService,
              private router: Router,
              public dialog: MatDialog){ }
  
  ngOnInit(): void {
    this.service.findById(this.user.id).subscribe((response: any) => {
      this.user = response;
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserEditComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['account']));
      console.log('The dialog was closed');
    });
  }

}
