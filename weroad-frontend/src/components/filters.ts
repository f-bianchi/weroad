import { OrderType, PAGE_SIZE_DEFAULT } from '@/models/pagination';
import { type TourFilters } from '@/models/tour';
import { computed } from 'vue';
import { route } from './TravelTours.vue';

export const filters = computed((): TourFilters => {
const { page, sort, order } = route.query;
const p = Number((page || '1').toString());
return {
page: isNaN(p) ? 1 : p,
pageSize: PAGE_SIZE_DEFAULT,
sort: sort ? sort.toString() : undefined,
order: order ? <OrderType>order.toString() : undefined,
};
});
