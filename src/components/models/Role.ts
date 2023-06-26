export enum Role {
    none = 0,
    user = 1,
    employee = 2,
    admin = 3

}

export function getHighestRole(roleList: string[]): Role {
    if (roleList.includes("ROLE_ADMIN")) return Role.admin;
    if (roleList.includes("ROLE_MITARBEITER")) return Role.employee;
    if (roleList.includes("ROLE_MITGLIED")) return Role.user;
    return Role.none;
}

export function getRoleAsString(roleList: string[]): string {
    switch (getHighestRole(roleList)) {
        case Role.none:
            return "None";

        case Role.user:
            return "User"

        case Role.employee:
            return "Employee"

        case Role.admin:
            return "Admin"
    }
}

export function getRolesFromString(roles: string[]) {
    const listOfRoles: string[] = [];
    if (roles.includes("Admin")) {
        listOfRoles.push("ROLE_ADMIN");
    }
    if (roles.includes("Employee")) {
        listOfRoles.push("ROLE_MITARBEITER");
    }
    if (roles.includes("User")) {
        listOfRoles.push("ROLE_MITGLIED");
    }
    return listOfRoles;
}