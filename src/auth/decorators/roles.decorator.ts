import { SetMetadata } from '@nestjs/common';
import { Role } from 'prisma/generated/enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export const ROLES_ADMIN_KEY = 'requiresAdmin';
export const AdminOnly = () => SetMetadata(ROLES_KEY, true);
