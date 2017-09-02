'use strict';

const LAST_VISIT_INTERVAL = 20;
const MAX_GLOBAL_DISCOOUNT = 3;
const MAX_NIGHT_DISCOOUNT = 5;
const MAX_WEEKEND_DISCOOUNT = 7;
const ORDER_COUNT = 50;
const TOTAL_PRICE = 1000;
const MAX_BONUS = 100;

const NIGHT_HOURS_BEGIN = 23;
const NIGHT_HOURS_END = 5;
const SUNDAY_NUMBER = 0;
const SATURDAY_NUMBER = 6;

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const MS_PER_HOUR = 1000 * 60 * 60;
const BONUS_INTERVAL_HOURS = 240;
const MAX_DAY_INTERVAL = 20;
//--------------------------------------------------------------------------------
class User {
    constructor() {
        this.lastVisitDate = new Date(Date.now() - MS_PER_DAY * Math.ceil(Math.random() * MAX_DAY_INTERVAL));
        this.globalDiscount = Math.ceil(Math.random() * MAX_GLOBAL_DISCOOUNT);
        this.nightDiscount = Math.ceil(Math.random() * MAX_NIGHT_DISCOOUNT);
        this.weekendDiscount = Math.ceil(Math.random() * MAX_WEEKEND_DISCOOUNT);
        this.ordersCount = Math.ceil(Math.random() * ORDER_COUNT);
        this.ordersTotalPrice = Math.ceil(Math.random() * TOTAL_PRICE);
        this.bonus = Math.ceil(Math.random() * MAX_BONUS);
    }
}
//--------------------------------------------------------------------------------
function mixinGetDiscount(user) {
    user.getDiscount = function() {
        let now = new Date();

        return (
            this.globalDiscount +
            (now.getDay() === SUNDAY_NUMBER || now.getDay() === SATURDAY_NUMBER ? this.weekendDiscount : 0) +
            (now.getHours() >= NIGHT_HOURS_BEGIN || now.getHours() < NIGHT_HOURS_END ? this.nightDiscount : 0)
        );
    }
}
//--------------------------------------------------------------------------------
function mixinGetBonus(user) {
   user.getBonus = function() {
        //according to requirements we can't understand what to add to ordersCount
        let someStrangeValue = 10;

        return (
            this.ordersCount +
            ((Date.now() - this.lastVisitDate) / MS_PER_HOUR <= BONUS_INTERVAL_HOURS ? someStrangeValue : 0 )
        );    
    }
}
//--------------------------------------------------------------------------------
window.onload = () => {
    let outputEl = document.getElementById('output');

    document.getElementById('main-button').onclick = () => {
        let user = new User();
        mixinGetDiscount(user);
        mixinGetBonus(user);

        outputEl.innerHTML = `<hr>Initial user:<br><br>\
                              ${JSON.stringify(user)}<br><hr>\
                              Here user disocunt: ${user.getDiscount()}<br>\
                              Here user bonus: ${user.getBonus()}<hr>`;
    }
}