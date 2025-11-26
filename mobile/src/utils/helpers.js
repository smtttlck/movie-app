import { UPLOAD_BASE_URL } from '@env';

// helper functions

// converts server image path to full URL for mobile app
export const imgPathConverter = (path) => {
  return `${UPLOAD_BASE_URL}/${path.replace(/^public[\\/]/, '').split('\\').join('/')}`;
};

// extracts year from date string in format YYYY-MM-DD
export const yearExtractor = (dateString) => {
  return dateString.split('-')[0];
};

// returns card dimensions based on card type
export const getCardDimensions = (cardType) => {
  return {
    width: cardType === 'big' ? 250 : 150,
    height: cardType === 'big' ? 400 : 250,
  };
};

// returns fixed overlay height to prevent title resizing
export const getOverlayHeight = (cardType) => {
  return cardType === 'big' ? 120 : 95;
};

// limits the number of displayed categories based on card type
export const getDisplayedCategories = (categories = [], cardType) => {
  const limit = cardType === 'big' ? 3 : 2;
  return categories.slice(0, limit);
};

// calculates max width for each category box to prevent layout overflow
export const getCategoryMaxWidth = (cardType) => {
  const width = cardType === 'big' ? 250 : 150;
  return cardType === 'big' ? width * 0.6 : width * 0.5;
};

// formats rating to one decimal place
export const ratingFormatter = (rating) => {
  return rating.toFixed(1);
}

// converts screen names to icon names for navigation tabs
export const iconNameConverter = (screenName) => {
  switch (screenName) {
    case 'HomeScreen':
      return 'home';
    case 'MovieListScreen':
      return 'movie-open';
    case 'ActorListScreen':
      return 'account-group';
    default:
      return 'question';
  }
};

// extracts YouTube video ID from various URL formats
export const youtubeIdExtractor = (url) => {
  if (!url || typeof url !== 'string') return null;
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};