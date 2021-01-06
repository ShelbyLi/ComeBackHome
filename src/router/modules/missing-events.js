/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const missingEventsRouter = {
  path: '/missing-events',
  component: Layout,
  redirect: '/missing-events/visualization',
  name: 'MissingEvents',
  meta: {
    title: '走失事件',
    icon: 'event'
  },
  children: [
    {
      path: 'visualization',
      component: () => import('@/views/missing-events/visualization/index'),
      name: 'Visualization',
      meta: { title: '可视化', icon: 'chart' }
    },
    {
      path: 'management',
      component: () => import('@/views/missing-events/management/index'),
      name: 'Management',
      // redirect: '/missing-events/management/index',
      meta: { title: '管理', icon: 'form' },
      // children: [
      //   {
      //     path: 'index',
      //     component: () => import('@/views/missing-events/management/table'),
      //     // hidden: true,
      //     // redirect: '/missing-events/management/index',
      //     name: 'managementIndex',
      //     meta: { title: '管理', icon: 'form' } // 面包屑导航里显示的

      //   },
      //   {
      //     path: 'clues1',
      //     component: () => import('@/views/missing-events/management/clues/index'),
      //     // hidden: true,
      //     name: 'clues',
      //     meta: { title: '事件线索', icon: 'message', noCache: true } // 面包屑导航里显示的

      //   },
      // ]
    }
  ]
}

// const cluesRouter = {
//     path: '/missing-events/clues',
//     component: Layout,
//     redirect: '/missing-events/clues/index',
//     hidden: true,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/clues/index'),
//         name: 'clues',
//         meta: { title: '事件线索', icon: 'message', noCache: true } // 面包屑导航里显示的
//       }
//     ]
// }
export default missingEventsRouter
// export default {
//   missingEventsRouter,
//   cluesRouter
// }

// const nestedRouter = {
//   // 第一个
//   path: '/nested',
//   component: Layout,
//   redirect: '/nested/menu1/menu1-1',
//   name: 'Nested',
//   meta: {
//     title: 'Nested Routes',
//     icon: 'nested'
//   },
//   children: [
//     {
//       path: 'menu2',
//       name: 'Menu2',
//       component: () => import('@/views/nested/menu2/index'),
//       meta: { title: 'Menu 2' }
//     },

//     {
//       // 第二个
//       path: 'menu1',
//       component: () => import('@/views/nested/menu1/index'), // Parent router-view
//       name: 'Menu1',
//       meta: { title: 'Menu 1' },
//       redirect: '/nested/menu1/menu1-1',
//       children: [
//         {
//           path: 'menu1-1',
//           component: () => import('@/views/nested/menu1/menu1-1'),
//           name: 'Menu1-1',
//           meta: { title: 'Menu 1-1' }
//         },

//       ]
//     },

//   ]
// }