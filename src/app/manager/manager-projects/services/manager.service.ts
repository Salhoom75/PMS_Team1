import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from 'src/app/models/project';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private _HttpClient:HttpClient) { }

  onAddProject(data:IProject):Observable<any>{
    return this._HttpClient.post('Project' , data)
  }
}