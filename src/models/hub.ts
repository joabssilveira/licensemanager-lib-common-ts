import { HubSettings, HubSettingsGroups, IHubSetting } from "datacenter-lib-common-ts";
import { StrictOmit } from "fwork-jsts-common";
import { IUserSubscriptionPostPayload } from "licensemanager-lib-common-ts";

export const HubSettingsLm = {
  LmUserRegisterSubscription: 'lm-user-register-subscription',
  LmResourceWorkgroup: 'lm-resource-workgroup',
  ...HubSettings,
} as const
export type HubSettingsLm = typeof HubSettingsLm[keyof typeof HubSettingsLm]

export const HubSettingsGroupsLm = {
  licenseManager: 'license-manager',
  ...HubSettingsGroups
} as const
export type HubSettingsGroupsLm = typeof HubSettingsGroupsLm[keyof typeof HubSettingsGroupsLm]

export interface IHubSettingLmUserRegisterSubscription extends
  IHubSetting<
    typeof HubSettingsLm.LmUserRegisterSubscription,
    typeof HubSettingsGroupsLm.licenseManager,
    StrictOmit<IUserSubscriptionPostPayload, 'ownerUuid' | 'resourcesInstances'>[]
  > {
}

export interface IHubSettingLmResourceWorkgroup extends
  IHubSetting<
    typeof HubSettingsLm.LmResourceWorkgroup,
    typeof HubSettingsGroupsLm.licenseManager,
    string[] // ids dos aliases de recursos que liberam um grupo de trabalho
  > {
}