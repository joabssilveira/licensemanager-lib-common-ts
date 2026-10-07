import { GQLWhere } from 'goqlite-client'
import { IUserSubscription } from '../models'
import { Where } from 'fwork-jsts-common'

export class UserSubscriptionUtils {
  static getFullTextSearchWhere = (
    searchText: string
  ) => {
    const splitted = searchText.trim().split(' ')

    let result:
      | GQLWhere<IUserSubscription>
      | undefined

    function once(
      text: string
    ): Where<IUserSubscription> {
      return {
        'tags': {
          $ilike: text,
        }
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
    data: IUserSubscription[]
    lang: string
  }) => {
    args.data.sort((a, b) => {
      let result = a.owner?.name.localeCompare(b.owner?.name ?? '', args.lang) ?? 0

      return result
    })
  }
}