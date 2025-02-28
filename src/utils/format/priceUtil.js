export const formatPrice = (price) => {
  if (!price || typeof price !== 'number') {
    console.error('Некорректная цена:', price);
    return '-- P';
  }

  return (
    new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + ' P'
  );
};
