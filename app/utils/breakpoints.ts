export enum DeviceSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  ExtraLarge = 'extra-large',
}

export function deviceSize(width: number): DeviceSize {
  const smallBreakpoint = 450;
  const mediumBreakpoint = 750;
  const largeBreakpoint = 1279;

  if (width <= smallBreakpoint) {
    return DeviceSize.Small;
  } else if (width <= mediumBreakpoint) {
    return DeviceSize.Medium;
  } else if (width <= largeBreakpoint) {
    return DeviceSize.Large;
  } else {
    return DeviceSize.ExtraLarge;
  }
}
