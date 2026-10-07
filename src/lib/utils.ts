export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatPKR(amount: number) {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}
