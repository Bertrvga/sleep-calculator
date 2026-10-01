import type { Metadata } from "next";
import SleepCalculator from "@/components/SleepCalculator";
import SleepGuide from "@/components/SleepGuide";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <SleepCalculator />
      <SleepGuide />
    </>
  );
}
