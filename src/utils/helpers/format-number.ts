export function numberFormatDot(value: number): string {
  return `${`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}
export function numberFormatComma(value: number): string {
  return `${`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
