export const API_URL = "https://api.themoviedb.org/3";
export const CESIUMTOKEN = "";

export const models = [
    {
        name: "Landslide Susceptibility",
        id: "landslideSusceptibility",
        models: [
            {
                name: "PoLA",
                id: "susceptibilityPoLA",
            },
            {
                name: "XGBoost",
                id: "susceptibilityXGBoost",
            }
        ]
    },
    {
        name: "Device Vulnerability",
        id: "deviceVulnerability",
        models: [
            {
                name: "PoLA",
                id: "susceptibilityPoLA",
            }
        ]
    },
    {
        name: "Composite Geohazard Assessment",
        id: "landslidecompGeoHazardAssessSusceptibility",
        models: [
            {
                name: "PoLA",
                id: "susceptibilityPoLA",
            }
        ]
    }
];

export const modelFactors = {
    enviormentFactors: [
        {
            name: "DEM",
            ch: "高程",
            id: "demEnabled"
        },
        {
            name: "Slope",
            ch: "坡度",
            id: "slopeEnabled"
        },
        {
            name: "Aspect",
            ch: "坡向",
            id: "aspectEnabled"
        },
        { 
            name: "Surf. Cut Depth",
            ch:	"地表切割深度",
            id: "cutDepthEnabled"
        },
        {
            name: "TWI",
            ch:	"地形湿度指数",
            id:	"twiEnabled"
        },
        {
            name: "Prof. Curv.",
            ch: "剖面曲率",
            id: "profileCurvatureEnabled"
        },
        {
            name: "Planf. Curv.",
            ch: "平面曲率",
            id: "planfCurvatureEnabled"
        },
        { 
            name: "Roughness",
            ch: "粗糙度",
            id: "roughnessEnabled"
        },
        {
            name: "Lithology",
            ch: "岩性",
            id: "lithologyEnabled"
        },
        {
            name: "LS",
            ch: "坡度坡长因子",
            id: "lengthSlopeEnabled"
        },
        {
            name: "Dist. to River",
            ch: "到河网距离",
            id: "riverDistEnabled"
        },
        {
            name: "Dist. to Fault",
            ch: "到断裂带距离",
            id: "faultDistEnabled"
        },
        
        {
            name: "Landform",
            ch: "地貌",
            id: "landformEnabled"
        },
        {
            name: "NDVI",
            ch: "归一化植被指数",
            id: "ndviEnabled"
        },	
        {
            name: "4h MRR",
            ch:	"4h最大滚动降水",
            id: "mrr4hEnabled"
        },
        {
            name: "24h MRR",
            ch: "24h最大滚动降水",
            id: "mrr24hEnabled"
        },
        {
            name: "Hist. Landslide Freq.",
            ch: "历史滑坡频率",
            id: "landslideFreqEnabled"
        },
        {
            name: "Longitude",
            ch: "经度",
            id: "longitudeEnabled"
        },
        {
            name: "Latitude",
            ch: "纬度",
            id: "latitudeEnabled"
        },
        {
            name: "FVC",
            ch: "植被覆盖度",
            id: "fvcEnabled"
        },
        {
            name: "Soil Moisture",
            ch: "土壤湿度",
            id: "soilMoistureEnabled"
        },
        {
            name: "Temp.",
            ch: "温度",
            id: "temperatureEnabled"
        },
        {
            name: "SeismicIntensity", ch: "地震强度", id:"seismicIntensityEnabled"
        },
        {  
            name: "GW Level", ch: "地下水水位", id: "gwLevelEnabled"
        },
        {
            name: "1h Acc. Rainfall", ch: "1h累计降水", id: "rainfall1hEnabled"
        },
        {
            name: "4h Acc. Rainfall", ch: "4h累计降水", id: "rainfall4hEnabled"
        },
        {
            name: "12h Acc. Rainfall", ch: "12h累计降水", id: "rainfall12hEnabled"
        },
        {

            name: "24h Acc. Rainfall", ch: "24h累计降水", id: "rainfall24hEnabled"
        },
        {
            name: "48h Acc. Rainfall", ch: "48h累计降水", id: "rainfall48hEnabled"
        },
        {
            name: "72h Acc. Rainfall", ch: "72h累计降水", id: "rainfall72hEnabled"
        },
        {
            name: "Soil Type", ch: "土壤类型", id: "soilTypeEnabled"
        },
        {
            name: "Soil Thickness", ch:"土壤厚度", id: "soilThicknessEnabled"
        }
    ],
    humanFactors: [
        {
            name: "Landuse", ch: "土地利用类型", id: "landuseEnabled"
        },
        {
            name: "Dist. to Road", ch: "到路网距离", id: "roadDistEnabled"
        },
        {
            name: "Reservoir Level", ch: "水库水位", id: "reservoirLevelEnabled"
        }
    ]
}

export const timeParams = [
    {
        name: 'Train set',
        type: 'int',
        desc: '训练集开始及结束时间',
        from: '1985',
        to: '2018',
        value: []
    },
    {
        name: 'Test set',
        type: 'int',
        desc: '测试集开始及结束时间',
        from: '1985',
        to: '2018',
        value: []
    },
    {
        name: 'Validation set',
        id: 'valStartYear',
        type: 'int',
        desc: '验证集开始及结束时间',
        from: '1985',
        to: '2018',
        value: ''
    }
]

export const XGBParams = [
    {
        name: 'max_depth',
        id: 'maxDepth',
        type: 'int',
        default: 6,
        value: 6,
        min: 0,
        max: Infinity,
        step: 1
    },
    {
        name: 'gamma',
        id: 'gamma',
        type: 'float',
        default: 0.0,
        value: 0.0,
        min: 0.0,
        max: 1.0,
        step: 0.1
    },
    {
        name: 'min_child_weight',
        id: 'minChildWeight',
        type: 'int',
        default: 1,
        value: 1,
        min: 1,
        max: Infinity,
        step: 1
    },
    {
        name: 'colsample_bytree',
        id: 'colsampleBytree',
        type: 'float',
        default: 1.0,
        value: 1.0,
        min: 0.5,
        max: 1.0,
        step: 0.1
    },
    {
        name: 'lambda',
        id: 'lambda',
        type: 'float',
        default: 1.0,
        value: 1.0,
        min: 0.0,
        max: 1.0,
        step: 0.1
    },
    {
        name: 'subsample',
        id: 'subsample',
        type: 'float',
        default: 1.0,
        value: 1.0,
        min: 0.5,
        max: 1.0,
        step: 0.1
    },
    {
        name: 'learning_rate',
        id: 'learningRate',
        type: 'float',
        default: 0.3,
        value: 0.3,
        min: 0.01,
        max: 0.5,
        step: 0.01
    },
    {
        name: 'early_stopping_round',
        id: 'earlyStoppingRound',
        type: 'int',
        default: 5,
        value: 5,
        min: 5,
        max: 20,
        step: 1
    },
]
