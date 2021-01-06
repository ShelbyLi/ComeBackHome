import Layout from '@/layout'

const usersRouter = {
  path: '/users',
  component: Layout,
  redirect: '/users/visualization',
  name: 'Users',
  meta: {
    title: '用户',
    icon: 'user-management'
  },
  children: [
    {
      path: 'visualization',
      component: () => import('@/views/users/visualization/index'),
      // name: 'Visualization',
      meta: { title: '可视化', icon: 'chart' }
    },
    {
      path: 'management',
      component: () => import('@/views/users/management'),
      // name: 'Management',
      meta: { title: '管理', icon: 'form' }
    }
  ]
}
export default usersRouter
