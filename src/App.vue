<script setup lang="ts">
import Layout from "./components/Layout/index.vue";
import IField from "./components/Field.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { computed, reactive, ref, watch, onMounted } from "vue";

interface FORMDATA {
  name: string;
  email: string;
  tel: string;
  plan: {
    type: "monthly" | "yearly";
    option: "" | "archade" | "advanced" | "pro";
    price: number;
  };
  addon: {
    title: string;
    price: number;
    description: string;
  }[];
}
const steps = reactive([
  {
    title: "Personal Info",
    desc: "Please Provide your name, email, and phone number",
    type: "info",
    active: true,
  },
  {
    title: "Select your plan",
    desc: "You have the option of monthly or yearly billing.",
    type: "plan",
    active: false,
  },
  {
    title: "Pick add-ons",
    desc: "Add-ons help enhance your gaming experience.",
    type: "add-on",
    active: false,
  },
  {
    title: "Finishing Up",
    desc: "Double check everything looks okay before confirming.",
    type: "summary",
    active: false,
  },
  {
    type: "end",
    active: false,
  },
]);
const plans = ref([
  {
    icon: "icon-arcade.svg",
    name: "arcade",
    price: 9,
    duration: "mo",
  },
  {
    icon: "icon-advanced.svg",
    name: "advanced",
    price: 12,
    duration: "mon",
  },
  {
    icon: "icon-pro.svg",
    name: "pro",
    price: 15,
    duration: "mo",
  },
]);
const addons = ref<FORMDATA['addon']>([
  {
    title: "Online service",
    description: "Access to multiplayer games",
    price: 1,
  },
  {
    title: "Larger Storage",
    description: "Extra 1TB of cloud save",
    price: 2,
  },
  {
    title: "Customizable profile",
    description: "Custom theme on your profile.",
    price: 2,
  },
]);

const formData = reactive<FORMDATA>({
  name: "",
  email: "",
  tel: "",
  plan: {
    type: "monthly",
    option: "",
    price: 0,
  },
  addon: [],
});
const addonSchema = computed(() => {
  return yup.object({
    "add-ons": yup.array().min(1),
  });
});
const schema = computed(() => {
  return yup.object({
    email: yup.string().required().email(),
    name: yup.string().required(),
    tel: yup.string().required().min(10),
  });
});
const total = computed(() => {
  let p = 0;
  for (let index = 0; index < formData.addon.length; index++) {
    const addOns = formData.addon[index];
    p += addOns.price
  }
  return p + formData.plan.price
});

watch(
  () => formData.plan.type,
  () => {
    for (let index = 0; index < plans.value.length; index++) {
      const plan = plans.value[index];
    
      switch (formData.plan.type) {
        case "monthly":
          plan.price = plan.price / 10;
          plan.duration = "mon";
          addons.value[index].price = addons.value[index].price / 10
          break;

        case "yearly":
          plan.price = plan.price * 10;
          plan.duration = "yr";
          addons.value[index].price = addons.value[index].price * 10;
          break;
      }
      if(formData.plan.option === plan.name){
        formData.plan.price = plan.price;
      }
    }
  }
);
const traceStep = (s: string) => {
  steps.forEach((e) => (e.active = e.type === s));
};
const togglePlan = () => {
  formData.plan.type = formData.plan.type === "monthly" ? "yearly" : "monthly";
};
const selectPlan = (item: FORMDATA["plan"]["option"], price: number) => {
  formData.plan.option = item;
  formData.plan.price = price;
};
</script>

