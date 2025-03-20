export interface NotificationProps {
  type?: "success" | "error" | "warning" | "info";
  icon?: string;
  title: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  onContinue?: () => void;
}
