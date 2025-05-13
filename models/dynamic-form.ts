export interface FormProps {
  steps: FormStep[];
  submitLabel?: string;
  onSubmit?: (values: any) => Promise<boolean | void>;
  wizard?: boolean;
  nextLabel?: string;
  initialValues?: FormValues;
}

export interface FormStep {
  title?: string;
  subtitle?: string;
  description?: string;
  fields: FormFields;
  nextLabel?: string;
}

export interface FormFields {
  [key: string]: FormField;
}
export interface FormField {
  type?: string;
  label?: string;
  rules?: any;
  mask?: string | string[];
  customRules?: any;
  value?: string | boolean | any[];
  default?: any;
  cols?: number;
  lgCols?: number;
  items?: any[];
  readonly?: boolean;
  itemTitle?: string;
  itemValue?: string;
  rows?: number;
  autoGrow?: boolean;
  maxRows?: number;
  prefix?: string;
  clearable?: boolean;
}

export interface FormValues {
  [key: string]: any;
}
