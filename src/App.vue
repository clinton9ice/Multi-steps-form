<script setup lang="ts">
import Layout from "./components/Layout/index.vue";
import IField from "./components/Field.vue";
import { Form } from "vee-validate";
import * as yup from "yup";
import { computed, reactive, ref } from "vue";

interface FORMDATA {
  name: string;
  email: string;
  tel: string;
  plan: {
    type: "monthly" | "yearly";
    option: "archade" | "advanced" | "pro";
  };
}

const steps = reactive([
  {
    title: "Personal Info",
    desc: "Please Provide your name, email, and phone number",
    type: "info",
    active: false,
  },
  {
    title: "Select your plan",
    desc: "You have the option of monthly or yearly billing.",
    type: "plan",
    active: true,
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
    type: "add-on",
    active: false,
  },
]);

const plans = ref([
  {
    icon: "icon-arcade.svg",
    name: "arcade",
    price: 9,
  },
  {
    icon: "icon-advanced.svg",
    name: "advanced",
    price: 12,
  },
  {
    icon: "icon-pro.svg",
    name: "pro",
    price: 15,
  },
]);

const formData = reactive<FORMDATA>({
  name: "",
  email: "",
  tel: "",
  plan: {
    type: "monthly",
    option: "archade",
  },
});

const submit = (e: unknown) => {
  console.log(e);
};

const traceStep = (s: string) => {
  steps.forEach((e) => (e.active = e.type === s));
};

const togglePlan = () =>{
    formData.plan.type  = formData.plan.type === 'monthly'? 'yearly': 'monthly'
}

const selectPlan = (item: FORMDATA["plan"]["option"]) => {
  formData.plan.option = item;
};

const schema = computed(() => {
  return yup.object({
    email: yup.string().required().email(),
    name: yup.string().required(),
    tel: yup.string().required().min(10),
  });
});
</script>

<template>
  <div class="lg:px-3 lg:py-5 px-0 w-full">
    <layout>
      <div
        class="block max-w-[350px] lg:max-w-full mx-auto lg:static -mt-36 lg:m-0 p-6 rounded-[6px] bg-white lg:bg-transparent shadow-lg w-full lg:shadow-none"
      >
        <template v-for="item in steps">
          <template v-if="item.active">
            <h3
              class="font-bold text-[1.5em] lg:text-[3em] text-blue-900 font-ubuntuMedium"
            >
              {{ item.title }}
            </h3>
            <p class="text-base text-gray-500 mt-2">
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
                  class="footer p-3 flex justify-end mt-16 bottom-0 w-full left-0 bg-white shadow absolute lg:relative lg:bg-transparent lg:shadow-none"
                >
                  <button
                    class="mt-3 px-3 py-2 rounded bg-primary-purplish-blue text-white"
                  >
                    Next Step
                  </button>
                </footer>
              </Form>
            </div>

            <div v-if="item.type === 'plan'">
              <Form class="mt-5" @submit="submit" :validation-schema="schema">
                <div class="wrapper md:flex md:flex-wrap">
                  <template v-for="item in plans">
                    <div
                      @click="selectPlan(item.name)"
                      :class="{
                        'bg-neutral-50 border-primary-pastel-blue':
                          formData.plan.option === item.name,
                      }"
                      class="card p-3 rounded-[8px] mb-4 md:mr-3 cursor-pointer transition-all ease-in-out hover:border-primary-purplish-blue border flex-1 flex items-center md:items-start gap-3 md:flex-col md:max-w-[150px] md:min-h-[160px] md:justify-between"
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
                        <p class="text-neutral-400">${{ item.price }}/mo</p>
                      </div>
                    </div>
                  </template>
                </div>
                <label
                for="plan"
                class="flex items-center justify-center p-4 rounded-[6px] bg-neutral-alabaster min-h-[50px]"
              >
                <div class="font-bold" :class="[formData.plan.type==='monthly'? 'text-primary-marine-blue': 'text-neutral-400']">Monthly</div>

                <div class="relative mx-5">
                  <input id="plan" type="checkbox" class="hidden" @change="togglePlan" />
                  <div
                    class="toggle__line w-12 h-6 bg-primary-marine-blue rounded-full shadow-inner"
                  ></div>
                  
                  <div
                    class="toggle__dot absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0"
                  ></div>
                </div>
                <div class="text font-bold" :class="[formData.plan.type==='yearly'? 'text-primary-marine-blue': 'text-neutral-400']">Yearly</div>
              </label>

             

                <footer
                  class="footer p-3 flex justify-between md:mt-16 bottom-0 w-full left-0 bg-white shadow fixed lg:relative lg:bg-transparent lg:shadow-none"
                >
                  <button
                    class="btn mx-3 text-neutral-400"
                    type="button"
                    @click="traceStep('info')"
                  >
                    Go Back
                  </button>

                  <button
                    class="mt-3 px-3 py-2 rounded bg-primary-purplish-blue text-white"
                  >
                    Next Step
                  </button>
                </footer>
              </Form>
            </div>
          </template>
        </template>
      </div>
    </layout>
  </div>
</template>

<style scoped></style>
