/** Nombres de rol tal como los guarda el backend (tabla Security.Role). */
export const ROLES = {
  admin: 'Admin',
  manager: 'Manager',
} as const;

/**
 * Roles con acceso a Administración. Igual que la política `CanManagerUser`
 * del backend (PoliciesExtensions.cs), que protege los endpoints de alta.
 */
export const ADMIN_AREA_ROLES: readonly string[] = [ROLES.admin, ROLES.manager];
