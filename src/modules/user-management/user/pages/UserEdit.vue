<template>
  <PageBreadcrumb :items="breadcrumbItems" />
  <PageTitle
    :name="data?.fullName"
    :loading="isLoading"
  />

  <PageContent>
    <Form
      class="grid gap-4"
      @submit="onSubmit"
    >
      <PageContentSection :title="t('personalInfo')">
        <Row>
          <Col :md="12">
            <InputField
              required
              name="lastName"
              :label="t('lastName')"
            />
          </Col>
          <Col :md="12">
            <InputField
              required
              name="firstName"
              :label="t('firstName')"
            />
          </Col>
          <Col :md="12">
            <InputField
              name="lastNameKh"
              :label="t('lastNameKh')"
            />
          </Col>
          <Col :md="12">
            <InputField
              name="firstNameKh"
              :label="t('firstNameKh')"
            />
          </Col>
          <Col :md="12">
            <InputField
              name="phoneNumber"
              :label="t('phoneNumber')"
            />
          </Col>
          <Col :md="12">
            <InputField
              name="email"
              :label="t('email')"
            />
          </Col>
        </Row>
      </PageContentSection>

      <PageContentSection :title="t('additionalInfo')">
        <Row>
          <Col :md="8">
            <BranchAutocomplete
              required
              name="branchCode"
              @change="onBranchChange"
            />
          </Col>
          <Col :md="8">
            <RoleAutocomplete
              required
              name="roleIds"
              :branch-code="values.branchCode"
            />
          </Col>
        </Row>
      </PageContentSection>
      
      <PageContentSection :title="t('loginInfo')">
        <Row>
          <Col>
            <InputField
              required
              name="username"
              :label="t('username')"
            />
          </Col>
        </Row>
      </PageContentSection>

      <div class="flex justify-end gap-2">
        <CancelButton />
        <UpdateButton :loading="isPending" />
      </div>
    </Form>
  </PageContent>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

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
  UpdateButton
} from '@/components';
import { useFormAsync, useTranslation } from '@/composables';
import { AppRoute } from '@/constants';
import BranchAutocomplete from '@/modules/branch/components/BranchAutocomplete.vue';
import type { BreadcrumbItemProps } from '@/types';

import RoleAutocomplete from '../../role/components/RoleAutocomplete.vue';
import { useUpdateUserMutation, useUserFormQuery } from '../composables/useUserQuery';
import { updateUserValidationSchema } from '../user-schema';
import type { EditUserForm } from '../user-type';

const { t } = useTranslation();
const { params } = useRoute();

const breadcrumbItems = computed<BreadcrumbItemProps[]>(() => [
  {
    title: t('userManagement')
  },
  {
    title: t('user.list'),
    to: AppRoute.USER
  },
  {
    title: t('edit')
  }
]);

const { isLoading, data } = useUserFormQuery(params.id as string);

const { handleSubmit, values, setFieldValue } = useFormAsync<EditUserForm>({
  initialValues: data,
  validationSchema: toTypedSchema(updateUserValidationSchema)
});

const { isPending, mutate } = useUpdateUserMutation(params.id as string);

const onSubmit = handleSubmit((values) => {
  mutate(values);
});

function onBranchChange() {
  setFieldValue('roleIds', [], false);
}
</script>

<style scoped></style>
