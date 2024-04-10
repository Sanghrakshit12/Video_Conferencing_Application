export default function GetLinkToMAil(
  meetingLink: string,
  startsAt?: Date,
  description?: string,
) {
  const startDateFormatted = startsAt
    ? startsAt.toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : undefined;
  const subject =
    "Join My Meeting" + (startDateFormatted ? `at ${startDateFormatted}` : "");
  const body =
    `Join my Meeting at ${meetingLink}.` +
    (startDateFormatted
      ? `\n\n the Meeting statt at ${startDateFormatted}.`
      : "") +
    (description ? `\n\n Description ${description}.` : "");
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
