import { IUserSubscriptionInstancePostPayload, IUserSubscriptionPostPayload } from "./dto"

export const OutboxEventType = {
  subscriptionNew: 'subscription_new',
  subscriptionResourceInstanceNew: 'subscription_resource_instance_new'
} as const
export type OutboxEventType = typeof OutboxEventType[keyof typeof OutboxEventType]

export interface IOutboxEventPayloadNewSubscription extends IUserSubscriptionPostPayload {

}

export interface IOutboxEventPayloadResourceInstanceAssignment extends IUserSubscriptionInstancePostPayload {
  subscriptionUuid: string
}