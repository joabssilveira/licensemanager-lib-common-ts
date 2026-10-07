import { LicenseDefScope } from '.';

export type LicenseDefScopeKey = keyof typeof LicenseDefScope;
export const LicenseDefScopeOptions: Record<LicenseDefScopeKey, {
  desc: string,
  descAdditional: string,
}> = {
  public: {
    desc: 'Público',
    descAdditional: `Licenças públicas podem ter assinaturas geradas pelos próprios usuários finais sem supervisão de administradores do provedor.\n
A maioria das linceças se encaxam nesse modelo.\n
Nesse tipo de licença o usuario escolhe sua própria licença e o sistema faz o resto sozinho.\n
Um bom exemplo são licenças "Trials" que podem ser geradas ao se cadastrar em um sistema.`,
  },
  restricted: {
    desc: 'Restrito',
    descAdditional: `Licenças restritas não podem ter assinaturas geradas pelos próprios usuários finais.\n
Apenas administradores do provedor (usuários SysAdm ou Administradores) podem gerar assinaturas para essas licenças.\n
Esse tipo de escopo é útil quando o sistema não tem gerenciamento automático de pagamento onde o usuário final precisa de uma autorização manual para usar o sistema.`,
  },
}