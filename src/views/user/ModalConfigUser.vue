<template>
    <div class="modal fade text-left modal-borderless" id="modal-config-user" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header pb-0">
                    <h5 v-if="props.user_id" class="modal-title">Config User {{ props.user_id }}</h5>
                    <button type="button" class="close rounded-pill" data-bs-dismiss="modal" aria-label="Close">
                        <span class="ionicon ionicon-close-outline"></span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit="onConfig" class="p-3">
                        <!-- User ID -->
                        <div class="form-group">
                            <label class="text-sm mb-1" for="input_email">UserId</label>
                            <div class="form-control">{{ props.user_id }}</div>
                        </div>
                        <!-- Code -->
                        <div class="form-group">
                            <label class="text-sm mb-1" for="input_code">Code</label>
                            <select class="form-select" id="input_code" v-model="code.value.value" :class="{ 'is-invalid': code.errorMessage.value }">
                                <option value='undefined' disabled selected hidden>Select code</option>
                                <option v-for="item in listCode" :key="item" :value="item">{{ item }}</option>
                            </select>
                            <div class="invalid-feedback">{{ code.errorMessage.value }}</div>
                        </div>
                        <!-- Value -->
                        <div class="form-group">
                            <label class="text-sm mb-1" for="input_value">Value</label>
                            <textarea type="text" id="input_value" class="form-control textarea-no-resize" placeholder="Enter value" rows="5"
                                v-model="value.value.value" :class="{ 'is-invalid': value.errorMessage.value }"
                            ></textarea>
                            <div class="invalid-feedback">{{ value.errorMessage.value }}</div>
                        </div>

                        <!-- submit -->
                        <div class="d-flex justify-content-center gap-2 mt-4">
                            <button type="button" class="btn btn-light-primary" data-bs-dismiss="modal" @click="resetForm()">
                                Close
                            </button>
                            <button type="submit" class="btn btn-primary" :disabled="loading" :class="{'user-select-none': loading}">
                                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Save
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
import { configUser } from '@/api/user'
import { useToast } from 'vue-toastification';
import getErrorMsg from '@/helpers/errorMsg';
import bootstrap from '@/lib/bootstrap/bootstrap';

const toast = useToast()
const props = defineProps({ user_id: Number })
const loading = ref(false)
const listCode = ref(['THIRD_PARTY', 'PUBLIC_KEY_AGENT', 'PUBLIC_KEY_SYSTEM', 'PRIVATE_KEY_SYSTEM', 'WHITELIST_IP', 'WEBHOOK_LINK', 'CONFIG_THIRD_PARTY'])

defineRule('required', requiredRule)
defineRule('email', emailRule)
defineRule('min', minRule)
defineRule('confirmed', confirmedRule)

const { handleSubmit, resetForm } = useForm()

const code = useField<string>('Code', 'required')
const value = useField<string>('Value', 'required')

const onConfig = handleSubmit(async() => {
    const params = {
        user_id: props.user_id,
        code: code.value.value,
        value: value.value.value,
    }
    loading.value = true
    
    const data = await configUser(params)
    loading.value = false
    if(!data.statusCode || data.statusCode === 200) {
        toast.success("Config user success");
        resetForm()
        // Close modal
        const ModalEl = document.querySelector('#modal-config-user')
        if(ModalEl) bootstrap.Modal.getInstance(ModalEl)?.hide()
    } else {
        toast.error(getErrorMsg(data.message))
    }
})

</script>