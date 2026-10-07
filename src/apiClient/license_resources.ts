import { AxiosInstance, AxiosStatic } from 'axios'
import { BaseApiClient, Where } from 'fwork-jsts-common'
import { ApiRoutesNames } from '../api/routes'
import { ILicenseResource } from '../models'

export class LicenseResourcesApiClient extends BaseApiClient<ILicenseResource, any,
  Where<ILicenseResource>, ILicenseResource, ILicenseResource> {
  constructor(args: {
    baseApiUrl: string
    axios?: AxiosStatic | AxiosInstance,
  }) {
    super({
      apiUrl: `${args.baseApiUrl}${ApiRoutesNames.licenseResources}`,
      axios: args.axios,
    })
  }
}