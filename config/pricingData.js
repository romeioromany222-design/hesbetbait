const PRICING_DATA = {

    metadata: {

        lastUpdated: "2026-09-24",

        currency: "EGP",

        region: "Egypt",

        methodology:
            "الأسعار استرشادية وتُعرض كنطاقات سوقية. السعر المعتاد داخل كل نطاق هو نقطة وسطية حسابية وليس سعرًا رسميًا ثابتًا.",

        importantNote:
            "أسعار التشطيب تختلف حسب حالة الوحدة والموقع والخامات ونطاق الأعمال. بيانات مواد البناء الأساسية تُحدّث بصورة أكثر تكرارًا."

    },


    phases: {


        /*
        ==============================
        البناء
        ==============================

        هذه الأرقام تبقى مؤقتة لحين بناء قاعدة أسعار تفصيلية
        للبناء من الحفر والأساسات والخرسانة والمباني.
        لا نعتبرها أسعارًا رسمية.
        */

        construction: {

            standard: {

                min: 4500,

                typical: 5500,

                max: 7000,

                status: "provisional",

                note:
                    "مرجع أولي للتقدير المبكر، وليس عرض سعر نهائيًا."

            },


            premium: {

                min: 7500,

                typical: 9000,

                max: 11000,

                status: "provisional",

                note:
                    "مرجع أولي للتقدير المبكر، وليس عرض سعر نهائيًا."

            }

        },


        /*
        ==============================
        التشطيب
        ==============================

        النطاقات مبنية على قراءة بيانات سوقية منشورة في 2026.
        السعر typical = نقطة وسطية حسابية للنطاق.
        */

        finishing: {


            economic: {

                min: 4500,

                typical: 5250,

                max: 6000,

                status: "market_reference",

                source:
                    "Moqaysa - Finishing Cost Calculator Egypt 2026",

                sourceUrl:
                    "https://moqaysa.com/en"

            },


            standard: {

                min: 6500,

                typical: 7500,

                max: 8500,

                status: "market_reference",

                source:
                    "Moqaysa - Finishing Cost Calculator Egypt 2026",

                sourceUrl:
                    "https://moqaysa.com/en"

            },


            luxury: {

                min: 9000,

                typical: 13500,

                max: 18000,

                status: "market_reference",

                source:
                    "Moqaysa - High-end and Luxury finishing ranges 2026",

                sourceUrl:
                    "https://moqaysa.com/en",

                note:
                    "النطاق يجمع فئات التشطيب الأعلى التي تنقسم في بعض المصادر إلى High-end وLuxury."

            },


            ultra_luxury: {

                min: 22000,

                typical: 28500,

                max: 35000,

                status: "market_reference",

                source:
                    "Moqaysa - Ultra Luxury finishing range 2026",

                sourceUrl:
                    "https://moqaysa.com/en"

            }

        }

    },


    /*
    ==============================
    مواد البناء
    ==============================
    */


    materials: {


        cement: {

            unit: "ton",

            price: 4165,

            basis:
                "أسمنت رمادي - مرجع سوقي بتاريخ 24-09-2026",

            status: "current_reference",

            source:
                "بوابة الأسعار المحلية والعالمية التابعة لمجلس الوزراء كما نقلتها مصراوي",

            sourceUrl:
                "https://www.masrawy.com/news/news_economy/details/2026/9/24/3052960"

        },


        steel: {

            unit: "ton",

            price: 39782,

            basis:
                "حديد عز - مرجع سوقي بتاريخ 24-09-2026",

            status: "current_reference",

            source:
                "بوابة الأسعار المحلية والعالمية التابعة لمجلس الوزراء كما نقلتها مصراوي",

            sourceUrl:
                "https://www.masrawy.com/news/news_economy/details/2026/9/24/3052960",

            note:
                "القيمة تمثل مرجعًا لحديد عز وليست متوسط جميع أنواع الحديد."

        },


        sand: {

            unit: "m3",

            price: 250,

            status: "needs_verification",

            note:
                "قيمة قديمة محفوظة مؤقتًا. لا تعتمد عليها كبيانات سوق 2026 قبل تحديثها بمصدر مباشر."

        },


        bricks: {

            unit: "1000 pcs",

            price: 2200,

            status: "needs_verification",

            note:
                "قيمة استرشادية تحتاج تحديثًا دوريًا حسب النوع والنقل والمنطقة."

        }

    },


    /*
    ==============================
    معدلات العمالة
    ==============================

    لا نغيّرها إلى أرقام جديدة من مصدر واحد.
    تظل مؤقتة إلى أن نبني قاعدة مصنعية مستقلة.
    */

    labor_rates: {


        masonry: {

            unit: "m2",

            price: 80,

            status: "needs_verification"

        },


        plastering: {

            unit: "m2",

            price: 95,

            status: "needs_verification"

        },


        electrical: {

            unit: "point",

            price: 350,

            status: "needs_verification"

        },


        plumbing: {

            unit: "bathroom",

            price: 8500,

            status: "needs_verification"

        }

    },


    /*
    ==============================
    مصادر البيانات
    ==============================
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
                "أسعار الحديد والأسمنت"

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
                "نطاقات أسعار التشطيب حسب مستوى الجودة"

        },


        {
            name:
                "The Design Hub Egypt",

            type:
                "company_market_reference",

            updated:
                "2026",

            url:
                "https://www.tdhegypt.com/ar/blog/%D8%B3%D8%B9%D8%B1-%D8%AA%D8%B4%D8%B7%D9%8A%D8%A8-%D8%A7%D9%84%D9%85%D8%AA%D8%B1-%D9%81%D9%8A-%D9%85%D8%B5%D8%B1",

            covers:
                "مستويات وأسعار استرشادية للتشطيب في مصر"

        },


        {
            name:
                "أسس كهرباء",

            type:
                "specialized_market_reference",

            updated:
                "2026-03",

            url:
                "https://www.aseskahraba.com/ar/blog/apartment-wiring-100sqm-egypt/",

            covers:
                "تكلفة تأسيس الكهرباء لشقة 100 متر"

        },


        {
            name:
                "كارفور مصر",

            type:
                "retail_reference",

            updated:
                "2026",

            url:
                "https://www.carrefouregypt.com/mafegy/ar/",

            covers:
                "أسعار الأجهزة الكهربائية"

        },


        {
            name:
                "IKEA Egypt",

            type:
                "retail_reference",

            updated:
                "2026",

            url:
                "https://www.ikea.com/eg/en/cat/kitchens-ka003/",

            covers:
                "أسعار أنظمة المطابخ والوحدات"

        }

    ],

    /*
    ==============================
    سياسة الثقة
    ==============================
    */

    dataQuality: {

        finishing:
            "market_ranges",

        construction:
            "provisional",

        buildingMaterials:
            "mixed_current_and_pending",

        laborRates:
            "pending_verification",

        appliances:
            "retail_reference",

        kitchens:
            "retail_reference"

    }

};


export default PRICING_DATA;
