<template>
    <DashboardLayout>
        <main class="users">
            <div class="page-heading">
                <h3>Users</h3>
                <p class="text-subtitle text-muted">Show all list users.</p>
            </div>

            <div class="page-content">
                <div class="card">
                    <div class="card-header pb-0 d-flex align-items-center justify-content-between">
                        <h4 class="card-title mb-0">Table list user</h4>
                        <a type="button" class="btn btn-outline-primary rounded-pill d-flex align-items-center gap-1" data-bs-toggle="modal" data-bs-target="#modal-create-user">
                            <span class="ionicon ionicon-person-add-outline"></span><span>Create User</span>
                        </a>
                    </div>
                    <div class="card-content">
                        <div class="card-body">
                            <!-- Table -->
                            <div class="table-responsive">
                                <table class="table table-lg table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Username</th>
                                            <th>Status</th>
                                            <th>Code</th>
                                            <th>Group</th>
                                            <th>Created at</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="user in splitUsers" :key="user.id">
                                            <td>
                                                <div>{{user.id}}</div>
                                            </td>
                                            <td>
                                                <div>{{user.username}}</div>
                                            </td>
                                            <td>
                                                <span :class="['bg-opacity-25 py-1 px-2 rounded-3 text-capitalize text-sm',statusColor(user.status)]">
                                                    {{user.status}}
                                                </span>
                                            </td>
                                            <td>
                                                <div>{{user.code}}</div>
                                            </td>
                                            <td>
                                                <div class="text-capitalize">{{user.group.code}}</div>
                                            </td>
                                            <td>
                                                <div>{{dateConvert(user.created_at)}}</div>
                                            </td>
                                            <td>
                                                <a type="button" class="fs-5" data-bs-toggle="modal" data-bs-target="#modal-user-detail"
                                                    @click="getCurrentUserDetail(user)"
                                                ><span class="ionicon ionicon-alert-circle-outline"></span></a>
                                                <a type="button" class="fs-5 ms-3" data-bs-toggle="modal" data-bs-target="#modal-config-user"
                                                    @click="getCurrentUserDetail(user)"
                                                ><span class="ionicon ionicon-settings-outline"></span></a>
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
                                        <tr v-if="users.length == 0 && !loading">
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
                                v-if="users.length > 0"
                                :totalPages="pagination.totalPage"
                                :currentPage="pagination.page"
                                @pageChanged="onPageChanged"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Modal User Detail -->
        <ModalUserDetail :data="currentUserDetail" :color="statusColor(currentUserDetail.status)"/>
        <!-- Modal Create user -->
        <ModalCreateUser />
        <!-- Modal Create user -->
        <ModalConfigUser :user_id="currentUserDetail?.id"/>

    </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import PaginationView from "@/components/PaginationView.vue";
import ModalUserDetail from "./ModalUserDetail.vue";
import ModalCreateUser from "./ModalCreateUser.vue";
import ModalConfigUser from "./ModalConfigUser.vue";
import { ref, reactive, computed, onMounted } from "vue";
import { listUser } from "@/api/user";
import getErrorMsg from '@/helpers/errorMsg'
import { useToast } from "vue-toastification"
import { dateConvert } from "@/helpers/common"
import type { User } from "@type"
import { useRouter, useRoute } from 'vue-router'

const toast = useToast()
const router = useRouter()
const route = useRoute()

// Show list User
const users = ref([] as User[])
const loading = ref(false)

async function getListUser() {
    loading.value = true
    const data = await listUser()
    loading.value = false
    if(!data.statusCode || data.statusCode === 200) {
        users.value = data
        pagination.total = data.length
        pagination.totalPage = Math.ceil(data.length / pagination.perPage)       
    } else {
        toast.error(getErrorMsg(data.message))
    }
}

function statusColor(status: string) {
    if(status === 'active') {
        return 'bg-success text-success'
    } else {
        return 'bg-dark text-dark'
    }
}

// Detail User
const currentUserDetail = ref({} as User)
function getCurrentUserDetail(data: User) {
    currentUserDetail.value = data
}

// Pagination
const pagination = reactive({
    total: 0,
    totalPage: 0,
    perPage: 10,
    page: 1
})

const splitUsers = computed(() => {
    const initUsers = users.value
    const start = pagination.page*pagination.perPage - pagination.perPage
    const end = start + pagination.perPage
    return initUsers.slice(start, end)
})

function onPageChanged(page: number) {
    pagination.page = page
    router.push({ 
        path: route.path,
        query: {
            page: page
        }
    })
}


onMounted(() => {
    if(route.query.page) pagination.page = +route.query.page
    getListUser()
})

</script>
