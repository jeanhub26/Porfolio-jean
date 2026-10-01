 // ==========================================================================
> // app.js — Interactions du portfolio
> // 1) Menu mobile (ouverture/fermeture)
> // 2) Validation du formulaire de contact (front uniquement)
> // ==========================================================================
>
> (function () {
>   "use strict";
>
>   /* ---------- 1. Menu mobile ---------- */
>   const navToggle = document.getElementById("navToggle");
>   const primaryNav = document.getElementById("primaryNav");
>
>   if (navToggle && primaryNav) {
>     navToggle.addEventListener("click", function () {
>       const isOpen = primaryNav.classList.toggle("is-open");
>       navToggle.setAttribute("aria-expanded", String(isOpen));
>     });
>
>     // Ferme le menu automatiquement quand on clique un lien (mobile)
>     primaryNav.querySelectorAll("a").forEach(function (link) {
>       link.addEventListener("click", function () {
>         primaryNav.classList.remove("is-open");
>         navToggle.setAttribute("aria-expanded", "false");
>       });
>     });
>   }
>
>   /* ---------- 2. Validation du formulaire de contact ---------- */
>   const form = document.getElementById("contactForm");
>   if (!form) return;
>
>   const fields = {
>     nom: {
>       input: document.getElementById("nom"),
>       error: document.getElementById("nom-error"),
>       validate: function (value) {
>         return value.trim().length >= 2 ? "" : "Merci d'indiquer votre nom (2 caractères minimum).";
>       }
>     },
>     email: {
>       input: document.getElementById("email"),
>       error: document.getElementById("email-error"),
>       validate: function (value) {
>         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
>         return emailPattern.test(value.trim()) ? "" : "Merci d'indiquer une adresse e-mail valide.";
>       }
>     },
>     message: {
>       input: document.getElementById("message"),
>       error: document.getElementById("message-error"),
>       validate: function (value) {
>         return value.trim().length >= 10 ? "" : "Votre message doit contenir au moins 10 caractères.";
>       }
>     }
>   };
>
>   const feedback = document.getElementById("formFeedback");
>
>   function validateField(field) {
>     const message = field.validate(field.input.value);
>     field.error.textContent = message;
>     field.input.closest(".form-row").classList.toggle("has-error", Boolean(message));
>     return message === "";
>   }
>
>   // Validation en direct pendant la saisie, une fois le champ touché
>   Object.values(fields).forEach(function (field) {
>     field.input.addEventListener("blur", function () {
>       validateField(field);
>     });
>     field.input.addEventListener("input", function () {
>       if (field.input.closest(".form-row").classList.contains("has-error")) {
>         validateField(field);
>       }
>     });
>   });
>
>   form.addEventListener("submit", function (event) {
>     event.preventDefault();
>
>     const results = Object.values(fields).map(validateField);
>     const allValid = results.every(Boolean);
>
>     if (!allValid) {
>       feedback.textContent = "Merci de corriger les champs indiqués en rouge avant d'envoyer.";
>       feedback.className = "form-feedback error";
>       return;
>     }
