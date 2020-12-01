import React, {useState, useEffect, useContext} from 'react';
import en from '../lang/en.json';
import hi from '../lang/hi.json';
import * as RNLocalize from 'react-native-localize';
import App from '../App';

const LanguageContextType = {
  hello: 'string'
};


const LanguageContext = React.createContext(LanguageContextType)

const languageObj = {
  en: en,
  hi: hi,
};

export const LanguageContextProvider = ({children}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const currentLanguage = RNLocalize.findBestAvailableLanguage(
      Object.keys(languageObj),
    );

    setSelectedLanguage(currentLanguage?.languageTag || 'en');
  }, []);

  const value = {
    ...languageObj[selectedLanguage],
  };
  return (
    <LanguageContext.Provider value={value}>
      <App />
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);