const init = (pixelId, ga4Id) => {
  if (process.env.NODE_ENV !== "production") return;

  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );

  !(function (w, d, s, u, t) {
    if (w.gtag) return;
    t = d.createElement(s);
    t.async = !0;
    t.src = u;
    s = d.getElementsByTagName(s)[0];
    s.parentNode.insertBefore(t, s);
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      dataLayer.push(arguments);
    };
  })(
    window,
    document,
    "script",
    `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`
  );

  console.log("init pixel", pixelId);
  console.log("init google analytics", ga4Id);

  window.fbq("init", pixelId);

  window.gtag("js", new Date());
  window.gtag("config", ga4Id);
};

function track(eventName, eventProperties) {
  if (!window.fbq) {
    return;
  }

  console.log(eventName, eventProperties);

  if (process.env.NODE_ENV !== "production") return;

  window.fbq("track", eventName, eventProperties);
}

function pageView(eventProperties = null) {
  if (!window.fbq) {
    return;
  }

  track("PageView", eventProperties);
}

function lead(eventProperties = null) {
  if (!window.fbq) {
    return;
  }

  track("Lead", eventProperties);
}

export default {
  tracker: {
    pageView,
    lead,
  },
  /**
   * options: {
   *  pixelId: '',
   *  ga4Id: '',
   * }
   * @param {*} app
   * @param {*} options
   */
  install: (app, options) => {
    init(options.pixelId, options.ga4Id);

    if (typeof window.fbq === "undefined") {
      console.warn("Facebook Pixel is not loaded");
    }

    // Plugin code goes here
    app.provide("pixel", options);

    app.directive("track-pageview", {
      mounted(el, binding, vnode, oldVnode) {
        pageView();
      },
    });
  },
};
