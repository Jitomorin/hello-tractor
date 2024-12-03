import NextImage from "next/image";
export default function Logo({ ...rest }) {
  return (
    <NextImage
      src="/core-maestro-logos/COREMAESTROLOGO.png"
      alt="logo"
      width={200}
      height={75}
    />
  );
}
