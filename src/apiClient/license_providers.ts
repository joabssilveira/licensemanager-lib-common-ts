import { AxiosInstance, AxiosStatic } from 'axios'
import { BaseApiClient, Where } from 'fwork-jsts-common'
import { ApiRoutesNames } from '../api/routes'
import { ILicenseProvider } from '../models'

export class LicenseProvidersApiClient extends BaseApiClient<ILicenseProvider, any,
  Where<ILicenseProvider>, ILicenseProvider, ILicenseProvider> {
  constructor(args: {
    baseApiUrl: string
    axios?: AxiosStatic | AxiosInstance,
  }) {
    super({
      apiUrl: `${args.baseApiUrl}${ApiRoutesNames.licenseProviders}`,
      axios: args.axios,
    })
  }
}