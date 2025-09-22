import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'productDetails/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Server,
  },
];
