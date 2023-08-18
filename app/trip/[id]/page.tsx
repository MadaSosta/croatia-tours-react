"use client";

import { useEffect, useState } from "react";

import Trip from "@/components/trip/Index";

import { BASE_API_URL_XID } from "@/constants/consts";
import type { TTrip } from "@/types/typings";
import database from "@/services/database/Database";

type TProps = {
  params: {
    id: string;
  };
};

const TripPage = ({ params: { id } }: TProps) => {
  const [tripData, setTripData] = useState<TTrip | undefined>(undefined);

  const fetchData = async () => {
    const queryParams = new URLSearchParams({
      apikey: "5ae2e3f221c38a28845f05b6d1ceb99d7c758243694cabb8eccb80cb",
    });

    try {
      const res = await fetch(`${BASE_API_URL_XID}/${id}?` + queryParams);
      const data = await res.json();

      setTripData(data);
      database.AddFeaturedTrip(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return tripData && <Trip data={tripData} />;
};

export default TripPage;
