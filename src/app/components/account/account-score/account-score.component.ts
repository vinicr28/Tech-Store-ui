import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-account-score',
  templateUrl: './account-score.component.html',
  styleUrls: ['./account-score.component.css']
})
export class AccountScoreComponent implements OnInit{

  creditScore: number;

  customerId = localStorage.getItem('customerId');

  rateIcon: string;
  rateText: string;


  
  constructor(private service: CustomerService){ }
  
  ngOnInit(): void {
    this.service.findById(this.customerId).subscribe((response: any) => {
      this.creditScore = parseInt(response.creditScore);
      this.ratesByScore();
    })
    
    

  }
  
  ratesByScore() {

    if(this.creditScore < 10){
      this.rateIcon = 'sentiment_very_dissatisfied';
      this.rateText = 'No benefits.';
    }else {
      if(this.creditScore < 25){
        this.rateIcon = 'sentiment_dissatisfied';
        document.documentElement.style.setProperty('--div-icon-color', 'orange');
        this.rateText = 'Slowly improving.';
      }else {
        if(this.creditScore < 50){
          this.rateIcon = 'sentiment_satisfied';
          document.documentElement.style.setProperty('--div-icon-color', 'blue');
          this.rateText = 'Advantages getting closer!';
        }else {
          if(this.creditScore < 75){
            this.rateIcon = 'sentiment_very_satisfied';
            document.documentElement.style.setProperty('--div-icon-color', 'lightgreen');
            this.rateText = 'Great rewards!';
          }else {
            this.rateIcon = 'mood';
            document.documentElement.style.setProperty('--div-icon-color', 'darkgreen');
            this.rateText = 'Excellent benefits!';
          }
        }
      }
    }
   }


}
