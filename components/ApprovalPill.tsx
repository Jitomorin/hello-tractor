import { classNames } from "@/contexts/utils";

export default function ApprovalPill({ value }: any) {
  const isApproved = value ? true : false;
  const approvalValue = value ? "Available" : "Not Available";
  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-sm rounded-full shadow-sm",
        isApproved ? "bg-green-100 text-green-700" : null,
        !isApproved ? "bg-red-100 text-red-700" : null
      )}
    >
      {approvalValue.toString()}
    </span>
  );
}
