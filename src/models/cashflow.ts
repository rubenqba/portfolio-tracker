export enum RawCashFlowOperationType {
  DEPOSITO_DIVIDENDOS = 1,
  DEPOSITO = 8,
  DEPOSITO_TRASPASO = 3534,
  DEPOSITO_DIVIDENDOS_SIC = 2394,
  DEPOSITO_REEMBOLSO_CAPITAL = 266,
  DEPOSITO_RESULTADO_FISCAL = 974,
  DEPOSITO_ENAJENACION_FIBRAS = 1394,
  DEPOSITO_GANANCIA_CAPITAL = 3340,
  DEPOSITO_ISR_RESULTADO_FISCAL = 3337,
  DEPOSITO_ESPECIE_TITULOS = 53,
  DEPOSITO_EFECTIVO_DIVIDENDOS = 5,
  DEPOSITO_EFECTIVO_INTERESES = 318,
  ABONO_REEMBOLSO_RETENCION_DIVIDENDO = 3706,
  ISR_DIV_SIC = 3588,
  ISR_RESULTADO_FISCAL = 3336,
  ISR_CEDULAR_POR_DIVIDENDOS = 3590,
  CANCELACION_REEMBOLSO_CAPITAL = 1476,
  CANCELACION_RESULTADO_FISCAL = 1470,
  RETIRO_TRASPASO = 3535,
  CARGO_ISR_ISHRS = 3051,
  CANCELACION_ISR_CEDULAR_DIVIDENDOS = 3762,
  CANCELACION_ABONO_DIV_EFECTIVO = 1468,
  DEPOSITO_TITULOS_EXCISION = 732,
  DEPOSITO_TITULOS_EXCISION_CUST_NORMAL = 370,
  RETIRO_TITULOS_EXCISION = 733,
  RETIRO_TITULO_CANJE = 210,
  DEPOSITO_TITULO_CANJE = 209
}

export enum CashFlowTransactionType {}

export interface RawCashFlow {
  additionalInformation?: string;
  amount: number;
  beneficiaryAccount?: string;
  beneficiaryBankName?: string;
  beneficiaryName?: string;
  instructorAccount?: string;
  instructorName?: string;
  operationType: RawCashFlowOperationType;
  operationDate: string;
  operationStatus: number;
  operationStatusName?: string;
  signature?: string;
  trackingKey: string;
  url?: string;
  paymentConcept?: string;
  numericReference: number;
  collectionReference?: string;
  operationConcept: string;
  settlementDate: string;
  issueId: string;
  transactionTypeId: CashFlowTransactionType;
}

export enum CashFlowOperation {
  DEPOSITO = 'DEPOSITO',
  RETIRO = 'RETIRO',
  UNDEFINED = 'UNDEFINED'
}

export interface CashFlow {
  id: string;
  type: CashFlowOperation;
  ticker?: string;
  amount: number;
  description: string;
  date: string;
  time: string;
}

export namespace CashFlowUtils {
  export function mapOperationType(
    raw: RawCashFlowOperationType
  ): CashFlowOperation {
    let result = CashFlowOperation.UNDEFINED;

    switch (raw) {
      case RawCashFlowOperationType.DEPOSITO_DIVIDENDOS:
      case RawCashFlowOperationType.DEPOSITO:
      case RawCashFlowOperationType.DEPOSITO_DIVIDENDOS_SIC:
      case RawCashFlowOperationType.DEPOSITO_REEMBOLSO_CAPITAL:
      case RawCashFlowOperationType.DEPOSITO_RESULTADO_FISCAL:
      case RawCashFlowOperationType.DEPOSITO_ENAJENACION_FIBRAS:
      case RawCashFlowOperationType.DEPOSITO_TRASPASO:
      case RawCashFlowOperationType.DEPOSITO_GANANCIA_CAPITAL:
      case RawCashFlowOperationType.DEPOSITO_ISR_RESULTADO_FISCAL:
      case RawCashFlowOperationType.DEPOSITO_ESPECIE_TITULOS:
      case RawCashFlowOperationType.DEPOSITO_EFECTIVO_DIVIDENDOS:
      case RawCashFlowOperationType.DEPOSITO_EFECTIVO_INTERESES:
      case RawCashFlowOperationType.ABONO_REEMBOLSO_RETENCION_DIVIDENDO:
      case RawCashFlowOperationType.DEPOSITO_TITULOS_EXCISION:
      case RawCashFlowOperationType.DEPOSITO_TITULOS_EXCISION_CUST_NORMAL:
      case RawCashFlowOperationType.DEPOSITO_TITULO_CANJE:
        result = CashFlowOperation.DEPOSITO;
        break;
      case RawCashFlowOperationType.ISR_DIV_SIC:
      case RawCashFlowOperationType.ISR_RESULTADO_FISCAL:
      case RawCashFlowOperationType.ISR_CEDULAR_POR_DIVIDENDOS:
      case RawCashFlowOperationType.CANCELACION_REEMBOLSO_CAPITAL:
      case RawCashFlowOperationType.RETIRO_TRASPASO:
      case RawCashFlowOperationType.CANCELACION_RESULTADO_FISCAL:
      case RawCashFlowOperationType.CARGO_ISR_ISHRS:
      case RawCashFlowOperationType.CANCELACION_ISR_CEDULAR_DIVIDENDOS:
      case RawCashFlowOperationType.CANCELACION_ABONO_DIV_EFECTIVO:
      case RawCashFlowOperationType.RETIRO_TITULOS_EXCISION:
      case RawCashFlowOperationType.RETIRO_TITULO_CANJE:
        result = CashFlowOperation.RETIRO;
        break;
    }

    return result;
  }

  export function transform(raw: RawCashFlow): CashFlow {
    const type = mapOperationType(raw.operationType);
    const ticker = raw.issueId.replace('Efec *', '');
    return {
      id: raw.trackingKey,
      type: type,
      ticker: ticker.replace(/[^A-Z0-9]/g, ''),
      amount: raw.amount,
      description: `${raw.operationConcept} (${raw.operationType})`,
      date: extractDate(raw.settlementDate),
      time: extractTime(raw.settlementDate)
    };
  }

  export function extractTime(value: string): string {
    const date = new Date(value);
    return date.toLocaleString('es-MX', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      formatMatcher: 'basic'
    });
  }

  export function extractDate(value: string): string {
    const date = new Date(value);
    return date.toLocaleString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      formatMatcher: 'basic'
    });
  }
}
