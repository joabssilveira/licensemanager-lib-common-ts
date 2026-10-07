import { AuthorizationKeys as DCAuthKeys } from 'datacenter-lib-common-ts'

export const AuthorizationKeys = {
  ...DCAuthKeys,
  licenseManager: 'lm-admin',
} as const
export type AuthorizationKeys = typeof AuthorizationKeys[keyof typeof AuthorizationKeys]