export const ApiRoutesNames = {
  example_unsecureRoute: './example-unsecure',
  example_unsecureRouteMethod: './example-unsecure-method',
  // 
  licenseProviders: '/license-providers',
  licenseResources: '/license-resources',
  licensesDef: '/licenses-def',
  usersSubscriptions: '/users-subscriptions',
  usersSubscriptionsId: '/users-subscriptions/:id',
  // 
  usersSubscriptionsResourcesInstances: '/users-subscriptions/:id/resources-instances',
  usersSubscriptionsResourcesInstancesId: '/users-subscriptions/:id/resources-instances/:resource_identifier',
  usersSubscriptionsFindLastActiveByOwnerAndResources: '/users-subscriptions-find-last-active-by-owner-and-resources', // rpc
  usersSubscriptionsFindLastActiveByInstanceAndResources: '/users-subscriptions-find-last-active-by-instance-and-resources', // rpc
  usersSubscriptionsFindLastActiveByInstance: '/users-subscriptions-find-last-active-by-instance', // rpc
  // 
  // licenseOwners: '/license-owners',
}
