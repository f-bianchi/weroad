import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role, RoleName } from './entities/role.entity';

class RoleGuard implements CanActivate {
  roleName: RoleName;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return request['user'].roles.some((r: Role) => r.name === this.roleName);
  }
}

@Injectable()
export class AdminGuard extends RoleGuard {
  roleName: RoleName = RoleName.Admin;
}

@Injectable()
export class EditorGuard extends RoleGuard {
  roleName: RoleName = RoleName.Editor;
}
