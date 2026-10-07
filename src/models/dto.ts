import { IUserSubscriptionResourceInstance, LicenseCycleType } from ".";

export interface IUserLicenseCycleTypeDataPostPayload {
  type: LicenseCycleType,
}
export interface IUserLicenseCycleTypeDataPostPayload_unlimited extends IUserLicenseCycleTypeDataPostPayload {
  type: LicenseCycleType.unlimited,
}
export interface IUserLicenseCycleTypeDataPostPayload_limitTime extends IUserLicenseCycleTypeDataPostPayload {
  type: LicenseCycleType.limitTime,
}
export interface IUserLicenseCycleTypeDataPostPayload_recurringLimitTime extends IUserLicenseCycleTypeDataPostPayload {
  type: LicenseCycleType.recurringLimitTime,
}
export interface IUserLicenseCycleTypeDataPostPayload_recurringMonthlyFixedDay extends IUserLicenseCycleTypeDataPostPayload {
  type: LicenseCycleType.recurringMonthlyFixedDay,
}
export interface IUserLicenseCycleTypeDataPostPayload_recurringMonthlyUserDay extends IUserLicenseCycleTypeDataPostPayload {
  type: LicenseCycleType.recurringMonthlyUserDay,
  day: number,
}
export interface IUserLicenseCycleTypeDataPostPayload_recurringYearlyFixedDayAndMonth extends IUserLicenseCycleTypeDataPostPayload {
  type: LicenseCycleType.recurringYearlyFixedDayAndMonth,
}

export interface IUserSubscriptionPostPayload {
  ownerUuid: string,
  licenseDefUuid: string,
  value?: number,
  cycleTypeData: IUserLicenseCycleTypeDataPostPayload,
  resourcesInstances: IUserSubscriptionResourceInstance[],
}

// 

export interface IUserSubscriptionInstancePostPayload {
  resourceAliasId: string,
  resourceInstanceIdentifier: string,
}