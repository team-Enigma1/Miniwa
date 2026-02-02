const IP = "10.200.1.10"; 
export const BASE_URL = `http://${IP}:8080`;

// user
export const LOCATION_API_URL = `${BASE_URL}/api/user/location`;
export const REGISTER_USER_PLANT_API_URL = `${BASE_URL}/api/user/userPlant`;
export const USER_DATA_API_URL = `${BASE_URL}/api/user/data`;
export const UPDATE_USER_API_URL = `${BASE_URL}/api/user/update`;
export const USER_PLANTS_API_URL = `${BASE_URL}/api/user/plants`;

// plant
export const PLANT_PLAN_API_URL = `${BASE_URL}/api/plant/plan`;
export const HARVESTED_PLANTS_API_URL = `${BASE_URL}/api/plant/harvested`;
export const DELETE_PLANT_API_URL = (userPlantId: number) => `${BASE_URL}/api/plant/user/${userPlantId}`;
export const HARVEST_PLANT_API_URL = (userPlantId: number) => `${BASE_URL}/api/plant/user/${userPlantId}/harvest`;
export const PLANT_GROWTH_IMG_API_URL = (userPlantId: number) => `${BASE_URL}/api/plant/growth/${userPlantId}`;
// todo
export const TODO_API_URL = `${BASE_URL}/api/todos`;

//advice
export const ADVICE_API_URL = `${BASE_URL}/api/advice`

//material
export const SEEDS_API_URL = `${BASE_URL}/api/material/seeds`;
export const FERTILIZERS_API_URL = `${BASE_URL}/api/material/fertilizers`;
export const SOILS_API_URL = `${BASE_URL}/api/material/soils`;

//records
export const GET_PLANT_RECORD_API_URL = (user_plant_id: number) => `${BASE_URL}/api/record/get/${user_plant_id}`;
export const CREATE_PLANT_RECORD_API_URL = `${BASE_URL}/api/record/create`;
export const UPDATE_PLANT_RECORD_API_URL = (recordId: number) => `${BASE_URL}/api/record/update/${recordId}`;
export const DELETE_PLANT_RECORD_API_URL = (recordId: number) => `${BASE_URL}/api/record/delete/${recordId}`;


//weather
export const WEATHER_API_URL = `${BASE_URL}/weather`;