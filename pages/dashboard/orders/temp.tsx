import { StatusPill } from "@/components/StatusPill";
import { calculatePrice, formatNumber } from "@/utils/formatNumber";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const orders = [
  {
    uid: 1,
    name: "Distant Mountains Artwork Tee",
    price: "$36.00",
    description:
      "You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?",
    address: ["Floyd Miles", "7363 Cynthia Pass", "Toronto, ON N3Y 4H8"],
    email: "f•••@example.com",
    phone: "1•••••••••40",
    href: "#",
    status: "Processing",
    step: 1,
    date: "March 24, 2021",
    datetime: "2021-03-24",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg",
    imageAlt:
      "Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.",
  },
  // More products...
];

const booking = {
  createdAt: {
    seconds: 1714582993,
    nanoseconds: 634000000,
  },
  phoneNumber: "0796222552",
  transactionSignature:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6ImV4cHJlc3MtY2hlY2tvdXQiLCJpc3MiOiJJbnRhU2VuZCBTb2x1dGlvbnMgTGltaXRlZCIsImF1ZCI6WyJlNGQ2OTViZC01YzVhLTQ4NzYtOWE4Yi1hNDFhYjhmMmJhMzEiXSwiaWF0IjoxNzE0NTg1NDQyLCJleHAiOjE3MTQ1ODkwNDIsImFjY291bnRJRCI6IjZSTjNXSlIiLCJyZWZlcmVuY2UiOiJlNGQ2OTViZC01YzVhLTQ4NzYtOWE4Yi1hNDFhYjhmMmJhMzEifQ.BEKc50p0DeKBBp_KYBWYEkrxMH2fW_FQauMOKy9RRqw",
  uid: "4f6e630a-f88c-4220-b1b5-829d252a7e0d",
  rental: {
    year: "2010",
    make: "Toyota",
    numberPlate: "KCQ 226a",
    model: "Axio",
    availability: true,
    image: [
      "https://firebasestorage.googleapis.com/v0/b/Plow-mart-web.appspot.com/o/rentals%2F5e0bff23-f3ee-4d4d-ac78-68c3c608fe95%2FBR285119_4acd38.jpeg?alt=media&token=631585d2-a610-45e4-bc44-1b077840f2aa",
      "https://firebasestorage.googleapis.com/v0/b/Plow-mart-web.appspot.com/o/rentals%2F5e0bff23-f3ee-4d4d-ac78-68c3c608fe95%2FBR285119_78054f.jpeg?alt=media&token=a2115cad-a8a2-457e-8db1-f7b0e6acf6c9",
      "https://firebasestorage.googleapis.com/v0/b/Plow-mart-web.appspot.com/o/rentals%2F5e0bff23-f3ee-4d4d-ac78-68c3c608fe95%2FBR285119_192062.jpeg?alt=media&token=e13dfc42-3d0b-45d9-b674-159461c70734",
      "https://firebasestorage.googleapis.com/v0/b/Plow-mart-web.appspot.com/o/rentals%2F5e0bff23-f3ee-4d4d-ac78-68c3c608fe95%2FBR285119_569473.jpeg?alt=media&token=a6986137-163e-4dbd-93b5-095bc96e2f12",
    ],
    description:
      "Explore the road in style with our Toyota Axio 2015 for rent. This sleek and reliable sedan offers a perfect blend of efficiency and comfort. Ideal for both city commuting and longer journeys, the Toyota Axio boasts advanced features, a fuel-efficient engine, and a spacious interior. Enjoy a smooth driving experience as you navigate your way through urban landscapes or embark on exciting road trips. Rent the Toyota Axio 2015 and elevate your travel experience with a combination of modern design and performance excellence.",
    fuel: "Diesel",
    price: 5000,
    category: "tours",
    name: "Toyota Axio",
    isApproved: true,
    location: {
      zip_code: "test",
      addressLine2: "test",
      addressLine1: "test",
    },
    userID: "HgFXmuPoqpUIOekueKcKBUMP7qh2",
    dateAdded: {
      nanoseconds: 679000000,
      seconds: 1710145882,
    },
    uid: "5e0bff23-f3ee-4d4d-ac78-68c3c608fe95",
    seats: "5",
    reviews: [],
  },
  address_1: "Githeri lane",
  address_2: "South B",
  zipCode: "0110",
  transaction: {
    methods: ["card", "mpesa"],
    first_name: "Shidadi",
    redirect_url: null,
    amount: "37000.00",
    currency: "KES",
    signature:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6ImV4cHJlc3MtY2hlY2tvdXQiLCJpc3MiOiJJbnRhU2VuZCBTb2x1dGlvbnMgTGltaXRlZCIsImF1ZCI6WyJlNGQ2OTViZC01YzVhLTQ4NzYtOWE4Yi1hNDFhYjhmMmJhMzEiXSwiaWF0IjoxNzE0NTg2NTcxLCJleHAiOjE3MTQ1OTAxNzEsImFjY291bnRJRCI6IjZSTjNXSlIiLCJyZWZlcmVuY2UiOiJlNGQ2OTViZC01YzVhLTQ4NzYtOWE4Yi1hNDFhYjhmMmJhMzEifQ.3EKvozSqr2SUbDn6XBpyVCrk3yL2QOXCbKlKnPJlSIA",
    email: "shulufue@gmail.com",
    channel: "WEBSITE",
    url: "https://sandbox.intasend.com/checkout/e4d695bd-5c5a-4876-9a8b-a41ab8f2ba31/express/",
    city: null,
    paid: true,
    api_ref: null,
    method: null,
    host: "http://localhost:3000/dashboard/home",
    bitcoin_tarrif: "BUSINESS-PAYS",
    wallet_id: null,
    address: null,
    id: "e4d695bd-5c5a-4876-9a8b-a41ab8f2ba31",
    last_name: "Shulu",
    defaults: {
      enable_card_payment: true,
      enable_bitcoin_payment: false,
      accordion_styles:
        '{"componentBackgroundColor":"#F7FAFC","activePaymentColor":"#056BD5","inactivePaymentColor":"#333333","spacingBorder":"#CCCCCC","unselectedCardBackgroundColor":"#FFFFFF","selectedCardBackgroundColor":"#FFFFFF","selectedBorderColor":"2px solid #056BD5","unselectedBorderColor":"2px solid #A0AEC0","selectedFontColor":"#056BD5","unselectedFontColor":"#333333","selectedCardShadow":"0px 0px 7px rgba(5, 107, 213, 0.5)","unselectedCardShadow":"none","borderRadius":"10px","inputLabelColor":"#000000","inputTextColor":"#000","inputBackgroundColor":"#FFFFFF","inputBorderColor":"#CCCCCC","inputBorderRadius":"10px","ctaBgColor":"#056BD5","ctaFontColor":"#fff","fontFamily":"","fontWeight":"light"}',
      enable_ach_payment: false,
      enable_mpesa_payment: true,
      default_tarrif: "BUSINESS-PAYS",
      methods: ["card", "mpesa"],
      styles: {
        unselectedFontColor: "#333333",
        ctaFontColor: "#fff",
        unselectedCardBackgroundColor: "#FFFFFF",
        selectedCardBackgroundColor: "#FFFFFF",
        componentBackgroundColor: "#F7FAFC",
        unselectedCardShadow: "none",
        inputBackgroundColor: "#FFFFFF",
        unselectedBorderColor: "2px solid #A0AEC0",
        inputBorderRadius: "10px",
        fontWeight: "light",
        fontFamily: "",
        selectedFontColor: "#056BD5",
        selectedBorderColor: "2px solid #056BD5",
        ctaBgColor: "#056BD5",
        inputBorderColor: "#CCCCCC",
        borderRadius: "10px",
        selectedCardShadow: "0px 0px 7px rgba(5, 107, 213, 0.5)",
        inputLabelColor: "#000000",
        inputTextColor: "#000",
      },
      tabs_styles:
        '{"componentBackgroundColor":"#F7FAFC","unselectedCardBackgroundColor":"#FFFFFF","selectedCardBackgroundColor":"#FFFFFF","selectedBorderColor":"2px solid #056BD5","unselectedBorderColor":"2px solid #A0AEC0","selectedFontColor":"#056BD5","unselectedFontColor":"#333333","selectedCardShadow":"0px 0px 7px rgba(5, 107, 213, 0.5)","unselectedCardShadow":"none","borderRadius":"10px","inputLabelColor":"#000000","inputTextColor":"#000","inputBackgroundColor":"#FFFFFF","inputBorderColor":"#CCCCCC","inputBorderRadius":"10px","ctaBgColor":"#056BD5","ctaFontColor":"#fff","fontFamily":"","fontWeight":"light"}',
      layout: "tabs",
      created_at: "2024-04-06T13:23:00.494155+03:00",
      default_currency: "USD",
      updated_at: "2024-04-06T13:23:00.494176+03:00",
    },
    is_mobile: false,
    zipcode: null,
    version: null,
    created_at: "2024-05-01T20:44:02.687971+03:00",
    ach_tarrif: "BUSINESS-PAYS",
    updated_at: "2024-05-01T20:49:40.780391+03:00",
    mobile_tarrif: "BUSINESS-PAYS",
    styles: {
      selectedBorderColor: "2px solid #056BD5",
      inputBorderColor: "#CCCCCC",
      inputLabelColor: "#000000",
      selectedCardShadow: "0px 0px 7px rgba(5, 107, 213, 0.5)",
      unselectedFontColor: "#333333",
      selectedFontColor: "#056BD5",
      selectedCardBackgroundColor: "#FFFFFF",
      unselectedBorderColor: "2px solid #A0AEC0",
      unselectedCardBackgroundColor: "#FFFFFF",
      borderRadius: "10px",
      ctaFontColor: "#fff",
      ctaBgColor: "#056BD5",
      inputBackgroundColor: "#FFFFFF",
      inputTextColor: "#000",
      fontWeight: "light",
      inputBorderRadius: "10px",
      unselectedCardShadow: "none",
      componentBackgroundColor: "#F7FAFC",
      fontFamily: "",
    },
    phone_number: "0796222552",
    layout: "tabs",
    card_tarrif: "BUSINESS-PAYS",
    state: null,
    country: null,
  },
  transactionID: "e4d695bd-5c5a-4876-9a8b-a41ab8f2ba31",
  paymentURL:
    "https://sandbox.intasend.com/checkout/e4d695bd-5c5a-4876-9a8b-a41ab8f2ba31/express/",
  fullName: "Shidadi Shulu",
  additionalNotes: "Ask watchman for directions",
  email: "shulufue@gmail.com",
  status: "completed",
  userID: "5DP16bqJJEbw12Ut3G76dart4OF3",
  selectedDates: [
    {
      key: "selection",
      endDate: {
        seconds: 1715187787,
        nanoseconds: 783000000,
      },
      startDate: {
        seconds: 1714582987,
        nanoseconds: 783000000,
      },
    },
  ],
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Order Details
        </h1>

        <div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
          <dl className="flex">
            <dt className="text-gray-500">Order ID&nbsp;</dt>
            <dd className="font-medium text-gray-900">{booking.uid}</dd>
            <dt>
              <span className="sr-only">Date</span>
              <span className="mx-2 text-gray-400" aria-hidden="true">
                &middot;
              </span>
            </dt>
            <dd className="font-medium text-gray-900">
              <time dateTime="2021-03-22">
                {new Date(booking.createdAt.seconds * 1000).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </time>
            </dd>
          </dl>
          <div className="mt-4 sm:mt-0">
            <a
              href="#"
              className="font-medium text-primary hover:text-primary-400"
            >
              View invoice
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="sr-only">Products purchased</h2>

          <div className="space-y-24">
            <div className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8">
              <div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-50">
                  <img
                    src={booking.rental.image[0]}
                    alt={booking.rental.name}
                    className="object-cover object-center"
                  />
                </div>
              </div>
              <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                <h3 className="text-lg font-medium text-gray-900">
                  <a
                    className="hover:underline transition-all ease-in-out"
                    href={`/rentals/${booking.rental.uid}`}
                  >
                    {booking.rental.name}
                  </a>
                </h3>
                <p className="mt-1 font-medium text-gray-900">
                  {`${formatNumber(booking.rental.price)}Ksh`}
                </p>
                <p className="mt-3 text-gray-500">
                  {booking.rental.description}
                </p>
              </div>
              <div className="sm:col-span-12 md:col-span-7">
                <dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                  <div>
                    <dt className="font-medium text-gray-900">
                      Delivery address
                    </dt>
                    <dd className="mt-3 text-gray-500">
                      <span className="block">{orders[0].address[0]}</span>
                      <span className="block">{orders[0].address[1]}</span>
                      <span className="block">{orders[0].address[2]}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">
                      Shipping updates
                    </dt>
                    <dd className="mt-3 space-y-3 text-gray-500">
                      <p>{orders[0].email}</p>
                      <p>{orders[0].phone}</p>
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </button>
                    </dd>
                  </div>
                </dl>
                <div className="mt-6">
                  <StatusPill status={booking.status} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing */}
        <div className="mt-24">
          <h2 className="sr-only">Billing Summary</h2>

          <div className="rounded-lg bg-gray-50 px-6 py-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-0 lg:py-8">
            <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-5 lg:pl-8">
              <div>
                <dt className="font-medium text-gray-900">Billing address</dt>
                <dd className="mt-3 text-gray-500">
                  <span className="block">Floyd Miles</span>
                  <span className="block">7363 Cynthia Pass</span>
                  <span className="block">Toronto, ON N3Y 4H8</span>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">
                  Payment information
                </dt>
                <dd className="mt-3 flex">
                  <div>
                    <svg
                      aria-hidden="true"
                      width={36}
                      height={24}
                      viewBox="0 0 36 24"
                      className="h-6 w-auto"
                    >
                      <rect width={36} height={24} rx={4} fill="#224DBA" />
                      <path
                        d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                        fill="#fff"
                      />
                    </svg>
                    <p className="sr-only">Visa</p>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900">Ending with 4242</p>
                    <p className="text-gray-600">Expires 02 / 24</p>
                  </div>
                </dd>
              </div>
            </dl>

            <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-7 lg:mt-0 lg:pr-8">
              <div className="flex items-center justify-between pb-4">
                <dt className="text-gray-600">Subtotal</dt>
                <dd className="font-medium text-gray-900">$72</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Shipping</dt>
                <dd className="font-medium text-gray-900">$5</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Tax</dt>
                <dd className="font-medium text-gray-900">$6.16</dd>
              </div>
              <div className="flex items-center justify-between pt-4">
                <dt className="font-medium text-gray-900">Order total</dt>
                <dd className="font-medium text-indigo-600">$83.16</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
