<template>
    <main>
        <div id="auth">
            <div class="row h-100">
                <div class="col-lg-5 col-12">
                    <div id="auth-left">
                        <div class="auth-logo">
                            <RouterLink :to="{ name: 'auth.login' }" class="fs-3 fw-bold">
                                <span class="ionicon ionicon-terminal-sharp"></span>
                                Exchange Rate
                            </RouterLink>
                        </div>
                        <h1 class="auth-title">Log in.</h1>
                        <p class="auth-subtitle mb-5">Log in with your data that you entered during registration.</p>

                        <form @submit="onSubmit">
                            <div class="form-group position-relative has-icon-left">
                                <input type="text" maxlength="254" class="form-control form-control-xl" placeholder="Username" v-model="email.value.value" :class="{'is-invalid' : email.errorMessage.value}">
                                <div class="form-control-icon">
                                    <span class="ionicon ionicon-person-circle-outline fs-3"></span>
                                </div>
                                <p class="invalid-feedback">{{ email.errorMessage.value }}</p>
                            </div>
                            <div class="form-group position-relative has-icon-left">
                                <input type="password" maxlength="128" class="form-control form-control-xl" placeholder="Password" v-model="password.value.value" :class="{'is-invalid' : password.errorMessage.value}">
                                <div class="form-control-icon">
                                    <span class="ionicon ionicon-shield-checkmark-outline fs-3"></span>
                                </div>
                                <p class="invalid-feedback">{{ password.errorMessage.value }}</p>
                            </div>
                            
                            <button type="submit" class="btn btn-primary btn-block btn-lg shadow-lg mt-4 py-sm-3 d-inline-flex align-items-center justify-content-center gap-2" :disabled="loading" :class="{'user-select-none': loading}">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-show="loading"></span>
                                Log in
                            </button>
                        </form>

                        <div class="text-center mt-5 text-lg">
                            <p class="text-gray-600">Don't have an account? <a href="#!" class="font-bold">Contact support</a>.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-7 d-none d-lg-block">
                    <div id="auth-right" class="d-flex align-items-center justify-content-center">
                        <img src="@/assets/images/auth-img.png" alt="auth image" class="w-75">
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { defineRule, useForm, useField } from "vee-validate";
import { email as emailRule, required as requiredRule } from '@vee-validate/rules';
import { login } from '@/api/auth'
import doubleHash from '@/helpers/doubleHash';
import { useToast } from "vue-toastification";
import getErrorMsg from '@/helpers/errorMsg'

const router = useRouter()
const toast = useToast()

defineRule("email", emailRule);
defineRule("required", requiredRule);

const loading = ref(false)

const { handleSubmit } = useForm()
const email = useField<string>("Email", "required|email")
const password = useField<string>("Password", "required")

const onSubmit = handleSubmit(async() => {
    loading.value = true
    const data = await login({
        email: email.value.value,
        password: doubleHash(password.value.value)
    })
  console.log({data})
    loading.value = false
    if(data.success && data.code == 0) {
        router.push({ name: "exchange-rate.index" })
        toast.success("Login Success");
    } else {
        toast.error('Wrong password or email')
        // toast.error(getErrorMsg(data.message))
    }
})

</script>