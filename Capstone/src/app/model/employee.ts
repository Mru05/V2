export interface Employee {
    employeeId?: number; // Optional for creation
    firstname: string;
    lastname: string;
    salary: number;
    accountnumber: number;
    email: string;
    balance: number;
    clientRegistrationNumber?: number;
    isActive?: boolean; // Optional field to indicate if the employee is active
}
