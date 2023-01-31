<template>
    <div class="modal fade text-left modal-borderless" id="modal-create-user" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header pb-0">
                    <h5 class="modal-title">Create New User</h5>
                    <button type="button" class="close rounded-pill" data-bs-dismiss="modal" aria-label="Close">
                        <span class="ionicon ionicon-close-outline"></span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit="onCreate" class="p-3">
                        <!-- email -->
                        <div class="form-group">
                            <label class="text-sm mb-1" for="input_email">Email</label>
                            <input type="email" id="input_email" class="form-control" name="email" placeholder="Enter email"
                                v-model="email.value.value" :class="{ 'is-invalid': email.errorMessage.value }">
                            <div class="invalid-feedback">{{ email.errorMessage.value }}</div>
                        </div>
                        <!-- password -->
                        <div class="form-group">
                            <label class="text-sm mb-1" for="input_password">Password</label>
                            <input type="password" id="input_password" class="form-control" name="password" placeholder="Enter password"
                                v-model="password.value.value" :class="{ 'is-invalid': password.errorMessage.value }">
                            <div class="invalid-feedback">{{ password.errorMessage.value }}</div>
                        </div>
                        <!-- confirm -->
                        <div class="form-group">
                            <label class="text-sm mb-1" for="input_confirm_password">Confirm Password</label>
                            <input type="password" id="input_confirm_password" class="form-control" name="confirm_password" placeholder="Enter confirm password"
                                v-model="confirm_password.value.value" :class="{ 'is-invalid': confirm_password.errorMessage.value }">
                            <div class="invalid-feedback">{{ confirm_password.errorMessage.value }}</div>
                        </div>
                        <!-- group -->
                        <div class="form-group">
                            <label class="text-sm mb-1" for="input_select">Group</label>
                            <select class="form-select" id="input_select" v-model="group.value.value" :class="{ 'is-invalid': group.errorMessage.value }">
                                <option value='undefined' disabled selected hidden>Select group</option>
                                <option v-for="item in listGroup" :key="item.value" :value="item.value">{{ item.name }}</option>
                            </select>
                            <div class="invalid-feedback">{{ group.errorMessage.value }}</div>
                        </div>

                        <!-- submit -->
                        <div class="d-flex justify-content-center gap-2 mt-4">
                            <button type="button" class="btn btn-light-primary" data-bs-dismiss="modal" @click="resetForm()">
                                Close
                            </button>
                            <button type="submit" class="btn btn-primary" :disabled="loading" :class="{'user-select-none': loading}">
                                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineRule, useField, useForm } from 'vee-validate';
import { required as requiredRule, min as minRule, confirmed as confirmedRule, email as emailRule } from '@vee-validate/rules'
import { createUser } from '@/api/user'
import { useToast } from 'vue-toastification';
import getErrorMsg from '@/helpers/errorMsg';
import doubleHash from '@/helpers/doubleHash';
import bootstrap from '@/lib/bootstrap/bootstrap'

const toast = useToast()
const listGroup = ref([
    { name: 'Admin', value: 'admin' },
    { name: 'Agent', value: 'agent' },
])
const loading = ref(false)

defineRule('required', requiredRule)
defineRule('email', emailRule)
defineRule('min', minRule)
defineRule('confirmed', confirmedRule)

const { handleSubmit, resetForm } = useForm()

const email = useField<string>('Email', 'required|email')
const password = useField<string>('Password', 'required|min:6')
const confirm_password = useField<string>('Confirm password', 'required|min:6|confirmed:@Password')
const group = useField<string>('Group', 'required')

const onCreate = handleSubmit(async() => {
    const params = {
        email: email.value.value,
        password: doubleHash(password.value.value),
        group: group.value.value
    }
    loading.value = true
    const data = await createUser(params)
    loading.value = false
    if(!data.statusCode || data.statusCode === 200) {
        toast.success("Create user success");
        resetForm()
        // Close modal
        const ModalEl = document.querySelector('#modal-create-user')
        if(ModalEl) bootstrap.Modal.getInstance(ModalEl)?.hide()
    } else {
        toast.error(getErrorMsg(data.message))
    }
})

</script>