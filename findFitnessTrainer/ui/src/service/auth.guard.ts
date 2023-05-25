import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {AuthService} from "./auth.service";

interface RouteData {
    roles: string[];
}

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const user = this.authService.getUser(); //Вземане на потребителската информация от session storage
        const userRoles = user.roles; //Вземане на ролите от обекта потребител

        const routeData = route.data as RouteData; // Кастваме route.data до RouteData интерфейса

        if (!user || Object.keys(user).length === 0) {
            // Потребителя не е логнат, пренасочваме към страницата за вход в системата
            this.router.navigate(['/login']);
            return false;
        }

        // Проверяваме дали потребителя има нежния достъп за пътя
        if (routeData.roles && !this.hasAnyRole(userRoles, routeData.roles)) {
            // Потребителя няма нужната роля, пренасочваме към страница за грешка
            this.router.navigate(['/unauthorized']);
            return false;
        }

        // Потребителя има нужната роля, пренасочваме към поискания път
        return true;
    }

    private hasAnyRole(userRoles: string[], requiredRoles: string[]): boolean {
        // Проверява дали потребителя има някоя от ролите
        return userRoles.some(role => requiredRoles.includes(role));
    }
}
