import { Injectable } from "@angular/core";

/**
 * Just a simple sanity check to see if
 * 1. injection is working
 * 2. which injection contexts get which instance of this service provided
 * 
 * If we're somehow trying to make cross-window injection work, this will be a nice testbed.
 */
@Injectable({providedIn: 'root'})
export class TestService {
    uuid = crypto.randomUUID();
}