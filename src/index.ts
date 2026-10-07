import { ApiRoutesNames } from './api/routes'
import { LicenseProvidersApiClient } from './apiClient/license_providers'
import { LicenseResourcesApiClient } from './apiClient/license_resources'
import { LicensesDefApiClient } from './apiClient/licenses_def'
import { UsersSubscriptionsApiClient } from './apiClient/users_subscriptions'

import {
  type IUserLicenseCycleTypeDataPostPayload,
  type IUserLicenseCycleTypeDataPostPayload_limitTime,
  type IUserLicenseCycleTypeDataPostPayload_recurringLimitTime,
  type IUserLicenseCycleTypeDataPostPayload_recurringMonthlyFixedDay,
  type IUserLicenseCycleTypeDataPostPayload_recurringMonthlyUserDay,
  type IUserLicenseCycleTypeDataPostPayload_recurringYearlyFixedDayAndMonth,
  type IUserLicenseCycleTypeDataPostPayload_unlimited,
  type IUserSubscriptionPostPayload,
  type IUserSubscriptionInstancePostPayload,
} from './models/dto'

import {
  CheckLicensePayload,
  CheckLicenseResponse,
  CheckLicenseResponseItemStatus,
  ICheckLicensePayloadItem,
  ICheckLicenseResponseItem,
  ILicenseDef, ILicenseDefCycleTypeData, ILicenseDefCycleTypeData_limitTime, ILicenseDefCycleTypeData_recurringLimitTime,
  ILicenseDefCycleTypeData_recurringMonthlyFixedDay, ILicenseDefCycleTypeData_recurringMonthlyUserDay, ILicenseDefCycleTypeData_recurringYearlyFixedDayAndMonth,
  ILicenseDefCycleTypeData_unlimited,
  ILicenseDefResource,
  ILicenseProvider, ILicenseResource,
  IUserLicenseCycleTypeData, IUserLicenseCycleTypeData_limitTime,
  IUserLicenseCycleTypeData_recurringLimitTime, IUserLicenseCycleTypeData_recurringMonthlyFixedDay, IUserLicenseCycleTypeData_recurringMonthlyUserDay,
  IUserLicenseCycleTypeData_recurringYearlyFixedDayAndMonth, IUserLicenseCycleTypeData_unlimited,
  IUserSubscription,
  IUserSubscriptionResourceInstance,
  LicenseCycleType, LicenseDefScope,
  LicenseResourceMeasurementType, licenseResourceMeasurementTypeOptions,
  UserSubscriptionStatus, 
  // VALID_USER_SUBSCRIPTION_STATUSES,
} from './models'

import { AuthorizationKeys } from './models/authorizations'

import {
  LicenseDefScopeKey,
  LicenseDefScopeOptions,
} from './models/factories_def_scope'

import {
  LicenseCycleTypeKey,
  LicenseCycleTypeOptions,
} from './models/factories_def'

import {
  UserSubscriptionCycleTypeKey,
  UserSubscriptionCycleTypeOptions,
} from './models/factories_user'

import {
  type HubSettingLmResourceWorkgroup,  
  type HubSettingLmUserRegisterSubscription, 
  HubSettings, 
  HubSettingsGroups,
} from './models/hubSettings'

import { LicenseDefUtils, } from './utils/licenseDef'

import { LicenseProviderUtils, } from './utils/licenseProvider'

import { UserSubscriptionUtils, } from './utils/userSubscription'

export {
  type IUserSubscriptionInstancePostPayload,
  type HubSettingLmResourceWorkgroup,  
  type HubSettingLmUserRegisterSubscription, 
  HubSettings, 
  HubSettingsGroups,
  UserSubscriptionStatus, 
  // VALID_USER_SUBSCRIPTION_STATUSES,
  ApiRoutesNames, AuthorizationKeys, CheckLicensePayload, CheckLicenseResponse, CheckLicenseResponseItemStatus, ICheckLicensePayloadItem, ICheckLicenseResponseItem,
  ILicenseDef, ILicenseDefCycleTypeData, ILicenseDefCycleTypeData_limitTime, ILicenseDefCycleTypeData_recurringLimitTime,
  ILicenseDefCycleTypeData_recurringMonthlyFixedDay, ILicenseDefCycleTypeData_recurringMonthlyUserDay, ILicenseDefCycleTypeData_recurringYearlyFixedDayAndMonth,
  ILicenseDefCycleTypeData_unlimited, ILicenseDefResource,
  ILicenseProvider, ILicenseResource, IUserLicenseCycleTypeData, IUserLicenseCycleTypeData_limitTime,
  IUserLicenseCycleTypeData_recurringLimitTime, IUserLicenseCycleTypeData_recurringMonthlyFixedDay, IUserLicenseCycleTypeData_recurringMonthlyUserDay,
  IUserLicenseCycleTypeData_recurringYearlyFixedDayAndMonth, IUserLicenseCycleTypeData_unlimited, IUserLicenseCycleTypeDataPostPayload,
  type IUserLicenseCycleTypeDataPostPayload_limitTime,
  type IUserLicenseCycleTypeDataPostPayload_recurringLimitTime,
  type IUserLicenseCycleTypeDataPostPayload_recurringMonthlyFixedDay,
  type IUserLicenseCycleTypeDataPostPayload_recurringMonthlyUserDay,
  type IUserLicenseCycleTypeDataPostPayload_recurringYearlyFixedDayAndMonth,
  type IUserLicenseCycleTypeDataPostPayload_unlimited, IUserSubscription, IUserSubscriptionPostPayload, IUserSubscriptionResourceInstance, LicenseCycleType, LicenseCycleTypeKey, LicenseCycleTypeOptions, LicenseDefScope, LicenseDefScopeKey,
  LicenseDefScopeOptions, LicenseDefUtils, LicenseProvidersApiClient, LicenseProviderUtils, LicenseResourceMeasurementType, licenseResourceMeasurementTypeOptions,
  LicenseResourcesApiClient, LicensesDefApiClient, UsersSubscriptionsApiClient, UserSubscriptionCycleTypeKey, UserSubscriptionCycleTypeOptions, UserSubscriptionUtils
}

