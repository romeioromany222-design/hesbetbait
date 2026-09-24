import PRICING_DATA from "../config/pricingData.js?version=20260925";


class CalculatorEngine {

    constructor(
        area,
        type,
        level,
        userBudget = null,
        options = {}
    ) {

        this.area = Number(area) || 0;

        this.type = type;

        this.level = level;

        this.userBudget =
            userBudget === null ||
            userBudget === ""
                ? null
                : Number(userBudget);


        this.options = {

            location:
                options.location || "cairo",

            kitchen:
                options.kitchen || "none",

            airConditioning:
                options.airConditioning || {
                    hp_1_5: 0,
                    hp_2_25: 0
                },

            appliances:
                options.appliances || {},

            furniture:
                options.furniture || "none",

            additions:
                options.additions || {}

        };


        this.reservePercentage =
            PRICING_DATA.calculator?.reservePercentage ??
            0.10;

    }


    calculate() {

        this.validate();


        const baseResult =
            this.calculateBaseProject();


        const kitchenResult =
            this.calculateKitchen();


        const airConditioningResult =
            this.calculateAirConditioning();


        const appliancesResult =
            this.calculateAppliances();


        const furnitureResult =
            this.calculateFurniture();


        const additionsResult =
            this.calculateAdditions();


        const optionalMinTotal =
            kitchenResult.min +
            airConditioningResult.min +
            appliancesResult.min +
            furnitureResult.min +
            additionsResult.min;


        const optionalTypicalTotal =
            kitchenResult.typical +
            airConditioningResult.typical +
            appliancesResult.typical +
            furnitureResult.typical +
            additionsResult.typical;


        const optionalMaxTotal =
            kitchenResult.max +
            airConditioningResult.max +
            appliancesResult.max +
            furnitureResult.max +
            additionsResult.max;


        const locationMultiplier =
            this.getLocationMultiplier();


        const minTotal =
            (
                baseResult.minTotal +
                optionalMinTotal
            ) *
            locationMultiplier;


        const typicalTotal =
            (
                baseResult.typicalTotal +
                optionalTypicalTotal
            ) *
            locationMultiplier;


        const maxTotal =
            (
                baseResult.maxTotal +
                optionalMaxTotal
            ) *
            locationMultiplier;


        const reserve =
            typicalTotal *
            this.reservePercentage;


        const grandTotal =
            typicalTotal +
            reserve;


        const result = {

            area: this.area,

            type: this.type,

            level: this.level,

            userBudget: this.userBudget,


            baseProject: {

                min:
                    baseResult.minTotal,

                typical:
                    baseResult.typicalTotal,

                max:
                    baseResult.maxTotal

            },


            kitchen:
                kitchenResult,

            airConditioning:
                airConditioningResult,

            appliances:
                appliancesResult,

            furniture:
                furnitureResult,

            additions:
                additionsResult,


            minTotal,

            typicalTotal,

            maxTotal,

            reserve,

            grandTotal,


            breakdown:
                this.getBreakdown(
                    typicalTotal
                ),


            metadata: {

                pricingVersion:
                    PRICING_DATA.metadata?.version ??
                    null,

                lastUpdated:
                    PRICING_DATA.metadata?.lastUpdated ??
                    null,

                currency:
                    PRICING_DATA.metadata?.currency ??
                    "EGP",

                location:
                    this.options.location

            }

        };


        if (
            this.userBudget !== null &&
            this.userBudget > 0
        ) {

            result.budgetGap =
                this.userBudget -
                grandTotal;


            result.status =
                result.budgetGap >= 0
                    ? "within_budget"
                    : "over_budget";


            result.alternativeScenarios =
                this.getAlternatives(
                    this.userBudget
                );

        }


        result.warnings =
            this.getDataWarnings();


        return result;

    }


    validate() {

        if (
            !Number.isFinite(this.area) ||
            this.area <= 0
        ) {

            throw new Error(
                "المساحة غير صحيحة"
            );

        }


        if (
            !PRICING_DATA.phases ||
            !PRICING_DATA.phases[this.type]
        ) {

            throw new Error(
                "نوع المشروع غير صحيح"
            );

        }


        if (
            !PRICING_DATA.phases[this.type][this.level]
        ) {

            throw new Error(
                "مستوى الجودة غير صحيح"
            );

        }

    }


    calculateBaseProject() {

        const phase =
            PRICING_DATA.phases[
                this.type
            ];


        const basePrices =
            phase[this.level];


        return {

            minTotal:
                this.area *
                Number(
                    basePrices.min || 0
                ),


            typicalTotal:
                this.area *
                Number(
                    basePrices.typical || 0
                ),


            maxTotal:
                this.area *
                Number(
                    basePrices.max || 0
                )

        };

    }


