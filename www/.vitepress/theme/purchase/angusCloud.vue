<script lang="ts" setup>
import { ref, watch, computed, onMounted } from 'vue';
import { Alert, Button, Checkbox, Select, Radio, Popover, InputNumber } from 'ant-design-vue';
import { GM, ESS, PUB_ESS } from '@xcan-angus/tools';


import { getSpecInfo } from './pricing';
import http from '@/utils/http';
import { round } from '@/utils/math';
import { maxVersion } from '@/utils/version';
// import InputNumber from '@/components/InputNumber/index.vue';
import { getUrl } from '@/utils/site';

const goodsInfo = ref();

onMounted(() => {

});

</script>
<template>
  <div class="purchase-outer-container">
    <div class="purchase-top-container">
      <div class="purchase-top-bg">
        云服务版购买
      </div>
    </div>
    <div class="purchase-form-container">
      <div style="margin-bottom: 0;" class="form-row">
        <div class="form-row-label">
          产品名称<em>:</em>
        </div>
        <div class="form-row-value">
          {{ goodsInfo && goodsInfo.name }}
        </div>
      </div>
      <div style="margin-bottom: 12px;" class="form-row">
        <div class="form-row-label">
          版本类型<em>:</em>
        </div>
        <div class="form-row-value">
          云服务版
        </div>
      </div>

      <div class="form-row items-start mb-4.5">
        <div class="form-row-label">
          <span>并发数</span>
          <em>:</em>
          <Popover>
            <template #content>
              <div style="width: 240px;" class="leading-5">
                单个测试任务最大虚拟用户数。
              </div>
            </template>
            <Icon
              style="margin-left: 2px; color: rgba(179, 215, 255, 100%);"
              type="icon-shuoming"
              class="mr-1 cursor-pointer text-3"
            />
          </Popover>
        </div>
        <div class="form-row-value">
          <InputNumber
            v-model="concurrencyNum"
            :step="5000"
            :min="concurrencyInfo.realmin"
            :max="concurrencyInfo.realmax"
            class="h-9 w-45"
          />
          <div class="tip">
            <span v-if="concurrencyInfo.max > 0" style="margin-right: 4px;">
              <span>输入范围</span>
              <em>:</em>
              <span>{{ transformNumber(concurrencyInfo.min) }}</span>
              <em>~</em>
              <span>{{ transformNumber(concurrencyInfo.max) }}</span>
            </span>
            <span>
              <span>您已有</span>
              <em style="color: #ff9828; font-weight: 600;">{{ transformNumber(concurrencyInfo.usedNum) }}</em>
              <span>个并发数，还可以购买</span>
              <em style="color: #ff9828; font-weight: 600;">{{ transformNumber(concurrencyInfo.diffValue) }}</em>
              <span>个。</span>
            </span>
          </div>
        </div>
      </div>

      <div class="form-row items-start mb-4.5">
        <div class="form-row-label">
          <span>并发任务数</span>
          <em>:</em>
          <Popover>
            <template #content>
              <div style="width: 240px;" class="leading-5">
                可同时执行测试的任务数。
              </div>
            </template>
            <Icon
              style="margin-left: 2px; color: rgba(179, 215, 255, 100%);"
              type="icon-shuoming"
              class="mr-1 cursor-pointer text-3"
            />
          </Popover>
        </div>
        <div class="form-row-value">
          <InputNumber
            v-model="taskNum"
            :error="taskInputError"
            :step="1"
            :min="taskInfo.realmin"
            :max="taskInfo.realmax"
            class="h-9 w-45"
          />
          <div v-if="!taskInputError" class="tip">
            <span v-if="taskInfo.max > 0" style="margin-right: 4px;">
              <span>输入范围</span>
              <em>:</em>
              <span>{{ transformNumber(taskInfo.min) }}</span>
              <em>~</em>
              <span>{{ transformNumber(taskInfo.max) }}</span>
            </span>
            <span style="margin-right: 4px;">并发任务数不能小于节点配额。</span>
            <span v-if="+nodeNum > +taskNum">
              <span>当前节点配额至少需要</span>
              <em style="color: #ff9828; font-weight: 600;">{{ nodeNum }}</em>
              <span>个并发任务数。</span>
            </span>
            <template v-else>
              <span>
                <span>您已有</span>
                <em style="color: #ff9828; font-weight: 600;">{{ transformNumber(taskInfo.usedNum) }}</em>
                <span>个并发任务数，还可以购买</span>
                <em style="color: #ff9828; font-weight: 600;">{{ transformNumber(taskInfo.diffValue) }}</em>
                <span>个。</span>
              </span>
            </template>
          </div>

          <div v-else class="tip" style="color: rgba(245, 34, 45, 100%);">
            <span>当前节点配额至少需要</span>
            <em style="font-weight: 600;">{{ nodeNum }}</em>
            <span>个并发任务数。</span>
          </div>
        </div>
      </div>

      <div class="form-row items-start mb-2">
        <div class="form-row-label">
          <span>节点配额</span>
          <em>:</em>
          <Popover>
            <template #content>
              <div style="width: 240px;" class="leading-5">
                节点数越多支持的测试并发数和并发任务数越多。
              </div>
            </template>
            <Icon
              style="margin-left: 2px; color: rgba(179, 215, 255, 100%);"
              type="icon-shuoming"
              class="mr-1 cursor-pointer text-3"
            />
          </Popover>
        </div>
        <div class="form-row-value">
          <InputNumber
            v-model="nodeNum"
            :error="nodeInputError"
            :step="1"
            :min="nodeInfo.realmin"
            :max="nodeInfo.realmax"
            class="h-9 w-45"
          />
          <div v-if="!nodeInputError" class="tip">
            <span v-if="nodeInfo.max > 0" style="margin-right: 4px;">
              <span>输入范围</span>
              <em>:</em>
              <span>{{ transformNumber(nodeInfo.min) }}</span>
              <em>~</em>
              <span>{{ transformNumber(nodeInfo.max) }}</span>
            </span>
            <span style="margin-right: 4px;">每个节点可支持1万并发数。</span>
            <span v-if="minNodeLimit > +nodeNum">
              <span>当前并发数至少需要</span>
              <em style="color: #ff9828; font-weight: 600;">{{ minNodeLimit }}</em>
              <span>个节点才可满足测试需求。</span>
            </span>
            <template v-else>
              <span>
                <span>您已有</span>
                <em style="color: #ff9828; font-weight: 600;">{{ transformNumber(nodeInfo.usedNum) }}</em>
                <span>个节点配额，还可以购买</span>
                <em style="color: #ff9828; font-weight: 600;">{{ transformNumber(nodeInfo.diffValue) }}</em>
                <span>个。</span>
              </span>
            </template>
          </div>
          <div v-else class="tip" style="color: rgba(245, 34, 45, 100%);">
            <template v-if="nodeErrorType === 1">
              <span>当前并发数至少需要</span>
              <em style="font-weight: 600;">{{ minNodeLimit }}</em>
              <span>个节点才可满足测试需求。</span>
            </template>
            <template v-else-if="nodeErrorType === 2">
              <span>节点配额必须大于等于购买节点数，当前购买节点数为</span>
              <em style="font-weight: 600;">{{ nodeSpecNum }}</em>
              <span>个。</span>
            </template>
          </div>
        </div>
      </div>

      <div style="align-items: flex-start; margin-bottom: 26px;" class="form-row">
        <div class="form-row-label">
          <span>购买节点</span><em>:</em>
        </div>
        <div style="transform: translateY(8px);" class="form-row-value">
          <RadioGroup v-model="nodeSource">
            <Radio style="margin-right: 40px;" :value="1">
              在线购买节点
            </Radio>
            <Radio :value="0">
              自有节点
            </Radio>
          </RadioGroup>
          <div v-if="nodeSource" class="flex flex-col flex-wrap">
            <div class="row-value-label">
              <span>选择压测节点配置</span>
              <em>:</em>
            </div>
            <div class="table-header">
              <div class="table-col">
                节点规格
              </div>
              <div class="table-col">
                系统盘
              </div>
              <div class="table-col">
                带宽
              </div>
              <div class="table-col">
                数量
              </div>
            </div>
            <div class="table-body">
              <div class="table-col">
                <Select v-model="selectNode" :options="nodeOptions" :get-popup-container="getPopupContainer" />
              </div>
              <div class="table-col">
                {{ systemDiskNum }}G
              </div>
              <div class="table-col">
                {{ bandwidthNum }}Mbps
              </div>
              <div class="table-col">
                <InputNumber v-model="nodeSpecNum" :min="nodeSpecMin" :max="nodeSpecMax" :maxlength="5" size="small" />
              </div>
            </div>
          </div>
          <div class="tip-container">
            <div class="tip-row">
              <em>1.</em>
              <span>“自有节点”目前只支持CentOS7.x和CentOS8.x。</span>
            </div>
            <div class="tip-row">
              <em>2.</em>
              <span>“在线购买节点”只支持外网压测，“自有节点”既可以外网压测也可以内网压测（内网压测时自有节点必须和应用在同一局域网）。</span>
            </div>
            <div class="tip-row">
              <em>3.</em>
              <span>下单成功后，可以在应用</span>
              <a :href="nodeHref" target="_blank">“AngusTester”-“节点”</a>
              <span>中看到购买的节点，对于“自有节点”您可以将自己的闲置服务器直接添加到“节点”中。</span>
            </div>
            <div class="tip-row">
              <em>4.</em>
              <span>购买节点数不能大于节点配额。</span>
            </div>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-row-label">
          <span>选择时长</span>
          <em>:</em>
        </div>
        <div class="form-row-value">
          <Select v-model="duration" class="w-45" :get-popup-container="getPopupContainer">
            <SelectOption v-for="item in timeOptions" :key="item.value" :value="item.value">
              <div :title="item.label" class="flex items-center w-full">
                <span>{{ item.label }}</span>
                <span v-if="item.discount" style="margin-left: 10px; color: #ff9828;">{{ item.discount }}折</span>
              </div>
            </SelectOption>
          </Select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-row-label">
          <span>选择优惠</span>
          <em>:</em>
        </div>
        <div class="form-row-value">
          <Select
            v-model="couponId"
            allow-clear
            style="width: 318px;"
            :placeholder="couponPlaceholder"
            :get-popup-container="getPopupContainer"
          >
            <template #notFoundContent>
              <div class="flex justify-center">
                无可用优惠券
              </div>
            </template>
            <SelectOption v-for="item in couponList" :key="item.value" :value="item.value">
              <div :title="item.label" class="flex items-center justify-between whitespace-no-wrap w-full">
                <span class="flex-1 truncate">{{ item.label }}</span>
                <span style="margin-left: 10px;" class="flex-shrink-0">
                  <span>减</span>
                  <em style="color: #ff9828;">{{ round(item.discountAmount) }}</em>
                  <span>元</span>
                </span>
              </div>
            </SelectOption>
          </Select>
        </div>
      </div>
    </div>

    <div class="purchase-footer-container">
      <Alert
        v-if="errorMessage"
        show-icon
        message="提交订单失败"
        :description="errorMessage"
        type="error"
        closable
        class="custom-alert"
        @close="onClose"
      />
      <div class="box-shadow" />
      <div class="inner-footer-container">
        <div class="inner-footer-row">
          <div class="inner-footer-col">
            <div class="col-label">
              原价<em>:</em>
            </div>
            <div class="col-value">
              <em class="small-money-symbol">￥</em><em>{{ totalAmount }}</em><em class="small-money-unit">元</em>
            </div>
          </div>
          <div class="inner-footer-col">
            <div class="col-label">
              时长满减优惠<em>:</em>
            </div>
            <div class="col-value">
              <em class="small-money-symbol">￥</em><em>{{ round(discountByTimeAmount) }}</em><em
                class="small-money-unit"
              >元</em>
            </div>
          </div>
          <div class="inner-footer-col">
            <div class="col-label">
              支付金额<em>:</em>
            </div>
            <div class="money-bolder">
              <em class="money-symbol">￥</em><em>{{ payAmount }}</em><em class="money-unit">元</em>
            </div>
          </div>
          <div class="inner-footer-col cursor-pointer w-30">
            <Popover :mouse-enter-delay="0.3">
              <template #content>
                <div class="popover-content">
                  <div class="content-row">
                    <div class="content-label">
                      时长<em>:</em>
                    </div>
                    <div class="content-value w-28">
                      {{ durationMap[duration] }}
                    </div>
                  </div>
                  <div class="content-row">
                    <div class="content-label">
                      并发数<em>:</em>
                    </div>
                    <div class="content-value w-28">
                      <em class="multi-symbol">*</em><em>{{ concurrencyNum }}</em>
                    </div>
                    <div class="content-value">
                      <em class="small-money-symbol">￥</em><em>{{ round(concurrencyPrice) }}</em>
                      <em class="small-money-unit">元</em>
                    </div>
                  </div>
                  <div class="content-row">
                    <div class="content-label">
                      并发任务数<em>:</em>
                    </div>
                    <div class="content-value w-28">
                      <em class="multi-symbol">*</em><em>{{ taskNum }}</em>
                    </div>
                    <div class="content-value">
                      <em class="small-money-symbol">￥</em><em>{{ round(taskPrice) }}</em>
                      <em class="small-money-unit">元</em>
                    </div>
                  </div>
                  <div class="content-row">
                    <div class="content-label">
                      节点配额<em>:</em>
                    </div>
                    <div class="content-value w-28">
                      <em class="multi-symbol">*</em><em>{{ nodeNum }}</em>
                    </div>
                    <div class="content-value">
                      <em class="small-money-symbol">￥</em><em>{{ round(nodePrice) }}</em>
                      <em class="small-money-unit">元</em>
                    </div>
                  </div>
                  <div v-if="nodeSource">
                    <div class="custom-row-label">
                      购买节点<em>:</em>
                    </div>
                    <div style="height: 31px; line-height: 30px;" class="table-header border-none">
                      <div style="width: 150px;" class="table-col">
                        节点规格
                      </div>
                      <div style="width: 80px;" class="table-col">
                        系统盘
                      </div>
                      <div style="width: 80px;" class="table-col">
                        带宽
                      </div>
                      <div style="width: 80px;" class="table-col">
                        数量
                      </div>
                      <div style="width: 150px;" class="table-col">
                        价格
                      </div>
                    </div>
                    <div style="height: 32px;" class="table-body border-none">
                      <div style="width: 150px;" class="table-col">
                        {{ nodeSpecMap[selectNode] &&
                          nodeSpecMap[selectNode].name
                        }}
                      </div>
                      <div style="width: 80px;" class="table-col">
                        {{ systemDiskNum }}G
                      </div>
                      <div style="width: 80px;" class="table-col">
                        {{ bandwidthNum }}Mbps
                      </div>
                      <div style="width: 80px;" class="table-col">
                        {{ nodeSpecNum }}
                      </div>
                      <div style="width: 150px;" class="table-col">
                        <em class="small-money-symbol">￥</em>
                        <span>{{ round(nodeSpecPrice + systemDiskPrice + bandwidthPrice) }}</span>
                        <em class="small-money-unit">元</em>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <span class="flex items-center">
                <Icon style="color: #ff7200;" type="icon-shuoming" class="mr-1 text-3" />
                <span class="col-label">费用明细</span>
              </span>
            </Popover>
          </div>
        </div>

        <div class="inner-footer-row">
          <div class="inner-footer-col">
            <div class="col-label">
              金额满减优惠<em>:</em>
            </div>
            <div class="col-value">
              <em class="small-money-symbol">￥</em><em>{{ round(discountByPriceAmount) }}</em><em
                class="small-money-unit"
              >元</em>
            </div>
          </div>
          <div class="inner-footer-col">
            <div class="col-label">
              优惠券优惠<em>:</em>
            </div>
            <div class="col-value">
              <em class="small-money-symbol">￥</em><em>{{ round(discountByCouponAmount) }}</em><em
                class="small-money-unit"
              >元</em>
            </div>
          </div>
          <div class="inner-footer-col">
            <Checkbox v-model="agreeFlag" class="col-label">
              <span>我已同意</span>
              <span class="link">《晓蚕云产品服务协议》</span>
            </Checkbox>
          </div>
          <div class="inner-footer-col w-30">
            <Button :loading="confirmLoading" :disabled="!agreeFlag" class="w-28" type="primary" @click="createOrder">
              提交订单
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>