

const res = require('express/lib/response');
const { json } = require('express/lib/response');
const fs = require('node:fs');
const { resolve } = require('node:path');

var employees = [];
var departments = [];


function initialize (){

    return new Promise((resolve,reject) => {
        fs.readFile('data/employees.json', (err,emp) => {

            if(err){
                reject("Unable to read the file");
            }
            else{
                employees = JSON.parse(emp);
    
                fs.readFile('data/departments.json', (er,dept) => {
                    if(er){
                        reject("Unable to read the file");
                    }
                    else{
                        departments = JSON.parse(dept);
                        resolve();
                    }
                })
            }
        })
    })
   
}

function getAllEmployees(){

    return new Promise((resolve, reject) => {
        
        if(employees.length == 0){
            reject("No results Returned");
        }
        else{
            resolve(employees);
        }


    })


}

function getDepartments(){


    return new Promise((resolve, reject) => {
        
        if(departments.length == 0){
            reject("No results Returned");
        }
        else{
            resolve(departments);
        }


    })

}

function getManagers(){

    var isManagers = [];

    return new Promise((resolve,reject) => {
        for(let i=0; i < employees.length; i++){
            if(employees[i].isManager){
                isManagers.push(employees[i]);
            }
        }

        if(isManagers.length == 0){
            reject("No results Returned");
        }
        else {
            resolve(isManagers);
        }
    })


}

function addEmployee(employeeData){


    return new Promise((resolve,reject)=>{

        employeeData.employeeNum = (employees.length+1);
        if(employeeData.isManager == undefined){
            employeeData.isManager = false;
        }
        else{
            employeeData.isManager = true;
        }

        employees.push(employeeData);

        resolve();

    })


}

function getEmployeesByStatus(status){


    var employ = [];

        return new Promise ((resolve,reject) =>{

            for(let i=0; i < employees.length; i++){
                if(employees[i].status==status){
                    employ.push(employees[i]);
                }
            }
    
            if(employ.length == 0){
                reject("No results Returned");
            }
            else {
                resolve(employ);
            }


        })
}


function getEmployeesByDepartment(department){

    var depart = [];

    return new Promise ((resolve,reject) =>{

        for(let i=0; i < employees.length; i++){
            if(employees[i].department==department){
                depart.push(employees[i]);
            }
        }

        if(depart.length == 0){
            reject("No results Returned");
        }
        else {
            resolve(depart);
        }


    })

}

function getEmployeesByManager(manager){


var mang = [];

    return new Promise ((resolve,reject) =>{

        for(let i=0; i < employees.length; i++){
            if(employees[i].employeeManagerNum==manager){
                mang.push(employees[i]);
            }
        }

        if(mang.length == 0){
            reject("No results Returned");
        }
        else {
            resolve(mang);
        }


    })

}

function getEmployeeByNum(num){

    return new Promise ((resolve,reject) =>{

        for(let i=0; i < employees.length; i++){
            if(employees[i].employeeNum==num){
                resolve(employees[i]);
            }
        }

        reject("No results Returned");
        


    })


}

exports.getEmployeeByNum = getEmployeeByNum;
exports.getEmployeesByManager = getEmployeesByManager;
exports.getEmployeesByDepartment = getEmployeesByDepartment;
exports.getEmployeesByStatus = getEmployeesByStatus;
exports.addEmployee = addEmployee;
exports.getManagers = getManagers;
exports.getDepartments = getDepartments;
exports.getAllEmployees = getAllEmployees;
exports.initialize = initialize;