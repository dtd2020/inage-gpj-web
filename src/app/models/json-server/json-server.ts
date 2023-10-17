export interface UserJsonServer {
    id: number;
    username: string;
    profiles: ProfileJsonServer[];
}

export interface ProfileJsonServer {
    id: number;
    code: string;
}
