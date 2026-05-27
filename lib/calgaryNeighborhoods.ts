/**
 * Curated list of Calgary neighbourhoods where independent cafés cluster.
 * Order = roughly by café density (Beltline / Kensington first).
 * "Other" is rendered separately at the bottom of the dropdown.
 */
export const CALGARY_NEIGHBORHOODS = [
  'Beltline',
  'Kensington',
  'Mission',
  'Inglewood',
  'Bridgeland',
  'East Village',
  'Eau Claire',
  'Downtown Core',
  'Sunnyside',
  'Hillhurst',
  'Marda Loop',
  'Mount Royal',
  'Altadore',
  'Killarney',
  'Bowness',
  'Montgomery',
  'Ramsay',
  'Crescent Heights',
  'Renfrew',
  'Tuxedo Park',
  'West Hillhurst',
  'Briar Hill',
  'Currie',
  'Garrison Woods',
  'Mahogany',
  'McKenzie Towne',
  'Seton',
  'University District',
  'Varsity',
  'Brentwood',
] as const;

export type CalgaryNeighborhood = (typeof CALGARY_NEIGHBORHOODS)[number] | string;
