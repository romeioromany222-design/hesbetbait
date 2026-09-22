const PRICING_DATA = {
    metadata: {
        lastUpdated: "2026-09-21",
        currency: "EGP",
        region: "Egypt"
    },

    phases: {

        construction: {

            standard: {
                min: 4500,
                typical: 5500,
                max: 7000
            },

            premium: {
                min: 7500,
                typical: 9000,
                max: 11000
            }

        },

        finishing: {

            economic: {
                min: 3500,
                typical: 4500,
                max: 5500
            },

            standard: {
                min: 6500,
                typical: 8000,
                max: 10000
            },

            luxury: {
                min: 12000,
                typical: 16000,
                max: 22000
            },

            ultra_luxury: {
                min: 25000,
                typical: 35000,
                max: 50000
            }

        }

    },

    materials: {

        cement: {
            unit: "ton",
            price: 3800
        },

        steel: {
            unit: "ton",
            price: 55000
        },

        sand: {
            unit: "m3",
            price: 250
        },

        bricks: {
            unit: "1000 pcs",
            price: 2200
        }

    },

    labor_rates: {

        masonry: {
            unit: "m2",
            price: 80
        },

        plastering: {
            unit: "m2",
            price: 95
        },

        electrical: {
            unit: "point",
            price: 350
        },

        plumbing: {
            unit: "bathroom",
            price: 8500
        }

    },

    sources: [
        "نشرة أسعار مواد البناء - وزارة الإسكان المصرية",
        "مؤشر أسعار العقارات - المنصات العقارية الكبرى",
        "مسح ميداني لشركات المقاولات"
    ]

};

export default PRICING_DATA;
