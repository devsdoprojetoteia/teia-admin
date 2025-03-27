interface Token {
  pattern?: RegExp;
  transform?: (value: string) => string;
  escape?: boolean;
}

interface MaskConfig {
  mask: string | string[];
  tokens: Record<string, Token>;
}

const tokens: Record<string, Token> = {
  "#": { pattern: /\d/ },
  X: { pattern: /[0-9a-zA-Z]/ },
  S: { pattern: /[a-zA-Z]/ },
  A: { pattern: /[a-zA-Z]/, transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: /[a-zA-Z]/, transform: (v) => v.toLocaleLowerCase() },
  "!": { escape: true },
};

function dynamicMask(
  maskit: (
    value: string,
    mask: string,
    masked: boolean,
    tokens: Record<string, Token>
  ) => string,
  masks: string[],
  tokens: Record<string, Token>
): (value: string, mask: string[], masked?: boolean) => string {
  masks = masks.sort((a, b) => a.length - b.length);
  return function (value: string, mask: string[], masked = true): string {
    let i = 0;
    while (i < masks.length) {
      const currentMask = masks[i];
      i++;
      const nextMask = masks[i];
      if (
        !(
          nextMask &&
          maskit(value, nextMask, true, tokens).length > currentMask.length
        )
      ) {
        return maskit(value, currentMask, masked, tokens);
      }
    }
    return ""; // empty masks
  };
}

function maskit(
  value: string,
  mask: string,
  masked = true,
  tokens: Record<string, Token>
): string {
  value = value || "";
  mask = mask || "";
  let iMask = 0;
  let iValue = 0;
  let output = "";

  while (iMask < mask.length && iValue < value.length) {
    let cMask = mask[iMask];
    const masker = tokens[cMask];
    const cValue = value[iValue];
    if (masker && !masker.escape) {
      if (masker.pattern?.test(cValue)) {
        output += masker.transform ? masker.transform(cValue) : cValue;
        iMask++;
      }
      iValue++;
    } else {
      if (masker && masker.escape) {
        iMask++; // take the next mask char and treat it as char
        cMask = mask[iMask];
      }
      if (masked) output += cMask;
      if (cValue === cMask) iValue++; // user typed the same char
      iMask++;
    }
  }

  // fix mask that ends with a char: (#)
  let restOutput = "";
  while (iMask < mask.length && masked) {
    const cMask = mask[iMask];
    if (tokens[cMask]) {
      restOutput = "";
      break;
    }
    restOutput += cMask;
    iMask++;
  }

  return output + restOutput;
}

function masker(
  value: string,
  mask: string | string[],
  masked = true,
  tokens: Record<string, Token>
): string {
  return Array.isArray(mask)
    ? dynamicMask(maskit, mask, tokens)(value, mask, masked)
    : maskit(value, mask, masked, tokens);
}

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way
function event(name: string): Event {
  const evt = document.createEvent("Event");
  evt.initEvent(name, true, true);
  return evt;
}

function mask(
  el: HTMLInputElement | HTMLElement,
  binding: { value: string | string[] | MaskConfig }
): void {
  let config: MaskConfig =
    Array.isArray(binding.value) || typeof binding.value === "string"
      ? { mask: binding.value, tokens }
      : binding.value;

  if (el.tagName.toLocaleUpperCase() !== "INPUT") {
    const els = el.getElementsByTagName("input");
    if (els.length !== 1) {
      throw new Error(`v-mask directive requires 1 input, found ${els.length}`);
    } else {
      el = els[0];
    }
  }

  const inputEl = el as HTMLInputElement;

  inputEl.oninput = function (evt: Event) {
    if (!(evt as InputEvent).isTrusted) return; // avoid infinite loop

    const position = inputEl.selectionEnd ?? 0;
    const digit = inputEl.value[position - 1];
    inputEl.value = masker(inputEl.value, config.mask, true, config.tokens);

    let newPosition = position;
    while (
      newPosition < inputEl.value.length &&
      inputEl.value.charAt(newPosition - 1) !== digit
    ) {
      newPosition++;
    }

    if (inputEl === document.activeElement) {
      inputEl.setSelectionRange(newPosition, newPosition);
      setTimeout(() => {
        inputEl.setSelectionRange(newPosition, newPosition);
      }, 0);
    }

    inputEl.dispatchEvent(event("input"));
  };

  const newDisplay = masker(inputEl.value, config.mask, true, config.tokens);
  if (newDisplay !== inputEl.value) {
    inputEl.value = newDisplay;
    inputEl.dispatchEvent(event("input"));
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("mask", mask);
});
