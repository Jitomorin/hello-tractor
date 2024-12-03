import React from "react";
import {
  DateRangePicker,
  Radio,
  RadioGroup,
  Button,
  ButtonGroup,
  cn,
  RangeCalendar,
} from "@nextui-org/react";
import {
  today,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { dateToObject } from "@/utils/formatDate";
import Hero from "@/views/HomePage/Hero";

export default function CustomDateRangePicker({
  onChangeFunction,
  disabledDates,
}: any) {
  let defaultDate = {
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 7 }),
  };
  let [value, setValue] = React.useState(defaultDate);

  let { locale } = useLocale();
  //   let formatter = DateFormatter({ dateStyle: "full" });
  let now = today(getLocalTimeZone());
  let nextWeek = {
    start: startOfWeek(now.add({ weeks: 1 }), locale),
    end: endOfWeek(now.add({ weeks: 1 }), locale),
  };
  let disabledRanges = [
    [now, now.add({ days: 5 })],
    [now.add({ days: 2 }), now.add({ days: 3 })],
    [now.add({ days: 8 }), now.add({ days: 9 })],
  ];

  let nextMonth = {
    start: startOfMonth(now.add({ months: 1 })),
    end: endOfMonth(now.add({ months: 1 })),
  };

  return (
    <RangeCalendar
      className=" my-8 p-2"
      minValue={now}
      calendarWidth={100}
      value={value}
      isDateUnavailable={(date) =>
        disabledDates.some(
          (interval: any) =>
            date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
        )
      }
      validate={(value: any) =>
        disabledDates.some(
          (interval: any) =>
            value &&
            value.end.compare(interval[0]) >= 0 &&
            value.start.compare(interval[1]) <= 0
        )
          ? "Selected date range may not include unavailable dates."
          : null
      }
      validationBehavior="native"
      onChange={(item) => {
        // console.log(disabledDates);
        setValue(item);
        onChangeFunction(
          item.start.toDate(getLocalTimeZone()),
          item.end.toDate(getLocalTimeZone())
        );
        // console.log(
        //   "itemmmm",
        //   dateToObject(item.start.toDate(getLocalTimeZone()))
        // );
        // console.log("daaaaates2", disabledRanges);
      }}
      label="Event date"
    />
  );
}

// import React from "react";
// import {
//   DateRangePicker,
//   Radio,
//   RadioGroup,
//   Button,
//   ButtonGroup,
//   cn,
//   RangeCalendar,
// } from "@nextui-org/react";
// import {
//   today,
//   startOfWeek,
//   startOfMonth,
//   endOfWeek,
//   endOfMonth,
//   DateFormatter,
//   getLocalTimeZone,
// } from "@internationalized/date";
// import { useLocale } from "@react-aria/i18n";
// import { dateToObject } from "@/utils/formatDate";

// export default function CustomDateRangePicker({
//   onChangeFunction,
//   disabledDates,
// }: any) {
//   let defaultDate = {
//     start: today(getLocalTimeZone()),
//     end: today(getLocalTimeZone()).add({ days: 7 }),
//   };
//   let [value, setValue] = React.useState(defaultDate);

//   let { locale } = useLocale();
//   //   let formatter = DateFormatter({ dateStyle: "full" });
//   let now = today(getLocalTimeZone());
//   let nextWeek = {
//     start: startOfWeek(now.add({ weeks: 1 }), locale),
//     end: endOfWeek(now.add({ weeks: 1 }), locale),
//   };
//   let disabledRanges = [
//     [now, now.add({ days: 5 })],
//     [now.add({ days: 2 }), now.add({ days: 3 })],
//     [now.add({ days: 8 }), now.add({ days: 9 })],
//   ];

//   let nextMonth = {
//     start: startOfMonth(now.add({ months: 1 })),
//     end: endOfMonth(now.add({ months: 1 })),
//   };

//   return (
//     <RangeCalendar
//       className=" my-8 p-2 max-w-lg"
//       minValue={now}
//       CalendarTopContent={
//         <ButtonGroup
//           fullWidth
//           className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
//           radius="full"
//           size="sm"
//           variant="bordered"
//         >
//           <Button
//             onPress={() => {
//               setValue({
//                 start: now,
//                 end: now.add({ days: 7 }),
//               });
//               onChangeFunction(
//                 now.toDate(getLocalTimeZone()),
//                 now.add({ days: 7 }).toDate(getLocalTimeZone())
//               );
//             }}
//           >
//             This week
//           </Button>
//           <Button
//             onPress={() => {
//               setValue(nextWeek);
//               onChangeFunction(
//                 nextWeek.start.toDate(getLocalTimeZone()),
//                 nextWeek.end.toDate(getLocalTimeZone())
//               );
//             }}
//           >
//             Next week
//           </Button>
//           <Button
//             onPress={() => {
//               setValue(nextMonth);
//               onChangeFunction(
//                 nextMonth.start.toDate(getLocalTimeZone()),
//                 nextMonth.end.toDate(getLocalTimeZone())
//               );
//             }}
//           >
//             Next month
//           </Button>
//         </ButtonGroup>
//       }
//       calendarProps={{
//         focusedValue: value.start,
//         nextButtonProps: {
//           variant: "bordered",
//         },
//         prevButtonProps: {
//           variant: "bordered",
//         },
//       }}
//       value={value}
//       isDateUnavailable={(date) =>
//         disabledDates.some(
//           (interval: any) =>
//             date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
//         )
//       }
//       validate={(value) =>
//         disabledDates.some(
//           (interval: any) =>
//             value &&
//             value.end.compare(interval[0]) >= 0 &&
//             value.start.compare(interval[1]) <= 0
//         )
//           ? "Selected date range may not include unavailable dates."
//           : null
//       }
//       validationBehavior="native"
//       onChange={(item) => {
//         setValue(item);
//         onChangeFunction(
//           item.start.toDate(getLocalTimeZone()),
//           item.end.toDate(getLocalTimeZone())
//         );
//         console.log(
//           "itemmmm",
//           dateToObject(item.start.toDate(getLocalTimeZone()))
//         );
//         console.log("daaaaates2", disabledRanges);
//       }}
//       label="Event date"
//     />
//   );
// }
