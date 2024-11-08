function convertTime(timeStamp) {
  const inputDate = new Date(timeStamp);
  const now = new Date();
  const timewithAmPm = inputDate.toLocaleTimeString("en-us", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (inputDate >= today) {
    return `Today ${timewithAmPm}`;
  } else if (inputDate >= yesterday) {
    return `Yesterday ${timewithAmPm}`;
  } else {
    return timewithAmPm;
  }
}

export default convertTime;
