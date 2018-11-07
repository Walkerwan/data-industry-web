<template>
  <div class="customization">
    <div class="aside-tree-wrapper">
      <AsideTree></AsideTree>
    </div>
    <div class="content-area">
      <div class="combination-method-wrapper">
        <div class="flex-row combination-method title">
          <span class="bold combination-method-label">组合方式：</span>
          <span class="combination-expression">
            <span v-for="(crowd,index) in crowds">
              <span :class="crowd.groupName===currentCrowd.groupName?'group-text':''">(</span>
              <template v-for="(tag,tagIndex) in crowd.selectedTags">
                <span :class="crowd.groupName===currentCrowd.groupName?'crowdNode  group-text':'crowdNode'">{{crowd.groupName + (tagIndex+1)}}</span>
                <span :class="crowd.groupName===currentCrowd.groupName?'group-text':''"
                      v-if="tagIndex!==(crowd.selectedTags.length-1)">{{combinationMethodSign[crowd.insideRelationType]}}</span>
              </template>
              <span :class="crowd.groupName===currentCrowd.groupName?'group-text':''">)</span>
              <span v-if="index!==(crowds.length-1)">{{combinationMethodSign[crowd.outsideRelationType]}}</span>
            </span>
          </span>
          <div class="flex-empty"></div>
          <Button @click="modal = true" class="clearAll" :disabled="notEditable">
            <Icon type="ios-trash-outline" size="16"/>
            <span style="vertical-align: text-bottom">全部清除</span>
          </Button>
          <Modal
            v-model="modal"
            title="提示"
            @on-ok="ok"
          >
            <p>确认全部清除吗？</p>
          </Modal>
        </div>
        <div class="flex-row tabs-wrapper">
          <Icon class="tip-icon" custom="dubhe-iconfont dubhe-icon-tip"
                title="拖动人群组可进行排序"></Icon>
          <div class="flex-row tabs">
            <div v-for="(crowd, index) in crowds" :id="'crowd-group-tab-'+crowd.groupName" class="flex-row tab"
                 :class="crowd.groupName===currentCrowd.groupName?'selected':''" draggable="true"
                 @dragstart="tabDrag($event, index)" @drop="tabDrop($event, index)" @dragover="allowTabDrop($event)">
              <div @click="setCurrentCrowd(crowd.groupName)" class="crowd-group-name">{{'人群'+crowd.groupName}}
                <Icon @click.stop="deleteCrowd(crowd)" class="tab-close" type="md-close"
                      v-if="crowds.length>1&&!notEditable"/>
              </div>
              <Button type="primary" shape="circle" @click="changeCombinationMethodToPeer(index)"
                      class="crowd-group-operation" v-if="index<4" :disabled="notEditable">
                {{combinationMethodName[crowd.outsideRelationType]}}
              </Button>
            </div>
          </div>
          <Icon @click="addCrowd" class="add-icon" size=20 type="md-add" v-if="crowds.length<5&&!notEditable"></Icon>
        </div>
        <div class="flex-row tab-content">
          <div class="tag-table-wrapper">
            <div class="flex-row combination-method-in-group">
              <span class="bold">组内组合方式：</span>
              <Button size="small" @click="changeCombinationMethodInGroup('union')"
                      :type="currentCrowd.insideRelationType==='union'?'primary':'default'" :disabled="notEditable">并集
              </Button>
              <Button size="small" @click="changeCombinationMethodInGroup('intersaction')"
                      :type="currentCrowd.insideRelationType==='intersaction'?'primary':'default'"
                      :disabled="notEditable">交集
              </Button>
              <Button size="small" @click="changeCombinationMethodInGroup('difference')"
                      :type="currentCrowd.insideRelationType==='difference'?'primary':'default'"
                      :disabled="notEditable">差集
              </Button>
            </div>
            <div class="tag-table">
              <Row class="flex-row tag-table-header">
                <Col class="tag-table-col" span="3">编号</Col>
                <Col class="tag-table-col" span="15">标签</Col>
                <Col class="tag-table-col" span="6">人群规模</Col>
              </Row>
              <div class="tag-table-body">
                <div v-for="(tag,index) in currentCrowd.selectedTags" :id="'current-crowd-tag-'+index"
                     class="tag-table-body-row" draggable="true" @dragstart="tagDrag($event,index)"
                     @drop="tagDrop($event,index)" @dragover="allowTagDrop($event)"
                     :style="notEditable?'cursor: no-drop':'cursor: move'">
                  <Row class="dotted-line" type="flex" justify="start" align="middle">
                    <Col class="tag-table-col" span="3">{{index+1}}</Col>
                    <Col class="tag-table-col" span="15">
                      {{tag.indLabelName+(tag.indInvolvedGroupnamepath?("("+tag.indInvolvedGroupnamepath+")"):"")}}
                    </Col>
                    <Col class="tag-table-col" span="6">
                      <Row type="flex" justify="space-between">
                        <Col span="16">
                          {{percentile(tag.peoScaleNum)}}
                        </Col>
                        <Col span="6">
                          <Icon @click.stop="deleteTag(index)" class="row-delete" type="md-close-circle"
                                v-if="!notEditable"/>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-empty"></div>
          <div class="example">
            <div class="example-title">
              <span class="bold">示例：</span>
              <span>以人群A、人群B、人群C为例</span>
            </div>
            <div class="example-graph">
              <svg v-show="currentCrowd.insideRelationType==='intersaction'" xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink" t="1535195604497" class="icon" style=""
                   viewBox="0 0 1040 1024" version="1.1" p-id="2147" width="250" height="300">
                <defs>
                </defs>
                <path
                  d="M533.582651 458.79841a15.81529 15.81529 0 0 0-4.467996-0.496444h-7.092059v10.638088h7.588503a16.524496 16.524496 0 0 0 2.730442 0 7.092058 7.092058 0 0 0 2.340379-0.815587 4.467997 4.467997 0 0 0 1.524793-1.702094 5.425425 5.425425 0 0 0 0.602825-2.553141 4.999901 4.999901 0 0 0-0.886507-2.978665 4.574378 4.574378 0 0 0-2.34038-2.092157zM532.802525 445.926324a17.340083 17.340083 0 0 0-4.645298-0.425523h-6.06371v9.219676H528.58275a15.85075 15.85075 0 0 0 3.865172-0.354603 4.219775 4.219775 0 0 0 2.304919-1.524793 4.290695 4.290695 0 0 0 0.780126-2.659522 4.964441 4.964441 0 0 0-0.709206-2.659522 3.758791 3.758791 0 0 0-2.021236-1.595713z"
                  :fill="themeColors['--highlight-comp-bg-color']" p-id="2148"/>
                <path
                  d="M998.218854 176.108964A340.170579 340.170579 0 0 0 535.923031 42.955569c-5.141742 2.836823-10.177104 5.815488-15.177005 8.900533A340.206039 340.206039 0 1 0 189.936964 645.425926a340.170579 340.170579 0 1 0 675.128494-7.092059 340.135118 340.135118 0 0 0 133.153396-462.224903zM576.454144 104.479175h0.460984A332.830298 332.830298 0 0 1 674.572771 340.467417c0 10.283485-0.460984 20.389668-1.347491 30.42493-107.302843-40.424733-208.258293-40.531113-303.008193 11.560055a339.14223 339.14223 0 0 1-2.588601-41.984985 332.901219 332.901219 0 0 1 97.657643-235.917321 343.503846 343.503846 0 0 1 55.388976-44.821809 341.092546 341.092546 0 0 1 55.779039 44.750888z m-36.878703 354.602917a7.34028 7.34028 0 0 1 1.489332 4.609838 8.935994 8.935994 0 0 1-0.921968 3.971553 7.943105 7.943105 0 0 1-2.233998 2.836823 8.758692 8.758692 0 0 1-3.333268 1.489333 19.4677 19.4677 0 0 1-4.89352 0.531904H517.944663v-30.460391h11.418214a13.652212 13.652212 0 0 1 5.602726 0.921968 7.092058 7.092058 0 0 1 3.297807 2.836823 7.34028 7.34028 0 0 1 1.20565 4.007013 6.843836 6.843836 0 0 1-1.063809 3.54603 7.517582 7.517582 0 0 1-3.191426 2.801363 7.872185 7.872185 0 0 1 4.361616 2.765902z m138.295137-73.0482A333.326742 333.326742 0 0 1 857.867019 634.787838a333.752266 333.752266 0 0 1-331.057283-9.68066 340.418801 340.418801 0 0 0 150.919001-239.215128z m-104.324178 63.828525a6.524694 6.524694 0 0 0-5.035361 1.985776 7.694883 7.694883 0 0 0-1.843936 5.567266v17.730146h-5.212662v-18.120209a11.560055 11.560055 0 0 1 12.091959-12.269261 12.12742 12.12742 0 0 1 9.042374 3.085045 12.588404 12.588404 0 0 1 3.049586 9.184216v18.120209h-5.212663v-17.730146c-0.141841-5.141742-2.4113-7.659423-7.021138-7.659423z m37.481528 13.900434a8.54593 8.54593 0 0 0 3.54603 4.361616 9.893421 9.893421 0 0 0 5.177202 1.418412 8.616851 8.616851 0 0 0 5.744567-1.950317 10.106183 10.106183 0 0 0 3.191427-5.815487l4.007013 1.028348a13.33307 13.33307 0 0 1-4.538918 7.588503 12.588404 12.588404 0 0 1-8.049486 2.588601 14.6451 14.6451 0 0 1-8.014026-1.985776 12.872086 12.872086 0 0 1-4.716219-5.815488 20.921572 20.921572 0 0 1-1.595713-8.155867 17.730146 17.730146 0 0 1 1.808475-8.297709 12.269261 12.269261 0 0 1 5.177203-5.389964 14.999703 14.999703 0 0 1 7.37574-1.843935 12.411102 12.411102 0 0 1 7.694884 2.340379 11.914658 11.914658 0 0 1 4.361616 6.524694l-3.971553 0.957428a9.467898 9.467898 0 0 0-3.085045-4.85806 8.297708 8.297708 0 0 0-5.070822-1.524793 9.68066 9.68066 0 0 0-5.850948 1.702094 8.723232 8.723232 0 0 0-3.333268 4.503457 18.084749 18.084749 0 0 0-0.957428 5.850948 18.687574 18.687574 0 0 0 0.957428 6.666535z m-97.3385 161.911692a333.574964 333.574964 0 0 1-316.660406 15.886211 333.716805 333.716805 0 0 1 166.663372-247.867439c17.730146 105.033384 69.856775 179.429076 149.997034 231.981228z m-87.374159-153.294841l11.701896-30.460391h4.361616l12.446562 30.460391h-4.574377l-3.546029-9.255136h-12.730245l-3.333268 9.255136z m58.544941-22.623666a6.524694 6.524694 0 0 0-5.035361 1.985776 7.730344 7.730344 0 0 0-1.879395 5.567266v17.730146h-5.177203v-18.120209a11.772817 11.772817 0 0 1 3.546029-8.971454 12.021039 12.021039 0 0 1 8.652311-3.297807 12.12742 12.12742 0 0 1 9.042375 3.085045 12.588404 12.588404 0 0 1 3.049585 9.184216v18.120209h-5.212663v-17.730146c-0.106381-5.035361-2.269459-7.553042-6.985678-7.553042zM42.776753 190.399462a332.936679 332.936679 0 0 1 62.055511-85.920287h0.248222A333.823186 333.823186 0 0 1 514.965998 55.721274a340.808864 340.808864 0 0 0-153.897666 284.746143 336.199026 336.199026 0 0 0 2.624062 45.495554l-1.382952 0.744666v0.212762a340.170579 340.170579 0 0 0-171.663272 251.768071A333.716805 333.716805 0 0 1 42.776753 190.399462z m721.049572 729.524582a333.681345 333.681345 0 0 1-569.598666-235.917321 338.433024 338.433024 0 0 1 1.950316-35.460292 340.418801 340.418801 0 0 0 324.49713-19.50316 340.418801 340.418801 0 0 0 338.149342 12.836625 334.355091 334.355091 0 0 1-94.998122 278.044148z m100.317166-288.469473a340.844324 340.844324 0 0 0-185.350945-252.441817A369.779922 369.779922 0 0 0 681.062005 340.467417a339.248611 339.248611 0 0 0-99.67888-240.491699A343.184703 343.184703 0 0 0 526.809736 55.721274a332.546616 332.546616 0 0 1 174.003651-48.899742h0.212762a333.610425 333.610425 0 0 1 163.117342 624.633039z"
                  :fill="themeColors['--highlight-comp-bg-color']" p-id="2149"/>
                <path
                  d="M442.2724 451.422669c-0.992888-2.553141-1.702094-4.680759-2.163078-6.311931a38.580797 38.580797 0 0 1-1.666633 5.815487l-3.333268 8.935994h10.318945z"
                  :fill="themeColors['--highlight-comp-bg-color']" p-id="2150"/>
              </svg>
              <svg v-show="currentCrowd.insideRelationType==='difference'" xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink" t="1535195558637" class="icon" style=""
                   viewBox="0 0 1045 1024" version="1.1" p-id="2024" width="250" height="300">
                <defs>
                </defs>
                <path
                  d="M941.949708 100.652074a339.732256 339.732256 0 0 0-419.375926-48.014162A341.299484 341.299484 0 0 0 383.874117 3.590804C259.67131-14.681648 151.1764 38.532861 81.648474 123.412497a347.497157 347.497157 0 0 0-49.01149 78.361393C-20.577525 317.036374-13.525 459.511634 89.698326 567.970925q6.411387 7.123763 12.715917 13.285818a340.444632 340.444632 0 0 0 89.723794 64.541292 346.856019 346.856019 0 0 0-2.243985 38.503939 339.767875 339.767875 0 1 0 676.472531-45.592083 334.318196 334.318196 0 0 0 76.081788-57.595624 339.767875 339.767875 0 0 0-0.498663-480.462193zM125.281522 326.79593l-3.561882-9.260892h-12.787154l-3.348169 9.260892h-4.309877l11.754209-30.596562H117.552239l12.537823 30.596562zM174.542343 314.258107h-24.327651v-4.666065H174.542343z m235.084177-132.359516c2.422079-4.630446 5.057872-9.082798 7.693664-13.499531l0.60552-1.032946a10.400694 10.400694 0 0 0 1.389134-2.208366c24.398888-38.895746 58.486094-73.588471 103.294563-104.434365a326.909482 326.909482 0 0 1 55.494113 44.77285 331.860498 331.860498 0 0 1 97.595553 235.475985 350.809707 350.809707 0 0 1-1.81656 35.618815 340.765201 340.765201 0 0 0-301.513267 6.162055C366.883943 306.35073 378.210726 239.779165 409.62652 181.898591z m173.036203 399.215676a339.233592 339.233592 0 0 0 96.740701-194.799298 334.567528 334.567528 0 0 1 179.875015 248.619328 334.140102 334.140102 0 0 1-330.685077-9.688318 345.858692 345.858692 0 0 0 54.10498-44.131712z m-60.12456 40.28488a326.09025 326.09025 0 0 1-55.636588-44.950944 331.254978 331.254978 0 0 1-93.962434-186.322021 334.175721 334.175721 0 0 1 300.266609-6.838812 334.246958 334.246958 0 0 1-150.631968 238.111777zM363.891962 395.397767a16.135323 16.135323 0 0 1 2.849505-1.602847 342.61738 342.61738 0 0 0 149.599023 231.522297A334.353815 334.353815 0 0 1 199.475513 642.022441c9.474605-55.672208 28.032007-106.286543 57.666861-149.599022A333.641438 333.641438 0 0 1 294.185942 448.825989a327.693096 327.693096 0 0 1 69.70602-53.428222zM292.084431 302.788848a12.537823 12.537823 0 0 1 5.200347-5.414059 15.351709 15.351709 0 0 1 7.51557-1.709704 12.537823 12.537823 0 0 1 7.729283 2.350842A12.217253 12.217253 0 0 1 317.017602 304.605408l-3.989307 0.926089A9.474605 9.474605 0 0 0 309.893839 300.65172a8.370421 8.370421 0 0 0-5.164728-1.424753 9.830793 9.830793 0 0 0-5.912724 1.674084 8.975941 8.975941 0 0 0-3.170074 4.487971 19.661586 19.661586 0 0 0 0 12.680298 8.441659 8.441659 0 0 0 3.561881 4.345495 9.937649 9.937649 0 0 0 5.200347 1.424753 8.72661 8.72661 0 0 0 5.770248-1.959035 9.830793 9.830793 0 0 0 3.276931-5.805867l4.060545 1.032946a13.642006 13.642006 0 0 1-4.594827 7.586808 12.60906 12.60906 0 0 1-8.085471 2.635792 14.496858 14.496858 0 0 1-8.049852-2.030273A12.466585 12.466585 0 0 1 292.084431 319.458454a20.872625 20.872625 0 0 1-1.602846-8.192328A18.201214 18.201214 0 0 1 292.084431 302.788848z m-48.441588 6.803194h24.398888v4.666065H243.642843z m-45.734558-13.392674h11.469258a14.247526 14.247526 0 0 1 5.627773 0.926089 7.123763 7.123763 0 0 1 3.31255 2.849505 7.479951 7.479951 0 0 1 1.21104 4.060545 6.874431 6.874431 0 0 1-1.068565 3.561881 7.551189 7.551189 0 0 1-3.205693 2.813887 7.907377 7.907377 0 0 1 4.274258 2.778267 7.444332 7.444332 0 0 1 1.49599 4.630446 8.869085 8.869085 0 0 1-0.926089 3.989308 7.693664 7.693664 0 0 1-2.243986 2.849505 9.403367 9.403367 0 0 1-3.348168 1.531609 21.371289 21.371289 0 0 1-4.915397 0.498663h-11.682971z m331.931735 721.031668h-0.178094a333.249631 333.249631 0 0 1-333.107156-333.071537 349.741143 349.741143 0 0 1 1.81656-35.618815 340.480251 340.480251 0 0 0 324.131215-19.341017 340.836439 340.836439 0 0 0 337.737602 12.715917 354.051019 354.051019 0 0 1 2.635792 42.137058 333.142775 333.142775 0 0 1-333.035919 333.178394zM865.54735 631.728603a340.551488 340.551488 0 0 0-185.217837-252.252446 338.69931 338.69931 0 0 0-97.702409-278.645989 330.934408 330.934408 0 0 0-54.247455-44.131711A333.28525 333.28525 0 1 1 865.54735 631.728603z"
                  :fill="themeColors['--highlight-comp-bg-color']" p-id="2025"/>
                <path
                  d="M212.333905 323.055954a7.123763 7.123763 0 0 0 2.350842-0.854851 4.487971 4.487971 0 0 0 1.531609-1.602847 5.449679 5.449679 0 0 0 0.60552-2.564555 4.844159 4.844159 0 0 0-0.890471-2.956361 4.416733 4.416733 0 0 0-2.422079-1.780941 14.496858 14.496858 0 0 0-4.487971-0.534282h-7.123763v10.685644h7.622427a21.94119 21.94119 0 0 0 2.813886-0.391807zM212.440762 308.701572a4.238639 4.238639 0 0 0 2.315222-1.531609 4.309877 4.309877 0 0 0 0.783614-2.671411 5.164728 5.164728 0 0 0-0.712376-2.671412 3.775594 3.775594 0 0 0-2.10151-1.602846 17.4176 17.4176 0 0 0-4.666065-0.427426H201.96883v9.260892h6.589481a14.247526 14.247526 0 0 0 3.882451-0.356188zM115.094541 299.405061a38.610795 38.610795 0 0 1-1.638466 5.841486l-3.348168 8.975941h10.365075l-3.205694-8.477278c-0.961708-2.564555-1.674084-4.666065-2.172747-6.340149z"
                  :fill="themeColors['--highlight-comp-bg-color']" p-id="2026"/>
              </svg>
              <svg v-show="currentCrowd.insideRelationType==='union'" xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink" t="1535195485534" class="icon" style=""
                   viewBox="0 0 1041 1024" version="1.1" p-id="1901" width="250" height="300">
                <defs>
                </defs>
                <path
                  d="M518.426386 452.264288a4.246445 4.246445 0 0 0 2.319487-1.53443 4.317814 4.317814 0 0 0 0.785058-2.676331 4.995818 4.995818 0 0 0-0.713689-2.676332 3.568442 3.568442 0 0 0-2.10538-1.605798 17.342626 17.342626 0 0 0-4.638974-0.428213h-6.13772v9.277948h6.637301a15.843881 15.843881 0 0 0 3.853917-0.356844zM519.496919 456.72484a15.91525 15.91525 0 0 0-4.496237-0.499582h-7.136883v10.705325h7.636465a16.628938 16.628938 0 0 0 2.7477 0 7.136883 7.136883 0 0 0 2.355172-0.820742 4.496236 4.496236 0 0 0 1.53443-1.712852 5.459716 5.459716 0 0 0 0.606635-2.569278 5.031503 5.031503 0 0 0-0.892111-2.997491 4.60329 4.60329 0 0 0-2.355171-2.10538zM425.432798 442.950655a43.320881 43.320881 0 0 1-1.641483 5.852244l-3.568441 8.992473h10.384165l-3.175913-8.492891c-0.820742-2.390856-1.53443-4.710343-1.998328-6.351826z"
                  :fill="themeColors['--highlight-comp-bg-color']" p-id="1902"/>
                <path
                  d="M988.67562 159.43797a339.001951 339.001951 0 0 0-467.465849-106.517981c-5.4954-3.568442-11.062169-6.70867-16.771676-9.813215a339.001951 339.001951 0 1 0-326.119877 594.395317 350.884862 350.884862 0 0 0-3.354335 47.745748 344.104823 344.104823 0 0 0 2.42654 40.216337 339.001951 339.001951 0 0 0 673.150823-81.003624 338.752161 338.752161 0 0 0 138.134374-485.022582z m-553.108447 310.954001l-3.568442-9.313633h-12.84639l-3.354335 9.313633h-4.317814L423.398787 439.774742h4.389183l12.52523 30.652913z m46.996375-9.706161a12.667968 12.667968 0 0 1-3.068859 9.242264 12.20407 12.20407 0 0 1-9.099526 3.104544 12.097017 12.097017 0 0 1-8.706998-3.318651 11.847226 11.847226 0 0 1-3.568442-9.028157v-18.234737h5.209925v17.842208a7.92194 7.92194 0 0 0 1.891274 5.638138 6.672986 6.672986 0 0 0 5.067187 1.962643c4.60329 0 6.922777-2.533594 6.922777-7.600781v-17.842208h5.245609z m43.463619 4.817396a7.993309 7.993309 0 0 1-2.248118 2.854753 8.814051 8.814051 0 0 1-3.354335 1.498746 19.412322 19.412322 0 0 1-4.92445 0.535266h-11.704488V439.774742h11.490382a13.7385 13.7385 0 0 1 5.638138 0.927795 7.136883 7.136883 0 0 1 3.31865 2.854753 7.386674 7.386674 0 0 1 1.21327 4.032339 6.887092 6.887092 0 0 1-1.070532 3.568442 7.565096 7.565096 0 0 1-3.211598 2.819069 7.92194 7.92194 0 0 1 4.28213 2.783384 7.386674 7.386674 0 0 1 1.498746 4.638974 8.992473 8.992473 0 0 1-0.856426 4.103708z m45.640368-4.817396a12.667968 12.667968 0 0 1-3.06886 9.242264 12.20407 12.20407 0 0 1-9.099526 3.104544 11.63312 11.63312 0 0 1-12.168386-12.346808v-18.234737h5.245609v17.842208a7.886256 7.886256 0 0 0 1.85559 5.638138 6.744355 6.744355 0 0 0 5.067187 1.962643c4.638974 0 6.922777-2.533594 6.922777-7.600781v-17.842208h5.245609z m42.821299 7.60078a12.667968 12.667968 0 0 1-8.100362 2.604963 14.737664 14.737664 0 0 1-8.064678-1.998327 12.667968 12.667968 0 0 1-4.710343-5.852245 20.44717 20.44717 0 0 1-1.641483-8.207415 17.842208 17.842208 0 0 1 1.819905-8.350154 12.560914 12.560914 0 0 1 5.209925-5.424031 15.130192 15.130192 0 0 1 7.458043-1.85559 12.382492 12.382492 0 0 1 7.707833 2.355172 11.989964 11.989964 0 0 1 4.389184 6.565932l-3.996655 0.96348a9.527739 9.527739 0 0 0-3.104544-4.888765 8.350153 8.350153 0 0 0-5.102872-1.53443 9.741846 9.741846 0 0 0-5.887928 1.712852 8.778366 8.778366 0 0 0-3.354335 4.531921 18.199052 18.199052 0 0 0-0.96348 5.887928 18.805687 18.805687 0 0 0 1.141902 6.815724 8.635629 8.635629 0 0 0 3.568441 4.389183 9.741846 9.741846 0 0 0 5.174241 1.427376 8.671313 8.671313 0 0 0 5.780875-1.962642 10.170059 10.170059 0 0 0 3.211597-5.852245l4.032339 1.034848a13.41734 13.41734 0 0 1-4.567605 7.67215z"
                  :fill="themeColors['--highlight-comp-bg-color']" p-id="1903"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="form-area flex-row">
        <div class="form">
          <Form :model="form" :rules="rules" ref="formCom" style="width: 400px;" :label-width="100"
                @submit.native.prevent>
            <FormItem style="margin-bottom: 12px;" label="规则有效期：">
              <RadioGroup v-model="form.validityPeriod">
                <Radio label="1" :disabled="notEditable">仅一次有效</Radio>
                <Radio label="2" :disabled="notEditable">1个月</Radio>
                <Radio label="3" :disabled="notEditable">2个月</Radio>
                <Radio label="4" :disabled="notEditable">3个月</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="人群名称：" prop="customizedCrowdName">
              <Input class="crowd-name-input" v-model="form.customizedCrowdName" placeholder="请输入人群名称"
                     :disabled="notEditable"/>
            </FormItem>
          </Form>
        </div>
        <div class="buttons">
          <Button type="primary" html-type='submit' @click.stop="submitComstomization" :disabled="notEditable">提交
          </Button>
          <Button @click="goBack" :disabled="notEditable">取消</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import _ from "lodash";
  import AsideTree from "../components/crowdCustomization/AsideTree";
  import {PEOPLERULE_API} from "../constants";
  import axios from "../utils/axios";

  function transferDataProperty(source = {}) {
    const newArr = _.cloneDeep(source.selectedTags);
    source.selectedTags && delete source["selectedTags"];
    source.peopleRules = [];
    source.insideRelationType = combinationMethodValue[source.insideRelationType];
    source.outsideRelationType =
      combinationMethodValue[source.outsideRelationType];
    newArr.forEach(item => {
      source.peopleRules.push({
        peopleCode: item.peopleCode,
        peopleId: item.peopleId,
        peopleName: item.peopleName,
      });
    });
  }

  const combinationMethodValue = {
    union: "1",
    intersaction: "3",
    difference: "2"
  };

  export default {
    data() {
      const checkName = (rule, value, callback) => {
        if (this.historyPeopleName.length > 0 && value === this.historyPeopleName) {
          callback();
        }
        try {
          axios.get(PEOPLERULE_API.CHECK_NAME, {peopleName: value}).then(res => {
            if (res.data.duplicate) {
              callback(true);
            }
            callback();
          });
        } catch (e) {
          callback(new Error('校验异常'));
        }
      };
      return {
        modal: false,
        notEditable: false,
        form: {
          validityPeriod: "1",
          customizedCrowdName: this.getCustomizedCrowdName()
        },
        rules: {
          validityPeriod: [
            {
              required: true
            }
          ],
          customizedCrowdName: [
            {
              required: true,
              message: "请输入人群名称",
              trigger: "blur"
            },
            {
              trigger: "blur",
              validator: checkName,
              message: '名字重复'
            },
            {
              type: 'string', max: 20, message: '不能大于20个字', trigger: 'change'
            }
          ]
        },
        combinationMethodSign: {
          union: "∪",
          intersaction: "∩",
          difference: "-"
        },
        combinationMethodName: {
          union: "并集",
          intersaction: "交集",
          difference: "差集"
        }
      };
    },
    computed: {
      currentCrowd() {
        return this.$store.getters["crowdEdit/getCurrentCrowd"];
      },
      crowds() {
        return this.$store.getters["crowdEdit/getCrowds"];
      },
      themeColors() {
        return this.$store.getters["getThemeColors"];
      },
      currentIndustry() {
        return this.$store.getters["crowdEdit/getCurrentIndustry"];
      },
      peopleId() {
        return this.$store.getters["crowdEdit/getPeopleId"];
      },
      historyPeopleName() {
        return this.$store.getters["crowdEdit/getHistoryPeopleName"]
      }
    },
    components: {
      AsideTree
    },
    methods: {
      preventEnter() {
        return false;
      },
      percentile(str) {
        str = str === null || typeof str === 'undefined' ? 0 : str;
        const sdt = String(str);
        let re = /(?=(?!\b)(\d{3})+$)/g;
        return sdt.replace(re, ',');
      },
      ok() {
        this.$store.commit("crowdEdit/clearCustomization");
      },
      submitComstomization() {
        this.$Message.destroy()
        if (this.checkEmpty(this.crowds)) {
          this.$Message.error('组合没有勾选标签');
          this.valid = false;
          return;
        }
        let action = this.$route.query.id
          ? "updateCrowdRule"
          : "createPeopleRule";
        let newObj = {},
          _this = this;
        const data = _.cloneDeep(_this.crowds);
        for (let item of data) {
          transferDataProperty(item);
        }
        newObj.groupRelations = data;
        this.$refs.formCom.validate(valid => {
          console.log("valid", valid);
          if (valid) {
            newObj.peopleId = this.peopleId;
            newObj.peopleName = _this.form.customizedCrowdName;
            newObj.ruleValidType = _this.form.validityPeriod;
            newObj.peopleType = "4";
            newObj.industryCode =
              _this.currentIndustry && _this.currentIndustry.indCode;
            _this.$store
              .dispatch({type: `crowdEdit/${action}`, payload: {...newObj}})
              .then(res => {
                _this.$Message.success("提交成功！");
                _this.$router.push({path: "/crowdManage"});
              });
          } else {
            _this.$Message.error("提交失败！");
          }
        });
      },
      goBack() {
        this.$router.back(-1);
      },
      deleteTag(index) {
        this.$store.commit("crowdEdit/deleteTag", index);
      },
      getCustomizedCrowdName() {
        return (
          new Date().format("yyyyMMdd") +
          "_" +
          Math.floor(Math.random() * 9000 + 1000)
        );
      },

      clearAll() {
        this.$store.commit("crowdEdit/clearCustomization");
      },
      deleteCrowd(crowd) {
        this.$store.commit("crowdEdit/deleteCrowd", crowd);
      },
      addCrowd() {
        if (this.crowds.length === 5) {
          return;
        }
        const maxCharCode = this.getMaxCharCode();
        if (maxCharCode === 90) {
          return;
        }
        this.$store.commit(
          "crowdEdit/addCrowd",
          String.fromCharCode(maxCharCode + 1)
        );
      },
      getMaxCharCode() {
        let maxCharCode = 65;
        for (let crowd of this.crowds) {
          const charCode = crowd.groupName.charCodeAt();
          if (charCode > maxCharCode) {
            maxCharCode = charCode;
          }
        }
        return maxCharCode;
      },
      setCurrentCrowd(groupName) {
        this.$store.commit("crowdEdit/setCurrentCrowd", groupName);
      },
      changeCombinationMethodToPeer(index) {
        this.$store.commit("crowdEdit/changeCombinationMethodToPeer", index);
      },
      changeCombinationMethodInGroup(insideRelationType) {
        this.$store.commit(
          "crowdEdit/changeCombinationMethodInGroup",
          insideRelationType
        );
      },
      allowTagDrop(e) {
        e.preventDefault();
        if (
          e.dataTransfer.types &&
          e.dataTransfer.types.indexOf("draggedtagindex") === -1 || this.notEditable
        ) {
          return false;
        }
        return true;
      },
      tagDrag(e, index) {
        if (this.notEditable) return;
        e.dataTransfer.setData("draggedtagindex", index);
      },
      tagDrop(e, index) {
        e.preventDefault();
        const transferData = e.dataTransfer.getData("draggedtagindex");
        if (!transferData || transferData === "") {
          return;
        }
        const draggedTagIndex = Number(transferData);
        const newSelectedTags = this.newArrayAfterDragDrop(
          draggedTagIndex,
          index,
          this.currentCrowd.selectedTags
        );
        if (newSelectedTags) {
          this.$store.commit("crowdEdit/setNewSelectedTags", newSelectedTags);
        }
      },
      allowTabDrop(e) {
        const types = e.dataTransfer.types;
        e.preventDefault();
        if (
          e.dataTransfer.types &&
          e.dataTransfer.types.indexOf("draggedtabindex") === -1 || this.notEditable
        ) {
          return false;
        }
        return true;
      },
      tabDrag(e, index) {
        if (this.notEditable) return;
        e.dataTransfer.setData("draggedtabindex", index);
      },
      tabDrop(e, index) {
        e.preventDefault();
        const transferData = e.dataTransfer.getData("draggedtabindex");
        if (!transferData || transferData === "") {
          return;
        }
        const draggedTabIndex = Number(transferData);
        const newCrowds = this.newArrayAfterDragDrop(
          draggedTabIndex,
          index,
          this.crowds
        );
        if (newCrowds) {
          this.$store.commit("crowdEdit/setCrowds", newCrowds);
        }
      },
      newArrayAfterDragDrop(draggedIndex, droppedIndex, objArr) {
        if (droppedIndex === draggedIndex) {
          return null;
        }
        const rawDraggedItem = objArr[draggedIndex];
        if (droppedIndex < draggedIndex) {
          const objArr1 = objArr.slice(0, droppedIndex);//2
          const objArr2 = objArr.slice(droppedIndex, draggedIndex);//0
          const objArr3 = objArr.slice(draggedIndex + 1, objArr.length);//8
          const newObjArr = [];
          newObjArr.push(...objArr1);
          newObjArr.push(rawDraggedItem);
          newObjArr.push(...objArr2);
          newObjArr.push(...objArr3);
          return newObjArr;
        }
        if (droppedIndex > draggedIndex) {
          const objArr1 = objArr.slice(0, draggedIndex);
          const objArr2 = objArr.slice(draggedIndex + 1, droppedIndex + 1);
          const objArr3 = objArr.slice(droppedIndex + 1, objArr.length);
          const newObjArr = [];
          newObjArr.push(...objArr1);
          newObjArr.push(...objArr2);
          newObjArr.push(rawDraggedItem);
          newObjArr.push(...objArr3);
          return newObjArr;
        }
      },
      getIndustris() {
        let _this = this;
        this.$store
          .dispatch({type: "crowdEdit/getIndustriesData"})
          .then(res => {
            _this.$store.dispatch({
              type: "crowdEdit/getDataByIndustryId",
              payload: {industryCode: res && res[0] && res[0].indCode}
            });
          });
      },
      checkEmpty(crowds) {
        return crowds.some(item => item.selectedTags.length === 0);
      }
    },
    created() {
      console.log("created-Custom2", this.$route.query);
      const query = this.$route.query;
      this.clearAll();
      if (query.id) {
        this.$store
          .dispatch({
            type: "crowdEdit/getCrowdsByPeopleId",
            payload: {peopleRuleId: query.id}
          })
          .then(res => {
            this.form.validityPeriod = String(res.ruleValidType);
            this.form.customizedCrowdName = res.peopleName;
          });
        typeof query.notEditable === 'boolean' ? this.notEditable = query.notEditable : this.notEditable = query.notEditable === 'true'
      } else {
        this.getIndustris();
      }
    }
  };
