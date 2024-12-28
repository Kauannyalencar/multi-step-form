import '../css/styles.scss';
import '../css/personal-info.scss';
import '../css/sumarry.scss';
import '../css/select-plan.scss';
import '../css/add-ons.scss';
import '../css/end.scss';
import '../css/responsive.scss'
import createSumarry from './summary';
import Planos from './plans';
import Setplan, { removeAddOn } from './planFeatures';
import { pickAddOns } from './planFeatures';

const sidebarStepsNumber = document.querySelectorAll(".number");
const sections = document.querySelectorAll(".section-step")
const switchPlanBtn = document.querySelector(".btn-box")
const nextStepBtns = document.querySelectorAll(".next-step")
const goBackBtns = document.querySelectorAll(".back-step")
const confirm = document.querySelector(".confirm-btn");
const form = document.getElementById("form")
const inputsAddOns = document.querySelectorAll(".checkbox");
const categoriesPlans = document.querySelectorAll(".plan-category");
const changePlanBtn = document.querySelector(".change-plan");
export let planSummary = [];
export let planName;
let currentSection = null
let isValid = false;

function validateInput(inputType, inputValue) {

    switch (inputType) {
        case "email":
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);
        case "tel":
            return /\+\d{1,2}\s\d{2,3}\s\d{3,4}-?\d{3}/g.test(inputValue);
        default:
            return true
        // Assume other types are valid for now
    }
}

function handleFormSub(validation, input, errorSpan) {
    validation ?
        (input.classList.remove("invalid"), errorSpan.classList.add("hidden")) :
        (input.classList.add("invalid"), errorSpan.classList.remove("hidden"));
}

export function toggleClass(element, className) {
    element.classList.toggle(className);
}

goBackBtns.forEach((backBtn, index) => {
    backBtn.addEventListener("click", () => {
        const previousSection = sections[index];
        const currentSection = sections[index + 1];

        if (sidebarStepsNumber[index].dataset.step === sections[index].dataset.step) {
            toggleClass(previousSection, "hidden")
            toggleClass(currentSection, "hidden")
            toggleClass(sidebarStepsNumber[index], "active")
            toggleClass(sidebarStepsNumber[index + 1], "active")
        }
    })
})

nextStepBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const nextSection = sections[index + 1]
        currentSection = sections[index];

        if (sidebarStepsNumber[index].dataset.step === sections[index].dataset.step && isValid) {
            toggleClass(sidebarStepsNumber[index], "active")
            toggleClass(sidebarStepsNumber[index + 1], "active")
            toggleClass(currentSection, "hidden")
            toggleClass(nextSection, "hidden")


            if (nextSection.dataset.step === '3' || currentSection.dataset.step === '3') {
                console.log(currentSection);

                const monthly = document.querySelector(".monthly-add-ons");
                const yearly = document.querySelector(".yearly-add-ons");

                console.log(yearly, monthly);
                if (planName.period == "yearly") {
                    
                    toggleClass(yearly, "hidden")
                    toggleClass(monthly, "hidden")
                }

                // planName.period === "yearly" ? (toggleClass(yearly, "hidden"), toggleClass(monthly, "hidden")
                // ) : (toggleClass(yearly, "hidden"),
                //     toggleClass(monthly, "hidden"))

            }

            if (nextSection.dataset.step === '4') {
                createSumarry(planName, planSummary)
            };
        }
    })
})

categoriesPlans.forEach((plan) => {
    plan.addEventListener("click", () => {
        categoriesPlans.forEach(otherPlan => {
            otherPlan.classList.remove("active");
        });

        planSummary = []
        plan.classList.add("active");
        const planPeriodName = plan.children[0].children[1].children[0].textContent;
        const planPeriod = document.querySelector(".btn-change-plan")

        if (planPeriod.classList.contains("yearly")) {
            planName = Setplan("yearly", planPeriodName);
        } else {
            planName = Setplan("monthly", planPeriodName);
        }
    })
})

inputsAddOns.forEach((addOn) => {
    addOn.addEventListener("click", (e) => {
        const addOnName = addOn.parentElement.nextElementSibling.children[0].textContent;

        !addOn.checked ? removeAddOn(addOnName) : pickAddOns(addOnName, planName.period);
       
    })
});

form.addEventListener("input", (e) => {
    e.preventDefault();
    const formElements = [...form.elements].filter(element => element.type !== "submit")

    for (const input of formElements) {
        const errorMsgId = `${input.id}-error`;
        const errorSpan = document.getElementById(errorMsgId);

        isValid = validateInput(input.type, input.value);
        handleFormSub(isValid, input, errorSpan)
    }

});

switchPlanBtn.addEventListener("click", (e) => {
    const btnChangePeriod = e.currentTarget.lastElementChild;
    Planos(btnChangePeriod);

})

changePlanBtn.addEventListener("click", () => {
    const planSection = document.querySelector(".select-plan");
    const currentActiveSection = currentSection.nextElementSibling;

    planSection.classList.remove("hidden");
    currentActiveSection.classList.add("hidden");

    sidebarStepsNumber.forEach(stepNumber => {
        stepNumber.dataset.step == planSection.dataset.step ? stepNumber.classList.add("active") : stepNumber.classList.remove("active");
    })
    inputsAddOns.forEach(addOn =>{
         addOn.checked = false
    })
    planSummary = [];
})

confirm.addEventListener("click", () => {
    const endSection = document.querySelector(".end");
    const currentActiveSection = currentSection.nextElementSibling;

    currentActiveSection.classList.add("hidden");
    endSection.classList.remove("hidden");

})