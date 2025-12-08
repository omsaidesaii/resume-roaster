export type AppStatus = 'IDLE' | 'PARSING' | 'ROASTING' | 'COMPLETE' | 'ERROR';

export interface RoastResult {
  text: string;
}

export interface FileData {
  name: string;
  type: string;
  content: string; // Extracted text
}

export interface LoadingMessage {
  text: string;
  subtext: string;
}

// Helper object to access values with dot notation (similar to enum)
export const APP_STATUS_VALUES = {
  IDLE: 'IDLE' as const,
  PARSING: 'PARSING' as const,
  ROASTING: 'ROASTING' as const,
  COMPLETE: 'COMPLETE' as const,
  ERROR: 'ERROR' as const
} satisfies Record<AppStatus, AppStatus>;

// Type guard to check if a string is a valid AppStatus
export const isAppStatus = (value: string): value is AppStatus => {
  return Object.values(APP_STATUS_VALUES).includes(value as AppStatus);
};