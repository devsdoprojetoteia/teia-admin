import { errorMessage } from "~~/utils/errors";

export default function () {
  const register = async (
    name: string,
    phone: string,
    password: string
  ): Promise<boolean> => {
    try {
      const auth = useAuth();
      const authResponse = await auth.register(name, phone, password);
      return !!authResponse;
    } catch (error: unknown) {
      const { notifyError } = useNotify();
      notifyError(errorMessage(error));
    }
    return false;
  };

  const login = async (phone: string, password: string): Promise<boolean> => {
    try {
      const auth = useAuth();

      const authResponse = await auth.login(phone, password);
      return !!authResponse;
    } catch (error: unknown) {
      const { notifyError } = useNotify();
      notifyError(errorMessage(error));
    }
    return false;
  };

  const forgotPassword = async (phone: string): Promise<boolean> => {
    try {
      const auth = useAuth();
      const authResponse = await auth.forgotPassword(phone);
      return !!authResponse;
    } catch (error: unknown) {
      const { notifyError } = useNotify();
      notifyError(errorMessage(error));
    }
    return false;
  };

  const recoverPassword = async (
    phone: string,
    code: string,
    password: string
  ): Promise<boolean> => {
    try {
      const auth = useAuth();
      const authResponse = await auth.recoverPassword(phone, code, password);
      return !!authResponse;
    } catch (error: unknown) {
      const { notifyError } = useNotify();
      notifyError(errorMessage(error));
    }
    return false;
  };

  return {
    login,
    register,
    forgotPassword,
    recoverPassword,
  };
}
