import type {RouteLocationRaw} from "vue-router";

export default interface MenuItem {
    to: RouteLocationRaw;
    label: string;
}