import { Router } from "@angular/router";
import { of } from "rxjs";

const fn = (commands: any[]) => new Promise<boolean>((resolve) => resolve(true));
export const routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate'], {events: of()});
routerSpy.navigate.and.callFake(fn);
