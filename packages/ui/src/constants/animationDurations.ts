const isCypressTest = (window as any).Cypress || (window as any).cy;
const multiplier = isCypressTest ? 0.25 : 1;

export const ANIMATION_DURATIONS = {
  // Modal animations
  MODAL_BACKDROP_SHOW: 0.3 * multiplier,
  MODAL_BACKDROP_HIDE: 0.2 * multiplier,
  MODAL_CONTENT_SHOW: 0.4 * multiplier,
  MODAL_CONTENT_HIDE: 0.3 * multiplier,
  
  // Component animations
  FADE_IN: 0.2 * multiplier,
  FADE_OUT: 0.2 * multiplier,
  SLIDE_IN: 0.3 * multiplier,
  SLIDE_OUT: 0.3 * multiplier,
  
  // Button animations
  BUTTON_HOVER: 0.2 * multiplier,
  BUTTON_PRESS: 0.1 * multiplier,
  
  // Form animations
  INPUT_FOCUS: 0.2 * multiplier,
  VALIDATION_ERROR: 0.3 * multiplier,
} as const;

// Helper function for consistent timing
export const getAnimationDuration = (type: keyof typeof ANIMATION_DURATIONS): number => {
  return ANIMATION_DURATIONS[type];
};