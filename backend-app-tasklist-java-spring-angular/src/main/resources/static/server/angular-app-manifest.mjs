
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/tasks"
  },
  {
    "renderMode": 2,
    "route": "/agenda"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23841, hash: 'e94b9df49ec0e56b2a9778c65868118eee3f387155643c5f2417c385c1895cbc', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17345, hash: 'a813b9aa9b1e710aaea0f4e7fc03e42cbb9ffb8547388d6e31493f8eb85df688', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'tasks/index.html': {size: 29977, hash: 'e6113c473731bc7f834b01b00a97fab3d36467919140d66430598c21003485d7', text: () => import('./assets-chunks/tasks_index_html.mjs').then(m => m.default)},
    'index.html': {size: 31104, hash: 'ee491e37bc7624373437d75462afcfde6adec4126380e1f472313f836d8ca4fb', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'agenda/index.html': {size: 34035, hash: 'cdfa45a5912816a1a90a878348579ac43f8f1f0820f1f5bdc60af4af31eac7cf', text: () => import('./assets-chunks/agenda_index_html.mjs').then(m => m.default)},
    'styles-3EFZWSZK.css': {size: 8038, hash: 'MwA7wbuBLtA', text: () => import('./assets-chunks/styles-3EFZWSZK_css.mjs').then(m => m.default)}
  },
};
