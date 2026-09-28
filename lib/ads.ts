/**
 * Central ad configuration.
 *
 * Ads are disabled by default. To enable every ad slot
 * (#ad-top, #ad-bottom, #ad-left, #ad-right), set
 * NEXT_PUBLIC_ADS_ENABLED=true in your environment (e.g. .env.local).
 */
export const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
