import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'
// import { Input } from 'element-ui' // 用到什么组件需要先导入
// 需要卸载一个import中

// 导入后需要用↓注册为全局可用的组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message // 需要全局挂载到原型对象上
