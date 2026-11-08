"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import Script from "next/script";

// A public site key. The matching secret is stored only in EmailJS.
const SITE_KEY = "6LeqwRYuAAAAAGxqqYQ_BHhw4DNcyixiWL_bMxPH";

export const InvisibleRecaptcha = forwardRef(function InvisibleRecaptcha(_, ref) {
  const container = useRef(null);
  const widget = useRef(null);
  const pending = useRef(null);
  const timeout = useRef(null);
  const loadFailed = useRef(false);

  const finish = useCallback((error, token) => {
    const request = pending.current;
    if (!request) return;
    pending.current = null;
    clearTimeout(timeout.current);
    if (error) request.reject(error);
    else if (typeof token === "string" && token.length > 0) request.resolve(token);
    else request.reject(new Error("Security verification failed. Please try again."));
  }, []);

  const reset = useCallback(() => {
    if (widget.current !== null) window.grecaptcha?.reset(widget.current);
  }, []);

  const cancel = useCallback(() => {
    const error = new Error("Verification cancelled.");
    error.name = "AbortError";
    finish(error);
    reset();
  }, [finish, reset]);

  useEffect(() => cancel, [cancel]);

  useImperativeHandle(ref, () => ({
    execute() {
      if (loadFailed.current) {
        return Promise.reject(new Error("Security verification could not load. Please refresh the page and try again."));
      }
      if (widget.current === null || !window.grecaptcha) {
        return Promise.reject(new Error("Security verification is still loading. Please try again."));
      }
      if (pending.current) {
        return Promise.reject(new Error("Security verification is already in progress."));
      }
      return new Promise((resolve, reject) => {
        pending.current = { resolve, reject };
        timeout.current = setTimeout(() => {
          finish(new Error("Security verification timed out. Please try again."));
          reset();
        }, 120000);
        try {
          reset();
          window.grecaptcha.execute(widget.current);
        } catch {
          finish(new Error("Security verification failed. Please try again."));
        }
      });
    },
    cancel,
    reset,
  }), [cancel, finish, reset]);

  const initialize = () => {
    window.grecaptcha.ready(() => {
      if (!container.current || widget.current !== null) return;
      try {
        widget.current = window.grecaptcha.render(container.current, {
          sitekey: SITE_KEY,
          size: "invisible",
          badge: "bottomright",
          callback: (token) => finish(null, token),
          "expired-callback": () => finish(new Error("Security verification expired. Please try again.")),
          "error-callback": () => finish(new Error("Security verification failed. Please check your connection and try again.")),
        });
      } catch {
        loadFailed.current = true;
      }
    });
  };

  return (
    <>
      <Script
        id="contact-recaptcha"
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={initialize}
        onError={() => {
          loadFailed.current = true;
          finish(new Error("Security verification could not load. Please refresh the page and try again."));
        }}
      />
      <div ref={container} />
    </>
  );
});
