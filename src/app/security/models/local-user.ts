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
}

export interface AuthorityModel {
    authority: string;
}
