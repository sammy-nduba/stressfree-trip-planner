/* empty css                                 */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_C1SB2yiH.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_FBggr8Xt.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../renderers.mjs';

function PlannerReact() {
  const [travelDetails, setTravelDetails] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    adults: 2,
    children: 0,
    budget: "",
    travelStyle: "",
    interests: [],
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    additionalNotes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [steps, setSteps] = useState([
    { id: 1, label: "Research destination activities", done: false },
    { id: 2, label: "Book accommodation", done: false },
    { id: 3, label: "Arrange transportation", done: false },
    { id: 4, label: "Check visa requirements", done: false }
  ]);
  const [input, setInput] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const destinations = [
    "Kenya",
    "Uganda",
    "Ethiopia",
    "Tanzania",
    "South Africa",
    "Morocco",
    "Egypt",
    "Zanzibar",
    "Rwanda",
    "Botswana",
    "Namibia",
    "Madagascar"
  ];
  const travelStyles = [
    "Adventure",
    "Relaxation",
    "Cultural",
    "Wildlife Safari",
    "Beach",
    "City Break",
    "Luxury",
    "Budget"
  ];
  const interestOptions = [
    "Wildlife",
    "Beaches",
    "Mountains",
    "History",
    "Food & Cuisine",
    "Photography",
    "Shopping",
    "Nightlife",
    "Nature",
    "Adventure Sports"
  ];
  const handleDetailChange = (field, value) => {
    setTravelDetails((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  const handleInterestToggle = (interest) => {
    setTravelDetails((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest) ? prev.interests.filter((i) => i !== interest) : [...prev.interests, interest]
    }));
  };
  const validateForm = () => {
    const errors = {};
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    if (travelDetails.startDate) {
      const start = new Date(travelDetails.startDate);
      if (start < today) {
        errors.startDate = "Start date cannot be in the past";
      }
    }
    if (travelDetails.startDate && travelDetails.endDate) {
      const start = new Date(travelDetails.startDate);
      const end = new Date(travelDetails.endDate);
      if (end < start) {
        errors.endDate = "End date must be after start date";
      }
    }
    if (travelDetails.contactPhone) {
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (!phoneRegex.test(travelDetails.contactPhone)) {
        errors.contactPhone = "Please enter a valid phone number";
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      setSubmitStatus("error");
      setSubmitMessage("Please fix the errors in the form before submitting.");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");
    try {
      const response = await fetch("/api/trip-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          destination: travelDetails.destination,
          start_date: travelDetails.startDate,
          end_date: travelDetails.endDate,
          adults: travelDetails.adults,
          children: travelDetails.children,
          budget: travelDetails.budget,
          travel_style: travelDetails.travelStyle,
          interests: travelDetails.interests,
          contact_name: travelDetails.contactName,
          contact_email: travelDetails.contactEmail,
          contact_phone: travelDetails.contactPhone,
          additional_notes: travelDetails.additionalNotes
        })
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.error || "Failed to submit request. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("An error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const resetForm = () => {
    setTravelDetails({
      destination: "",
      startDate: "",
      endDate: "",
      adults: 2,
      children: 0,
      budget: "",
      travelStyle: "",
      interests: [],
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      additionalNotes: ""
    });
    setSubmitStatus(null);
    setCurrentStep(1);
    setValidationErrors({});
  };
  const addStep = () => {
    if (input.trim()) {
      setSteps([...steps, { id: Date.now(), label: input, done: false }]);
      setInput("");
    }
  };
  const toggleStep = (id) => {
    setSteps(steps.map((s) => s.id === id ? { ...s, done: !s.done } : s));
  };
  const removeStep = (id) => {
    setSteps(steps.filter((s) => s.id !== id));
  };
  const completedCount = steps.filter((s) => s.done).length;
  const progress = steps.length > 0 ? completedCount / steps.length * 100 : 0;
  const isDetailsComplete = travelDetails.destination && travelDetails.startDate && travelDetails.endDate && travelDetails.contactName && travelDetails.contactEmail;
  if (submitStatus === "success") {
    return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-12 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx("span", { className: "text-5xl", children: "✨" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-4xl font-['Playfair_Display'] text-[#006064] mb-4", children: "Trip Request Received!" }),
      /* @__PURE__ */ jsxs("p", { className: "text-xl text-[#006064]/70 mb-8", children: [
        "Thank you, ",
        /* @__PURE__ */ jsx("strong", { children: travelDetails.contactName }),
        "! We've received your request for a trip to ",
        /* @__PURE__ */ jsx("strong", { children: travelDetails.destination }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-[#E0F7FA] p-6 rounded-xl mb-8 text-left max-w-md mx-auto", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-[#006064] mb-2", children: [
          "We will review your details and get back to you at ",
          /* @__PURE__ */ jsx("strong", { children: travelDetails.contactEmail }),
          " shortly with a custom quote."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-[#006064] text-sm", children: [
          "Reference ID: #",
          Math.floor(Math.random() * 1e4)
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: resetForm,
            className: "px-8 py-3 bg-[#26A69A] text-white rounded-full hover:bg-[#1F8B7F] transition-colors font-medium",
            children: "Plan Another Trip"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/",
            className: "px-8 py-3 border-2 border-[#26A69A] text-[#26A69A] rounded-full hover:bg-[#E0F7FA] transition-colors font-medium",
            children: "Back to Home"
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 ${currentStep === 1 ? "text-[#26A69A]" : "text-[#006064]/50"}`, children: [
        /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep === 1 ? "bg-[#26A69A] text-white" : "bg-[#E0F7FA] text-[#006064]"}`, children: "1" }),
        /* @__PURE__ */ jsx("span", { className: "font-medium hidden sm:inline", children: "Travel Details" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-16 h-1 bg-[#E0F7FA]" }),
      /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 ${currentStep === 2 ? "text-[#26A69A]" : "text-[#006064]/50"}`, children: [
        /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep === 2 ? "bg-[#26A69A] text-white" : "bg-[#E0F7FA] text-[#006064]"}`, children: "2" }),
        /* @__PURE__ */ jsx("span", { className: "font-medium hidden sm:inline", children: "Planning Checklist" })
      ] })
    ] }) }),
    currentStep === 1 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-lg p-8", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-['Playfair_Display'] text-[#006064] mb-2", children: "Where would you like to go?" }),
      /* @__PURE__ */ jsx("p", { className: "text-[#006064]/70 mb-8", children: "Tell us about your dream trip" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-[#006064] font-medium mb-2", children: [
            "Destination ",
            /* @__PURE__ */ jsx("span", { className: "text-[#FF8A65]", children: "*" })
          ] }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: travelDetails.destination,
              onChange: (e) => handleDetailChange("destination", e.target.value),
              className: "w-full px-4 py-3 rounded-xl border border-[#E0F7FA] focus:outline-none focus:ring-2 focus:ring-[#26A69A] bg-[#FFF8E1]",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select a destination" }),
                destinations.map((dest) => /* @__PURE__ */ jsx("option", { value: dest, children: dest }, dest))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-[#006064] font-medium mb-2", children: [
              "Start Date ",
              /* @__PURE__ */ jsx("span", { className: "text-[#FF8A65]", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: travelDetails.startDate,
                onChange: (e) => handleDetailChange("startDate", e.target.value),
                className: `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-[#FFF8E1] ${validationErrors.startDate ? "border-red-500 focus:ring-red-200" : "border-[#E0F7FA] focus:ring-[#26A69A]"}`
              }
            ),
            validationErrors.startDate && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: validationErrors.startDate })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("label", { className: "block text-[#006064] font-medium mb-2", children: [
              "End Date ",
              /* @__PURE__ */ jsx("span", { className: "text-[#FF8A65]", children: "*" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "date",
                value: travelDetails.endDate,
                onChange: (e) => handleDetailChange("endDate", e.target.value),
                className: `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-[#FFF8E1] ${validationErrors.endDate ? "border-red-500 focus:ring-red-200" : "border-[#E0F7FA] focus:ring-[#26A69A]"}`
              }
            ),
            validationErrors.endDate && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: validationErrors.endDate })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[#006064] font-medium mb-2", children: "Adults (18+)" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDetailChange("adults", Math.max(1, travelDetails.adults - 1)),
                  className: "w-10 h-10 rounded-full bg-[#E0F7FA] text-[#006064] hover:bg-[#26A69A] hover:text-white transition-colors font-bold",
                  children: "−"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-[#006064] w-12 text-center", children: travelDetails.adults }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDetailChange("adults", travelDetails.adults + 1),
                  className: "w-10 h-10 rounded-full bg-[#E0F7FA] text-[#006064] hover:bg-[#26A69A] hover:text-white transition-colors font-bold",
                  children: "+"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-[#006064] font-medium mb-2", children: "Children (0-17)" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDetailChange("children", Math.max(0, travelDetails.children - 1)),
                  className: "w-10 h-10 rounded-full bg-[#E0F7FA] text-[#006064] hover:bg-[#26A69A] hover:text-white transition-colors font-bold",
                  children: "−"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-[#006064] w-12 text-center", children: travelDetails.children }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDetailChange("children", travelDetails.children + 1),
                  className: "w-10 h-10 rounded-full bg-[#E0F7FA] text-[#006064] hover:bg-[#26A69A] hover:text-white transition-colors font-bold",
                  children: "+"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-[#006064] font-medium mb-2", children: "Budget (Optional)" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: travelDetails.budget,
              onChange: (e) => handleDetailChange("budget", e.target.value),
              className: "w-full px-4 py-3 rounded-xl border border-[#E0F7FA] focus:outline-none focus:ring-2 focus:ring-[#26A69A] bg-[#FFF8E1]",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select budget range" }),
                /* @__PURE__ */ jsx("option", { value: "budget", children: "Budget ($500 - $1,500)" }),
                /* @__PURE__ */ jsx("option", { value: "moderate", children: "Moderate ($1,500 - $3,000)" }),
                /* @__PURE__ */ jsx("option", { value: "luxury", children: "Luxury ($3,000+)" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-[#006064] font-medium mb-2", children: "Travel Style" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: travelDetails.travelStyle,
              onChange: (e) => handleDetailChange("travelStyle", e.target.value),
              className: "w-full px-4 py-3 rounded-xl border border-[#E0F7FA] focus:outline-none focus:ring-2 focus:ring-[#26A69A] bg-[#FFF8E1]",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select your style" }),
                travelStyles.map((style) => /* @__PURE__ */ jsx("option", { value: style, children: style }, style))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-t border-[#E0F7FA] pt-6 mt-6", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-xl font-['Playfair_Display'] text-[#006064] mb-4", children: "Contact Information" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-[#006064] font-medium mb-2", children: [
                "Your Name ",
                /* @__PURE__ */ jsx("span", { className: "text-[#FF8A65]", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: travelDetails.contactName,
                  onChange: (e) => handleDetailChange("contactName", e.target.value),
                  placeholder: "John Doe",
                  className: "w-full px-4 py-3 rounded-xl border border-[#E0F7FA] focus:outline-none focus:ring-2 focus:ring-[#26A69A] bg-[#FFF8E1]"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-[#006064] font-medium mb-2", children: [
                "Email Address ",
                /* @__PURE__ */ jsx("span", { className: "text-[#FF8A65]", children: "*" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  value: travelDetails.contactEmail,
                  onChange: (e) => handleDetailChange("contactEmail", e.target.value),
                  placeholder: "john@example.com",
                  className: "w-full px-4 py-3 rounded-xl border border-[#E0F7FA] focus:outline-none focus:ring-2 focus:ring-[#26A69A] bg-[#FFF8E1]"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[#006064] font-medium mb-2", children: "Phone Number (Optional)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  value: travelDetails.contactPhone,
                  onChange: (e) => handleDetailChange("contactPhone", e.target.value),
                  placeholder: "+254 700 000000",
                  className: `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-[#FFF8E1] ${validationErrors.contactPhone ? "border-red-500 focus:ring-red-200" : "border-[#E0F7FA] focus:ring-[#26A69A]"}`
                }
              ),
              validationErrors.contactPhone && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mt-1", children: validationErrors.contactPhone })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-[#006064] font-medium mb-2", children: "Interests (Select all that apply)" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: interestOptions.map((interest) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleInterestToggle(interest),
              className: `px-4 py-2 rounded-full text-sm font-medium transition-all ${travelDetails.interests.includes(interest) ? "bg-[#26A69A] text-white" : "bg-[#E0F7FA] text-[#006064] hover:bg-[#26A69A] hover:text-white"}`,
              children: interest
            },
            interest
          )) })
        ] }),
        isDetailsComplete && /* @__PURE__ */ jsxs("div", { className: "bg-[#E0F7FA] p-6 rounded-xl", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-[#006064] mb-3", children: "Trip Summary" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-[#006064]/80", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "📍 ",
              /* @__PURE__ */ jsx("strong", { children: "Destination:" }),
              " ",
              travelDetails.destination
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "📅 ",
              /* @__PURE__ */ jsx("strong", { children: "Dates:" }),
              " ",
              travelDetails.startDate,
              " to ",
              travelDetails.endDate
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              "👥 ",
              /* @__PURE__ */ jsx("strong", { children: "Travelers:" }),
              " ",
              travelDetails.adults,
              " Adult",
              travelDetails.adults > 1 ? "s" : "",
              travelDetails.children > 0 ? `, ${travelDetails.children} Child${travelDetails.children > 1 ? "ren" : ""}` : ""
            ] }),
            travelDetails.budget && /* @__PURE__ */ jsxs("p", { children: [
              "💰 ",
              /* @__PURE__ */ jsx("strong", { children: "Budget:" }),
              " ",
              travelDetails.budget
            ] }),
            travelDetails.travelStyle && /* @__PURE__ */ jsxs("p", { children: [
              "✨ ",
              /* @__PURE__ */ jsx("strong", { children: "Style:" }),
              " ",
              travelDetails.travelStyle
            ] }),
            travelDetails.interests.length > 0 && /* @__PURE__ */ jsxs("p", { children: [
              "❤️ ",
              /* @__PURE__ */ jsx("strong", { children: "Interests:" }),
              " ",
              travelDetails.interests.join(", ")
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            if (validateForm()) {
              setCurrentStep(2);
            }
          },
          disabled: !isDetailsComplete,
          className: `w-full mt-8 px-6 py-4 rounded-full font-medium transition-all ${isDetailsComplete ? "bg-[#26A69A] text-white hover:bg-[#1F8B7F] hover:scale-105" : "bg-[#E0F7FA] text-[#006064]/50 cursor-not-allowed"}`,
          children: "Continue to Planning Checklist →"
        }
      )
    ] }),
    currentStep === 2 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-lg p-8", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrentStep(1),
          className: "text-[#26A69A] hover:text-[#006064] mb-4 flex items-center gap-2",
          children: "← Back to Travel Details"
        }
      ),
      /* @__PURE__ */ jsx("h3", { className: "text-3xl font-['Playfair_Display'] text-[#006064] mb-2", children: "Your Planning Checklist" }),
      /* @__PURE__ */ jsx("p", { className: "text-[#006064]/70 mb-8", children: "Stay organized and stress-free" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "w-full bg-[#E0F7FA] rounded-full h-3 overflow-hidden", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "bg-[#26A69A] h-full transition-all duration-500 ease-out",
            style: { width: `${progress}%` }
          }
        ) }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#006064]/70 mt-2", children: [
          completedCount,
          " of ",
          steps.length,
          " tasks complete"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3 mb-6", children: steps.map((step) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center gap-3 p-4 bg-[#FFF8E1] rounded-xl hover:shadow-md transition-shadow",
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: step.done,
                onChange: () => toggleStep(step.id),
                className: "w-5 h-5 cursor-pointer rounded accent-[#26A69A]"
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `flex-1 ${step.done ? "line-through text-[#006064]/50" : "text-[#006064]"}`,
                children: step.label
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => removeStep(step.id),
                className: "text-[#FF8A65] hover:text-[#FF8A65]/70 transition-colors",
                children: "✕"
              }
            )
          ]
        },
        step.id
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mb-6", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && addStep(),
            placeholder: "Add a planning task...",
            className: "flex-1 px-4 py-3 rounded-full border border-[#E0F7FA] focus:outline-none focus:ring-2 focus:ring-[#26A69A] bg-[#FFF8E1]"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: addStep,
            className: "px-6 py-3 bg-[#26A69A] text-white rounded-full hover:bg-[#1F8B7F] transition-colors font-medium",
            children: "Add Task"
          }
        )
      ] }),
      submitStatus && submitStatus !== "success" && /* @__PURE__ */ jsx("div", { className: "mt-6 p-4 rounded-xl bg-red-50 border-2 border-red-500 text-red-800", children: /* @__PURE__ */ jsxs("p", { className: "font-medium flex items-center gap-2", children: [
        "✗ ",
        submitMessage
      ] }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSubmit,
          disabled: isSubmitting,
          className: `w-full px-6 py-4 rounded-full font-medium transition-all ${isSubmitting ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#FF8A65] text-white hover:bg-[#E67E50] hover:scale-105"}`,
          children: isSubmitting ? "Submitting..." : "Submit Trip Request"
        }
      )
    ] })
  ] });
}

const $$Planner = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Trip Planner" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-20 px-6 min-h-screen bg-gradient-to-b from-sky/30 to-white"> <div class="max-w-4xl mx-auto"> <h1 class="text-5xl md:text-6xl font-serif text-center text-ocean mb-4">
Your Personal Planner
</h1> <p class="text-center text-teal mb-12 text-lg">
Plan your stress-free journey step by step
</p> ${renderComponent($$result2, "PlannerReact", PlannerReact, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/components/PlannerReact.jsx", "client:component-export": "default" })} </div> </section> ` })}`;
}, "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/Planner.astro", void 0);

const $$file = "/home/nduba/Desktop/projects/stressfree-trip-planner-master/src/pages/Planner.astro";
const $$url = "/Planner";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Planner,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
