"use client";

import { useParams } from "next/navigation";

const TripPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Trip {id}</h1>
    </div>
  );
};

export default TripPage;
