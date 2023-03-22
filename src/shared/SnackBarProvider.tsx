import { Snackbar } from "@/components/Snackbar";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

export interface SnackBarProviderProps extends PropsWithChildren {}

export interface SnackBarMessage {
  message: string;
  duration?: number;
}

export interface SnackBarContextProps {
  createSnackBarError: (message: string, duration?: number) => void;
}

const SnackBarContext = createContext<SnackBarContextProps>(null!);

export const SnackBarProvider: FC<SnackBarProviderProps> = (props) => {
  const [errors, setErrors] = useState<SnackBarMessage[]>([]);

  const createSnackBarError = useCallback(
    (message: string, duration = 2000) =>
      setErrors([{ message, duration }, ...errors]),
    [errors]
  );

  const contextProps = useMemo(
    () => ({ createSnackBarError }),
    [createSnackBarError]
  );

  useEffect(() => {
    if (errors.length > 0) {
      const last = errors[errors.length - 1];
      const timer = setTimeout(() => {
        setErrors(errors.slice(0, errors.length - 1));
      }, last.duration);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <SnackBarContext.Provider value={contextProps} {...props}>
      {props.children}
      {errors.map((error) => (
        <Snackbar
          key={error.message}
          message={error.message}
          duration={error.duration}
        />
      ))}
    </SnackBarContext.Provider>
  );
};

export function useSnackBarContext(throwOnErr = false) {
  const context = useContext(SnackBarContext);
  if (throwOnErr && context == null) throw new Error();
  return context;
}

export function useErrorSnackBar(throwOnErr = false) {
  const context = useContext(SnackBarContext);
  if (throwOnErr && context == null) throw new Error();
  const ref = useRef(context.createSnackBarError);
  return ref.current;
}
