import Home from '../containers/Home'
import Projects from '../containers/Projects'
import About from '../containers/About'

let routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/projects/:name',
    name: 'projects',
    component: Projects
  },
  {
    path: '*',
    redirect: '/home'
  }
];

export default routes;
