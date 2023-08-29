import { CanActivateFn } from '@angular/router';

export const normalGuard: CanActivateFn = (route, state) => {
  return true;
};
