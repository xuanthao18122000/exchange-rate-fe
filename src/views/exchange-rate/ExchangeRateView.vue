<template>
  <DashboardLayout>
    <main class="transaction">
      <div class="page-heading">
        <h3>Exchange Rate</h3>
        <p class="text-subtitle text-muted">You have {{total}} Exchange Rate.</p>
      </div>

      <div class="page-content">
        <div class="card">
          <div class="card-header pb-0">
            <h4 class="card-title">Table list Exchange Rate</h4>
            <div class="border p-3">Filter here</div>
          </div>
          <div class="card-content">
            <div class="card-body">
              <!-- Table -->
              <div class="table-responsive">
                <table class="table table-lg table-hover">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>1h %</th>
                    <th>24h %</th>
                    <th>7d %</th>
                    <th>Market Cap</th>
                    <th>Volume(24h)</th>
                    <th>Circulating Supply</th>
                    <th>Last 7 Days</th>
                  </tr>
                  </thead>
                  <tbody class="text-sm">
                  <tr v-for="item in exchangeRate" :key="item.id">
                    <td>
                      <div class="text-break">{{item.id}}</div>
                    </td>
                    <td>
                      <div class="d-flex align-items-center gap-1">
                        <div class="text-break text-truncate" style="max-width: 200px">
                          <img :src="item.logo" class="me-2" style="height: 50px"/>
                           {{item.name}}
                        </div>
<!--                        <a type="button" @click="copy(item.transaction_id)" class="ionicon ionicon-copy-outline"></a>-->
                      </div>
                    </td>
<!--                    <td>-->
<!--                      <div class="text-break">{{item.user_id}}</div>-->
<!--                    </td>-->
<!--                    <td>-->
<!--                      <div class="text-break">{{item.amount}}</div>-->
<!--                    </td>-->
                    <td >
                      <div class="text-break " style="min-width: 50px"> {{item.oneHour == '' ? '0.00%': item.oneHour}}</div>
                    </td>
                    <td>
                      <div class="text-break text-capitalize fw-semibold" :class="getColorMethod(item.method)" style="min-width: 50px">
                        {{item.oneDay == '' ? '0.00%': item.oneDay}}
                      </div>
                    </td>
                    <td>
                      <div class="text-break text-capitalize fw-semibold" :class="getColorMethod(item.method)" style="min-width: 50px">
                        {{item.oneWeek == '' ? '0.00%': item.oneWeek}}
                      </div>
                    </td>
                    <td>
                      <div class="d-flex align-items-center gap-1">
                        <div class="text-break text-truncate" style="max-width: 180px">
                          {{item.market_cap}}
                        </div>
                        <a type="button" v-if="item.hash" @click="copy(item.hash)" class="ionicon ionicon-copy-outline"></a>
                      </div>
                    </td>
                    <td>
                      <div class="text-break rounded-3 py-1 px-2 d-inline-block text-capitalize" >{{item.volume_24h}}</div>
                    </td>
                    <td>
                      <div class="d-flex align-items-center gap-1">
                        <div class="text-break text-truncate py-1 px-2 border rounded-3" style="max-width: 180px" >
                          {{item.circulating_supply}}
                        </div>
                        <a type="button" v-if="item.belong_id" @click="copy(item.belong_id)" class="ionicon ionicon-copy-outline"></a>
                      </div>
                    </td>
                    <td>
                      <div class="text-break">
                        <img :src="item.last_7days" class="me-2" style=""/>
                      </div>
                    </td>
                    <td>
                      <a type="button" class="fs-5" data-bs-toggle="modal" data-bs-target="#modal-user-detail"
                         @click="getCurrentTransactionDetail(item)"
                      ><span class="ionicon ionicon-alert-circle-outline"></span></a>
                    </td>
                  </tr>
                  <!-- loading -->
                  <tr v-show="loading">
                    <td colspan="100%" class="table-no-hover w-100 text-center shadow-none" style="height: 300px">
                      <div class="spinner-border mx-auto" style="width: 3rem; height: 3rem" role="status"></div>
                      <p class="mb-0 mt-2">Wait a few seconds</p>
                    </td>
                  </tr>
                  <!-- No user -->
                  <tr v-if="exchangeRate.length == 0 && !loading">
                    <td colspan="100%" class="table-no-hover w-100 text-center shadow-none" style="height: 300px">
                      <span class="ionicon ionicon-file-tray-outline fs-1"></span>
                      <p class="mb-0 mt-2">No User</p>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <!-- Pagination -->
              <PaginationView
                  v-if="exchangeRate.length > 0"
                  :totalPages="totalPages"
                  :currentPage="filter.page"
                  @pageChanged="onPageChanged"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import PaginationView from '@/components/PaginationView.vue';
import { ref, reactive, onMounted } from 'vue';
import { listCoin } from '@/api/exchange-rate';
import { useToast } from 'vue-toastification';
import getErrorMsg from '@/helpers/errorMsg';
import { dateConvert, getColorStatus, getColorMethod } from '@/helpers/common';
import copy from '@/plugins/vue-clipboard3'

// declare
const toast = useToast()
const exchangeRate = ref([] as any[])
const filter = reactive({
  page: 1,
  limit: 10,
  address: null,
  currency: null,
  user_id: null,
  third_party_id: null,
  agent_id: null,
  network: null
})
const total = ref(0)
const totalPages = ref(0)
const loading = ref(false)
const currentUserDetail = ref({})

// Get list transaction
async function getListTransaction() {
  loading.value = true

  const response = await listCoin(filter)
  const data = response.list
  console.log({data})
  loading.value = false
  if(!data.statusCode || data.statusCode === 200) {
    exchangeRate.value = data
    total.value = data.total
    totalPages.value = data.total
  } else {
    toast.error(getErrorMsg(data.message))
  }
}

// Get current transaction
function getCurrentTransactionDetail(data: any) {
  currentUserDetail.value = data
}

// Pagination
async function onPageChanged(page: number) {
  filter.page = page
  await getListTransaction()
}


onMounted(async () => {
  if(exchangeRate.value !== []){
    await getListTransaction()
  }
  setInterval(function(){
    getListTransaction()
  }, 5000);
})

</script>