const DEFAULT_STATE = {   
  housing: 0,   
  col: 0,
  health_care: 0,
  environmental_quality: 0,
  economy: 0,
  leisure: 0,
  commute: 0,
  safety: 0,
  education: 0,
  summary: '',
  travel_connectivity: 0,
  internet_access: 0,
  tolerance: 0,
  outdoors: 0,
  taxation: 0,
  business_freedom: 0,
  startups: 0,
  venture_capital: 0,
  photoURL: '',
  score: 0
  
};

const cityInfoReducers = (state = DEFAULT_STATE, action) => {
  if (action.type === 'SET_HOUSING') {
    return Object.assign({}, state, { housing: action.payload });
  } else if (action.type === 'SET_COL') {
    return Object.assign({}, state, { col: action.payload });
  } else if (action.type === 'SET_HEALTH_CARE') {
    return Object.assign({}, state, { health_care: action.payload });
  } else if (action.type === 'SET_ENVIRONMENTAL_QUALITY') {
    return Object.assign({}, state, { environmental_quality: action.payload });
  } else if (action.type === 'SET_ECONOMY') {
    return Object.assign({}, state, { economy: action.payload });
  } else if (action.type === 'SET_LEISURE') {
    return Object.assign({}, state, { leisure: action.payload });
  } else if (action.type === 'SET_COMMUTE') {
    return Object.assign({}, state, { commute: action.payload });
  } else if (action.type === 'SET_SAFETY') {
    return Object.assign({}, state, { safety: action.payload });
  } else if (action.type === 'SET_EDUCATION') {
    return Object.assign({}, state, { education: action.payload });
  } else if (action.type === 'SET_SUMMARY') {
    return Object.assign({}, state, { summary: action.payload });
  } else if (action.type === 'SET_TRAVEL_CONNECTIVITY') {
    return Object.assign({}, state, { travel_connectivity: action.payload });
  } else if (action.type === 'SET_INTERNET_ACCESS') {
    return Object.assign({}, state, { internet_access: action.payload });
  } else if (action.type === 'SET_TOLERANCE') {
    return Object.assign({}, state, { tolerance: action.payload });
  } else if (action.type === 'SET_OUTDOORS') {
    return Object.assign({}, state, { outdoors: action.payload });
  } else if (action.type === 'SET_TAXATION') {
    return Object.assign({}, state, { taxation: action.payload });
  } else if (action.type === 'SET_BUSINESS_FREEDOM') {
    return Object.assign({}, state, { business_freedom: action.payload });
  } else if (action.type === 'SET_STARTUPS') {
    return Object.assign({}, state, { startups: action.payload });
  } else if (action.type === 'SET_VENTURE_CAPITAL') {
    return Object.assign({}, state, { venture_capital: action.payload });
  } else if (action.type === 'SET_PHOTO_URL') {
    return Object.assign({}, state, { photoURL: action.payload });
  } else if (action.type === 'SET_CITY') {
    return Object.assign({}, state, { city: action.payload });
  } else if (action.type === 'SET_SCORE') {
    return Object.assign({}, state, { score: action.payload });
  }
  return state;
};

export default cityInfoReducers;
