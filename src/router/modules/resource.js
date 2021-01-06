import Layout from '@/layout'

const resourceRouter = {
  path: '/resource',
  component: Layout,
  redirect: '/resource/police-station',
  name: 'Resource',
  meta: {
    title: '资源查看',
    icon: 'resource'
  },
  children: [
    {
      path: 'police-station',
      component: () => import('@/views/resource/police-station'),
      name: 'PoliceStation',
      meta: { title: '派出所', icon: 'police-station' }
    },
    {
      path: 'hospital',
      component: () => import('@/views/resource/hospital'),
      name: 'Hospital',
      meta: { title: '医院', icon: 'hospital' }
    },
    {
      path: 'hospice',
      component: () => import('@/views/resource/hospice'),
      name: 'Hospice',
      meta: { title: '收容所', icon: 'hospice' }
    }
  ]
}
export default resourceRouter
