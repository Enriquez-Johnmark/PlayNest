const phpFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
});

export function formatPeso(minorAmount: number): string {
  return phpFormatter.format(minorAmount / 100);
}

/** Source demo catalog uses USD; migrated legacy records retain their own currency. */
export function formatActivityPrice(minorAmount: number, currency: 'PHP' | 'USD', decimals = 0): string {
  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-PH', { style: 'currency', currency, minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(minorAmount / 100);
}
