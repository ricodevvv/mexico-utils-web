import {
  amountToWords,
  checkClabe,
  checkCurp,
  checkNss,
  checkRfc,
  formatPhone,
  normalizePhone,
  stateFromPostalCode,
} from "mexico-utils";
import type { Dictionary, Locale } from "./i18n";

export const KINDS = ["curp", "rfc", "clabe", "nss", "postal", "phone", "amount"] as const;
export type Kind = (typeof KINDS)[number];

export interface Analysis {
  kind: Kind;
  valid: boolean;
  error?: string;
  rows: { label: string; value: string; mono?: boolean }[];
}

export const EXAMPLES: Record<Kind, string> = {
  curp: "LOOA531113HTCPBN07",
  rfc: "EKU9003173C9",
  clabe: "002010077777777771",
  nss: "72795608040",
  postal: "42800",
  phone: "+52 1 773 152 1627",
  amount: "$21,000.99",
};

/**
 * Guesses what kind of Mexican data a pasted value is, or null when it can't tell yet.
 */
export function detectKind(raw: string): Kind | null {
  const value = raw.trim();
  const compact = value.toUpperCase().replace(/[\s-]/g, "");
  if (!compact) return null;
  if (/^[A-Z]{4}\d{6}[A-Z]/.test(compact) && compact.length === 18) return "curp";
  if (/^\d{18}$/.test(compact)) return "clabe";
  if (/^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/.test(compact)) return "rfc";
  if (/^\d{11}$/.test(compact)) return "nss";
  if (/^\d{5}$/.test(compact)) return "postal";
  const digits = value.replace(/\D/g, "");
  if (/^[+\d\s().-]+$/.test(value) && digits.length >= 10 && digits.length <= 14 && !/[.,]\d{1,2}$/.test(value)) return "phone";
  if (/^\$?\s?\d[\d,]*(\.\d{1,2})?$/.test(value)) return "amount";
  return null;
}

function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-MX" : "en-US", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

function fail(kind: Kind, error: string): Analysis {
  return { kind, valid: false, error, rows: [] };
}

/**
 * Runs the matching mexico-utils function and turns its result into labeled rows.
 */
export function analyze(kind: Kind, value: string, t: Dictionary, locale: Locale): Analysis {
  const { fields, values, errors } = t;
  switch (kind) {
    case "curp": {
      const result = checkCurp(value);
      if (!result.ok) return fail(kind, errors[result.error]);
      const curp = result.value;
      return {
        kind,
        valid: true,
        rows: [
          { label: fields.birthDate, value: formatDate(curp.birthDate, locale) },
          { label: fields.sex, value: values[curp.sex] },
          { label: fields.state, value: curp.state?.name ?? values.abroad },
        ],
      };
    }
    case "rfc": {
      const result = checkRfc(value);
      if (!result.ok) return fail(kind, errors[result.error]);
      const rfc = result.value;
      return {
        kind,
        valid: true,
        rows: [
          { label: fields.type, value: values[rfc.type] },
          ...(rfc.type === "generic" ? [] : [{ label: fields.date, value: formatDate(rfc.date, locale) }]),
          { label: fields.homoclave, value: rfc.homoclave, mono: true },
          { label: fields.checkDigit, value: rfc.checkDigitMatches ? values.matches : values.doesntMatch },
        ],
      };
    }
    case "clabe": {
      const result = checkClabe(value);
      if (!result.ok) return fail(kind, errors[result.error]);
      const clabe = result.value;
      return {
        kind,
        valid: true,
        rows: [
          { label: fields.bank, value: clabe.bank?.name ?? values.unknownBank },
          { label: fields.bankCode, value: clabe.clabe.slice(0, 3), mono: true },
          { label: fields.plaza, value: clabe.plaza, mono: true },
          { label: fields.account, value: clabe.account, mono: true },
        ],
      };
    }
    case "nss": {
      const result = checkNss(value);
      if (!result.ok) return fail(kind, errors[result.error]);
      const nss = result.value;
      return {
        kind,
        valid: true,
        rows: [
          { label: fields.subdelegation, value: nss.subdelegation, mono: true },
          { label: fields.registrationYear, value: String(nss.registrationYear) },
          { label: fields.birthYear, value: String(nss.birthYear) },
        ],
      };
    }
    case "postal": {
      const state = stateFromPostalCode(value);
      if (!state) return fail(kind, errors.postal);
      return {
        kind,
        valid: true,
        rows: [
          { label: fields.state, value: state.name },
          { label: fields.curpCode, value: state.curp, mono: true },
          { label: fields.inegi, value: state.inegi, mono: true },
          { label: fields.iso, value: state.iso, mono: true },
        ],
      };
    }
    case "phone": {
      const normalized = normalizePhone(value);
      if (!normalized) return fail(kind, errors.phone);
      return {
        kind,
        valid: true,
        rows: [
          { label: fields.national, value: formatPhone(value)!, mono: true },
          { label: fields.international, value: formatPhone(value, { international: true })!, mono: true },
          { label: fields.e164, value: normalized, mono: true },
        ],
      };
    }
    case "amount": {
      try {
        return { kind, valid: true, rows: [{ label: fields.words, value: amountToWords(value) }] };
      } catch {
        return fail(kind, errors.amount);
      }
    }
  }
}
