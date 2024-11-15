<script setup>
  import * as Cesium from 'cesium';
  import { ElTabs, ElTabPane, ElSelect, ElSpace, ElUpload, ElCheckbox, ElCheckboxGroup, ElDivider, ElCollapse, ElCollapseItem, ElDescriptions, ElDescriptionsItem, ElTooltip, ElDatePicker, ElMessage } from 'element-plus';
  import { Tools, TrendCharts, DataAnalysis, DocumentAdd } from '@element-plus/icons-vue'
  import { flyToRectangle, setLayerOpacity } from '@/utils/js/initCesium';
  import 'cesium/Build/Cesium/Widgets/widgets.css';
  import { useHeaderStore } from '../../store/headerStore';
  import RadarChart from '@/components/RadarChart.vue';
  // import RingChart from '@/components/RingChart.vue';
  import ColorSampleTable from '../../components/colorSampleTable.vue';
  import { onMounted, ref, watch, computed } from 'vue';
  import { get, post } from '@/apis/index.js';
  import { DArrowRight, DArrowLeft, Plus, Minus } from '@element-plus/icons-vue';
  import { models, modelFactors, timeParams, XGBParams } from "@/config/config.js";

  let viewer = null;
  const headerStore = useHeaderStore();
  onMounted(() => {
    // initMap();
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwZjg1MmExZS0wZTY1LTRiMDktOTcyYS0zZjNmYTU1YTI5ZGMiLCJpZCI6MjUzNTE0LCJpYXQiOjE3MzA5ODQ5NDR9.Xe_XAH660NK3UQ2WpL44qXchUs8jt8cFaYrULun7u58';
    viewer = new Cesium.Viewer('cesiumContainer', {
      timeline: false,
      animation: false,
      // 使用默认的影像图层和地形图层
      // terrainProvider: Cesium.createWorldTerrain({ requestWaterMask: true })
    });
    //隐藏版权信息
    viewer._cesiumWidget._creditContainer.style.display = "none";

    // var options = {};
    // // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
    // // options.defaultResetView = Rectangle.fromDegrees(80, 22, 130, 50);
    // // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
    // options.enableCompass= true;
    // // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
    // options.enableZoomControls= false;
    // // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
    // options.enableDistanceLegend= false;
    // // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
    // options.enableCompassOuterRing= true;
    
    // CesiumNavigation(viewer, options);
    // let viewer = new Cesium.Viewer('cesiumContainer', {
    //     imageryProvider:false,  //关闭默认的imageryProvider
    //     baseLayerPicker: false, //关闭图层切换
    // });
    
    // //移除所有默认图层
    // viewer.imageryLayers.removeAll();
    
    // //添加想要的图层地址
    // //这里以arcgis地形为例
    // const terrain=new Cesium.ArcGISTiledElevationTerrainProvider({
    //   url:"https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
    
    // });
    
    // viewer.terrainProvider=terrain;
  })

  //tabs切换
  const activeTab = ref('1');
  const handleNextClick = () => {
    activeTab.value = (parseInt(activeTab.value) + 1).toString();
    console.log(activeTab.value)
  }

  const activeProjectInfo = ref({});
  const activeProjectId = ref('');
  const activeProject = computed(() => {
    return headerStore.activeProject;
  })
  //选择其他project时，获取新project的数据
  watch(activeProject, (newVal) => {
    activeProjectId.value = newVal;
    // const res = get(`/api/project/getProject?id=${newVal}`)
    // activeProjectInfo.value = res;
    activeProjectInfo.value = {
        id: "HongKong",
        name: "HongKong",
        createdTime: "2024-11-10 10:30:00",
        updateTime: "2024-11-10 10:30:00",
        lastExecutedTime: "2024-11-10 10:30:00"
    };
  })

  //获取模型

  const zoomIn = () => {
    let position = viewer.camera.position;
    let cameraHeight = viewer.scene.globe.ellipsoid.cartesianToCartographic(position).height;
    // 每次缩小倍数，参数可改
    let moveRate = cameraHeight / 2.0;
    viewer.camera.moveForward(moveRate);
  }

  const zoomOut = () => {
    let position = viewer.camera.position;
    let cameraHeight = viewer.scene.globe.ellipsoid.cartesianToCartographic(position).height;
    // 每次放大倍数，参数可改
    let moveRate = cameraHeight / 2.0;
    viewer.camera.moveBackward(moveRate);
  }

  // let url = "";
  // const initMap = () => {
  //   let viewer = initCesium({
  //     mapId: 'cesiumContainer',
  //   })
  //   console.log(viewer)
  // }

  const showBox = ref(false);

  const moduleFunc = ref('');
  const moduleFuncList = ref(models);
  const model = ref('');
  const modelList = ref([]);
  const moduleFuncChange = (e) => {
    moduleFunc.value = e;
    modelList.value = moduleFuncList.value.find(item => item.id == moduleFunc.value)?.models || [];
  };

  const modelChange = (e) => {
    model.value = e;
  }

  //文件上传
  const fileList = ref([]);
  const handleChange = () => {
    console.log('change');
  }

  //获取工程
  // const getProject = async () => {
  //   const res = await get('/api/project/getList');
  //   console.log(res);
  // }

  //删除工程
  // const deleteProject = async () => {
  //   const res = await post('/api/project/delete', {
  //     id: '1',
  //   });
  //   console.log(res);
  // }
  
  //模型训练
  const activeNames = ref('1');
  const newModelName = ref('');
  //环境因子
  const checkAllEnviorment = ref(false);
  const isIndeterminateEnviorment = ref(false);
  const checkedEnviormentFactor = ref([]);
  const enviormentList = ref(modelFactors.enviormentFactors);
  //人为因子
  const checkAllHuman = ref(false);
  const isIndeterminateHuman = ref(false);
  const checkedHumanFactor = ref([]);
  const humanList = ref(modelFactors.humanFactors);
  //环境因子全选/全不选
  const checkAllEnviormentChange = (e) => {
    console.log(e);
    if(e) {
      checkedEnviormentFactor.value = enviormentList.value.map(item => item.id);
    } else {
      checkedEnviormentFactor.value = [];
    }
  }
  //人为因子全选/全不选
  const checkAllHumanChange = (e) => {
    console.log(e);
    if(e) {
      checkedHumanFactor.value = humanList.value.map(item => item.id);
    } else {
      checkedHumanFactor.value = [];
    }
  }



  const checkedEnviormentFactorChange = (e) => {
    console.log(e);
  }

  const checkedHumanFactorChange = (e) => {
    console.log(e);
  }

  //参数
  const timeOptions = ref(timeParams);
  const XGBOptions = ref(XGBParams);
  const disabledDate = (time) => {
    return time.getTime() < new Date('1985-01-01 00:00:00').getTime() || time.getTime() > new Date('2018-12-31 23:59:59').getTime();
  }

  //开始训练Start Train
  const handleStartTrain = async () => {
    if(newModelName.value.length == 0) {
      ElMessage.error('Please give the model a name')
      return;
    }
    //处理环境因子 
    let enviorment = {};
    for(let item of enviormentList.value) {
      if(checkedEnviormentFactor.value.includes(item.id)) {
        enviorment[item.id] = true;
      } else {
        enviorment[item.id] = false;
      }
    }
    //处理人为因子
    let human = {};
    for(let item of humanList.value) {
      if(checkedHumanFactor.value.includes(item.id)) {
        human[item.id] = true;
      } else {
        human[item.id] = false;
      }
    }
    //处理configValue
    const config = timeOptions.value;
    let configValue = [
      {
          "id": "trainStartYear",
          "value": config[0].value[0]
      },
      {
          "id": "trainEndYear",
          "value": config[0].value[1]
      },
      {
          "id": "testStartYear",
          "value": config[1].value[0]
      },
      {
          "id": "testEndYear",
          "value": config[1].value[1]
      },
      {
          "id": "valStartYear",
          "value": config[2].value[0]
      },
      {
          "id": "valEndYear",
          "value": config[2].value[1]
      }
    ];
    for(let item of XGBOptions.value) {
      configValue.push({
        id: item.id,
        value: item.value.toString()
      })
    }
    //处理timeParams, XGBParams
    let params = {
      modelId: model.value,
      functionId: moduleFunc.value,
      projectId: activeProjectId.value,
      subModelName: newModelName.value,
      enviorment,
      human,
      configValue
    }
    console.log(params);
    const res = await post('http://127.0.0.1:8001/api/trainModel', params);
    activeNames.value = ['3'];
    console.log(res)
  }

  //模型精度
  const radarData = ref([]);
  const completeStatus = ref([])
  const getTrainingStatus = async () => {
    const res = await get(`http://127.0.0.1:8001/api/checkTrainStatus?modelId=${model.value}&projectId=${activeProjectId.value}&functionId=${moduleFunc.value}&subModelName=${newModelName.value}`);
    console.log(res);
    let temp = [];
    res.precision?.forEach(item => {
      const newVal = {
        name: item.name,
        value: []
      }
      Object.keys(item?.metrics).forEach(key => {
        newVal.value.push(item.metrics[key])
      })
      temp.push(newVal);
    })
    radarData.value = temp;
    completeStatus.value = res.completeStatus[0];
  }

  const activeLayer = ref(null);
  const handleStartForcast = async() => {
    const res = await post('http://127.0.0.1:8000/api/runLandslide', {
        modelId: model.value,
        projectId: activeProjectId.value,
        functionId: moduleFunc.value,
        selectSubModel: newModelName.value,
      }
    );
    activeNames.value = ['4'];
    const { result, layerUrl, layerName, layerBbox } = res;
    const temp = result.map(item => {
      item.result.name = item.name;
      return item.result;
    });
    colorSampleTableData.value = temp;
    console.log(layerUrl);
    addFilterWmslayer(layerUrl, layerName);
    const layer = addFilterWmslayer(layerUrl, layerName);
    activeLayer.value = layer;
    const { westBoundLongitude: west, southBoundLatitude: south, eastBoundLongitude: east, northBoundLatitude: north } = layerBbox;
    flyToRectangle(west, east, south, north);
  }

  //结果
  const layerOpacity = ref(1);
  const colorSampleTableData = ref([]);

  const getResult = async() => {
    const res = await get('http://127.0.0.1:8000/api/models/getResult', {

      }
    );
    const { result, layerUrl, layerName } = res;
    const temp = result.map(item => {
      item.result.name = item.name;
      return item.result;
    });
    colorSampleTableData.value = temp;
    console.log(layerUrl);
    const layer = addFilterWmslayer(layerUrl, layerName);
    const { _rectangle } = layer;
    viewer.camera.flyTo({
      destination: Cesium.Rectangle.fromDegrees(_rectangle.west, _rectangle.south, _rectangle.east, _rectangle.north),
      duration: 3
    })
  }
  //加载结果图层
  const addFilterWmslayer = (url, layerName) => {
    var wms = new Cesium.WebMapServiceImageryProvider({
      url: url,
      layers: layerName,
      parameters: {
        transparent: true, //透明配置
        service: 'WMS',
        format: 'image/png',
        // srs: 'EPSG:4326',
        // CQL_FILTER: filter //过滤条件
      }
    })
    let wmsLayer = viewer.imageryLayers.addImageryProvider(wms)
    return wmsLayer
  }

  //改变图层透明度
  const changeLayerOpacity = (opacity) => {
    setLayerOpacity(viewer, activeLayer.value, opacity); //设置图层透明度
  }
