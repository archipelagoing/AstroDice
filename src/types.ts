export interface Planet {
  name: string;
  longitude: number;
  retrograde?: boolean;
}
export interface NatalChart {
  version: 1;
  name: string;
  houseSystem: string;
  /** Twelve cusp longitudes in house order, each in [0, 360). */
  cusps: number[];
  planets: Planet[];
  /** Angles are optional and independent of house cusps. */
  angles?: { asc?: number; mc?: number };
  calculation?: {
    engine: string;
    zodiac: "Tropical";
    utc: string;
    timezone: string;
    offset: string;
    latitude: number;
    longitude: number;
    unavailable: string[];
  };
}

export interface BirthPlace {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}
export interface BirthDetails {
  date: string;
  time: string;
  place: BirthPlace | null;
  houseSystem: "Placidus" | "Whole Sign";
  disambiguation: "reject" | "earlier" | "later";
  unknownTime: boolean;
}
export interface SignSegment {
  sign: number;
  start: number;
  end: number;
  degrees: number;
  intercepted: boolean;
}
export interface HouseGeometry {
  number: number;
  start: number;
  end: number;
  span: number;
  segments: SignSegment[];
  planets: Planet[];
}
