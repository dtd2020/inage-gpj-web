export interface StaffModel {
    id: number;
    name: string;
    nuit: string;
    mobile: string;
    email: string;
    address: string;
    userId: number;
    // staffRole: StaffRoleModel;
}

export interface StaffRoleModel {
    description: string;
}
