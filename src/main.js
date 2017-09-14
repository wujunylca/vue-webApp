import Vue from 'vue';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App';
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import sell from './components/sell/sell.vue'

import './common/stylus/index.styl'

Vue.use(VueRouter);
Vue.use(VueResource);

let app = Vue.extend(App);

let router = new VueRouter({
	linkActiveClass: "active"
});

router.map({
	'/goods':{
		component:goods
	},
	'/ratings':{
		component:ratings
	},
	'/sell':{
		component:sell
	}
});

router.start(app,"#app");
router.go('./goods');
