import type { FunctionalComponent } from 'vue';

export interface NavigationItem {
  name: string;
  path: string;
  icon: FunctionalComponent;
  current: boolean;
}
