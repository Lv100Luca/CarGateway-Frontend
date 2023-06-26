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

export function getRoleStringFromRoleArraySoThatTobiStopsCryingAboutNonOrdinalRoles(roleList: string[]): string {
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

export function turnRoleStringIntoNonOrdinalListOfStringWithRolesSoThatTobiIsHappy(role: string) {
    switch (role) {
        case "Admin":
            return [
                "ROLE_ADMIN",
                "ROLE_MITGLIED",
                "ROLE_MITARBEITER"
            ];
        case "Employee":
            return [
                "ROLE_MITARBEITER",
                "ROLE_MITGLIED"
            ];
        case "User":
            return [
                "ROLE_MITGLIED"
            ]
        case "None":
            return [];
    }
}