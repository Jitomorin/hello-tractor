export interface Car {
  uid: string;
  name: string;
  price: string;
  img: string;
  model: string;
  mark: string;
  year: string;
  doors: string;
  air: string;
  transmission: string;
  fuel: string;
}
export const carFeatures: string[] = [
  "Air Conditioning",
  "Bluetooth Connectivity",
  "GPS Navigation System",
  "Automatic Transmission",
  "Manual Transmission",
  "Cruise Control",
  "Parking Sensors",
  "Backup Camera",
  "Leather Seats",
  "Heated Seats",
  "Sunroof/Moonroof",
  "Keyless Entry",
  "Remote Start",
  "USB Port",
  "Auxiliary Input",
  "Satellite Radio",
  "Apple CarPlay",
  "Android Auto",
  "Hybrid/Electric",
  "Four-Wheel Drive (4WD)",
  "All-Wheel Drive (AWD)",
  "Convertible",
  "Towing Package",
  "Child Safety Locks",
  "Collision Avoidance System",
  "Lane Departure Warning",
  "Blind Spot Monitoring",
  "Adaptive Cruise Control",
  "Rear Cross-Traffic Alert",
  "Wi-Fi Hotspot",
  "Wireless Phone Charging",
  "Premium Sound System",
  "Multi-Zone Climate Control",
  "Power Liftgate",
  "Rain-Sensing Wipers",
  "Heated Steering Wheel",
  "Ventilated Seats",
  "Smartphone Integration",
  "Rear Seat Entertainment System",
  "Third-Row Seating",
  "Fold-Flat Seats",
  "Cargo Space",
  "Roof Rails",
  "Tinted Windows",
  "Sport Package",
  "Performance Upgrades",
  "Custom Wheels",
  "Extended Warranty",
  "Roadside Assistance",
  "Rental Insurance",
  "Unlimited Mileage",
  "24/7 Customer Support",
];

export const carMakes = [
  { id: "toyota", name: "Toyota" },
  { id: "honda", name: "Honda" },
  { id: "ford", name: "Ford" },
  { id: "chevrolet", name: "Chevrolet" },
  { id: "nissan", name: "Nissan" },
  { id: "hyundai", name: "Hyundai" },
  { id: "kia", name: "Kia" },
  { id: "subaru", name: "Subaru" },
  { id: "mazda", name: "Mazda" },
  { id: "volkswagen", name: "Volkswagen" },
  { id: "subaru", name: "Subaru" },
  { id: "mercedes-benz", name: "Mercedes-Benz" },
  { id: "bmw", name: "BMW" },
  // add more car makes as needed
];
export const carCategories = [
  { id: "executives", name: "Excecutives" },
  { id: "movers", name: "Movers" },
  { id: "tours", name: "Tours" },
];

export const CAR_DATA = [
  [
    {
      uid: "1",
      name: "VW Golf 6",
      price: "37,000",
      img: "/images/cars-big/golf6.png",
      model: "Golf 6",
      mark: "Volkswagen",
      year: "2008",
      doors: "4/5",
      air: "Yes",
      transmission: "Manual",
      fuel: "Diesel",
    },
  ],
  [
    {
      uid: "2",
      name: "Audi A1 S-Line",
      price: "45,000",
      img: "/images/cars-big/audia1.png",
      model: "Audi",
      mark: "A1",
      year: "2012",
      doors: "4/5",
      air: "Yes",
      transmission: "Manual",
      fuel: "Gasoline",
    },
  ],
  [
    {
      uid: "3",
      name: "Toyota Camry",
      price: "30,000",
      img: "/images/cars-big/toyotacamry.png",
      model: "Camry",
      mark: "Toyota",
      year: "2006",
      doors: "4/5",
      air: "Yes",
      transmission: "Automatic",
      fuel: "Hybrid",
    },
  ],
  [
    {
      uid: "4",
      name: "BMW 320 ModernLine",
      price: "35,000",
      img: "/images/cars-big/bmw320.png",
      model: "320",
      mark: "BMW",
      year: "2012",
      doors: "4/5",
      air: "Yes",
      transmission: "Manual",
      fuel: "Diesel",
    },
  ],
  [
    {
      uid: "5",
      name: "Mercedes-Benz GLK",
      price: "50,000",
      img: "/images/cars-big/benz.png",
      model: "Benz GLK",
      mark: "Mercedes",
      year: "2006",
      doors: "4/5",
      air: "Yes",
      transmission: "Manual",
      fuel: "Diesel",
    },
  ],
  [
    {
      uid: "6",
      name: "VW Passat CC",
      price: "25,000",
      img: "/images/cars-big/passatcc.png",
      model: "Passat CC",
      mark: "Volkswagen",
      year: "2008",
      doors: "4/5",
      air: "Yes",
      transmission: "Automatic",
      fuel: "Gasoline",
    },
  ],
];
