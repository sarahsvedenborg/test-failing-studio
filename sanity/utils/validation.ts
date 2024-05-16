export type RuleType = {
  required: () => RuleType;
  error: (text: string) => RuleType;
  warning: () => RuleType;
  positive: () => RuleType;
  unique: () => RuleType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom: (callback: (field: any, context: any) => void) => RuleType;
  max: (max: number) => RuleType;
  min: (date: string) => RuleType;
  uppercase: () => RuleType;
  valueOfField: (field: string) => string;
  integer: () => RuleType;
  regex: (exp: RegExp, value: { name: string; invert: boolean }) => RuleType;
};

export const timeValidation = (Rule: RuleType) =>
  Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    name: 'KLOKKESLETT', // Error message is "Does not match email-pattern"
    invert: false, // Boolean to allow any value that does NOT match pattern
  });

export const compareTime = (time1: string, time2: string) => {
  if (time1 === time2) {
    return 0;
  }
  const time1Array = time1.split(':').map((item) => parseInt(item, 10));
  const time2Array = time2.split(':').map((item) => parseInt(item, 10));

  if (time1Array[0] > time2Array[0]) {
    return 1;
  }
  if (time1Array[0] < time2Array[0]) {
    return 2;
  }
  if (time1Array[1] > time2Array[1]) {
    return 1;
  }
  return 2;
};
