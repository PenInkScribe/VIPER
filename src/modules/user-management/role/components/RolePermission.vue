<template>
  <section class="my-4">
    <SectionTitle class="pb-3">
      {{ t('permissions') }}
    </SectionTitle>
    <Loading v-if="isLoading" />
    <div
      v-else
      class="grid grid-cols-3 gap-6"
    >
      <Card
        v-for="resource in resources"
        :key="resource.id"
        class="!round !rounded-2xl !border-white"
      >
        <CheckboxGroupField
          :label="resource.nameEn"
          option-value-key="code"
          option-label-key="nameEn"
          :name="`permission.${resource.code}`" 
          :options="resource.permissions"
        />
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Card, CheckboxGroupField, Loading, SectionTitle } from '@/components';
import { useTranslation } from '@/composables';
import { useQueryClient } from '@tanstack/vue-query';
import { onUnmounted } from 'vue';
import { useResourceWithPermissionQuery } from '../../resource/composables/useResourceQuery';
import { resourceQueryKeys } from '../../resource/query-keys';

const queryClient = useQueryClient();
const { t } = useTranslation();

const { isLoading, data: resources } = useResourceWithPermissionQuery();

onUnmounted(() => {
  queryClient.cancelQueries({ queryKey: resourceQueryKeys.resourceWithPermission });
});
</script>

<style scoped>

</style>