# Typescript实现字典翻译

```js
import { isMap, isObject } from '@/utils/is';
interface DictItem {
  value: string;
  label: string;
}

interface MyObject {
  [value: string]: any;
}

interface DictsParams {
  valueKey: string;
  labelKey: string;
}

type Dicts = DictItem[] | MyObject | Record<number | string, string>;

/**
 * @description: 字典值翻译
 * @return {*}
 */
export function getDictsValue(
  value: string,
  dicts: Dicts,
  params: DictsParams = { valueKey: 'value', labelKey: 'label' }
): string {
  if (!value) return '';
  if (Array.isArray(dicts)) {
    return (
      (dicts.find((dict) => dict[params.valueKey] === value) || {})[
        params.labelKey
      ] || value
    );
  } else if (isObject(dicts)) {
    const keys = Object.keys(dicts);
    for (const key of keys) {
      if (key === value) {
        return dicts[key];
      }
    }
  } else if (isMap(dicts)) {
    return dicts.get(value);
  }
  return value;
}
```