import { planSummary } from "./index.js";

const yearlyFeatures = [
    {
        name: "Arcade",
        price: 90
    },
    {
        name: "Advanced",
        price: 120
    },
    {
        name: "Pro",
        price: 150
    }
];

const monthlyFeatures = [
    {
        name: "Arcade",
        price: 9
    },
    {
        name: "Advanced",
        price: 12
    },
    {
        name: "Pro",
        price: 15
    }
]

const onsMonthly = [
    {
        name: "Online service",
        price: 1
    },
    {
        name: "Larger storage",
        price: 2
    },
    {
        name: "Customizable Profile",
        price: 2
    }
]

const onsYearly = [
    {
        name: "Online service",
        price: 10
    },
    {
        name: "Larger storage",
        price: 20
    },
    {
        name: "Customizable Profile",
        price: 20
    }
]

function Setplan(choosePeriod, planName) {
    const planFeatures = choosePeriod == "monthly" ? monthlyFeatures : yearlyFeatures;

    const currentPlan = planName == "Arcade" ? planFeatures[0] : planName == "Advanced" ? planFeatures[1] : planFeatures[2];

    const planObj = {
        name: planName,
        period: choosePeriod,
        price: currentPlan.price
    }
    return planObj;

}

export function pickAddOns(addAndOns, period) {

    let ons = period === "monthly" ? onsMonthly :
        onsYearly;

    const currentAddOns = addAndOns == "Online Service" ? ons[0] : addAndOns == "Larger storage" ? ons[1] : ons[2]

    const addOnsObj = {
        name: currentAddOns.name,
        price: currentAddOns.price
    }

    planSummary.push(addOnsObj);
}

export function removeAddOn(addOnName) {
    const addOnIndex = planSummary.findIndex(
        (addOn) => addOn.name === addOnName
    );
    planSummary.splice(addOnIndex, 1);
}

export default Setplan;