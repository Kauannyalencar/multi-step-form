import { toggleClass } from "./index";

function Planos(btn) {
  const monthlyPlans = document.querySelector(".plans.monthly")
  const planYearly = document.querySelector(".plans.yearly")
  const yearlySpan = btn.parentElement.nextElementSibling;
  const monthlySpan = btn.parentElement.previousElementSibling;

  if (btn.classList.contains("monthly") || btn.classList.contains("yearly")) {
    toggleClass(btn, "monthly")
    toggleClass(btn, "yearly");

    toggleClass(yearlySpan, "active")
    toggleClass(monthlySpan, "active")

    toggleClass(monthlyPlans, "hidden")
    toggleClass(planYearly, "hidden")
    
  }
}

export default Planos