    calculateKitchen() {

        const selected =
            this.options.kitchen;


        if (
            !selected ||
            selected === "none"
        ) {

            return this.emptyComponent(
                "kitchen"
            );

        }


        const kitchen =
            PRICING_DATA.kitchen?.[
                selected
            ];


        if (!kitchen) {

            return this.unpricedComponent(
                "kitchen",
                selected
            );

        }


        return {

            selected,

            min:
                Number(
                    kitchen.min || 0
                ),

            typical:
                Number(
                    kitchen.typical || 0
                ),

            max:
                Number(
                    kitchen.max || 0
                ),

            status:
                kitchen.status ||
                "unknown",

            confidence:
                kitchen.confidence ||
                "unknown",

            source:
                kitchen.source ||
                null,

            sourceUrl:
                kitchen.sourceUrl ||
                null,

            note:
                kitchen.note ||
                null

        };

    }


    calculateAirConditioning() {

        const selected =
            this.options.airConditioning ||
            {};


        let min = 0;

        let typical = 0;

        let max = 0;


        const items = [];


        Object.keys(selected)
            .forEach(key => {

                const quantity =
                    Number(
                        selected[key]
                    ) || 0;


                if (
                    quantity <= 0
                ) {

                    return;

                }


                const item =
                    PRICING_DATA.air_conditioning?.[
                        key
                    ];


                if (!item) {

                    items.push({

                        key,

                        quantity,

                        status:
                            "unpriced"

                    });

                    return;

                }


                const itemMin =
                    Number(
                        item.min || 0
                    );


                const itemTypical =
                    Number(
                        item.typical || 0
                    );


                const itemMax =
                    Number(
                        item.max || 0
                    );


                min +=
                    itemMin *
                    quantity;


                typical +=
                    itemTypical *
                    quantity;


                max +=
                    itemMax *
                    quantity;


                items.push({

                    key,

                    quantity,

                    min:
                        itemMin *
                        quantity,

                    typical:
                        itemTypical *
                        quantity,

                    max:
                        itemMax *
                        quantity,

                    status:
                        item.status ||
                        "unknown",

                    confidence:
                        item.confidence ||
                        "unknown",

                    source:
                        item.source ||
                        null,

                    sourceUrl:
                        item.sourceUrl ||
                        null,

                    note:
                        item.note ||
                        null

                });

            });


        return {

            min,

            typical,

            max,

            items

        };

    }


    calculateAppliances() {

        const selected =
            this.options.appliances ||
            {};


        let min = 0;

        let typical = 0;

        let max = 0;


        const items = [];


        Object.keys(selected)
            .forEach(key => {

                const quantity =
                    Number(
                        selected[key]
                    ) || 0;


                if (
                    quantity <= 0
                ) {

                    return;

                }


                const item =
                    PRICING_DATA.appliances?.[
                        key
                    ];


                if (
                    !item ||
                    item.min === null ||
                    item.min === undefined
                ) {

                    items.push({

                        key,

                        quantity,

                        status:
                            "unpriced"

                    });

                    return;

                }


                const itemMin =
                    Number(
                        item.min || 0
                    );


                const itemTypical =
                    Number(
                        item.typical || 0
                    );


                const itemMax =
                    Number(
                        item.max ??
                        item.typical ??
                        0
                    );


                min +=
                    itemMin *
                    quantity;


                typical +=
                    itemTypical *
                    quantity;


                max +=
                    itemMax *
                    quantity;


                items.push({

                    key,

                    quantity,

                    min:
                        itemMin *
                        quantity,

                    typical:
                        itemTypical *
                        quantity,

                    max:
                        itemMax *
                        quantity,

                    status:
                        item.status ||
                        "unknown",

                    confidence:
                        item.confidence ||
                        "unknown",

                    source:
                        item.source ||
                        null,

                    sourceUrl:
                        item.sourceUrl ||
                        null

                });

            });


        return {

            min,

            typical,

            max,

            items

        };

    }


    calculateFurniture() {

        const selected =
            this.options.furniture;


        if (
            !selected ||
            selected === "none"
        ) {

            return this.emptyComponent(
                "furniture"
            );

        }


        const item =
            PRICING_DATA.furniture?.[
                selected
            ];


        if (
            !item ||
            item.min === null ||
            item.min === undefined
        ) {

            return this.unpricedComponent(
                "furniture",
                selected
            );

        }


        return {

            selected,

            min:
                Number(
                    item.min || 0
                ),

            typical:
                Number(
                    item.typical || 0
                ),

            max:
                Number(
                    item.max || 0
                ),

            status:
                item.status ||
                "unknown",

            confidence:
                item.confidence ||
                "unknown"

        };

    }


