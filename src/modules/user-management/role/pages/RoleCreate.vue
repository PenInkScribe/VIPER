<template>
  <PageBreadcrumb :items="breadcrumbItems" />
  <PageTitle
    :name="t('role.addNew')"
  />

  <PageContent>
    <Form @submit="onSubmit">
      <PageContentSection :title="t('role.info')">
        <Row>
          <Col :md="8">
            <InputField
              required
              name="nameEn"
              :label="t('role.nameEn')"
            />
          </Col>
          <Col :md="8">
            <InputField
              required
              name="nameKh"
              :label="t('role.nameKh')"
            />
          </Col>
          <Col :md="8">
            <RoleTypeAutocomplete />
          </Col>
        </Row>
        <Row>
          <Col :md="24">
            <TextAreaField
              maxlength="255"
              name="description"
              :label="t('description')"
            />
          </Col>
        </Row>
      </PageContentSection>

      <RolePermission />

      <div class="flex justify-end gap-2">
        <CancelButton />
        <SaveButton :loading="isSubmitting" />
      </div>
    </Form>
  </PageContent>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import {
  CancelButton,
  Col,
  Form,
  InputField,
  PageBreadcrumb,
  PageContent,
  PageContentSection,
  PageTitle,
  Row,
  SaveButton,
  TextAreaField
} from '@/components';
import { useTranslation } from '@/composables';
import { AppRoute } from '@/constants';
import type { BreadcrumbItemProps } from '@/types';
import RolePermission from '../components/RolePermission.vue';
import RoleTypeAutocomplete from '../components/RoleTypeAutocomplete.vue';
import { useRoleCreateForm } from '../composables/useRoleCreateForm';

const { t } = useTranslation();

const breadcrumbItems = computed<BreadcrumbItemProps[]>(() => [
  {
    title: t('userManagement')
  },
  {
    title: t('role.list'),
    to: AppRoute.ROLE
  },
  {
    title: t('create')
  }
]);

const { onSubmit, isSubmitting } = useRoleCreateForm();
</script>

<style scoped></style>
