import { GQLWhere } from 'goqlite-client'
import { ILicenseDef } from '../models'

export class LicenseDefUtils {
  static getFullTextSearchWhere = (
    searchText: string
  ) => {
    const splitted = searchText.trim().split(' ')

    let result:
      | GQLWhere<ILicenseDef>
      | undefined

    function once(
      text: string
    ): GQLWhere<ILicenseDef> {
      return {
        $or: [
          {
            tags: {
              $ilike: text,
            }
          }, {
            description: {
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
    data: ILicenseDef[]
    lang: string
  }) => {
    args.data.sort((a, b) => {
      let result = a.provider?.workgroupUnit?.legalPerson?.name.localeCompare(b.provider?.workgroupUnit?.legalPerson?.name ?? '', args.lang) ?? 0
      if (result == 0) {
        result = a.provider?.workgroupUnit?.legalPerson?.workgroup?.name.localeCompare(b.provider?.workgroupUnit?.legalPerson?.workgroup?.name ?? '', args.lang) ?? 0
      }
      if (result == 0) {
        result = a.description.localeCompare(b.description, args.lang)
      }

      return result
    })
  }
}