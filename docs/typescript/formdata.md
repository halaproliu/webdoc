# formData类型

```ts
export class RuntimeForm<T extends IRuntimeForm> {
    constructor(private form: T) { }

    public formData(): FormData {
        const form = new FormData();

        Object.keys(this.form).forEach((key) => {
            if (this.form[key] !== undefined) {
                form.append(key, this.form[key])
            }
        })

        return form;
    }
}
```