const ApiEndpoints = {
  search: 'https://api.npms.io/v2/search',
  suggestions: 'https://api.npms.io/v2/search/suggestions',
  randomNumberFact: 'http://numbersapi.com/${Math.round(Math.random() * 10000)}/math'
};

const {
  randomNumberFact,
  search,
  suggestions
} = ApiEndpoints;

export {
  randomNumberFact,
  search,
  suggestions
};

export default ApiEndpoints;
