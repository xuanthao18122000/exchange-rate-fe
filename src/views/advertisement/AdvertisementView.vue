<template>
  <DashboardLayout>
    <main class="transaction">
      <div class="page-heading">
        <h3>Transactions</h3>
        <p class="text-subtitle text-muted">You have {{total}} advertisement.</p>
      </div>

      <div class="page-content">
        <div class="card">
          <div class="card-header pb-0">
            <h4 class="card-title">List Advertisement</h4>
            <div class="border p-3">Filter here</div>
          </div>
          <div class="card-content p-4">
            <div  v-for="(item, index) in advertisement" :key="item.id">
              <div v-if="index === 0" class="mb-5 d-flex gap-3">
                <img style="border-radius: 10px;" :src="item.image"/>
                <div>
                  <p style="font-size: 20px;line-height: 1.4;font-weight: 700;">{{item.title}}</p>
                  <p class="text-danger fw-bold">{{item.date}}</p>
                  <p>{{item.description}}</p>
                </div>
              </div>
              <div v-else class="mb-5 d-flex gap-3" >
                <img style="border-radius: 10px;" :src="item.image"/>
                <div>
                  <p style="font-size: 20px;line-height: 1.4;font-weight: 700;">{{item.title}}</p>
                  <p class="text-danger fw-bold">{{item.date}}</p>
                  <p>{{item.description}}</p>
                </div>
              </div>
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
import { listAdv } from '@/api/advertisement';
import { useToast } from 'vue-toastification';
import getErrorMsg from '@/helpers/errorMsg';
import { dateConvert, getColorStatus, getColorMethod } from '@/helpers/common';
import copy from '@/plugins/vue-clipboard3'

// declare
const toast = useToast()
const advertisement = ref([] as any[])
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
async function getListAdv() {
  loading.value = true
  advertisement.value = []
  const data = await listAdv(filter)
  console.log(data.list)
  loading.value = false
  if(!data.statusCode || data.statusCode === 200) {
    advertisement.value = data.list
    total.value = data.total
    totalPages.value = Math.ceil(data.total / filter.limit)
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
  await getListAdv()
}


onMounted(async () => {
  await getListAdv()
})

</script>