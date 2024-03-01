import type { Travel } from '@/models/travel';
import { formatPrice } from './dates';

export const getStartingPrice = (travel: Travel): string => {
  const prices = (travel.tours || []).map((t) => t.price);
  return formatPrice(Math.min(...prices));
};
