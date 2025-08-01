<template>
  <PageBreadcrumb :items="breadcrumbItems" />
  <PageTitle :name="data?.nameEn">
    <template
      v-if="hasPermission(Permission.EDIT_ROLE)"
      #actionButton
    >
      <EditButton
        :path="`./${data?.id}/edit`"
        :label="t('role.edit')"
      />
    </template>
  </PageTitle>

  <PageContent>
    <PageContentSection :title="t('role.info')">
      <Descriptions :fields>
        <template #status>
          <RoleStatus :status="data?.status" />
        </template>
      </Descriptions>
    </PageContentSection>

    <RolePermissionDetails :permissions="data?.permissions" />
  </PageContent>
</template>

<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query';
import { computed, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

import {
  Descriptions,
  EditButton,
  PageBreadcrumb,
  PageContent,
  PageContentSection,
  PageTitle,
} from '@/components';
import { useTranslation } from '@/composables';
import { AppRoute, Permission } from '@/constants';
import { useAuth } from '@/modules/auth/useAuth';
import type { BreadcrumbItemProps, DescriptionsFieldProps } from '@/types';
import RolePermissionDetails from '../components/RolePermissionDetails.vue';
import RoleStatus from '../components/RoleStatus.vue';
import { useRoleQuery } from '../composables/useRoleQuery';
import { roleQueryKeys } from '../query-keys';

const queryClient = useQueryClient();
const { t } = useTranslation();
const { params } = useRoute();
const { hasPermission } = useAuth();

const breadcrumbItems = computed<BreadcrumbItemProps[]>(() => [
  {
    title: t('userManagement')
  },
  {
    title: t('role.list'),
    to: AppRoute.ROLE
  },
  {
    title: t('details')
  }
]);

const { data } = useRoleQuery(params.id as string);

const fields = computed((): DescriptionsFieldProps[] => {
  const role = data.value;
  if (!role) {
    return [];
  }

  return [
    {
      label: t('role.info'),
      fields: [
        {
          label: t('role.nameEn'),
          value: role.nameEn
        },
        {
          label: t('role.nameKh'),
          value: role.nameKh
        },
        {
          label: t('description'),
          value: role.description
        },
        {
          slotName: 'status',
          label: t('status')
        }
      ]
    }
  ];
});

onUnmounted(() => {
  queryClient.cancelQueries({ queryKey: roleQueryKeys.role(params.id as string) });
});
</script>

<style scoped></style>