    calculateAdditions() {

        const selected =
            this.options.additions ||
            {};


        let min = 0;

        let typical = 0;

        let max = 0;


        const items = [];


        Object.keys(selected)
            .forEach(key => {

                const quantity =
                    Number(
                        selected[key]
                    ) || 0;


                if (
                    quantity <= 0
                ) {

                    return;

                }


                const item =
                    PRICING_DATA.additions?.[
                        key
                    ];


                if (
                    !item ||
                    item.price === null ||
                    item.price === undefined
                ) {

                    items.push({

                        key,

                        quantity,

                        status:
                            "unpriced"

                    });

                    return;

                }


                const price =
                    Number(
                        item.price
                    );


                min +=
                    price *
                    quantity;


                typical +=
                    price *
                    quantity;


                max +=
                    price *
                    quantity;


                items.push({

                    key,

                    quantity,

                    min:
                        price *
                        quantity,

                    typical:
                        price *
                        quantity,

                    max:
                        price *
                        quantity,

                    status:
                        item.status ||
                        "unknown",

                    confidence:
                        item.confidence ||
                        "unknown"

                });

            });


        return {

            min,

            typical,

            max,

            items

        };

    }


    getLocationMultiplier() {

        const location =
            PRICING_DATA.locations?.[
                this.options.location
            ];


        if (!location) {

            return 1;

        }


        const multiplier =
            Number(
                location.multiplier
            );


        if (
            !Number.isFinite(multiplier) ||
            multiplier <= 0
        ) {

            return 1;

        }


        return multiplier;

    }


    getBreakdown(total) {

        const breakdownConfig =
            PRICING_DATA.calculator?.breakdown ||
            {

                materials: 0.65,

                labor: 0.25,

                management: 0.10

            };


        return {

            materials:
                total *
                Number(
                    breakdownConfig.materials || 0
                ),


            labor:
                total *
                Number(
                    breakdownConfig.labor || 0
                ),


            management:
                total *
                Number(
                    breakdownConfig.management || 0
                )

        };

    }


    getAlternatives(budget) {

        const alternatives = [];


        const phase =
            PRICING_DATA.phases[
                this.type
            ];


        Object.keys(phase)
            .forEach(level => {

                const typical =
                    Number(
                        phase[level].typical || 0
                    );


                const cost =
                    typical *
                    this.area *
                    this.getLocationMultiplier();


                const costWithReserve =
                    cost *
                    (
                        1 +
                        this.reservePercentage
                    );


                if (
                    costWithReserve <= budget
                ) {

                    alternatives.push({

                        level,

                        cost:
                            costWithReserve

                    });

                }

            });


        return alternatives;

    }


    emptyComponent(name) {

        return {

            name,

            selected:
                "none",

            min: 0,

            typical: 0,

            max: 0,

            status:
                "not_selected",

            confidence:
                null

        };

    }


    unpricedComponent(
        name,
        selected
    ) {

        return {

            name,

            selected,

            min: 0,

            typical: 0,

            max: 0,

            status:
                "unpriced",

            confidence:
                "low",

            note:
                "تم اختيار هذا البند لكن لا توجد بيانات سعر موثقة داخله حاليًا، لذلك لم يتم إدخاله في الإجمالي."

        };

    }


    getDataWarnings() {

        const warnings = [];


        if (
            this.options.furniture &&
            this.options.furniture !== "none"
        ) {

            const furniture =
                PRICING_DATA.furniture?.[
                    this.options.furniture
                ];


            if (
                !furniture ||
                furniture.min === null ||
                furniture.min === undefined
            ) {

                warnings.push(
                    "بيانات الأثاث المختارة تحتاج إلى تحديث سعري قبل إدخالها في الإجمالي."
                );

            }

        }


        Object.keys(
            this.options.appliances || {}
        ).forEach(key => {

            const quantity =
                Number(
                    this.options.appliances[key]
                ) || 0;


            if (
                quantity <= 0
            ) {

                return;

            }


            const item =
                PRICING_DATA.appliances?.[
                    key
                ];


            if (
                !item ||
                item.min === null ||
                item.min === undefined
            ) {

                warnings.push(
                    `بيانات الجهاز ${key} تحتاج إلى تحديث سعري.`
                );

            }

        });


        Object.keys(
            this.options.additions || {}
        ).forEach(key => {

            const quantity =
                Number(
                    this.options.additions[key]
                ) || 0;


            if (
                quantity <= 0
            ) {

                return;

            }


            const item =
                PRICING_DATA.additions?.[
                    key
                ];


            if (
                !item ||
                item.price === null ||
                item.price === undefined
            ) {

                warnings.push(
                    `بيانات البند الإضافي ${key} تحتاج إلى تحديث سعري.`
                );

            }

        });


        return warnings;

    }

}


export default CalculatorEngine;
