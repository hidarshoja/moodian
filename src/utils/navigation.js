let navigateFn = null;

export const setNavigate = (navigate) => {
  navigateFn = navigate;
};

export const navigate = (to, options = {}) => {
  if (typeof navigateFn === "function") {
    navigateFn(to, options);
    return;
  }
  // Fallback if navigate is not yet available
  if (typeof window !== "undefined" && window.location) {
    window.location.href = to;
  }
};