</script>

<template>
    <div id="cesiumContainer" style="position: relative">
      <div class="sideBar" :class="showBox ? 'controller-box-show' : 'controller-box-hide'">
        <div class="showBnt" @click="showBox = !showBox">
            <el-icon v-show="showBox"><DArrowLeft /></el-icon>
            <el-icon v-show="!showBox"><DArrowRight /></el-icon>
        </div>
        <el-tabs v-model="activeTab" type="border-card" class="demo-tabs" :stretch="true">
          <el-tab-pane name="1">
            <template #label>
              <div class="custom-tabs-label">
                <div class="icon"><el-icon><DocumentAdd /></el-icon></div>
                <div class="label"><span>Data Input</span></div>
              </div>
            </template>
            <div>
              <el-space direction="vertical" alignment="start" :size="16">
                <div>
                  <h5>Function:</h5>
                  <el-select
                    v-model="moduleFunc"
                    size="small"
                    class="default-select"
                    placeholder="Please choose function"
                    @change="(e) => moduleFuncChange(e)"
                  >
                  <el-option
                      v-for="item in moduleFuncList"
                      :key="item?.id"
                      :label="item?.name"
                      :value="item?.id"
                    />
                  </el-select>
                </div>
                <div>
                  <h5>Model:</h5>
                  <el-select
                    v-model="model"
                    size="small"
                    placeholder="Please choose model"
                    @change="(e) => modelChange(e)"
                    class="default-select"
                    >
                  <el-option
                      v-for="item in modelList"
                      :key="item?.id"
                      :label="item?.name"
                      :value="item?.id"
                    />
                  </el-select>
                </div>
                <div>
                  <h5>Upload Data</h5>
                  <el-upload
                    v-model:file-list="fileList"
                    class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :on-change="handleChange"
                  >
                    <el-button type="primary">Click to upload</el-button>
                    <template #tip>
                      <div class="el-upload__tip">
                        Choose file with the button or drop file in the under area
                      </div>
                    </template>
                  </el-upload>
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    multiple
                  >
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                      Drop file here or <em>click to upload</em>
                    </div>
                    <template #tip>
                      <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                      </div>
                    </template>
                  </el-upload>
                </div>
              </el-space>
              <div class="footer-btn">
                <el-button type="primary" @click="handleNextClick">Next</el-button>
              </div>
            </div>         
          </el-tab-pane>
          <el-tab-pane name="2">
            <template #label>
              <span class="custom-tabs-label">
                <div class="icon"><el-icon><Tools /></el-icon></div>
                <div class="label"><span>Training</span></div>
              </span>
            </template>
            <div>
                <h6>New Model Name</h6>
                <el-input placeholder="Please input a name for your model" size="small" v-model="newModelName" />
                <el-collapse v-model="activeNames" accordion>
                  <el-collapse-item name="1">
                    <template #title>
                      <div class="w-280 flex ali-center just-sb">
                        <div class="flex ali-bl">
                          <h5>Enviorment Factors</h5>
                          <span class="factor-selected">(<span class="pri">{{checkedEnviormentFactor.length}}</span>/<span>{{ enviormentList.length }}</span>)</span>
                        </div>
                        <el-checkbox
                          v-model="checkAllEnviorment"
                          :indeterminate="isIndeterminateEnviorment"
                          @change="checkAllEnviormentChange"
                        >
                          Check all factors
                        </el-checkbox>
                      </div>
                    </template>
                    <div class="card-content">
                      <el-checkbox-group
                        v-model="checkedEnviormentFactor"
                        @change="checkedEnviormentFactorChange"
                      >
                        <el-checkbox v-for="ele in enviormentList" :key="ele.name" :label="ele.name" :value="ele.id">
                          {{ ele.name }}
                        </el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item name="2">
                    <template #title>
                      <div class="w-280 flex ali-center just-sb">
                        <div class="flex ali-bl">
                          <h5>Human Factors</h5>
                          <span class="factor-selected">(<span class="pri">{{checkedHumanFactor.length}}</span>/<span>{{ humanList.length }}</span>)</span>
                        </div>  
                        <el-checkbox
                            v-model="checkAllHuman"
                            :indeterminate="isIndeterminateHuman"
                            @change="checkAllHumanChange"
                        >
                          Check all factors
                        </el-checkbox>
                      </div>
                    </template>
                    <div class="card-content">
                        <el-checkbox-group
                          v-model="checkedHumanFactor"
                          @change="checkedHumanFactorChange"
                        >
                          <el-checkbox v-for="ele in humanList" :key="ele.name" :label="ele.name" :value="ele.id">
                            {{ ele.name }}
                          </el-checkbox>
                        </el-checkbox-group>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item name="3">
                    <template #title>
                      <div class="flex ali-bl just-sb">
                        <h5>Time range of Data</h5>
                        <div class="description">(for training sets and model training)</div>
                      </div>
                    </template>
                    <el-descriptions
                      :column="1"
                      border
                      size="small"
                    >
                      <el-descriptions-item
                        v-for="item in timeOptions"
                        :key="item.name"
                        :label="item.name"
                      >
                        <el-date-picker
                          v-model="item.value"
                          type="yearrange"
                          unlink-panels
                          size="small"
                          :disabled-date="disabledDate"
                          :default-time="[new Date(1985, 1,1, 0,0,0), new Date(2018, 12, 31, 23, 59, 59)]"
                          range-separator="To"
                          start-placeholder="Start"
                          end-placeholder="End"
                          value-format="YYYY"
                        />                     
                      </el-descriptions-item>     
                    </el-descriptions>
                  </el-collapse-item>
                  <el-collapse-item name="4">
                    <template #title>
                      <div class="flex ali-bl just-sb">
                        <h5>Params</h5>
                      </div>
                    </template>
                    <el-descriptions
                      :column="2"
                      border
                      size="small"
                    >
                      <el-descriptions-item
                        v-for="item in XGBOptions"
                        :key="item.name"
                      >
                        <template #label>
                          <el-tooltip
                          effect="dark"
                          placement="top"
                        >
                          <template #content>
                            Name: {{ item.name }}<br />
                            Range: {{ item.min }} - {{ item.max }}<br />
                            Default: {{ item.default }}
                          </template>
                            <div class="xbg-item-label">
                              {{ item.name }}
                            </div>
                          </el-tooltip>
                        </template>
                        <div class="config-value">                       
                          <el-input-number
                            v-model="item.value"
                            controls-position="right"
                            :min="item.from"
                            :max="item.to"
                            :step="item.step"
                            size="small"
                          />
                        </div>                   
                      </el-descriptions-item>     
                    </el-descriptions>
                  </el-collapse-item>
                </el-collapse>
                <div class="footer-btn">
                  <el-button @click="handleStartTrain">Start Train</el-button>
                  <el-button type="primary" @click="handleNextClick">Next</el-button>
                </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="3">
            <template #label>
              <span class="custom-tabs-label">
                <div class="icon"><el-icon><TrendCharts /></el-icon></div>
                <div class="label"><span>Forcast</span></div>
              </span>
            </template>
            <div>
              <h5>Project Info</h5>
              <div class="gap-4 mb-4 ft-12">
                <span style="color: lightgray">Project Name: </span>
                <span>{{activeProjectInfo.name}}</span>
              </div>
              <div class="gap-4 mb-4 ft-12">
                <span style="color: lightgray">Create Time: </span>
                <span>{{activeProjectInfo.createdTime}}</span>
              </div>
              <div class="flex ali-center gap-4 mb-4">
                <el-button type="success" size="small" @click="getTrainingStatus">Check</el-button>
                <span class="ft-12"> - Click to check model building status</span>
              </div>
              <!-- <el-divider style="margin-bottom: 8px;"/> -->
              <el-descriptions
                :column="1"
                border
                size="small"
              >
                <el-descriptions-item
                  label="Training Status"
                  width="120"
                >
                  <span :style="{color: completeStatus.status === 'success' ? '#67c23a' : '#409EFF'}">{{completeStatus.status }}</span>
                </el-descriptions-item>
              </el-descriptions>
              <div>
                <h5>Training Precision</h5>
                <div>
                  <RadarChart ref="chart" height="240px" width="100%" :data="radarData" />
                </div>
              </div>
              <div class="footer-btn">
                <el-button size="small" @click="handleStartForcast">Start Forcast</el-button>
                <el-button type="primary" size="small" @click="handleNextClick">Next</el-button>
              </div>              
            </div>
          </el-tab-pane>
          <el-tab-pane name="4">
            <template #label>
              <span class="custom-tabs-label">
                <div class="icon"><el-icon><DataAnalysis /></el-icon></div>
                <div class="label"><span>Result</span></div>
              </span>
            </template>
            <div>
              <h5>Project Info</h5>
              <div class="gap-4 mb-4 ft-12">
                <span style="color: lightgray">Project Name: </span>
                <span>{{activeProjectInfo.projectName}}</span>
              </div>
              <div class="gap-4 mb-4 ft-12">
                <span style="color: lightgray">Create Time: </span>
                <span>{{activeProjectInfo.createdTime}}</span>
              </div>
              <div class="flex ali-center gap-4 mb-4">
                <el-button type="success" size="small" @click="getResult">Refresh</el-button>
                <span class="ft-12"> - Click to refresh result</span>
              </div>
              <el-divider />
              <ColorSampleTable :data="colorSampleTableData" style="margin-top: -20px;"/>
              <div class="layer-opacity">
                <span>Layer opacity:</span>
                <span>{{ layerOpacity }}</span>
                <el-slider
                  v-model="layerOpacity"
                  :step="0.1"
                  :min="0"
                  :max="1"
                  size="small"
                  style="width: 50%"
                  @input="(e) => changeLayerOpacity(e)"
                />
              </div>
              <div class="footer-btn">
                <el-button type="primary" size="small">Download Result</el-button>
              </div>  
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="zoom-tool">
        <el-button-group class="button-group">
          <el-button plain size="small" :icon="Plus" @click="zoomIn"/>
          <el-button plain size="small" @click="zoomOut"><el-icon><Minus class="rotate-90"/></el-icon></el-button>
        </el-button-group>
      </div>
    </div>
