import { AxiosInstance, AxiosStatic } from 'axios'
import { BaseApiClient, Where } from 'fwork-jsts-common'
import { ApiRoutesNames } from '../api/routes'
import { IUserSubscription } from '../models'

export class UsersSubscriptionsApiClient extends BaseApiClient<IUserSubscription, any,
  Where<IUserSubscription>, IUserSubscription, IUserSubscription> {
  constructor(args: {
    baseApiUrl: string
    axios?: AxiosStatic | AxiosInstance,
  }) {
    super({
      apiUrl: `${args.baseApiUrl}${ApiRoutesNames.usersSubscriptions}`,
      axios: args.axios,
    })
  }
}