import { homepage } from "../view/homepage.js"
import { menu2page } from "../view/menu2page.js"

export const routePathNames = {
    HOME : '/',
    MENU2: '/menu2',

}

export const routes = [
    { path:routePathNames.HOME, page: homepage},
    {path:routePathNames.MENU2, page: menu2page}

];

export function routing(pathname, hash){
    const route = routes.find(r=> r.path ==pathname);
    if(route){
        if(hash && hash.length > 1){
            route.page(hash.substring(1));
        }else{
        route.page();}
    }
    else{
        routes[0].page();
    }
}