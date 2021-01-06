const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // token: state => state.user.token,
  // avatar: state => state.user.avatar,
  // name: state => state.user.name
  token: state => state.admin.token,
  name: state => state.admin.name,
  phoneNumber: state => state.admin.phoneNumber,
  nickname: state => state.admin.nickname,
  avatar: state => state.admin.avatar,
  roles: state => state.admin.roles,
  briefInfo: state => state.admin.briefInfo,
  password: state => state.admin.password
}
export default getters
