import Toast from './Toast'
const obj = {}
obj.install =function (Vue){
  // 把对象添加到body上
  // console.log(Toast.$el);//undefined
  
  // document.body.appendChild(Toast.$el)
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2.new的方式，根据组件构造器，创建出一个组件对象
  const toast = new toastConstructor()
  // 3.将组件对象挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是div
  // console.log(toast.$el);
  document.body.appendChild(toast.$el)
  
 Vue.prototype.$toast = toast
}
export default obj