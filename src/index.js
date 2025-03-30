window.Webflow ||= [];
window.Webflow.push(() => {
  function gtag() {
    dataLayer.push(arguments);
  }

  let loadFsCC = setInterval(function () {
    if ('FsCC' in window) {
      clearInterval(loadFsCC);
      window.FsCC.push(() => {
        updateConsent();
      });
      window.FsCC.consentController.on('updateconsents', () => {
        updateConsent();
      });
    }
  }, 5);

  document.querySelectorAll('[fs-cc=open-banner]').forEach((button) => {
    button.addEventListener('click', () => {
      FsCC.banner.open();
    });
  });

  function updateConsent() {
    const consentMode = {
      ad_personalization: window.FsCC.store.consents.marketing ? 'granted' : 'denied',
      ad_storage: window.FsCC.store.consents.marketing ? 'granted' : 'denied',
      ad_user_data: window.FsCC.store.consents.marketing ? 'granted' : 'denied',
      analytics_storage: window.FsCC.store.consents.analytics ? 'granted' : 'denied',
      personalization_storage: window.FsCC.store.consents.personalization ? 'granted' : 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
    };

    gtag('consent', 'update', consentMode);
    dataLayer.push({ event: 'fs-cc-consent-update' });
  }
});
