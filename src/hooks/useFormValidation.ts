
import { useState, useEffect } from 'react';

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
}

interface ValidationErrors {
  [key: string]: string | null;
}

export const useFormValidation = (formData: any, rules: ValidationRules) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isValid, setIsValid] = useState(false);

  const validateField = (fieldName: string, value: string): string | null => {
    const rule = rules[fieldName];
    if (!rule) return null;

    if (rule.required && (!value || value.trim() === '')) {
      return 'Detta fält är obligatoriskt';
    }

    if (rule.minLength && value.length < rule.minLength) {
      return `Minst ${rule.minLength} tecken krävs`;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return `Högst ${rule.maxLength} tecken tillåtna`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      if (fieldName === 'email') return 'Ogiltig e-postadress';
      if (fieldName === 'personalNumber') return 'Ogiltigt personnummer (YYYYMMDD-XXXX)';
      if (fieldName === 'phone') return 'Ogiltigt mobilnummer';
      return 'Ogiltigt format';
    }

    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  };

  useEffect(() => {
    const newErrors: ValidationErrors = {};
    let hasErrors = false;

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName] || '');
      newErrors[fieldName] = error;
      if (error) hasErrors = true;
    });

    setErrors(newErrors);
    setIsValid(!hasErrors && Object.keys(formData).some(key => formData[key]));
  }, [formData]);

  return { errors, isValid, validateField };
};

export const formValidationRules: ValidationRules = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  personalNumber: {
    required: true,
    pattern: /^\d{8}-\d{4}$/,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    required: true,
    pattern: /^07\d{1}-?\d{3}\s?\d{2}\s?\d{2}$/,
  },
  income: {
    required: true,
    custom: (value: string) => {
      const num = parseInt(value);
      if (isNaN(num) || num < 100000) return 'Minst 100 000 kr årsinkomst krävs';
      if (num > 2000000) return 'Maximal årsinkomst är 2 000 000 kr';
      return null;
    },
  },
};
