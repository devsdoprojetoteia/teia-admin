export interface NotifyMessage {
  message: string;
  type: "success" | "error" | "info" | "warning";
}

const useNotify = () => {
  let notifyMessage = useState<NotifyMessage | null>(
    "notifyMessage",
    () => null
  );

  const notify = (p: NotifyMessage) => {
    notifyMessage.value = p;
  };

  const notifyInfo = (message: string) => {
    notify({ message, type: "info" });
  };

  const notifySuccess = (message: string) => {
    notify({ message, type: "success" });
  };

  const notifyWarning = (message: string) => {
    notify({ message, type: "warning" });
  };

  const notifyError = (message: string) => {
    notify({ message, type: "error" });
  };

  return {
    notifyMessage,
    notify,
    notifyInfo,
    notifySuccess,
    notifyWarning,
    notifyError,
  };
};
export default useNotify;
