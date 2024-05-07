import { useStore } from '../contexts/store';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react';

export const ThemeChooser = () => {
  const setTheme = useStore((state) => state.setTheme);
  const theme = useStore((state) => state.theme);

  return (
    <RadioGroup value={theme} onChange={setTheme} aria-label="ui theme" className="w-full">
      {[
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'System', value: 'system' },
      ].map((t) => (
        <Field key={t.value} className="flex w-full items-center gap-2">
          <Radio
            key={t.value}
            value={t.value}
            className="group w-full relative flex cursor-pointer rounded-none bg-white/5 py-4 px-5 text-white transition data-[focus]:bg-primary/70 data-[checked]:bg-primary/50 data-[hover]:bg-primary/30 data-[checked]:data-[hover]:bg-primary/60"
          >
            <div className="flex w-full items-center justify-between text-black dark:text-white">
              <div className="text-sm/6">
                <p className="font-semibold ">{t.label}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                {t.value === theme && (
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </div>
          </Radio>
        </Field>
      ))}
    </RadioGroup>
  );
};
