export function capitalizeFirstLetter(inputString: string): string {
  if (!inputString) return '';
  return (
    inputString.substring(0, 1).toUpperCase() +
    inputString.substring(1).toLowerCase()
  );
}