import React, { useContext, useMemo, useState } from 'react';

interface DatePickerContextType {
  showYearPicker: boolean;
  showDatePicker: boolean;
  currentDate: Date;
  displayDate: Date | null;
  selectedDate: Date | null;
  setShowYearPicker: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export const DatePickerContext = React.createContext<DatePickerContextType | undefined>(undefined);
export const DatePickerProvider = ({ children }: { children: React.ReactNode }) => {
  const currentDate = useMemo(() => new Date(), []);

  const [showYearPicker, setShowYearPicker] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [displayDate, setDisplayDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePickerContext.Provider
      value={{
        showYearPicker,
        showDatePicker,
        currentDate,
        displayDate,
        selectedDate,
        setShowYearPicker,
        setShowDatePicker,
        setDisplayDate,
        setSelectedDate,
      }}>
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePickerContext = (): DatePickerContextType => {
  const context = useContext(DatePickerContext);

  if (!context) {
    throw new Error('useDatePickerContext must be used within a DatePickerProvider');
  }
  return context;
};
