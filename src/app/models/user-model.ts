export interface UserModel {
    id: number;
    name: string;
    mobile: string;
    username: string;
    email: string;
    active: boolean;
    profiles: ProfileModel[];
    permissions: PermissionModel[];
}

export interface ProfileModel {
    id: number;
    code: string;
    description: string;
    permissions: PermissionModel[];
}

export interface PermissionModel {
    id: number;
    code: string;
    description: string;
}

export interface UserResourceModel {
    profiles: ProfileModel[];
    permissions: PermissionModel[];
}