<template>
  <div class="lg:px-3 lg:py-5 px-0 w-full">
    <layout :steps="steps">
      <div
        class="block max-w-[350px] lg:max-w-full mx-auto lg:static -mt-36 lg:m-0 p-6 rounded-[6px] bg-white lg:bg-transparent shadow-lg w-full lg:shadow-none"
      >
        <template v-for="item in steps">
          <template v-if="item.active">
            <h3
              class="font-bold text-[1.5em] lg:text-[3em] text-blue-900 font-ubuntuMedium"
            >
              {{ item.title }}
            </h3>`

            <p class="text-base text-gray-500 ">
              {{ item.desc }}
            </p>

            <div v-if="item.type === 'info'">
              <Form
                class="mt-4"
                @submit="traceStep('plan')"
                :validation-schema="schema"
                :initial-values="formData"
                :keep-values="true"
              >
                <div class="field-wrapper">
                  <i-field
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="e.g Clinton"
                    v-model:value="formData.name"
                  />

                  <i-field
                    label="Email Address"
                    name="email"
                    type="email"
                    id="email"
                    class="mt-5"
                    placeholder="e.g clinton@gmail.com"
                    v-model:value="formData.email"
                  />

                  <i-field
                    label="Phone number"
                    name="tel"
                    type="tel"
                    id="tel"
                    class="mt-5"
                    placeholder="e.g +2348169336721"
                    v-model:value="formData.tel"
                  />
                </div>

                <footer
                  class="footer md:max-w-[670px] p-3 flex justify-end md:mt-16 bottom-0 w-full left-0 bg-white shadow fixed lg:relative lg:bg-transparent lg:shadow-none"
                >
                  <button
                    class="mt-3 px-3 py-2 rounded bg-primary-marine-blue text-white"
                  >
                    Next Step
                  </button>
                </footer>
              </Form>
            </div>

            <div v-else-if="item.type === 'plan'" class="mt-5">
              <div class="wrapper md:flex md:flex-wrap md:gap-4">
                <template v-for="item in plans">
                  <div
                    @click="selectPlan(item.name, item.price)"
                    :class="[
                      formData.plan.option === item.name
                        ? 'bg-neutral-50 border-primary-pastel-blue'
                        : 'bg-white',
                    ]"
                    class="card p-3 rounded-[8px] mb-4 md:mr-3 cursor-pointer transition-all ease-in-out hover:border-primary-purplish-blue border flex-1 flex md:items-start gap-3 md:flex-col md:max-w-[200px] md:h-[200px] md:justify-between"
                  >
                    <div class="h-10 w-10 md:h-12 md:w-12 rounded-full">
                      <img
                        :src="`/src/assets/images/${item.icon}`"
                        :alt="item.name"
                        class="w-full h-full"
                      />
                    </div>

                    <div class="leading-8">
                      <h4
                        class="text-base capitalize font-bold text-primary-marine-blue"
                      >
                        {{ item.name }}
                      </h4>
                      <p class="text-neutral-400">
                        ${{ item.price }}/{{ item.duration }}
                      </p>
                      <p
                        v-if="item.duration === 'yr'"
                        class="text-primary-marine-blue font-medium text-sm"
                      >
                        2 months free
                      </p>
                    </div>
                  </div>
                </template>
              </div>

              <label
                for="plan"
                class="flex items-center md:max-w-[670px] md:mt-10 justify-center p-4 rounded-[6px] bg-neutral-magnolia min-h-[50px]"
              >
                <div
                  class="font-bold"
                  :class="[
                    formData.plan.type === 'monthly'
                      ? 'text-primary-marine-blue'
                      : 'text-neutral-400',
                  ]"
                >
                  Monthly
                </div>
                <div class="relative mx-5">
                  <input
                    id="plan"
                    type="checkbox"
                    class="hidden"
                    @change="togglePlan"
                    :checked="formData.plan.type === 'yearly'"
                  />
                  <div
                    class="toggle__line w-12 h-6 bg-primary-marine-blue rounded-full shadow-inner"
                  ></div>

                  <div
                    class="toggle__dot absolute w-4 h-4 mt-1 mx-1 bg-white rounded-full shadow inset-y-0 left-0"
                  ></div>
                </div>
                <div
                  class="text font-bold"
                  :class="[
                    formData.plan.type === 'yearly'
                      ? 'text-primary-marine-blue'
                      : 'text-neutral-400',
                  ]"
                >
                  Yearly
                </div>
              </label>

              <footer
                class="footer md:max-w-[670px] p-3 flex justify-between md:mt-16 bottom-0 w-full left-0 bg-white shadow fixed lg:relative lg:bg-transparent lg:shadow-none"
              >
                <button
                  class="btn mx-3 text-neutral-400"
                  type="button"
                  @click="traceStep('info')"
                >
                  Go Back
                </button>

                <button
                  :disabled="formData.plan.option === ''"
                  class="mt-3 px-3 py-2 rounded bg-primary-marine-blue text-white"
                  @click="traceStep('add-on')"
                >
                  Next Step
                </button>
              </footer>
            </div>

            <div v-else-if="item.type === 'add-on'" class="mt-5">
              <Form
                :validation-schema="addonSchema"
                @submit="traceStep('summary')"
              >
                <template v-for="(item, i) in addons">
                  <div
                    class="card mb-4 flex items-center p-4 relative rounded-md z-10 md:max-w-[670px]"
                  >
                    <Field
                      v-model="formData.addon"
                      type="checkbox"
                      name="add-ons"
                      :id="`add-on-${i}`"
                      :value="item"
                      class="w-4 h-4 border-neutral-300 box-border checked:bg-primary-purplish-blue peer/checkbox opacity-30 checked:opacity-100 mr-3"
                    />

                    <label
                      :for="`add-on-${i}`"
                      class="w-full flex items-center justify-between cursor-pointer before:h-full before:w-full before:absolute before:top-0 before:left-0 before:border before:rounded-lg peer-checked/checkbox:before:border-primary-purplish-blue peer-checked/checkbox:before:border-2 peer-checked/checkbox:before:bg-neutral-alabaster peer-checked/checkbox:before:-z-10"
                    >
                      <div class="text-sm md:text-lg relative z-10">
                        <h5 class="text-primary-marine-blue font-ubuntuMedium">
                          {{ item.title }}
                        </h5>
                        <p
                          class="text-neutral-400 text-xs md:sm font-ubuntuMedium"
                        >
                          {{ item.description }}
                        </p>

                        <ErrorMessage
                          name="add-ons"
                          class="mb-1 text-red-500 text-xs capitalize"
                        />
                      </div>

                      <span
                        class="text-primary-purplish-blue relative z-10 text-sm font-ubuntuMedium"
                      >
                      <!-- formData.plan.type === 'yearly'? item.price * 10 : -->

                        +${{item.price }}/{{
                          formData.plan.type
                            .replace("monthly", "mo")
                            .replace("yearly", "yr")
                        }}</span
                      >
                    </label>
                  </div>
                </template>

                <footer
                  class="footer md:max-w-[670px] p-3 flex justify-between md:mt-16 bottom-0 w-full left-0 bg-white shadow fixed lg:relative lg:bg-transparent lg:shadow-none"
                >
                  <button
                    class="btn mx-3 text-neutral-400"
                    type="button"
                    @click="traceStep('plan')"
                  >
                    Go Back
                  </button>

                  <button
                    class="mt-3 px-3 py-2 rounded bg-primary-marine-blue text-white"
                  >
                    Next Step
                  </button>
                </footer>
              </Form>
            </div>

            <div v-else-if="item.type === 'summary'">
              <div class="card bg-neutral-alabaster px-3 py-5 rounded-lg mt-5">
                <ul class="list-wrapper">
                  <li class="border-b flex justify-between items-center pb-3">
                    <div>
                      <h4
                        class="text-primary-marine-blue font-ubuntuMedium capitalize"
                      >
                        {{ formData.plan.option }}({{ formData.plan.type }})
                      </h4>
                      <button
                        class="btn text-sm underline text-neutral-400"
                        @click="togglePlan"
                        type="button"
                      >
                        Change
                      </button>
                    </div>

                    <span
                      class="text-primary-marine-blue text-sm font-ubuntuMedium"
                      >${{ formData.plan.price }}/{{
                        formData.plan.type
                          .replace("monthly", "mo")
                          .replace("yearly", "yr")
                      }}</span
                    >
                  </li>

                  <li
                    class="flex justify-between items-center pb-3 py-3 mb-2"
                    v-for="(item, index) in formData.addon"
                    :key="index"
                  >
                    <span class="text-neutral-400 text-sm">{{
                      item.title
                    }}</span>
                    <span
                      class="text-xs text-primary-marine-blue font-ubuntuMedium"
                      >+${{ item.price }}/{{
                        formData.plan.type
                          .replace("monthly", "mo")
                          .replace("yearly", "yr")
                      }}</span
                    >
                  </li>
                </ul>
              </div>

              <div class="py-4 px-3 flex items-center justify-between">
                <span class="text-neutral-400 text-base">Total</span>
                <span class="text-primary-purplish-blue font-ubuntuMedium"
                  >+$ {{ total }}/{{
                    formData.plan.type
                      .replace("monthly", "mo")
                      .replace("yearly", "yr")
                  }}</span
                >
              </div>

              <footer
                class="footer md:max-w-[670px] p-3 flex justify-between md:mt-16 bottom-0 w-full left-0 bg-white shadow fixed lg:relative lg:bg-transparent lg:shadow-none"
              >
                <button
                  class="btn mx-3 text-neutral-400"
                  type="button"
                  @click="traceStep('add-on')"
                >
                  Go Back
                </button>

                <button
                  @click="traceStep('end')"
                  class="mt-3 px-3 py-2 rounded bg-primary-purplish-blue text-white"
                >
                  Confirm
                </button>
              </footer>
            </div>

            <div v-else-if="item.type === 'end'">
              <div class="flex items-center flex-col mt-5 py-5">

                <img src="/src/assets/images/icon-thank-you.svg" alt="thank you" class="h-full mb-5">

                <h4 class="font-ubuntuMedium text-2xl mb-5 text-primary-marine-blue">Thank you</h4>

                <p class="text-center text-neutral-500">
                  Thanks For confirming your subscription!
We hope you have fun using our platform. If you ever need support, please feel free to email us at nextolist@gmail.com.
                </p>
              </div>
            </div>
          </template>
        </template>
      </div>
    </layout>
  </div>
</template>

<style scoped></style>
