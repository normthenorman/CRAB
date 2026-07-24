//timer

document.addEventListener('DOMContentLoaded', () => {
  const VISIBLE_DURATION = 3000;
  const EXIT_ANIMATION_DURATION = 300;

  document.querySelectorAll('.toast').forEach((toast) => {
    setTimeout(() => {
      toast.classList.remove('animate-slide-in');
      toast.classList.add('animate-slide-out');

      setTimeout(() => {
        toast.remove();
      }, EXIT_ANIMATION_DURATION);
    }, VISIBLE_DURATION);
  });
});