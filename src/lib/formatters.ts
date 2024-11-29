export function formatDate(date: Date) {
  const dateFormatter = new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  });

  return dateFormatter.format(date);
}
