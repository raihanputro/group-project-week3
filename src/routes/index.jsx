import MainLayout from '@layouts/MainLayout';
import CreatePost from '@pages/CreatePost';
import DetailPost from '@pages/DetailPost';

import Home from '@pages/Home';
import NotFound from '@pages/NotFound';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
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
  { path: '/notfound', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
