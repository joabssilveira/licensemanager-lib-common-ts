import { AgentType, IIntegrationClient, IUserSharedData, IWorkgroupUnit } from 'datacenter-lib-common-ts';

export interface ILicenseProvider {
  tags?: string,

  workgroupUnitUuid: string, // primray key one to one
  workgroupUnit?: IWorkgroupUnit, // virtual master external datacenter

  resources?: ILicenseResource[], // virtual children
  // packagesDef?: ILicensePackageDef[], // virtual children
  licensesDef?: ILicenseDef[], // virtual children
}

export enum LicenseCycleType {
  // sem limite de tempo (vitalicio)
  unlimited = 0,

  // com limite de tempo
  limitTime = 1,

  // com limite de tempo mas renovavel
  // obs.: se o tenant quiser um limite de 30 dias de licenciamento, esse tipo nao garante o dia fixo no mes
  // os dias serao corridos e contados a partir da data de aquisicao mas os meses variam de tamanho
  // portanto os vencimentos nao serão em dias fixos
  // para dias fixos no mes, deve-se usar recurringMonthlyFixedDay ou recurringMonthlyUserDay
  recurringLimitTime = 2,

  // mensal contados a partir da data de aquisicao,  o dia de renovacao é o mesmo da data de aquisicao
  // ex.: a cada dia 10 de cada mes, sendo o dia 10 do mes x o dia da aquisicao
  // provedores de streams usam esse tipo de licenca (netflix, amazon, etc)
  recurringMonthlyFixedDay = 3,

  // mensal com dia fixo escolhido pelo usuario
  // desconheco esse uso por licenciadores de servicos online mas é bem difundido em servicos financeiros
  // cartoes de credito, contas de luz e etc usam esse tipo de cobranca
  // embora esses servicos nao sejam necessariamente de software sao servicoes licenciados por periodos recorrentes
  recurringMonthlyUserDay = 4,

  // anual contados a partir da data de aquisicao, o dia de renovacao é o mesmo da data de aquisicao
  // ex.: a cada dia 10 de janeiro de cada ano, sendo o dia 10 de janeiro do ano x o dia da aquisicao
  recurringYearlyFixedDayAndMonth = 5,
}

// def

export interface ILicenseDefCycleTypeData {
  type: LicenseCycleType,
}
export interface ILicenseDefCycleTypeData_unlimited extends ILicenseDefCycleTypeData {
  type: LicenseCycleType.unlimited,
}
export interface ILicenseDefCycleTypeData_limitTime extends ILicenseDefCycleTypeData {
  type: LicenseCycleType.limitTime,
  // duration from acquisition
  durationInSeconds: number,
}
export interface ILicenseDefCycleTypeData_recurringLimitTime extends ILicenseDefCycleTypeData {
  type: LicenseCycleType.recurringLimitTime,
  // duration from acquisition
  durationInSeconds: number,
}
export interface ILicenseDefCycleTypeData_recurringMonthlyFixedDay extends ILicenseDefCycleTypeData {
  type: LicenseCycleType.recurringMonthlyFixedDay,
}
export interface ILicenseDefCycleTypeData_recurringMonthlyUserDay extends ILicenseDefCycleTypeData {
  type: LicenseCycleType.recurringMonthlyUserDay,
}
export interface ILicenseDefCycleTypeData_recurringYearlyFixedDayAndMonth extends ILicenseDefCycleTypeData {
  type: LicenseCycleType.recurringYearlyFixedDayAndMonth,
}

export enum LicenseResourceMeasurementType {
  metered = 1,
  meteredUnlimited = 2,
  // unmetered = 3,
}

export const licenseResourceMeasurementTypeOptions: Record<keyof typeof LicenseResourceMeasurementType, {
  desc: string,
}> = {
  metered: {
    desc: 'Quantidade limitada',
  },
  meteredUnlimited: {
    desc: 'Controle de instancia do recurso mas sem controle de quantidade'
  },
}

export interface ILicenseResource {
  uuid: string,
  aliasId: string,
  description: string,
  additionalDescription?: string,
  tags?: string,
  measurementType: LicenseResourceMeasurementType,

  providerUuid: string,
  provider?: ILicenseProvider, // virtual master
}

// subdoc
export type ILicenseDefResource = {
  resourceAliasId: string,
  maxCount?: number, // apenas para recurso mensuravel (metered)

  resource?: ILicenseResource // virtual
}

export enum LicenseDefScope {
  public = 1,
  restricted = 2,
}

export interface ILicenseDef {
  uuid: string,
  description: string,
  cycleTypeData: ILicenseDefCycleTypeData, // subdoc
  resources: ILicenseDefResource[], // subdoc, precisam ser do mesmo provider
  value?: number,
  tags?: string,
  scope: LicenseDefScope,
  maxPerUser?: number,
  allowChangeValue?: boolean,

