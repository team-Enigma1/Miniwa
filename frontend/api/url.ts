const IP = "10.200.3.83"; 
const BASE_URL = `http://${IP}:8080`;

// user
export const LOCATION_API_URL = `${BASE_URL}/user/location`;
export const REGISTER_USER_PLANT_API_URL = `${BASE_URL}/user/userPlant`;
export const USER_DATA_API_URL = `${BASE_URL}/user/data`;
export const UPDATE_USER_API_URL = `${BASE_URL}/user/update`;
export const USER_PLANTS_API_URL = `${BASE_URL}/user/plants`;

// plant
export const PLANT_PLAN_API_URL = `${BASE_URL}/plant/plan`;
export const HARVESTED_PLANTS_API_URL = `${BASE_URL}/plant/harvested`;
export const DELETE_PLANT_API_URL = (userPlantId: number) => `${BASE_URL}/plant/user/${userPlantId}`;
export const HARVEST_PLANT_API_URL = (userPlantId: number) => `${BASE_URL}/plant/user/${userPlantId}/harvest`;
// todo
export const TODO_API_URL = `${BASE_URL}/todos`;

//advice
export const ADVICE_API_URL = `${BASE_URL}/advice`

//material
export const SEEDS_API_URL = `${BASE_URL}/material/seeds`;
export const FERTILIZERS_API_URL = `${BASE_URL}/material/fertilizers`;
export const SOILS_API_URL = `${BASE_URL}/material/soils`;