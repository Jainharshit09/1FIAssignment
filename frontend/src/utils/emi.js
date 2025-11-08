export function calculateMonthlyPayment(principal, tenureMonths, annualRateInPercent) {
  const annualRate = Number(annualRateInPercent) / 100;
  if (!annualRate || annualRate === 0) {
    return +(principal / tenureMonths).toFixed(2);
  }
  const monthlyRate = annualRate / 12;
  const n = tenureMonths;
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, n);
  const denominator = Math.pow(1 + monthlyRate, n) - 1;
  const emi = numerator / denominator;
  return +emi.toFixed(2);
}
