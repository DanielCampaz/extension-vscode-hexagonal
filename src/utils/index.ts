export function capitalizeFirstLetter(inputString: string): string {
  if (!inputString) return '';
  return (
    inputString.substring(0, 1).toUpperCase() +
    inputString.substring(1).toLowerCase()
  );
}

export function capitalizeFirstLetterConditional(lenguajeId:string, inputString: string): string {
  if (!inputString) return '';
  if(lenguajeId === "java") {
    return (
      inputString.substring(0, 1).toUpperCase() +
      inputString.substring(1).toLowerCase()
    );
  } else { return inputString.toLowerCase() } 
}