import { store } from '../store'

export const projectNameToRoute = (projectName) => {
  let route = projectName;

  route = route.replace(/\s/g, '-');
  route = route.replace(/[ÀÁÂÃÄÅ]/g,"A");
  route = route.replace(/[ÈÉÊË]/g,"E");
  route = route.replace(/[Î]/g,"I");
  route = route.replace(/[Ô]/g,"O");
  route = route.replace(/[Ù]/g,"U");
  route = route.replace(/[Ç]/g,"C");
  route = route.replace(/[àáâãäå]/g,"a");
  route = route.replace(/[èéêë]/g,"e");
  route = route.replace(/[î]/g,"i");
  route = route.replace(/[ô]/g,"o");
  route = route.replace(/[ù]/g,"u");
  route = route.replace(/[ç]/g,"c");
  route = route.replace(/[^a-zA-Z0-9\s\-]/gi, '');

  return route.toLowerCase();
};

export const routeToProjectIndex = (currentRouteName) => {
  for (let i = 0; i < store.state.projectsProperties.length; i++) {
    const projectProperties = store.state.projectsProperties[i];
    const routeName = projectNameToRoute(projectProperties.name);

    if (routeName === currentRouteName) {
      return i;
    }
  }

  return -1;
};

export const getScale = (element) => {
  const elementComputedStyle = window.getComputedStyle(element, null);
  const transform = elementComputedStyle.transform;

  if(!transform || transform === 'none') {
    return 1;
  }

  let values = transform.split('(')[1];
  values = values.split(')')[0];
  values = values.split(',');
  let a = values[0];
  let b = values[1];

  return Math.sqrt(a*a + b*b)
};

export const getPosition = (el)  => {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
};
