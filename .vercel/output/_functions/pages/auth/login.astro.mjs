/* empty css                                    */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_D0jjlpkZ.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { s as supabase } from '../../chunks/supabase_CBNaP4JO.mjs';
export { renderers } from '../../renderers.mjs';

function AuthModal({ isOpen, onClose, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "login") {
        const { error: error2 } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        if (error2) throw error2;
        window.location.href = "/";
        return;
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        const { error: error2 } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName
            }
          }
        });
        if (error2) throw error2;
        alert("Registration successful! Please check your email to verify your account.");
        setMode("login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl p-8 max-w-md w-full mx-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-serif text-ocean", children: mode === "login" ? "Welcome Back" : "Create Account" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "text-gray-400 hover:text-gray-600 text-2xl",
          children: "×"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      mode === "signup" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-ocean font-medium mb-2", children: "Full Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: formData.fullName,
            onChange: (e) => handleInputChange("fullName", e.target.value),
            className: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-ocean font-medium mb-2", children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            value: formData.email,
            onChange: (e) => handleInputChange("email", e.target.value),
            className: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-ocean font-medium mb-2", children: "Password" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            value: formData.password,
            onChange: (e) => handleInputChange("password", e.target.value),
            className: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal",
            required: true,
            minLength: 6
          }
        )
      ] }),
      mode === "signup" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-ocean font-medium mb-2", children: "Confirm Password" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            value: formData.confirmPassword,
            onChange: (e) => handleInputChange("confirmPassword", e.target.value),
            className: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal",
            required: true,
            minLength: 6
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm bg-red-50 p-3 rounded-lg", children: error }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: loading,
          className: "w-full bg-teal text-white py-4 rounded-xl font-medium hover:bg-teal/90 transition-colors disabled:opacity-50",
          children: loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setMode(mode === "login" ? "signup" : "login"),
        className: "text-teal hover:text-teal/80 text-sm",
        children: mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"
      }
    ) })
  ] }) });
}

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sign In - Stress-Free Holiday Makers" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-20 px-6 min-h-screen bg-gradient-to-b from-sky to-white flex items-center justify-center"> <div class="max-w-md w-full"> <div class="bg-white rounded-3xl shadow-lg p-8"> <div class="text-center mb-8"> <div class="w-16 h-16 bg-gradient-to-br from-teal to-coral rounded-full flex items-center justify-center mx-auto mb-4"> <span class="text-white text-3xl">✈️</span> </div> <h1 class="text-3xl font-serif text-ocean mb-2">Welcome Back</h1> <p class="text-ocean/70">Sign in to your account to continue planning</p> </div> ${renderComponent($$result2, "AuthModal", AuthModal, { "client:load": true, "isOpen": true, "onClose": (() => window.location.href = "/"), "initialMode": "login", "client:component-hydration": "load", "client:component-path": "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/components/AuthModal.jsx", "client:component-export": "default" })} </div> </div> </section> ` })}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/auth/login.astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/auth/login.astro";
const $$url = "/auth/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
