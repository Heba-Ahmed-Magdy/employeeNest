import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { employee } from './employee.controller';

@Injectable()
export class EmployeeService {
    employees:employee[]=[
        new employee(1,'ahmed1',23),
        new employee(2,'ahmed2',24),
        new employee(3,'ahmed3',25),
    ];
    create(emp:employee){
        emp.id=Number(emp.id);
        emp.age=Number(emp.age);
        this.employees.push(emp);
        return this.employees;
    }
    getAll(){
        return this.employees;
    }
    update(id:number,emp:employee){
        let index=this.employees.findIndex(e=>e.id===id);
        this.employees.splice(index,1);
        this.employees.push(emp);
        return this.employees;
    }
    delete(id:number){
        let index=this.employees.findIndex(e=>e.id===id);
        if(index===-1)
            throw new HttpException('Invalid index', HttpStatus.FORBIDDEN);
        this.employees.splice(index,1);
        return this.employees;
    }

}
