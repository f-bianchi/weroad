import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role, RoleName } from './entities/role.entity';

class RoleGuard implements CanActivate {
  acceptedRoles: RoleName[];

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request['user']) {
      return false;
    }
    return request['user'].roles.some((r: Role) =>
      this.acceptedRoles.includes(r.name),
    );
  }
}

@Injectable()
export class AdminGuard extends RoleGuard {
  acceptedRoles: RoleName[] = [RoleName.Admin, RoleName.Editor];
}

@Injectable()
export class EditorGuard extends RoleGuard {
  acceptedRoles: RoleName[] = [RoleName.Editor];
}
