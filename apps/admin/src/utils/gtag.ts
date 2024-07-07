const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

export const pageview = (url: URL) => {
  if (GA_TRACKING_ID == null) {
    throw Error('Google Analytics ID가 없습니다.');
  }

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

interface GTagEvent {
  action: string;
  category?: string;
  label?: string;
  value?: string;
}

export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
