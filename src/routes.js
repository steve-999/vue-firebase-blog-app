import Home from './components/home';
import SingleBlog from './components/singleBlog';
import CreateBlog from './components/createBlog';
import Signup from './components/signup';
import Login from './components/login';
import Dashboard from './components/dashboard';
import PageNotFound from './components/pageNotFound';

export default [
    { 
        path: '/',
        component: Home,
        meta: {
            title: 'Vue.js & Firebase Blog App'
        }
    }, 
    { 
        path: '/create',
        component: CreateBlog,
        meta: {
            title: 'Create A Blog',
            requiresAuth: true
        }
    }, 
    { 
        path: '/blogs/:id',
        component: SingleBlog,
        meta: {
            title: 'Blog',
            requiresAuth: true
        }
    }, 
    { 
        path: '/signup',
        component: Signup,
        meta: {
            title: 'Sign up'
        }
    }, 
    { 
        path: '/login',
        component: Login,
        meta: {
            title: 'Login'
        }
    }, 
    { 
        path: '/dashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard',
            requiresAuth: true
        }
    }, 
    { 
        path: '*',
        name: '404',
        component: PageNotFound
    }
];



