<template>
    <div class="modal fade text-left modal-borderless" id="modal-user-detail" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div v-if="data" class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Detail User {{data.id}}</h5>
                    <button type="button" class="close rounded-pill" data-bs-dismiss="modal" aria-label="Close">
                        <span class="ionicon ionicon-close-outline"></span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="p-3 border rounded-3">
                        <div class="row">
                            <div class="col-4 fw-semibold">ID</div>
                            <div class="col-8 text-end">{{data.id}}</div>
                        </div>
                        <hr class="my-3">
                        <div class="row">
                            <div class="col-4 fw-semibold">Username</div>
                            <div class="col-8 text-end">{{data.username}}</div>
                        </div>
                        <hr class="my-3">
                        <div class="row">
                            <div class="col-4 fw-semibold">Status</div>
                            <div class="col-8 text-end">
                                <span :class="['bg-opacity-25 py-1 px-2 rounded-3 text-capitalize text-sm', color]">{{data.status}}</span>
                            </div>
                        </div>
                        <hr class="my-3">
                        <div class="row">
                            <div class="col-4 fw-semibold">Code</div>
                            <div class="col-8 text-end">{{data.code}}</div>
                        </div>
                        <hr class="my-3">
                        <div class="row">
                            <div class="col-4 fw-semibold">Created at</div>
                            <div class="col-8 text-end">{{dateConvert(data.created_at)}}</div>
                        </div>
                        <hr class="my-3">
                        <div class="row">
                            <div class="col-4 fw-semibold">Updated at</div>
                            <div class="col-8 text-end">{{dateConvert(data.updated_at)}}</div>
                        </div>
                    </div>

                    <div v-if="data.group">
                        <div class="divider divider-center my-4">
                            <div class="divider-text fw-bold">Group</div>
                        </div>
                        <div class="p-3 border rounded-3">
                            <div class="row">
                                <div class="col-4 fw-semibold">ID</div>
                                <div class="col-8 text-end">{{data.group.id}}</div>
                            </div>
                            <hr class="my-3">
                            <div class="row">
                                <div class="col-4 fw-semibold">Code</div>
                                <div class="col-8 text-end text-capitalize">{{data.group.code}}</div>
                            </div>
                            <hr class="my-3">
                            <div class="row">
                                <div class="col-4 fw-semibold">Description</div>
                                <div class="col-8 text-end">{{data.group.description ? data.group.description : '---'}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-light-primary" data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { dateConvert } from "@/helpers/common";
import type { User } from "@type"

type Props = {
    data: User,
    color: string
}
defineProps<Props>()

</script>