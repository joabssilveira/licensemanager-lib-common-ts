import moment from "moment";
import { ILicenseDefCycleTypeData, ILicenseDefCycleTypeData_limitTime, ILicenseDefCycleTypeData_recurringLimitTime, IUserLicenseCycleTypeData, IUserLicenseCycleTypeData_limitTime, IUserLicenseCycleTypeData_recurringLimitTime, IUserLicenseCycleTypeData_recurringMonthlyFixedDay, IUserLicenseCycleTypeData_recurringMonthlyUserDay, IUserLicenseCycleTypeData_recurringYearlyFixedDayAndMonth, IUserLicenseCycleTypeData_unlimited, LicenseCycleType } from ".";
import { IUserLicenseCycleTypeDataPostPayload, IUserLicenseCycleTypeDataPostPayload_recurringMonthlyUserDay } from "../models/dto";

export function getNextBillingDate(billingDay: number): moment.Moment {
  const today = moment()

  function createValidDate(baseDate: moment.Moment): moment.Moment {
    const lastDayOfMonth = baseDate.clone().endOf('month').date()
    const day = Math.min(billingDay, lastDayOfMonth)

    return baseDate.clone().date(day).startOf('day')
  }

  // Try current month
  let nextBillingDate = createValidDate(today.clone())

  // If already passed, move to next month
  if (today.isAfter(nextBillingDate, 'day')) {
    nextBillingDate = createValidDate(today.clone().add(1, 'month'))
  }

  return nextBillingDate
}

