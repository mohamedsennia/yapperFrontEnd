import { inject, Injectable } from "@angular/core";
import { UserService } from "./services/UserService";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({"providedIn":"root"})
class AuthGuardService{
constructor(private router:Router,private userService:UserService){

}
canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean|Observable<boolean>|Promise<boolean>{
    if(this.userService.isLoggedIn()){
        return true;
    }else{
        this.router.navigate(['/login'])
    }
    return false
}

}
export const authGuard:CanActivateFn =(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean  | Observable<boolean> | Promise<boolean> =>{ return inject(AuthGuardService).canActivate(next,state);}