  providerUuid: string,
  provider?: ILicenseProvider, // virtual master
}

// user

export interface IUserLicenseCycleTypeData {
  type: LicenseCycleType,
}
export interface IUserLicenseCycleTypeData_unlimited extends IUserLicenseCycleTypeData {
  type: LicenseCycleType.unlimited,

  startAtDateUnix: number,
}
export interface IUserLicenseCycleTypeData_limitTime extends IUserLicenseCycleTypeData {
  type: LicenseCycleType.limitTime,

  startAtDateUnix: number,
  endAtDateUnix: number,
}
export interface IUserLicenseCycleTypeData_recurringLimitTime extends IUserLicenseCycleTypeData {
  type: LicenseCycleType.recurringLimitTime,

  // requer atualizacao a cada ciclo
  startAtDateUnix: number,
  endAtDateUnix: number,
  nextRenewDateUnix: number,
}
export interface IUserLicenseCycleTypeData_recurringMonthlyFixedDay extends IUserLicenseCycleTypeData {
  type: LicenseCycleType.recurringMonthlyFixedDay,

  // requer atualizacao a cada ciclo
  startAtDateUnix: number,
  endAtDateUnix: number,
  nextRenewDateUnix: number,
}
export interface IUserLicenseCycleTypeData_recurringMonthlyUserDay extends IUserLicenseCycleTypeData {
  type: LicenseCycleType.recurringMonthlyUserDay,
  day: number,

  // requer atualizacao a cada ciclo
  startAtDateUnix: number,
  endAtDateUnix: number,
  nextRenewDateUnix: number,
}
export interface IUserLicenseCycleTypeData_recurringYearlyFixedDayAndMonth extends IUserLicenseCycleTypeData {
  type: LicenseCycleType.recurringYearlyFixedDayAndMonth,

  // requer atualizacao a cada ciclo
  startAtDateUnix: number,
  endAtDateUnix: number,
  nextRenewDateUnix: number,
}

// subdoc
export interface IUserSubscriptionResourceInstance {
  uuid: string,
  resourceAliasId: string,
  // em ILicenseDefResource é definido a quantidade de instancias de um recurso
  // portanto, o maximo de registros na subscription é o maxCount de ILicenseDefResource
  // ex.: se um determinado recurso tem um maxCount de 2, devem existir no maximo 2 (instancias) de IUserSubscriptionResources na assinatura (subscription)
  resourceInstanceIdentifier: string,
}

export enum UserSubscriptionStatus {
  pending = 'pending',           // criada, aguardando pagamento/ativação
  trial = 'trial',               // periodo de teste
  active = 'active',             // vigente e em dia
  grace_period = 'grace_period', // vencida/inadimplente, mas ainda com acesso temporario
  suspended = 'suspended',       // acesso bloqueado temporariamente (inadimplencia, analise, etc.), reversivel
  canceled = 'canceled',         // cancelada pelo usuario/owner (pode valer ate o fim do ciclo)
  expired = 'expired',           // ciclo terminou e nao foi renovada
  revoked = 'revoked',           // revogada pelo provider/admin (fraude, violacao, estorno)
}

export interface IUserSubscription {
  uuid: string,

  agentUuid: string,
  agentType: AgentType,
  agent?: IUserSharedData | IIntegrationClient

  ownerUuid: string, // IUserSharedData.uuid
  owner?: IUserSharedData,

  acquiringDateUnix: number,

  licenseDefUuid: string,
  // guarda os dados do pacote de licencas do dia da aquisicao
  // mesmo que o pacote mude, o que vale é o do dia da aquisicao
  // pra nao replicar o modelo e ficar repetitivo basta colocar o objeto inteiro aqui
  licenseDefSnapshot: ILicenseDef,
  value?: number,
  cycleTypeData: IUserLicenseCycleTypeData, // subdoc
  resourcesInstances?: IUserSubscriptionResourceInstance[],

  status: UserSubscriptionStatus,
  tags?: string,
}

// 

export interface ICheckLicensePayloadItem {
  /**
   * List of instance identifiers
   */
  ids: string[],
  /**
   * Aliases
   */
  aliases: {
    /**
     * List of aliases that will license instances of the resources.
     */
    ids: string[],
    /**
     * List of provider IDs that can release using the provided aliases.
     */
    providers: string[],
  }[]
}

export type CheckLicensePayload = ICheckLicensePayloadItem[]

export type CheckLicenseResponseItemStatus = 'active' | 'expired' | 'canceled' | 'pending'

export interface ICheckLicenseResponseItem {
  /**
   * Resource instance identifier
   */
  id: string,
  status: CheckLicenseResponseItemStatus
}

export type CheckLicenseResponse = ICheckLicenseResponseItem[]