export type UserSubscriptionCycleTypeKey = keyof typeof LicenseCycleType;
export const UserSubscriptionCycleTypeOptions: Record<UserSubscriptionCycleTypeKey, {
  factory: (args: {
    licenseDefCycleTypeData: ILicenseDefCycleTypeData
  }) => IUserLicenseCycleTypeData,
  factory2: (args: {
    licenseDefCycleTypeData: ILicenseDefCycleTypeData,
    userLicenseCycleTypeDataPostPayload?: IUserLicenseCycleTypeDataPostPayload,
  }) => IUserLicenseCycleTypeData
}> = {
  unlimited: {
    factory: (args: {
      licenseDefCycleTypeData: ILicenseDefCycleTypeData
    }) => {
      if (args.licenseDefCycleTypeData.type !== LicenseCycleType.unlimited) {
        throw new Error('Invalid cycle type')
      }

      return {
        type: LicenseCycleType.unlimited,
        startAtDateUnix: moment().unix(),
      } as IUserLicenseCycleTypeData_unlimited
    },
    factory2: (args: {
      licenseDefCycleTypeData: ILicenseDefCycleTypeData,
      userLicenseCycleTypeDataPostPayload?: IUserLicenseCycleTypeDataPostPayload,
    }) => {
      if (args.licenseDefCycleTypeData.type !== LicenseCycleType.unlimited) {
        throw new Error('Invalid cycle type')
      }

      return {
        type: LicenseCycleType.unlimited,
        startAtDateUnix: moment().unix(),
      } as IUserLicenseCycleTypeData_unlimited
    }
  },
  limitTime: {
    factory: (args: {
      licenseDefCycleTypeData: ILicenseDefCycleTypeData
    }) => {
      if (args.licenseDefCycleTypeData.type !== LicenseCycleType.limitTime)
        throw new Error('Invalid cycle type')
      const cycleTypeData: ILicenseDefCycleTypeData_limitTime = args.licenseDefCycleTypeData as ILicenseDefCycleTypeData_limitTime

      const today = moment()
      const endAtDateUnix = moment(today).add(cycleTypeData.durationInSeconds, 'second')
      return {
        type: LicenseCycleType.limitTime,
        startAtDateUnix: today.unix(),
        endAtDateUnix: endAtDateUnix.unix(),
      } as IUserLicenseCycleTypeData_limitTime
    },
    factory2: (args: {
      licenseDefCycleTypeData: ILicenseDefCycleTypeData,
      userLicenseCycleTypeDataPostPayload?: IUserLicenseCycleTypeDataPostPayload,
    }) => {
      if (args.licenseDefCycleTypeData.type !== LicenseCycleType.limitTime)
        throw new Error('Invalid cycle type')
      const cycleTypeData: ILicenseDefCycleTypeData_limitTime = args.licenseDefCycleTypeData as ILicenseDefCycleTypeData_limitTime

      const today = moment()
      const endAtDateUnix = moment(today).add(cycleTypeData.durationInSeconds, 'second')
      return {
        type: LicenseCycleType.limitTime,
        startAtDateUnix: today.unix(),
        endAtDateUnix: endAtDateUnix.unix(),
      } as IUserLicenseCycleTypeData_limitTime
    }
  },
  recurringLimitTime: {
    factory: (args: {
      licenseDefCycleTypeData: ILicenseDefCycleTypeData
    }) => {
      if (args.licenseDefCycleTypeData.type !== LicenseCycleType.recurringLimitTime)
        throw new Error('Invalid cycle type')
      const cycleTypeData: ILicenseDefCycleTypeData_recurringLimitTime = args.licenseDefCycleTypeData as ILicenseDefCycleTypeData_recurringLimitTime

      const today = moment()
      const daysaftertoday = moment(today).add(cycleTypeData.durationInSeconds, 'second')
      return {
        type: LicenseCycleType.recurringLimitTime,
        startAtDateUnix: today.unix(),
        endAtDateUnix: daysaftertoday.unix(),
        nextRenewDateUnix: daysaftertoday.add(1, 'second').unix(),
      } as IUserLicenseCycleTypeData_recurringLimitTime
    },
    factory2: (args: {
      licenseDefCycleTypeData: ILicenseDefCycleTypeData,
      userLicenseCycleTypeDataPostPayload?: IUserLicenseCycleTypeDataPostPayload,
    }) => {
      if (args.licenseDefCycleTypeData.type !== LicenseCycleType.recurringLimitTime)
        throw new Error('Invalid cycle type')
      const cycleTypeData: ILicenseDefCycleTypeData_recurringLimitTime = args.licenseDefCycleTypeData as ILicenseDefCycleTypeData_recurringLimitTime

      const today = moment()
      const daysaftertoday = moment(today).add(cycleTypeData.durationInSeconds, 'second')
      return {
        type: LicenseCycleType.recurringLimitTime,
        startAtDateUnix: today.unix(),
        endAtDateUnix: daysaftertoday.unix(),
        nextRenewDateUnix: daysaftertoday.add(1, 'second').unix(),
      } as IUserLicenseCycleTypeData_recurringLimitTime
    }
  },
  recurringMonthlyFixedDay: {
    factory: (args: {
      licenseDefCycleTypeData: ILicenseDefCycleTypeData
    }) => {
      if (args.licenseDefCycleTypeData.type !== LicenseCycleType.recurringMonthlyFixedDay)
        throw new Error('Invalid cycle type')
      // const cycleTypeData: ILicenseDefCycleTypeData_recurringMonthlyFixedDay = args.licenseDefCycleTypeData as ILicenseDefCycleTypeData_recurringMonthlyFixedDay

      const today = moment()
      const daysaftertoday = moment(today).add(1, 'month').subtract(1, 'day')
      return {
        type: LicenseCycleType.recurringMonthlyFixedDay,
        startAtDateUnix: today.unix(),
        endAtDateUnix: daysaftertoday.unix(),
        nextRenewDateUnix: daysaftertoday.add(1, 'second').unix(),
      } as IUserLicenseCycleTypeData_recurringMonthlyFixedDay
    },
    factory2: (args: {
      licenseDefCycleTypeData: ILicenseDefCycleTypeData,
      userLicenseCycleTypeDataPostPayload?: IUserLicenseCycleTypeDataPostPayload,
    }) => {
      if (args.licenseDefCycleTypeData.type !== LicenseCycleType.recurringMonthlyFixedDay)
        throw new Error('Invalid cycle type')
      // const cycleTypeData: ILicenseDefCycleTypeData_recurringMonthlyFixedDay = args.licenseDefCycleTypeData as ILicenseDefCycleTypeData_recurringMonthlyFixedDay

      const today = moment()
      const daysaftertoday = moment(today).add(1, 'month').subtract(1, 'day')
      return {
        type: LicenseCycleType.recurringMonthlyFixedDay,
        startAtDateUnix: today.unix(),
        endAtDateUnix: daysaftertoday.unix(),
        nextRenewDateUnix: daysaftertoday.add(1, 'second').unix(),
      } as IUserLicenseCycleTypeData_recurringMonthlyFixedDay
    }
  },
  recurringMonthlyUserDay: {
    factory: (args: {
      licenseDefCycleTypeData: ILicenseDefCycleTypeData
    }) => {
      if (args.licenseDefCycleTypeData.type !== LicenseCycleType.recurringMonthlyUserDay)
        throw new Error('Invalid cycle type')
      // const cycleTypeData: ILicenseDefCycleTypeData_recurringMonthlyUserDay = args.licenseDefCycleTypeData as ILicenseDefCycleTypeData_recurringMonthlyUserDay

      const today = moment()
      // padrao dia 10
      const endAtDateUnix = getNextBillingDate(10)
      return {
        type: LicenseCycleType.recurringMonthlyUserDay,
        startAtDateUnix: today.unix(),
        endAtDateUnix: endAtDateUnix.unix(),
        nextRenewDateUnix: endAtDateUnix.add(1, 'second').unix(),
      } as IUserLicenseCycleTypeData_recurringMonthlyUserDay
    },
    factory2: (args: {
      licenseDefCycleTypeData: ILicenseDefCycleTypeData,
      userLicenseCycleTypeDataPostPayload?: IUserLicenseCycleTypeDataPostPayload,
    }) => {
      if (args.licenseDefCycleTypeData.type !== LicenseCycleType.recurringMonthlyUserDay)
        throw new Error('Invalid cycle type')
      if (!args.userLicenseCycleTypeDataPostPayload)
        throw new Error('Invalid user cycle type')

      const today = moment()
      const day = (args.userLicenseCycleTypeDataPostPayload as IUserLicenseCycleTypeDataPostPayload_recurringMonthlyUserDay).day
      const endAtDateUnix = getNextBillingDate(day)
      return {
        type: LicenseCycleType.recurringMonthlyUserDay,
        startAtDateUnix: today.unix(),
        endAtDateUnix: endAtDateUnix.unix(),
        nextRenewDateUnix: endAtDateUnix.add(1, 'second').unix(),
        day,
      } as IUserLicenseCycleTypeData_recurringMonthlyUserDay
    }
  },
  recurringYearlyFixedDayAndMonth: {
    factory: (args: {
      licenseDefCycleTypeData: ILicenseDefCycleTypeData
    }) => {
      if (args.licenseDefCycleTypeData.type !== LicenseCycleType.recurringYearlyFixedDayAndMonth)
        throw new Error('Invalid cycle type')
      // const cycleTypeData: ILicenseDefCycleTypeData_recurringYearlyFixedDayAndMonth = args.licenseDefCycleTypeData as ILicenseDefCycleTypeData_recurringYearlyFixedDayAndMonth

      const today = moment()
      const daysaftertoday = moment(today).add(1, 'year').subtract(1, 'day')
      return {
        startAtDateUnix: today.unix(),
        endAtDateUnix: daysaftertoday.unix(),
        nextRenewDateUnix: daysaftertoday.add(1, 'second').unix(),
        type: LicenseCycleType.recurringYearlyFixedDayAndMonth,
      } as IUserLicenseCycleTypeData_recurringYearlyFixedDayAndMonth
    },
    factory2: (args: {
      licenseDefCycleTypeData: ILicenseDefCycleTypeData,
      userLicenseCycleTypeDataPostPayload?: IUserLicenseCycleTypeDataPostPayload,
    }) => {
      if (args.licenseDefCycleTypeData.type !== LicenseCycleType.recurringYearlyFixedDayAndMonth)
        throw new Error('Invalid cycle type')
      // const cycleTypeData: ILicenseDefCycleTypeData_recurringYearlyFixedDayAndMonth = args.licenseDefCycleTypeData as ILicenseDefCycleTypeData_recurringYearlyFixedDayAndMonth

      const today = moment()
      const daysaftertoday = moment(today).add(1, 'year').subtract(1, 'day')
      return {
        startAtDateUnix: today.unix(),
        endAtDateUnix: daysaftertoday.unix(),
        nextRenewDateUnix: daysaftertoday.add(1, 'second').unix(),
        type: LicenseCycleType.recurringYearlyFixedDayAndMonth,
      } as IUserLicenseCycleTypeData_recurringYearlyFixedDayAndMonth
    }
  },
}
