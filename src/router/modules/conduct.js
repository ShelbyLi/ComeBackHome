import Layout from '@/layout'

const conductRouter = {
  path: '/conduct',
  component: Layout,
  redirect: '/conduct/map',
  name: 'Conduct',
  meta: {
    title: '指挥',
    icon: 'conduct'
  },
  children: [
    {
      path: 'map',
      component: () => import('@/views/conduct/map'),
      name: 'Map',
      meta: { title: '地图', icon: 'map' }
    },
    {
      path: '队员',
      component: () => import('@/views/conduct/team-member'),
      name: 'TeamMember',
      meta: { title: '队员', icon: 'team' }
    },
    {
      path: 'clues',
      component: () => import('@/views/conduct/clues'),
      name: 'Clues',
      meta: { title: '线索', icon: 'clue' }
    }
  ]
}
export default conductRouter
