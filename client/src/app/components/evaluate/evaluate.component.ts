import { Component } from '@angular/core';
import { AuthGuardService } from '../../shared/services';

@Component({
  selector: 'app-evaluate',
  standalone: true,
  imports: [],
  templateUrl: './evaluate.component.html',
  styleUrl: './evaluate.component.css'
})
export class EvaluateComponent {
  constructor(private as : AuthGuardService){
  }

  ngOnInit(){
    this.as.canActivate()
  }
}