</template>

<style scoped lang="scss">
  #cesiumContainer {
    height: 100%;
    width: 100%;
    position: relative;
  }
  .custom-tabs-label {
    .icon {
      text-align: center;
      margin-top: 8px;
    }
    .label {
      font-size: 12px;
      margin-bottom: 8px;
    }
  }
    .sideBar {
      width: 368px;
      height: 100%;
    //   background-color: rgba(7, 20, 35, 0.7);
      position: absolute;
      top: 0px;
      left: 0px;
      transition: right 0.5s;
      background: rgba(11, 31, 56, 0.8);
      z-index: 100;
      transition: right 0.5s;
      border-radius: 8px;
    }
    .showBnt {
      position: absolute;
      top: 16px;
      left: 368px;
      width: 32px;
      height: 32px;
      z-index: 99;
      font-size: 20px;
      color: #f0f0f0;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
    }
    .controller-box-hide {
      left: -368px !important;
      transition: left 0.5s;
    }
    .controller-box-show {
      transition: left 0.5s;
    }

    .default-select {
      width: 320px;
    }
    .footer-btn {
      position: absolute;
      bottom: 0px;
      width: 100%;
      padding: 0px 16px;
      height: 60px;
      display: flex;
      justify-content: end;
      align-items: center;
      border-top: 1px solid lightgray;
      margin-left: -16px;
      background-color: #263467;
      z-index: 101;
    }
    .card-content {
      border: 1px dotted lightgray;
      border-radius: 8px;
      padding: 8px 12px;
      margin: 8px 0px;
      background:rgba(4, 15, 21, 0.4);;
    }
    .description {
      font-size: 10px;
      color: gray;
      margin: 4px 0px;
    }
    h5 {
      margin: 1vh 0px;
    }
    .zoom-tool {
      position: absolute;
      top: 40vh;
      right: 1vw;
      z-index: 100;
      .button-group {
        transform: rotate(90deg);
      }
      button {
        background: rgba(11, 31, 56);
        height: 24px;
        width: 24px;
        color: lightgray;
      }
    }
    .rotate-90 {
      transform: rotate(90deg);
    }
    .layer-opacity {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 16px;
      background: #203549;
      border-radius: 4px;
      margin-top: 8px;
      font-size: 12px;
    }
    .config-value {
      span {
        font-size: 12px;
      }
      .el-input-number--small {
        line-height: 16px;
        width: 72px;
      }
      .el-input-number.is-controls-right .el-input__wrapper {
        padding-right: 32px;
      }
    }
    .w-280 {
      width: 280px;
    }
    .factor-selected {
      font-size: 10px;
      margin-left: 8px;
      .gr {
        color: #67C23A;
      }
      .pri {
        color: #409EFF;
      }
    }
    :deep(.el-date-editor) {
      --el-date-editor-width: 220px;
      .el-range-separator {
        font-size: 11px;
        color: lightgray;
      }      
    }
    :deep(.el-range-editor--small .el-range-input) {
      font-size: 11px;
      color: lightgray;
    }
    :deep(.xbg-item-label) {
      width: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
</style>
