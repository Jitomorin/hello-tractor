import { format, parseISO } from "date-fns";

export default function PostDate({ dateString }: { dateString: string }) {
  if (!dateString) return null;

  const date = parseISO(dateString);
  return (
    <time className="font-bold" dateTime={dateString}>
      {format(date, "LLLL	d, yyyy")}
    </time>
  );
}
