<template>
  <component v-bind:is="componentType" :class="cssClasses">
    <slot></slot>
  </component>
</template>
<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
  },
  variant: {
    type: String,
  },
  emphasis: {
    type: String,
  },
  weight: {
    type: String,
  },
  color: {
    type: String,
  },
  align: {
    type: String,
  },
});

const componentType = computed(() => {
  if (props.type) {
    return props.type;
  }

  if (props.variant) {
    const headingVariants = ["h1", "h2", "h3", "h4", "h5", "h6"];
    if (headingVariants.includes(props.variant)) {
      return props.variant;
    }
  }

  return "span";
});

const cssClasses = computed(() => {
  const classes = {} as Record<string, boolean>;
  if (props.variant) {
    classes[`text-${props.variant}`] = true;
  }

  if (props.emphasis) {
    if (props.emphasis === "medium") {
      classes["text-medium-emphasis"] = true;
    } else if (props.emphasis === "low") {
      classes["text-disabled"] = true;
    }
  }

  if (props.weight) {
    classes[`font-weight-${props.weight}`] = true;
  }

  if (props.color) {
    classes[`text-${props.color}`] = true;
  }

  if (props.align) {
    classes[`text-${props.align}`] = true;
  }

  return classes;
});
</script>
