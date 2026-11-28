import { IOutboxEvent } from "datacenter-lib-common-ts"
import { IUserSubscriptionInstancePostPayload, IUserSubscriptionPostPayload } from "./dto"

export const OutboxEventType = {
  subscriptionCreate: 'subscription_create', // solicitando um novo (emitido por vddetect_db)
  subscriptionResourceInstanceAssign: 'subscription_resource_instance_assign', // solicitando um novo (emitido por vddetect_db)

  subscriptionSaved: 'subscription_saved', // notificando que foi atualizado (criado ou alterado | emitido por licensemanager_db)
} as const
export type OutboxEventType = typeof OutboxEventType[keyof typeof OutboxEventType]

export interface IOutboxEventPayloadSubscriptionCreate extends IUserSubscriptionPostPayload {

}

export interface IOutboxEventPayloadSubscriptionResourceInstanceAssign extends IUserSubscriptionInstancePostPayload {
  subscriptionUuid: string
}

export interface IOutboxEventPayloadSubscriptionSaved {
  uuid: string,
}

export interface IOutboxEventLm extends IOutboxEvent<
  typeof OutboxEventType.subscriptionSaved,
  IOutboxEventPayloadSubscriptionSaved
> {
  
}