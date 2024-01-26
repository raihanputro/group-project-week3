import MainLayout from '@layouts/MainLayout';
import CreatePost from '@pages/CreatePost';
import DetailPost from '@pages/DetailPost';

import Home from '@pages/Home';
import Register from '@pages/Register';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Profile from '@pages/Profile';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: MainLayout,
  },
  {
    path: '/createnew',
    name: 'Home',
    protected: true,
    component: CreatePost,
    layout: MainLayout,
  },
  {
    path: '/:postid',
    name: 'Post Detail',
    protected: false,
    component: DetailPost,
    layout: MainLayout,
  },
  {
    path: '/profile',
    name: 'Profile',
    protected: true,
    component: Profile,
    layout: MainLayout,
  },
  {
    path: '/edit/:postid',
    name: 'Edit Post',
    protected: true,
    component: CreatePost,
    layout: MainLayout,
  },
  { path: '/notfound', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
