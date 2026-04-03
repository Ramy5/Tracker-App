export const truncateName = (name: string, maxLength: number = 10): string => {
  return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
};
