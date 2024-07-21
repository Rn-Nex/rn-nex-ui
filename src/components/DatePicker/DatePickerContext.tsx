import React, { useContext, useState } from 'react';

interface DatePickerContextType {
  showYearPicker: boolean;
  currentYear: number;
  setShowYearPicker: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
}

export const DatePickerContext = React.createContext<DatePickerContextType | undefined>(undefined);
export const DatePickerProvider = ({ children }: { children: React.ReactNode }) => {
  const [showYearPicker, setShowYearPicker] = useState<boolean>(false);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  return (
    <DatePickerContext.Provider value={{ showYearPicker, currentYear, setShowYearPicker, setCurrentYear }}>
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePickerContext = (): DatePickerContextType => {
  const context = useContext(DatePickerContext);
  if (context === undefined) {
    throw new Error('useDatePickerContext must be used within a DatePickerProvider');
  }
  return context;
};
