import ApiHelper, { ApiHelperOptions } from "../../helpers/api-helper";
import ToastHelper from "../../helpers/toast-helper";
import { useToasts } from "react-toast-notifications";

export const useApiHelper = (options?: ApiHelperOptions) => {
  const toastHelper = new ToastHelper(useToasts());
  const apiHelper = new ApiHelper(toastHelper, options);

  return [apiHelper, toastHelper];
};