</script>
<style lang='less' scoped>
  .customization {
    display: flex;
    flex-direction: row;
    margin: 0 20px;
  }

  .aside-tree-wrapper {
    width: 300px;
    border-radius: 6px;
    height: 750px;
    overflow-y: hidden;
    background: var(--left-menu-bg-color);
  }

  .content-area {
    margin-left: 20px;
    width: calc(100% - 250px);
    height: auto;
    min-width: 1150px;
    border-radius: 6px;
    color: var(--default-font-color);
  }

  .content-area .combination-method-wrapper {
    height: auto;
  }

  .content-area .combination-method-wrapper .crowdNode {
    // color: @primary-color;
  }

  .content-area .form-area {
    width: 100%;
    height: 100px;
    padding-top: 20px;
  }

  .content-area .title {
    min-height: 34px;
    align-items: start;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .content-area .flex-row {
    font-size: 14px;
  }

  .content-area .tabs-wrapper {
    /*padding-left: 17px;*/
  }

  .content-area .tab-content {
    padding-top: 20px;
    height: calc(100% - 100px);
    align-items: flex-start;
  }

  .content-area .bold {
    font-size: 14px;
    color: var(--default-font-color);
  }

  .content-area .title .clearAll {
    font-size: 14px;
    height: 32px;
  }

  .content-area .example {
    margin-top: 49px;
    width: 400px;
    padding: 10px;
    height: calc(100% + 50px);
    border: 1px dashed var(--default-border-color);
  }

  .example-title span {
    font-size: 12px;
    color: var(--gray-font-color);
  }

  .content-area .group-text {
    color: var(--highlight-font-color);
  }

  .content-area .example .example-graph {
    margin: 50px;
    color: var(--highlight-comp-bg-color);
  }

  .content-area button {
    margin-right: 10px;
  }

  .content-area .combination-method {
  }

  .content-area .combination-method .combination-method-label {
    width: 70px;
    white-space: nowrap;
  }

  .content-area .combination-expression {
    max-width: calc(100% - 160px);
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
    padding-bottom: 5px;
  }

  .content-area .combination-method .combination-expression span {
    margin-right: 5px;
  }

  .content-area .combination-method-in-group {
  }

  .content-area .tabs-wrapper {
    margin-top: 5px;
    height: 28px;
  }

  .content-area .tabs-wrapper .tip-icon {
    margin-right: 10px;
  }

  .content-area .tabs-wrapper .add-icon {
    cursor: pointer;
  }

  .content-area .tabs-wrapper .tab .crowd-group-name {
    width: 100px;
    text-align: center;
    border-radius: 6px;
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    position: relative;
    border: 1px solid var(--default-border-color);
  }

  .content-area .tabs-wrapper .tab .crowd-group-name .tab-close {
    right: 5px;
    position: absolute;
    top: 7px;
    opacity: 0;
  }

  .content-area .tabs-wrapper .tab .crowd-group-name:hover .tab-close {
    opacity: 1;
  }

  .content-area .tabs-wrapper .tab.selected .crowd-group-name {
    background-color: var(--highlight-comp-bg-color);
    color: var(--default-font-color);
  }

  .content-area .tabs-wrapper .tab .crowd-group-operation {
    margin-left: 6px;
    margin-right: 6px;
    color: var(--highlight-font-color);
    background-color: var(--default-status-bar-tab-bg-color);
  }

  .content-area .tag-table-wrapper {
    width: calc(100% - 400px);
    height: auto;
  }

  .content-area .tag-table {
    margin-right: 20px;
    margin-top: 20px;
  }

  .content-area .tag-table .tag-table-body {
    color: var(--gray-font-color);
    height: 500px;
    overflow-y: auto;
  }

  .content-area .tag-table .tag-table-col {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .content-area .tag-table .tag-table-header {
    background-color: var(--table-header-bg-color);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .content-area .tag-table .tag-table-header,
  .content-area .tag-table .tag-table-body-row {
    box-sizing: border-box;
    height: 50px;
    border-bottom: 1px solid var(--default-border-color);
    line-height: 45px;
    padding: 1px 0;
  }

  .content-area .tag-table .tag-table-header,
  .content-area .tag-table .tag-table-body-row {
    position: relative;
  }

  .content-area .tag-table .tag-table-header {
    padding-left: 10px;
  }

  .content-area .tag-table .tag-table-body-row {
    cursor: move;

  }

  .content-area .tag-table .tag-table-body-row:hover {
    background-color: var(--table-hover-bg-color);
  }

  .dotted-line {
    padding-left: 10px;
  }

  .dotted-line:hover {
    border-bottom: 1px dotted var(--default-border-color);
    border-top: 1px dotted var(--default-border-color);
  }

  .content-area .tag-table .tag-table-body-row .row-delete {
    color: var(--highlight-comp-bg-color);
    cursor: pointer;
    opacity: 0;
    width: 20px;
    height: 20px;
  }

  .content-area .tag-table .tag-table-body-row:hover .row-delete {
    opacity: 1;
  }

  .content-area .form-area .crowd-name-input {
    width: 300px;
  }

  .content-area .form-area .form {
    margin-left: 86px;
  }

  .content-area .form-area .buttons {
    margin-bottom: -20px;
    margin-left: 25px;
  }
</style>


