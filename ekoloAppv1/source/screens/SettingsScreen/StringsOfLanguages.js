import LocalizedStrings from 'react-native-localization';

const StringsOfLanguages = new LocalizedStrings({
  hi: {
    first: 'क्या हाल है ?',
    second: 'मैं ठीक हूँ ?',
  },
  ma: {
    first: 'तू कसा आहेस ?',
    second: 'मी ठीक आहे ?',
  },
  en: {
    first: 'How are You ?',
    second: 'I am fine ',
  },
  fr: {
    first: 'comment allez vous',
    second: 'je vais bien',
  },
});

export default StringsOfLanguages;