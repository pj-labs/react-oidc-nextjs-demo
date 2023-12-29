export interface User {
	id?: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	authorities: Authority[];
	groups?: GroupDto[];
	token?: string;
	tokenExpirationDate?: Date;
	active: boolean;
	displayName: string;
	credentialsNonExpired: boolean;
	accountNonLocked: boolean;
	accountNonExpired: boolean;
	userAuthType?: UserAuthType;
	lastModifiedBy?: string;
	lastModifiedDate?: Date;
}

interface UserAuthType {
	id: number;
	value: string;
}

export interface Authority {
	name: string;
}

export interface RoleDto {
	id: number;
	name: string;
	description: string;
}

export interface GroupDto {
	id: number | string;
	adGroupName: string;
	email: string | undefined;
	description: string | undefined;
	roles: RoleDto[];
	lastModifiedBy?: string;
	lastModifiedDate?: Date;
}
