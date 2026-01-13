import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BtAvkADS.mjs';
import { manifest } from './manifest_BGPw0KJ4.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin/packages/new.astro.mjs');
const _page3 = () => import('./pages/admin/packages.astro.mjs');
const _page4 = () => import('./pages/admin/trip-requests/_id_.astro.mjs');
const _page5 = () => import('./pages/admin/trip-requests.astro.mjs');
const _page6 = () => import('./pages/admin.astro.mjs');
const _page7 = () => import('./pages/api/trip-requests/update.astro.mjs');
const _page8 = () => import('./pages/api/trip-requests.astro.mjs');
const _page9 = () => import('./pages/auth/login.astro.mjs');
const _page10 = () => import('./pages/dashboard.astro.mjs');
const _page11 = () => import('./pages/debug-auth.astro.mjs');
const _page12 = () => import('./pages/destinations/kenya.astro.mjs');
const _page13 = () => import('./pages/destinations/uganda.astro.mjs');
const _page14 = () => import('./pages/destinations.astro.mjs');
const _page15 = () => import('./pages/packages/book/_bookingid_/payment.astro.mjs');
const _page16 = () => import('./pages/packages/_id_/book.astro.mjs');
const _page17 = () => import('./pages/packages/_id_.astro.mjs');
const _page18 = () => import('./pages/packages.astro.mjs');
const _page19 = () => import('./pages/planner.astro.mjs');
const _page20 = () => import('./pages/privacy.astro.mjs');
const _page21 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/About.astro", _page1],
    ["src/pages/admin/packages/new.astro", _page2],
    ["src/pages/admin/packages/index.astro", _page3],
    ["src/pages/admin/trip-requests/[id].astro", _page4],
    ["src/pages/admin/trip-requests/index.astro", _page5],
    ["src/pages/admin.astro", _page6],
    ["src/pages/api/trip-requests/update.ts", _page7],
    ["src/pages/api/trip-requests.ts", _page8],
    ["src/pages/auth/login.astro", _page9],
    ["src/pages/dashboard.astro", _page10],
    ["src/pages/debug-auth.astro", _page11],
    ["src/pages/destinations/Kenya.astro", _page12],
    ["src/pages/destinations/Uganda.astro", _page13],
    ["src/pages/Destinations.astro", _page14],
    ["src/pages/packages/book/[bookingId]/payment.astro", _page15],
    ["src/pages/packages/[id]/book.astro", _page16],
    ["src/pages/packages/[id].astro", _page17],
    ["src/pages/packages/index.astro", _page18],
    ["src/pages/Planner.astro", _page19],
    ["src/pages/Privacy.astro", _page20],
    ["src/pages/index.astro", _page21]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "ccc46b47-9fab-4023-aaac-adb962502262",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
