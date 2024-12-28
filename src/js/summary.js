const title = document.querySelector(".current-plan-title");
const price = document.querySelector(".current-plan-price");
const planPeriod = document.querySelector(".current-plan-period");
const choosePlan = document.querySelector(".current-ons");
const total = document.querySelector(".total-per-period");
const totalPerYearOrMonth = document.querySelector(".plan-month-or-year");

function CreateSummary(planType, planOns) {
    reset();
    title.innerText = planType.name;
    price.innerText = planType.period == "yearly" ? `$${planType.price}/yr` : `$${planType.price}/mo`;
    planPeriod.innerText = planType.period;

    let planTotal = planType.price;

    for (let i = 0; i < planOns.length; i++) {
        const chooseOns = document.createElement("div");
        const onsName = document.createElement("p");
        const onsPrice = document.createElement("span");

        chooseOns.classList.add("choose-ons");
        onsName.classList.add("ons-name");
        onsPrice.classList.add("choose-ons-price");

        onsName.innerText = planOns[i].name;
        onsPrice.innerText = planType.period == "yearly" ? `+$${planOns[i].price}/yr` : `+$${planOns[i].price}/mo`;

        planTotal += planOns[i].price;
        chooseOns.appendChild(onsName);
        chooseOns.appendChild(onsPrice);
        choosePlan.appendChild(chooseOns);
    }

    totalPerYearOrMonth.innerHTML = planType.period == "yearly" ? "(per year)" : "(per month)";
    total.innerText = planType.period == "yearly" ? `$${planTotal}/yr` : `$${planTotal}/mo`;
}

function reset() {
    title.innerText = ''
    price.innerText = ''
    planPeriod.innerText = '';
    total.innerText = '';
    totalPerYearOrMonth.innerText = '';
    choosePlan.innerHTML = '';
}

export default CreateSummary;
