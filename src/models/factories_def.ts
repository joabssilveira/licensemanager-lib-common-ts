import moment from 'moment';
import { ILicenseDefCycleTypeData, ILicenseDefCycleTypeData_limitTime, ILicenseDefCycleTypeData_recurringLimitTime, ILicenseDefCycleTypeData_recurringMonthlyFixedDay, ILicenseDefCycleTypeData_recurringMonthlyUserDay, ILicenseDefCycleTypeData_recurringYearlyFixedDayAndMonth, ILicenseDefCycleTypeData_unlimited, LicenseCycleType } from '.';

export type LicenseCycleTypeKey = keyof typeof LicenseCycleType;
export const LicenseCycleTypeOptions: Record<LicenseCycleTypeKey, {
  desc: string,
  descAdditional: string,
  factory: () => ILicenseDefCycleTypeData
}> = {
  unlimited: {
    desc: 'Ilimitado',
    descAdditional: 'Sem limite de tempo (vitalício).',
    factory: () => ({
      type: LicenseCycleType.unlimited,
    } as ILicenseDefCycleTypeData_unlimited)
  },
  limitTime: {
    desc: 'Com limite de tempo',
    descAdditional: 'Com limite de tempo e não renovável.',
    factory: () => {
      const today = moment()
      const sevendaysaftertoday = moment(today).add(7, 'day')
      const durationInSeconds = sevendaysaftertoday.diff(today, 'seconds')
      return {
        type: LicenseCycleType.limitTime,
        durationInSeconds,
      } as ILicenseDefCycleTypeData_limitTime
    }
  },
  recurringLimitTime: {
    desc: 'Renovável com limite de tempo',
    descAdditional: `Com limite de tempo mas renovavel.\n
Obs.: se o licenciador quiser um limite de 30 dias de licenciamento, esse tipo nao garante o dia fixo no mes,\n
os dias serao corridos e contados a partir da data de aquisicao mas os meses variam de tamanho,\n
portanto os vencimentos nao serão em dias fixos.\n
Para dias fixos no mes, deve-se usar a licença do tipo "Renovável mensal com dias fixos" ou "Renovável mensal com dia de vencimento pré-fixado"`,
    factory: () => {
      const today = moment()
      const thirtydaysaftertoday = moment(today).add(30, 'day')
      const durationInSeconds = thirtydaysaftertoday.diff(today, 'seconds')
      return {
        type: LicenseCycleType.recurringLimitTime,
        durationInSeconds,
      } as ILicenseDefCycleTypeData_recurringLimitTime
    }
  },
  recurringMonthlyFixedDay: {
    desc: 'Renovável mensal com dias fixos',
    descAdditional: `Mensal contados a partir da data de aquisicao,  o dia de renovacao é o mesmo da data de aquisicao.\n
Ex.: a cada dia 10 de cada mes, sendo o dia 10 do mes x o dia da aquisicao.\n
Caso o dia de aquisição não exista no próximo mês de renovação, o dia será o último dia do mês, isso ocorre nos dias 31, 30 e 29 dependendo do mês.\n
Provedores de streams usam esse tipo de licenca (netflix, amazon, etc).`,
    factory: () => {
      return {
        type: LicenseCycleType.recurringMonthlyFixedDay,
      } as ILicenseDefCycleTypeData_recurringMonthlyFixedDay
    }
  },
  recurringMonthlyUserDay: {
    desc: 'Renovável mensal com dia de vencimento pré-fixado',
    descAdditional: `Mensal com dia fixo escolhido pelo usuario.\n
Essa licença não é muito difundida por licenciadores de servicos online mas é bem comum em servicos como
os de cartoes de credito, contas de luz e etc.\n
Caso o dia de vencimento escolhido não exista no próximo mês de renovação, o dia será o último dia do mês, isso ocorre nos dias 31, 30 e 29 dependendo do mês.\n
Embora esses serviços não sejam necessariamente de software, são serviços licenciados por periodos recorrentes.`,
    factory: () => {
      return {
        type: LicenseCycleType.recurringMonthlyUserDay,
      } as ILicenseDefCycleTypeData_recurringMonthlyUserDay
    }
  },
  recurringYearlyFixedDayAndMonth: {
    desc: 'Renovável anual com dia/mês fixos',
    descAdditional: `Anual contados a partir da data de aquisicao, o dia de renovacao é o mesmo da data de aquisicao.\n
Ex.: a cada dia 10 de janeiro de cada ano, sendo o dia 10 de janeiro do ano x o dia da aquisicao.`,
    factory: () => {
      return {
        type: LicenseCycleType.recurringYearlyFixedDayAndMonth,
      } as ILicenseDefCycleTypeData_recurringYearlyFixedDayAndMonth
    }
  },
}