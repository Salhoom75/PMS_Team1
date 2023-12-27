
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit{

  todo:any[]=[]
  inprogress:any[]=[]
  done:any[]=[]
  id:any;
  constructor(private _employeeService:EmployeeService,private _toastr:ToastrService){}
  ngOnInit(): void {
    this.getMyTasks()
  }

getMyTasks(){
  let params={
    pageSize:100,
    pageNumber:1
  }
  this._employeeService.getMyAssignedTasks(params).subscribe({
    next:(res)=>{
      console.log(res);
      for (let task of res.data) {
        console.log(task.status);
        if(task.status == 'ToDo'){
this.todo.push(task)
console.log(this.todo);

        }else if (task.status == 'InProgress') {
          this.inprogress.push(task)
        } else {
          this.done.push(task)
        }
        
        
      }
    },error:(err)=>{

    },complete:()=> {
      
    },
  })
}
  items = ['Carrots', 'Tomatoes', 'Onions', 'Apples', 'Avocados'];

  basket = ['Oranges', 'Bananas', 'Cucumbers'];

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.container.id);
    console.log(event);
    const draggedItemId = event.item.data;
    console.log(draggedItemId);
    
    
    this._employeeService.changeTaskStatus(draggedItemId,event.container.id).subscribe({
      next:(res)=>{
        console.log(res);
        this._toastr.success(`Task Adedd to ${res.status}`)
      },error:(err)=>{

      },complete:()=>{
        
      }
    })
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
