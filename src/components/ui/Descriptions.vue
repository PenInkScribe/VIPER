<template>
  <div
    v-for="field in fields"
    :key="field.label"
  >
    <div class="px-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 text-[#303133] dark:text-[#E5EAF3]">
      <div
        v-for="item in field.fields ?? [field]"
        :key="item.label"
        class="flex flex-col"
      >
        <div class="grid grid-rows-2 gap-1">
          <span class="text-sm font-medium">{{ item.label }}</span>

          <span v-if="item.slotName">
            <slot :name="item.slotName" />
          </span>
          <span v-else>
            {{ item.value ?? (displayDashIfValueIsNull ? '-' : '') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export type DescriptionsFieldProps = {
  label: string;
  slotName?: string;
} & (
  | {
      value?: never;
      type?: 'section';
      fields: DescriptionsFieldProps[];
    }
  | {
      value?: string;
      type?: never;
      fields?: never;
    }
);

type DescriptionsProps = {
  fields: DescriptionsFieldProps[];
  displayDashIfValueIsNull?: boolean;
};

withDefaults(defineProps<DescriptionsProps>(), {
  displayDashIfValueIsNull: true
});
</script>

<style scoped></style>
