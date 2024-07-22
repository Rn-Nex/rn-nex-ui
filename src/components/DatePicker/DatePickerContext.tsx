import React, { useContext, useMemo, useState } from 'react';
import { getMonthName } from './utils';
import { LayoutRectangle } from 'react-native';
import { getYears } from '../../utils';

interface DatePickerContextType {
  showYearPicker: boolean;
  currentYear: number;
  activeDay: string | number | null;
  activeMonthName: string | null;
  showDatePicker: boolean;
  years: number[];
  dateCalendarRect: LayoutRectangle | undefined;
  setShowYearPicker: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentYear: React.Dispatch<React.SetStateAction<number>>;
  setActiveDay: React.Dispatch<React.SetStateAction<string | number | null>>;
  setActiveMonthName: React.Dispatch<React.SetStateAction<string | null>>;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  setDateCalendarRect: React.Dispatch<React.SetStateAction<LayoutRectangle | undefined>>;
}

export const DatePickerContext = React.createContext<DatePickerContextType | undefined>(undefined);
export const DatePickerProvider = ({ children }: { children: React.ReactNode }) => {
  const currentMonthIndex = useMemo(() => new Date().getMonth(), []);
  const years = useMemo(() => getYears(), []);

  const [showYearPicker, setShowYearPicker] = useState<boolean>(false);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [activeDay, setActiveDay] = useState<string | number | null>(null);
  const [activeMonthName, setActiveMonthName] = useState<string | null>(getMonthName(currentMonthIndex));
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [dateCalendarRect, setDateCalendarRect] = useState<LayoutRectangle | undefined>(undefined);

  return (
    <DatePickerContext.Provider
      value={{
        showYearPicker,
        currentYear,
        activeDay,
        activeMonthName,
        showDatePicker,
        dateCalendarRect,
        years,
        setShowYearPicker,
        setCurrentYear,
        setActiveDay,
        setActiveMonthName,
        setShowDatePicker,
        setDateCalendarRect,
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
