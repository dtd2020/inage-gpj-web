import { PageableMetaModel } from "./pageable-meta-model";

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

export interface UserPageModel {
    data: UserModel[];
    pageableMeta: PageableMetaModel;
}


export interface UserRequestModel {
    id: number;
    name: string;
    mobile: string;
    username: string;
    email: string;
    active: boolean;
    profileIds: number[];
    permissionIds: number[];
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

export interface UserTypeModel {
    key: string;
    value: string;
}


export interface ResetPasswordRequestModel {
    username: string;
    email: string;
}
