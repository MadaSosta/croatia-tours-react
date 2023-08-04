import { Cinzel_Decorative } from "next/font/google";

const cinzelDecorative = Cinzel_Decorative({
    weight: ["400", "700", "900"],
    subsets: ["latin"],
  });

  const BASE_API_URL = 'test.api.amadeus.com';

  export { cinzelDecorative, BASE_API_URL }