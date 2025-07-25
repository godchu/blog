
export function getRouteMeta(cleanedPath, routeTree) {
  const breadcrumbs = getBreadcrumbs(cleanedPath, routeTree);
  const context = {
    currentIndex: 0,
  };
  buildRouteMeta(cleanedPath, routeTree, context);
  const {currentIndex: _, ...meta} = context;
  return {
    ...meta,
    breadcrumbs: breadcrumbs.length > 0 ? breadcrumbs : [routeTree],
  };
}

// Performs a depth-first search to find the current route and its previous/next route
function buildRouteMeta(
  searchPath,
  currentRoute,
  context,
) {
  context.currentIndex++;

  const {routes} = currentRoute;

  if (context.route && !context.nextRoute) {
    context.nextRoute = currentRoute;
  }

  if (currentRoute.path === searchPath) {
    context.route = currentRoute;
    context.order = context.currentIndex;
    // If we've found a deeper match, reset the previously stored next route.
    // TODO: this only works reliably if deeper matches are first in the tree.
    // We should revamp all of this to be more explicit.
    context.nextRoute = undefined;
  }

  if (!context.route) {
    context.prevRoute = currentRoute;
  }

  if (!routes) {
    return;
  }

  for (const route of routes) {
    buildRouteMeta(searchPath, route, context);
  }
}

// iterates the route tree from the current route to find its ancestors for breadcrumbs
function getBreadcrumbs(
  path,
  currentRoute,
  breadcrumbs = [],
) {
  if (currentRoute.path === path) {
    return breadcrumbs;
  }

  if (!currentRoute.routes) {
    return [];
  }

  for (const route of currentRoute.routes) {
    const childRoute = getBreadcrumbs(path, route, [
      ...breadcrumbs,
      currentRoute,
    ]);
    if (childRoute?.length) {
      return childRoute;
    }
  }

  return [];
}
