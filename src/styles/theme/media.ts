type DeviceType = 'desktop' | 'tablet' | 'mobile';

const sizes: Record<DeviceType, number> = {
  desktop: 1200,
  tablet: 768,
  mobile: 390,
};

export default sizes;
