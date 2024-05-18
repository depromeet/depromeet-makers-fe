type DeviceType = 'desktop' | 'tablet' | 'mobileMax' | 'mobile';

const sizes: Record<DeviceType, number> = {
  desktop: 1200,
  tablet: 768,
  mobileMax: 475,
  mobile: 390,
};

export default sizes;
