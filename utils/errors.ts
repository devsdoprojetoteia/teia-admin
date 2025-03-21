interface ApiError extends Error {
  response?: {
    _data?: {
      message?: string;
    };
    data?: {
      message?: string;
    };
  };
}

export const apiError = (error: ApiError): string => {
  if (error && error.response) {
    if (error.response.data) {
      if (error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.response.data as string;
      }
    } else if (error.response._data) {
      if (error.response._data.message) {
        return error.response._data.message;
      } else {
        return error.response._data as string;
      }
    } else {
      return error.response as string;
    }
  }

  if (error.message) {
    return error.message;
  }

  return "Ocorreu um erro inesperado.";
};

export const errorMessage = (error: any): string => {
  return apiError(error as ApiError);
};
