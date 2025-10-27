const IOS_USER_AGENT = /iPad|iPhone|iPod/;

export const isIOS = (): boolean => {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const platform = navigator.platform ?? '';
  const userAgent = navigator.userAgent ?? '';
  const maxTouchPoints = (navigator as Navigator & { maxTouchPoints?: number }).maxTouchPoints ?? 0;

  if (IOS_USER_AGENT.test(userAgent) || IOS_USER_AGENT.test(platform)) {
    return true;
  }

  // iPadOS 13+ reports as Mac but with touch support.
  return platform === 'MacIntel' && maxTouchPoints > 1;
};

export const applyIOSBodyClasses = () => {
  if (typeof document === 'undefined') {
    return;
  }

  if (isIOS()) {
    document.body.classList.add('ios');
  } else {
    document.body.classList.remove('ios');
  }
};
