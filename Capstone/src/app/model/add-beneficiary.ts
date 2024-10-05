export interface AddBeneficiary {
    beneficiaryId: number; // Optional for creation
    beneficiaryName: string;
    beneficiaryAccountNumber: number;
    beneficiaryIfsc: string;
    balance: number;
    registrationNumber: number;
}
