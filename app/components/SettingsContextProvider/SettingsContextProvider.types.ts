import {Dispatch, ReactNode, SetStateAction} from 'react';

export interface SettingsContextProviderProps {
  children: ReactNode;
}

export interface SettingsContextProps {
  language: string | null;
  setLanguage: Dispatch<SetStateAction<string | null>>;
}
