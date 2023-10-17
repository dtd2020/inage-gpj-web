export interface LocalUserModel {
    username: string;
    role: string;
    enabled: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    iat: string;
    exp: string;
    authorities: AuthorityModel[];
    profiles: ProfileModel[];
}

export interface AuthorityModel {
    authority: string;
}

export interface ProfileModel {
    id: number;
    code: string;
    description: string;
}
