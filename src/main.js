// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
//import { store } from '../store/store';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.component('app-header', Header);
Vue.component('app-footer', Footer);

Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

router.beforeEach((to,from,next) => {
  if(to.meta.requiresAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user) {
        next('/login');
      } 
      else {
        next();
      }
    });
  }
  else {
    next();   
  }
});

router.afterEach(to => {
  document.title = to.meta.title;
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>'
})
