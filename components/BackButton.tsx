import { ArrowLeftToLine } from "lucide-react";

export function BackButton(onClickEvent: any) {
  return (
    <button className="w-auto mr-auto" onClick={onClickEvent}>
      <ArrowLeftToLine className="hover:text-[#1C4D9C] mb-6 font-poppins" />
    </button>
  );
}
