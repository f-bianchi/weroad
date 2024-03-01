import { PAGE_SIZE_DEFAULT } from '@/models/pagination';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

export const getPaginationFromRoute = (
  route: RouteLocationNormalizedLoaded,
): { page: number; pageSize: number } => {
  const page = Number((route.query.page || '1').toString());
  const pageSize = Number((route.query.pageSize || PAGE_SIZE_DEFAULT).toString());
  return {
    page: isNaN(page) ? 1 : page,
    pageSize: isNaN(pageSize) ? PAGE_SIZE_DEFAULT : pageSize,
  };
};
