import { AxiosInstance, AxiosStatic } from 'axios'
import { BaseApiClient, Where } from 'fwork-jsts-common'
import { ApiRoutesNames } from '../api/routes'
import { ILicenseDef } from '../models'

export class LicensesDefApiClient extends BaseApiClient<ILicenseDef, any,
  Where<ILicenseDef>, ILicenseDef, ILicenseDef> {
  constructor(args: {
    baseApiUrl: string
    axios?: AxiosStatic | AxiosInstance,
  }) {
    super({
      apiUrl: `${args.baseApiUrl}${ApiRoutesNames.licensesDef}`,
      axios: args.axios,
    })
  }
}