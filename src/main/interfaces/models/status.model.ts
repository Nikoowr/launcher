export enum ApplicationStatusType {
  Error = 'error',
  Info = 'info',
}

type MessageData = {
  title?: {
    pt?: string;
    en?: string;
    es?: string;
    fr?: string;
  };
  description?: {
    pt?: string;
    en?: string;
    es?: string;
    fr?: string;
  };
};

export type ApplicationStatus = {
  type: ApplicationStatusType;
  available: boolean;
  data?: MessageData;
};
