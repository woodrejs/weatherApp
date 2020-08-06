export const getCoords = async () => {
  const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  type Coords = {
    coords: { longitude: number; latitude: number };
  };

  return {
    long: (pos as Coords).coords.longitude,
    lat: (pos as Coords).coords.latitude,
  };
};
