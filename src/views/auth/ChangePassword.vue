<template>
    <DashboardLayout>
        <main class="users">
            <div class="page-heading">
                <h3>Security</h3>
                <p class="text-subtitle text-muted">Show all setting of admin.</p>
            </div>

            <div class="page-content">
                <div class="row match-height">
                    <div class="col-md-6 col-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Change Password</h4>
                            </div>
                            <div class="card-content">
                                <div class="card-body">
                                    <form @submit="onSubmit">
                                        <div class="form-body">
                                            <div class="row">
                                                <!-- current_password -->
                                                <div class="col-md-4">
                                                    <label>Current Password</label>
                                                </div>
                                                <div class="col-md-8 form-group mb-3">
                                                    <input v-model="current_password.value.value" type="password" maxlength="128" class="form-control"
                                                        name="current_password" placeholder="Current Password"
                                                        :class="{ 'is-invalid': current_password.errorMessage.value }">
                                                    <div class="invalid-feedback">{{ current_password.errorMessage.value }}</div>
                                                </div>
                                                <!-- new_password -->
                                                <div class="col-md-4">
                                                    <label>New Password</label>
                                                </div>
                                                <div class="col-md-8 form-group mb-3">
                                                    <input v-model="new_password.value.value" type="password" maxlength="128" class="form-control"
                                                        name="new_password" placeholder="New Password"
                                                        :class="{ 'is-invalid': new_password.errorMessage.value }">
                                                    <div class="invalid-feedback">{{ new_password.errorMessage.value }}</div>
                                                </div>
                                                <!-- re_new_password -->
                                                <div class="col-md-4">
                                                    <label>Confirm New Password</label>
                                                </div>
                                                <div class="col-md-8 form-group mb-3">
                                                    <input v-model="re_new_password.value.value" type="password" maxlength="128" class="form-control"
                                                        name="re_new_password" placeholder="Confirm New Password"
                                                        :class="{ 'is-invalid': re_new_password.errorMessage.value }">
                                                    <div class="invalid-feedback">{{ re_new_password.errorMessage.value }}</div>
                                                </div>
                                                <!-- Submit -->
                                                <div class="col-sm-12 d-flex justify-content-end">
                                                    <button type="submit" class="btn btn-primary" :disabled="loading" :class="{'user-select-none': loading}">
                                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                                                            v-show="loading"></span>
                                                        Change Password
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
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
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { ref } from "vue";
import { defineRule, useForm, useField } from "vee-validate";
import { required as requiredRule, confirmed as confirmedRule, min as minRule } from "@vee-validate/rules";
import { changePassword } from "@/api/auth"
import doubleHash from "@/helpers/doubleHash";
import { useToast } from "vue-toastification";
import getErrorMsg from "@/helpers/errorMsg";

const loading = ref(false)
const toast = useToast()

defineRule("required", requiredRule)
defineRule("confirmed", confirmedRule)
defineRule("min", minRule)
defineRule("not_same", (value: string, params: [string]):any => {
    if (!value || !value.length) {
        return true;
    }
    if (String(value) === String(params[0])) {
        return 'The new password must be different from the old password'
    }
    return true
})

const { handleSubmit, resetForm } = useForm()

const current_password = useField<string>("Current password", "required|min:6")
const new_password = useField<string>("New password", "required|min:6|not_same:@Current password")
const re_new_password = useField<string>("Confirm new password", "required|min:6|confirmed:@New password")

const onSubmit = handleSubmit(async() => {
    const params = {
        password: doubleHash(current_password.value.value),
        new_password: doubleHash(new_password.value.value),
        re_new_password: doubleHash(re_new_password.value.value)
    }
    loading.value = true   
    const data = await changePassword(params)
    loading.value = false
    if(!data.statusCode || data.statusCode === 200) {
        resetForm()
        toast.success("Change password success");
    } else {
        toast.error(getErrorMsg(data.message))
    }
})

</script>
