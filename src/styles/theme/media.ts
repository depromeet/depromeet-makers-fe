import type { CSSObject, Interpolation } from 'styled-components';
import { css } from 'styled-components';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const sizes: Record<DeviceType, number> = {
  desktop: 1200,
  tablet: 768,
  mobile: 390,
};

const media = Object.entries(sizes).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (first: CSSObject | TemplateStringsArray, ...interpolations: Interpolation<object>[]) => css`
      @media (max-width: ${value}px) {
        ${css(first, ...interpolations)}
      }
    `,
  };
}, {}) as Record<DeviceType, typeof css>;

export default media;
