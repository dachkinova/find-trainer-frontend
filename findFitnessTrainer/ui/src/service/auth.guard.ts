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
        const user = this.authService.getUser(); // Get the user object from session storage
        const userRoles = user.roles; // Get the roles array from the user object

        const routeData = route.data as RouteData; // Cast route.data to RouteData interface

        // Check if the user has the required role to access the route
        if (routeData.roles && !this.hasAnyRole(userRoles, routeData.roles)) {
            // User does not have the required role, redirect to unauthorized page or any other desired behavior
            this.router.navigate(['/unauthorized']);
            return false;
        }

        // User has the required role, allow access to the route
        return true;
    }

    private hasAnyRole(userRoles: string[], requiredRoles: string[]): boolean {
        // Check if the user has any of the required roles
        return userRoles.some(role => requiredRoles.includes(role));
    }
}
