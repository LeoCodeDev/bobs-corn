export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

export const formatErrorMessage = (message: string): string => {
  const datePattern = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/;
  const match = message.match(datePattern);

  if (match) {
    const formattedDate = formatDate(match[1]);
    return message.replace(match[1], formattedDate);
  }

  return message;
};
