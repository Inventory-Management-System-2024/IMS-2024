import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userStatus',
  standalone: true
})
export class UserStatusPipe implements PipeTransform {
  transform(val: boolean): string {
    if(val==true){
      return "Online";
    }
    else{
      return "Offline";
    }
  }
}
