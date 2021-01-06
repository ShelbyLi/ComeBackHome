import Layout from '@/layout'

const volunteersRouter = {
  path: '/volunteers',
  component: Layout,
  redirect: '/volunteers/visualization',
  name: 'Volunteers',
  meta: {
    title: '志愿者',
    icon: 'volunteer'
  },
  children: [
    {
      path: 'visualization',
      component: () => import('@/views/volunteers/visualization/index'),
      // name: 'Visualization',
      meta: { title: '可视化', icon: 'chart' }
    },
    {
      path: 'management',
      component: () => import('@/views/volunteers/management'),
      // name: 'Management',
      meta: { title: '管理', icon: 'form' }
    }
  ]
}
export default volunteersRouter
