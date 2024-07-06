import {isMainPageVisited} from '../lib/PageStatusStore'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    
    isMainPageVisited.set(true);
    
    return {};
};

