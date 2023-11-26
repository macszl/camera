import {Dispatch, ReactNode, SetStateAction} from 'react';

export type ClassificationResult = string; // TODO: Change later
export type Classification = {
  image: string;
  result: ClassificationResult;
};
export type ClassificationList = Classification[];

export interface SettingsContextProviderProps {
  children: ReactNode;
}

export interface SettingsContextProps {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  classifications: ClassificationList;
  addClassification: (newClassification: Classification) => void;
  clearClassifications: () => void;
}
