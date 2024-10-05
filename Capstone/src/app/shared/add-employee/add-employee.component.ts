import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';

@Component({
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
    employeeForm: FormGroup;
    employees: Employee[] = [];
    isEditing: boolean = false; // Flag to check if editing
    currentEmployeeId: number | null = null; // Store current employee ID for updates

    constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
        this.employeeForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            salary: [null, [Validators.required, Validators.min(0)]],
            accountnumber: [null, Validators.required],
            email: ['', [Validators.required, Validators.email]],
            balance: [null, [Validators.required, Validators.min(0)]],
            clientRegistrationNumber: [null]
        });
    }

    ngOnInit(): void {
        this.getEmployees();
    }

    onSubmit() {
        if (this.employeeForm.valid) {
            const employee: Employee = this.employeeForm.value;

            if (this.isEditing) {
                // Update employee
                this.employeeService.updateEmployee(this.currentEmployeeId!, employee).subscribe({
                    next: (data) => {
                        console.log('Employee updated successfully:', data);
                        this.resetForm();
                        this.getEmployees(); // Refresh employee list
                    },
                    error: (error) => {
                        console.error('Error updating employee:', error);
                    }
                });
            } else {
                // Add new employee
                this.employeeService.addEmployee(employee).subscribe({
                    next: (data) => {
                        console.log('Employee added successfully:', data);
                        this.resetForm();
                        this.getEmployees(); // Refresh employee list
                    },
                    error: (error) => {
                        console.error('Error adding employee:', error);
                    }
                });
            }
        }
    }

    // Fetch the list of employees
    getEmployees(): void {
        this.employeeService.getAllEmployees().subscribe({
            next: (data) => {
                this.employees = data;
                console.log('Employees fetched successfully', data);
            },
            error: (error) => {
                console.error('Error fetching employees', error);
            }
        });
    }

    // Prepare the form for editing an employee
    editEmployee(employee: Employee) {
        console.log('Editing employee:', employee);
        this.employeeForm.patchValue({
            firstname: employee.firstname,
            lastname: employee.lastname,
            salary: employee.salary,
            accountnumber: employee.accountnumber,
            email: employee.email,
            balance: employee.balance,
            clientRegistrationNumber: employee.clientRegistrationNumber
        });
        this.isEditing = true; // Set editing flag to true
        this.currentEmployeeId = employee.employeeId || null; // Set current employee ID
    }

    // Reset the form
    resetForm(): void {
        this.employeeForm.reset();
        this.isEditing = false;
        this.currentEmployeeId = null;
    }
    toggleEmployeeStatus(employee: Employee): void {
        employee.isActive = !employee.isActive; // Toggle the active status
        console.log(`${employee.firstname} is now ${employee.isActive ? 'Active' : 'Inactive'}`);
    }
    
}
