import { IHubSetting } from "datacenter-lib-common-ts";
import { StrictOmit } from "fwork-jsts-common";
import { IUserSubscriptionPostPayload } from "licensemanager-lib-common-ts";

export enum HubSettings {
  LmUserRegisterSubscription = 'lm-user-register-subscription',
  LmResourceWorkgroup = 'lm-resource-workgroup',
}
export enum HubSettingsGroups {
  datacenter = 'datacenter'
}
export interface HubSettingLmUserRegisterSubscription extends
  IHubSetting<
    HubSettings.LmUserRegisterSubscription,
    HubSettingsGroups.datacenter,
    StrictOmit<IUserSubscriptionPostPayload, 'ownerUuid' | 'resourcesInstances'>[]
  > {
}
export interface HubSettingLmResourceWorkgroup extends
  IHubSetting<
    HubSettings.LmResourceWorkgroup,
    HubSettingsGroups.datacenter,
    string[] // ids dos aliases de recursos que liberam um grupo de trabalho
  > {
}