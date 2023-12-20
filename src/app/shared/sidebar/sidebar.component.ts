import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
interface Imenu{
  title:string,
  icon:string,
  link:string,
  isActive:boolean
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
@Output() isOpenedflag = new EventEmitter<boolean>();
isOpened:boolean=true;
constructor(private _auth:AuthService){ }
toggleSidebar(){
  this.isOpened=!this.isOpened;

  this.isOpenedflag.emit(this.isOpened)
}


isManager():boolean{
  if (this._auth.role == 'Manager') {
    return this._auth.role == 'Manager'
  }else{
    return false
  }
}
isEmployee():boolean{
  if (this._auth.role == 'Employee') {
    return true
  }else{
    return false
  }
}

  menu:Imenu[]=[
    { icon:'fa-solid fa-house',
    title:'home',
    link:'/dashboard/manager/home',
    isActive: this.isManager()
  },
    { icon:'fa-solid fa-house',
    title:'home',
    link:'/dashboard/employee/home',
    isActive: this.isEmployee()
  },
    { icon:'fa-solid fa-layer-group',
    title:'projects',
    link:'/dashboard/manager/projects',
    isActive:this.isManager()
  },
    { icon:'fa-solid fa-list-check',
    title:'tasks',
    link:'/dashboard/manager/tasks',
    isActive:this.isManager()
  },
    { icon:'fa-solid fa-layer-group',
    title:'user projects',
    link:'/dashboard/emolyee',
    isActive:this.isEmployee()
  },
    { icon:'fa-solid ffa-list-check',
    title:'E-tasks',
    link:'/dashboard/employee/',
    isActive:this.isEmployee()
  },
  
  ]
}
