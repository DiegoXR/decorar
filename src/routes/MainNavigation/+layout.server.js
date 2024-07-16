import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';
import {isMainPageVisited} from '../../lib/PageStatusStore'


// /** @type {import('./$types').LayoutServerLoad} */
// export async function load() {
//     const visited = get(isMainPageVisited);
//     if (!visited) {    
//          console.log("HEYYY");
//         // throw redirect(307, '/');
//     }
//     return {};
// }

export const ssr = false;