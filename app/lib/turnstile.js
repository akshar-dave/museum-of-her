// Track if Turnstile is being loaded
let turnstileLoading = false;
let turnstileLoaded = false;

// Utility function to load Turnstile script
function loadTurnstileScript() {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (window.turnstile) {
      resolve();
      return;
    }

    // If already loading, wait for it
    if (turnstileLoading) {
      const checkLoaded = () => {
        if (window.turnstile) {
          resolve();
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]');
    if (existingScript) {
      turnstileLoading = true;
      existingScript.addEventListener('load', () => {
        turnstileLoading = false;
        turnstileLoaded = true;
        resolve();
      });
      existingScript.addEventListener('error', () => {
        turnstileLoading = false;
        reject(new Error('Failed to load Turnstile'));
      });
      return;
    }

    // Load Turnstile script
    turnstileLoading = true;
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      turnstileLoading = false;
      turnstileLoaded = true;
      resolve();
    };
    script.onerror = () => {
      turnstileLoading = false;
      reject(new Error('Failed to load Turnstile'));
    };
    document.head.appendChild(script);
  });
}

// Utility function to get Turnstile token invisibly
export async function getTurnstileToken() {
  try {
    await loadTurnstileScript();
    
    return new Promise((resolve, reject) => {
      // Use the same site key as ShareForm
      const siteKey = "0x4AAAAAAA89GzESq3w9jvRi";
      
      // Create an invisible container
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      document.body.appendChild(container);

      try {
        window.turnstile.render(container, {
          sitekey: siteKey,
          callback: (token) => {
            document.body.removeChild(container);
            resolve(token);
          },
          'expired-callback': () => {
            document.body.removeChild(container);
            reject(new Error('Turnstile token expired'));
          },
          'error-callback': () => {
            document.body.removeChild(container);
            reject(new Error('Turnstile error'));
          }
        });
      } catch (error) {
        document.body.removeChild(container);
        reject(error);
      }
    });
  } catch (error) {
    throw error;
  }
}

// Export the loading function for use in components
export { loadTurnstileScript }; 