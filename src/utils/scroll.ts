
export const scrollToOrder = () => {
  if (typeof window === 'undefined') return;

  const isDesktop = window.innerWidth >= 1024;
  const targetId = isDesktop ? 'order-form' : 'order-packages';
  const targetEl = document.getElementById(targetId) || document.getElementById('order-form');

  if (targetEl) {
    const navbarHeight = 75;
    const elementTop = targetEl.getBoundingClientRect().top + window.scrollY;
    const offset = isDesktop ? 20 : navbarHeight;

    window.scrollTo({
      top: Math.max(0, elementTop - offset),
      behavior: 'smooth',
    });
  }
};
