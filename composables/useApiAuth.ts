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
      console.log("authResponse");
      console.log(authResponse);
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
  };
}
