import { GQLWhere } from 'goqlite-client'
import { ILicenseProvider } from '../models'

export class LicenseProviderUtils {
  static getFullTextSearchWhere = (
    searchText: string
  ) => {
    const splitted = searchText.trim().split(' ')

    let result:
      | GQLWhere<ILicenseProvider>
      | undefined

    function once(
      text: string
    ): GQLWhere<ILicenseProvider> {
      return {
        $or: [
          {
            tags: {
              $ilike: text,
            }
          }, {
            'workgroupUnit.legalPerson.name': {
              $ilike: text,
            }
          },
        ],
      }
    }

    if (splitted.length > 1) {
      result = {
        $and: splitted.map(text => once(text)),
      }
    } else if (splitted.length) {
      result = once(splitted[0])
    }

    return result
  }

  static sort = (args: {
    data: ILicenseProvider[]
    lang: string
  }) => {
    args.data.sort((a, b) => {
      let result = a.workgroupUnit?.legalPerson?.name.localeCompare(b.workgroupUnit?.legalPerson?.name ?? '', args.lang) ?? 0
      
      return result
    })
  }
}