import frenchCities from "@/app/data/frenchCities.json";

const formattedCities = frenchCities.map((city) => ({
  value: city.city,
  name: city.city,
  region: city.admin_name,
  latlng: [parseInt(city.lat), parseInt(city.lng)],
}));

const useCities = () => {
  const getCities = () => formattedCities;

  const getCityByValue = (value: string) => {
    return formattedCities.find((city) => city.value === value);
  };

  return {
    getCities,
    getCityByValue,
  };
};

export default useCities;
