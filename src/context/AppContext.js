import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { format } from 'date-fns';

// Context
const AppContext = createContext();

// Actions
const SET_LANGUAGE = 'SET_LANGUAGE';
const SET_SELECTED_DATE = 'SET_SELECTED_DATE';
const SET_REFLECTION = 'SET_REFLECTION';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';

// Reducer
const appReducer = (state, action) => {
  console.log('AppContext reducer:', action.type, action.payload);
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case SET_SELECTED_DATE:
      return { ...state, selectedDate: action.payload };
    case SET_REFLECTION:
      return { ...state, reflection: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  language: 'pt-br',
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  reflection: null,
  loading: false,
  error: null,
};

// Language mapping
export const LANGUAGES = {
  'pt-br': {
    code: 'pt-br',
    name: 'Português (Brasil)',
    file: 'daily_reflections_brazilian-portuguese.json',
  },
  'en': {
    code: 'en',
    name: 'English',
    file: 'daily_reflections_english.json',
  },
  'fr': {
    code: 'fr',
    name: 'Français',
    file: 'daily_reflections_french.json',
  },
  'es': {
    code: 'es',
    name: 'Español',
    file: 'daily_reflections_spanish.json',
  },
};

// Provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on initialization
  useEffect(() => {
    const savedLanguage = localStorage.getItem('aa-reflections-language');
    const savedDate = localStorage.getItem('aa-reflections-date');
    
    if (savedLanguage && LANGUAGES[savedLanguage]) {
      dispatch({ type: SET_LANGUAGE, payload: savedLanguage });
    }
    
    if (savedDate) {
      dispatch({ type: SET_SELECTED_DATE, payload: savedDate });
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('aa-reflections-language', state.language);
    localStorage.setItem('aa-reflections-date', state.selectedDate);
  }, [state.language, state.selectedDate]);

  // Actions
  const setLanguage = useCallback((language) => {
    console.log('AppContext - setLanguage:', language);
    dispatch({ type: SET_LANGUAGE, payload: language });
  }, []);

  const setSelectedDate = useCallback((date) => {
    console.log('AppContext - setSelectedDate:', date);
    dispatch({ type: SET_SELECTED_DATE, payload: date });
  }, []);

  const setReflection = useCallback((reflection) => {
    dispatch({ type: SET_REFLECTION, payload: reflection });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({ type: SET_LOADING, payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: SET_ERROR, payload: error });
  }, []);

  const value = {
    ...state,
    setLanguage,
    setSelectedDate,
    setReflection,
    setLoading,
    setError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
