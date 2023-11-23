export interface LocalUserModel {
    id: number;
    username: string;
    role: string;
    enabled: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    iat: string;
    exp: string;
    authorities: AuthorityModel[];
    // profiles: ProfileModel[];
    // permissions: PermissionModel[];
    profiles: SimpleProfileModel[];
    permissions: string[];
}

export interface AuthorityModel {
    authority: string;
}

export interface ProfileModel {
    id: number;
    code: string;
    description: string;
    permissions: PermissionModel[]
}

export interface SimpleProfileModel {
    code: string;
    description: string;
}

export interface PermissionModel {
    id: number;
    code: string;
    description: string;
}
