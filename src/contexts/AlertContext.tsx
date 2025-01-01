import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import type { AlertType } from '../components/common/Alert';
import { Alert } from '../components/common/Alert';

interface AlertContextType {
  showAlert: (message: string, type: AlertType) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Array<{ id: number; message: string; type: AlertType }>>([]);

  const showAlert = (message: string, type: AlertType) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, message, type }]);
  };

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alerts.map(({ id, message, type }) => (
        <Alert key={id} message={message} type={type} onClose={() => removeAlert(id)} />
      ))}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
