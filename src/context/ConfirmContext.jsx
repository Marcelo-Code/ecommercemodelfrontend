import { createContext, useContext, useState, useCallback } from "react";
import { ConfirmationAlert } from "../components/common/confirmationAlert/ConfirmationAlert";

const ConfirmContext = createContext();

export const useConfirm = () => useContext(ConfirmContext);

export const ConfirmProvider = ({ children }) => {
  const [confirmState, setConfirmState] = useState({
    open: false,
    message: "",
    resolve: null,
    reject: null,
  });

  const confirm = useCallback((message) => {
    return new Promise((resolve, reject) => {
      setConfirmState({ open: true, message, resolve, reject });
    });
  }, []);

  const handleConfirm = () => {
    confirmState.resolve(true);
    setConfirmState({ ...confirmState, open: false });
  };

  const handleCancel = () => {
    confirmState.resolve(false);
    setConfirmState({ ...confirmState, open: false });
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <ConfirmationAlert
        open={confirmState.open}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        message={confirmState.message}
      />
    </ConfirmContext.Provider>
  );
};
