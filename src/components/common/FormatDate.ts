export   const formatDate = (rawDate: string) => {
    const date = new Date(rawDate);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}.`;
  };