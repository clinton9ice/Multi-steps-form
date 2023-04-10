<template>
  <fieldset>
    <label v-if="label"
      :for="name"
      :class="labelClass"
      class="text-primary-marine-blue text-sm"
      >{{ label }}</label
    >
    <ErrorMessage
      :name="name"
      as="div"
      class="mb-1 text-red-500 text-xs capitalize float-right"
      v-if="label"
    />

    <Field
      :name="name"
      :type="type"
      :id="name"
      class="h-10 mt-1 w-full border rounded-md p-3"
      :class="fieldClass"
      :placeholder="placeholder"
      v-model.lazy="text"
     />
    
  </fieldset>
</template>

<script setup lang="ts">
import { Field, ErrorMessage,  } from "vee-validate";
import { watch, ref } from "vue";

defineProps<{
  name: string;
  type: "text" | "number" | "email" | "tel" | "checkbox";
  label?: string ;
  fieldClass?: string | object[] | string[];
  labelClass?: string | object[] | string[];
  placeholder?: string;
  inputValue?: unknown;
  attr?: object | any;
}>();
const emit = defineEmits(["update:value"]);
const text = ref("");

watch(text, (e) => emit("update:value", e));
</script>
