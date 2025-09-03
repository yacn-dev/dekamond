export const validateIranianMobile = (phone: string): boolean => {
  // Remove any non-digit characters
  const cleanedPhone = phone.replace(/\D/g, '');
  
  // Check if it matches Iranian mobile patterns
  const patterns = [
    /^09\d{9}$/,           // 09xxxxxxxxx
    /^989\d{9}$/,          // 989xxxxxxxxx
    /^00989\d{9}$/,        // 00989xxxxxxxxx
  ];
  
  return patterns.some(pattern => pattern.test(cleanedPhone));
};

export const formatIranianMobile = (phone: string): string => {
  const cleanedPhone = phone.replace(/\D/g, '');
  
  if (cleanedPhone.startsWith('989') && cleanedPhone.length === 12) {
    return `0${cleanedPhone.slice(2)}`;
  }
  
  if (cleanedPhone.startsWith('00989') && cleanedPhone.length === 14) {
    return `0${cleanedPhone.slice(4)}`;
  }
  
  return cleanedPhone;
};