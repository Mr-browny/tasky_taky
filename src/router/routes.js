
const routes = [
  {
    path: '/',
    component: () => import('layouts/PreLoaderLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'Preloader' }
    ]
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'Dashboard', component: () => import('pages/main/Dashboard.vue'), name: 'Dashboard' },
      { path: 'Notification', component: () => import('pages/main/Notification.vue'), name: 'Notifications' },
      { path: 'SingleList/:category/:id', component: () => import('pages/main/_id/SingleList.vue'), name: 'Single_List' }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
