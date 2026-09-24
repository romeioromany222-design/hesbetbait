import PRICING_DATA from "../config/pricingData.js?version=20260925";

class CalculatorEngine {

    constructor(area, type, level, userBudget = null) {

        this.area = Number(area) || 0;

        this.type = type;

        this.level = level;

        this.userBudget =
            userBudget === null || userBudget === ""
                ? null
                : Number(userBudget);

        this.reservePercentage = 0.10;
    }


    calculate() {

        if (this.area <= 0) {
            throw new Error("المساحة غير صحيحة");
        }


        const phase =
            PRICING_DATA.phases[this.type];


        if (!phase || !phase[this.level]) {
            throw new Error(
                "نوع المشروع أو مستوى الجودة غير صحيح"
            );
        }


        const basePrices =
            phase[this.level];


        const minTotal =
            this.area * basePrices.min;


        const typicalTotal =
            this.area * basePrices.typical;


        const maxTotal =
            this.area * basePrices.max;


        const reserve =
            typicalTotal * this.reservePercentage;


        const grandTotal =
            typicalTotal + reserve;


        const results = {

            area: this.area,

            type: this.type,

            level: this.level,

            userBudget: this.userBudget,

            minTotal,

            typicalTotal,

            maxTotal,

            reserve,

            grandTotal,

            breakdown:
                this.getBreakdown(typicalTotal)

        };


        if (
            this.userBudget !== null &&
            this.userBudget > 0
        ) {

            results.budgetGap =
                this.userBudget - grandTotal;


            results.status =
                results.budgetGap >= 0
                    ? "within_budget"
                    : "over_budget";


            results.alternativeScenarios =
                this.getAlternatives(
                    this.userBudget
                );

        }


        return results;

    }


    getBreakdown(total) {

        return {

            materials:
                total * 0.65,

            labor:
                total * 0.25,

            management:
                total * 0.10

        };

    }


    getAlternatives(budget) {

        const alternatives = [];


        const phase =
            PRICING_DATA.phases[this.type];


        Object.keys(phase).forEach(level => {

            const cost =
                phase[level].typical *
                this.area;


            const costWithReserve =
                cost *
                (1 + this.reservePercentage);


            if (costWithReserve <= budget) {

                alternatives.push({

                    level,

                    cost: costWithReserve

                });

            }

        });


        return alternatives;

    }

}

export default CalculatorEngine;
