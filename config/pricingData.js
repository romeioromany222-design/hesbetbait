const PRICING_DATA = {

    metadata: {

        version: "2.0",

        lastUpdated: "2026-09-25",

        currency: "EGP",

        region: "Egypt",

        methodology:
            "النطاقات السعرية استرشادية وتُستخدم لبناء تقدير أولي. لا تمثل عرض سعر ملزمًا.",

        importantNote:
            "الأسعار تختلف حسب المدينة، الماركة، المواصفات، الكميات، التركيب، وحالة الوحدة. أي بند موسوم provisional يحتاج تحديثًا قبل اعتباره مرجعًا سوقيًا قويًا.",

        confidenceLevels: {

            high:
                "مصدر حديث ومحدد يمكن الرجوع إليه.",

            medium:
                "مرجع سوقي أو مجموعة بيانات محدودة.",

            low:
                "قيمة مؤقتة تحتاج تحققًا إضافيًا."

        }

    },


    /*
    =========================================================
    1. مراحل المشروع الأساسية
    =========================================================
    */

    phases: {


        construction: {

            standard: {

                min: 4500,

                typical: 5500,

                max: 7000,

                status: "provisional",

                confidence: "low",

                note:
                    "تقدير أولي. لا نعتمد عليه كمرجع سوقي نهائي."

            },


            premium: {

                min: 7500,

                typical: 9000,

                max: 11000,

                status: "provisional",

                confidence: "low",

                note:
                    "تقدير أولي. يحتاج قاعدة أسعار تفصيلية للبناء."

            }

        },


        finishing: {


            economic: {

                min: 4500,

                typical: 5250,

                max: 6000,

                status: "market_reference",

                confidence: "medium",

                source:
                    "Moqaysa - Egypt finishing calculator",

                sourceUrl:
                    "https://moqaysa.com/en",

                note:
                    "نطاق سوقي استرشادي وليس سعرًا رسميًا موحدًا."

            },


            standard: {

                min: 6500,

                typical: 7500,

                max: 8500,

                status: "market_reference",

                confidence: "medium",

                source:
                    "Moqaysa - Egypt finishing calculator",

                sourceUrl:
                    "https://moqaysa.com/en",

                note:
                    "نطاق سوقي استرشادي."

            },


            luxury: {

                min: 9000,

                typical: 13500,

                max: 18000,

                status: "market_reference",

                confidence: "medium",

                source:
                    "Moqaysa - Egypt finishing calculator",

                sourceUrl:
                    "https://moqaysa.com/en",

                note:
                    "نطاق تجميعي لفئات التشطيب الأعلى."

            },


            ultra_luxury: {

                min: 22000,

                typical: 28500,

                max: 35000,

                status: "market_reference",

                confidence: "medium",

                source:
                    "Moqaysa - Egypt finishing calculator",

                sourceUrl:
                    "https://moqaysa.com/en",

                note:
                    "نطاق استرشادي للمستويات شديدة الفخامة."

            }

        }

    },


    /*
    =========================================================
    2. مواد البناء
    =========================================================
    */

    materials: {


        steel_ezz: {

            unit: "ton",

            min: 39782,

            typical: 39782,

            max: 39782,

            price: 39782,

            status: "current_reference",

            confidence: "high",

            source:
                "بيانات بوابة الأسعار المحلية والعالمية التابعة لمجلس الوزراء كما نشرت في 24 سبتمبر 2026",

            sourceUrl:
                "https://www.masrawy.com/news/news_economy/details/2026/9/24/3052960",

            note:
                "مرجع لحديد عز وليس متوسط كل أنواع الحديد."

        },


        cement_gray: {

            unit: "ton",

            min: 4165,

            typical: 4165,

            max: 4165,

            price: 4165,

            status: "current_reference",

            confidence: "high",

            source:
                "بيانات بوابة الأسعار المحلية والعالمية التابعة لمجلس الوزراء كما نشرت في 24 سبتمبر 2026",

            sourceUrl:
                "https://www.masrawy.com/news/news_economy/details/2026/9/24/3052960"

        },


        sand: {

            unit: "m3",

            min: 200,

            typical: 250,

            max: 350,

            price: 250,

            status: "provisional",

            confidence: "low",

            note:
                "قيمة مؤقتة لحين توفر مصدر مباشر حديث حسب النوع والمنطقة."

        },


        bricks: {

            unit: "1000 pcs",

            min: 2000,

            typical: 2200,

            max: 2600,

            price: 2200,

            status: "provisional",

            confidence: "low",

            note:
                "تتغير حسب النوع والنقل والمنطقة."

        }

    },


    /*
    =========================================================
    3. معدلات العمالة
    =========================================================
    */

    labor_rates: {


        masonry: {

            unit: "m2",

            min: 70,

            typical: 80,

            max: 100,

            price: 80,

            status: "provisional",

            confidence: "low"

        },


        plastering: {

            unit: "m2",

            min: 80,

            typical: 95,

            max: 120,

            price: 95,

            status: "provisional",

            confidence: "low"

        },


        electrical: {

            unit: "point",

            min: 300,

            typical: 350,

            max: 450,

            price: 350,

            status: "provisional",

            confidence: "low"

        },


        plumbing: {

            unit: "bathroom",

            min: 7000,

            typical: 8500,

            max: 11000,

            price: 8500,

            status: "provisional",

            confidence: "low"

        }

    },


    /*
    =========================================================
    4. المطبخ
    =========================================================

    ملاحظة:
    أسعار IKEA الحالية مرجع لتكوينات modular محددة،
    وليست سعر متر مطبخ مصري custom شامل التركيب.
    لذلك نستخدمها كمرجع وليس كسعر سوق نهائي.
    */

    kitchen: {


        modular_reference: {

            unit: "complete kitchen configuration",

            min: 21080,

            typical: 27200,

            max: 33280,

            status: "retail_reference",

            confidence: "medium",

            sources: [

                {

                    name:
                        "IKEA Egypt KNOXHULT",

                    url:
                        "https://www.ikea.com/eg/en/cat/knoxhult-complete-unit-kitchens-48978/"

                }

            ],

            note:
                "أسعار تكوينات KNOXHULT المنشورة حاليًا. لا تمثل مطبخ MDF أو custom kitchen محلي شامل كل الخامات والتركيب."

        },


        custom_economic: {

            min: 25000,

            typical: 40000,

            max: 60000,

            status: "provisional",

            confidence: "low",

            note:
                "تقدير مؤقت للمطابخ المحلية يحتاج مسحًا مباشرًا لمصنعي المطابخ في مصر."

        },


        custom_standard: {

            min: 40000,

            typical: 65000,

            max: 100000,

            status: "provisional",

            confidence: "low",

            note:
                "تقدير مؤقت يحتاج تحققًا ميدانيًا."

        },


        custom_luxury: {

            min: 70000,

            typical: 110000,

            max: 180000,

            status: "provisional",

            confidence: "low",

            note:
                "تقدير مؤقت للمواصفات الأعلى."

        }

    },


    /*
    =========================================================
    5. التكييفات
    =========================================================
    */

    air_conditioning: {


        hp_1_5: {

            unit: "unit",

            min: 21409,

            typical: 26419,

            max: 30905,

            status: "retail_reference",

            confidence: "high",

            source:
                "Carrefour Egypt - current 1.5 HP AC listings",

            sourceUrl:
                "https://www.carrefouregypt.com/mafegy/ar/c/promo-1-5-Hp",

            note:
                "نطاق مأخوذ من موديلات 1.5 حصان منشورة حاليًا. لا يشمل بالضرورة التركيب الإضافي أو النحاس أو الأعمال الكهربائية."

        },


        hp_2_25: {

            unit: "unit",

            min: 35199,

            typical: 44063,

            max: 48909,

            status: "retail_reference",

            confidence: "medium",

            source:
                "Carrefour Egypt - current AC listings",

            sourceUrl:
                "https://www.carrefouregypt.com/mafegy/ar/c/NFEGY4040112",

            note:
                "مرجع لعدة موديلات حالية فقط."

        }

    },


    /*
    =========================================================
    6. الأجهزة الكهربائية
    =========================================================

    لا نستخدم رقمًا مجمعًا نهائيًا الآن،
    بل نضع بنية جاهزة حتى ندخل أسعار المنتجات الفعلية.
    */

    appliances: {


        refrigerator: {

            unit: "unit",

            status: "pending_market_scan",

            confidence: "low",

            price: null,

            note:
                "يحتاج مسحًا مباشرًا لعدة موديلات حالية قبل إدخال نطاق."

        },


        washing_machine: {

            unit: "unit",

            status: "pending_market_scan",

            confidence: "low",

            price: null

        },


        cooker: {

            unit: "unit",

            min: 12449,

            typical: 12699,

            max: 12699,

            price: 12699,

            status: "retail_reference",

            confidence: "medium",

            source:
                "Carrefour Egypt - Fresh 5-burner cookers",

            sourceUrl:
                "https://www.carrefouregypt.com/mafegy/ar/p/623091"

        },


        microwave: {

            unit: "unit",

            min: 3599,

            typical: 5999,

            max: 8999,

            status: "retail_reference",

            confidence: "medium",

            source:
                "Carrefour Egypt - microwave listings",

            sourceUrl:
                "https://www.carrefouregypt.com/mafegy/ar/c/NFEGY4040600"

        },


        television_55: {

            unit: "unit",

            min: 17499,

            typical: 19999,

            max: 25700,

            status: "retail_reference",

            confidence: "medium",

            source:
                "Carrefour Egypt - 55 inch TV listings",

            sourceUrl:
                "https://www.carrefouregypt.com/mafegy/en/c/55inch-tvs"

        }

    },


    /*
    =========================================================
    7. الأثاث
    =========================================================

    لا نضع أرقامًا نهائية بدون مسح فعلي لأسعار السوق.
    */

    furniture: {


        basic: {

            min: null,

            typical: null,

            max: null,

            status: "pending_market_scan",

            confidence: "low",

            note:
                "يحتاج مسحًا من متاجر أثاث مصرية متعددة."

        },


        standard: {

            min: null,

            typical: null,

            max: null,

            status: "pending_market_scan",

            confidence: "low"

        },


        luxury: {

            min: null,

            typical: null,

            max: null,

            status: "pending_market_scan",

            confidence: "low"

        }

    },


    /*
    =========================================================
    8. الخدمات الإضافية
    =========================================================
    */

    additions: {


        gypsum_basic: {

            unit: "m2",

            status: "pending_market_scan",

            confidence: "low",

            price: null

        },


        doors: {

            unit: "door",

            status: "pending_market_scan",

            confidence: "low",

            price: null

        },


        aluminum: {

            unit: "m2",

            status: "pending_market_scan",

            confidence: "low",

            price: null

        }


    },


    /*
    =========================================================
    9. إعدادات الحسبة
    =========================================================
    */

    calculator: {


        reservePercentage: 0.10,


        breakdown: {

            materials: 0.65,

            labor: 0.25,

            management: 0.10

        },


        note:
            "تقسيم 65/25/10 هو نموذج عرض داخل الحاسبة وليس دراسة رسمية لنسب التكلفة في كل مشروع."

    },


    /*
    =========================================================
    10. المدن والمواقع
    =========================================================

    لن نفعل فروق المدن قبل وجود بيانات كافية.
    */

    locations: {


        cairo: {

            label: "القاهرة",

            multiplier: 1.00,

            status: "neutral_reference"

        },


        giza: {

            label: "الجيزة",

            multiplier: 1.00,

            status: "neutral_reference"

        },


        alexandria: {

            label: "الإسكندرية",

            multiplier: 1.00,

            status: "neutral_reference"

        },


        new_cities: {

            label: "المدن الجديدة",

            multiplier: 1.00,

            status: "neutral_reference"

        },


        other: {

            label: "محافظات أخرى",

            multiplier: 1.00,

            status: "neutral_reference"

        }

    },


    /*
    =========================================================
    11. المصادر
    =========================================================
    */

    sources: [

        {

            name:
                "بوابة الأسعار المحلية والعالمية التابعة لمجلس الوزراء",

            type:
                "official_market_reference",

            updated:
                "2026-09-24",

            url:
                "https://www.masrawy.com/news/news_economy/details/2026/9/24/3052960",

            covers:
                "الحديد والأسمنت"

        },


        {

            name:
                "Moqaysa",

            type:
                "market_reference",

            updated:
                "2026",

            url:
                "https://moqaysa.com/en",

            covers:
                "نطاقات أسعار التشطيب"

        },


        {

            name:
                "Carrefour Egypt",

            type:
                "retail_reference",

            updated:
                "2026-09",

            url:
                "https://www.carrefouregypt.com/mafegy/ar/",

            covers:
                "الأجهزة والتكييفات والإلكترونيات"

        },


        {

            name:
                "IKEA Egypt",

            type:
                "retail_reference",

            updated:
                "2026-09",

            url:
                "https://www.ikea.com/eg/en/",

            covers:
                "المطابخ والوحدات"

        }

    ]

};


export default PRICING_DATA;
