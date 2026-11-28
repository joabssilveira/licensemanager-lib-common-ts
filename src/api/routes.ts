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
  usersSubscriptionsFindLastActiveSubscriptionByOwnerAndResources: '/users-subscriptions-find-last-active-by-owner-and-resources', // rpc
  usersSubscriptionsFindLastActiveSubscriptionByInstanceAndResources: '/users-subscriptions-find-last-active-by-instance-and-resources', // rpc
  usersSubscriptionsFindLastActiveSubscriptionByInstance: '/users-subscriptions-find-last-active-by-instance', // rpc
  // 
  // licenseOwners: '/license-owners',
}
