import Navbar from "@/src/components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <p>{router.query.slug}</p>
    </>
  );
}
