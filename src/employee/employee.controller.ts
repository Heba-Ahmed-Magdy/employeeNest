import { Controller, Get, Post, Body, Put, Param, Delete, UseFilters, UsePipes } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { HttpExceptionFilter } from 'src/Exception/http-exception.filter';
import { JoiValidationPipe } from 'src/pipes/employee.pipe';
import Joi = require('@hapi/joi');

export class employee{
    id:number;
    name:string;
    age:number;
    constructor(id:number,name:string,age:number){
       this.id=id;
       this.name=name;
       this.age=age;
    }
}
@Controller('employee')
@UseFilters(new HttpExceptionFilter())
export class EmployeeController {
    constructor(private readonly empService:EmployeeService){}

    @Post()
    @UsePipes(new JoiValidationPipe(Joi.object({name:Joi.required}) ))
    createEmp(@Body()emp:employee){
        return this.empService.create(emp);
    }
    @Get()
    getAllEmployees(){
        return this.empService.getAll();
    }
    @Put(':id')
    updateEmployee(@Param()id:number,@Body()emp:employee){
        return this.empService.update(id,emp);
    }
    @Delete(':id')
    deleteEmployee(@Param()id:number){
        return this.empService.delete(id);
    }

}
