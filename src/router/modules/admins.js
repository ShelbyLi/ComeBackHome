import Layout from '@/layout'

const adminsRouter = {
  path: '/admins',
  component: Layout,
  redirect: '/admins/visualization',
  name: 'Admins',
  meta: {
    title: '管理员',
    icon: 'admin'
  },
  children: [
    {
      path: 'visualization',
      component: () => import('@/views/admins/visualization/index'),
      // name: 'Visualization',
      meta: { title: '可视化', icon: 'chart' }
    },
    {
      path: 'management',
      component: () => import('@/views/admins/management'),
      // name: 'Management',
      meta: { title: '管理', icon: 'form' }
    }
  ]
}
export default adminsRouter
