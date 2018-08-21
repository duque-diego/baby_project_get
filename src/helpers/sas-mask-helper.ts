export class SasMaskHelper {

    public static commonMask = {
        ciCode: "999 99999 9999 9999 9999",
        cpf: "999.999.999-99",
        date: "99/99/9999",
        phoneNumber: "(99)99999-9999",
        zipCode: "99.999-999",
    };

    public static formatMask(maskName: string, value: string): string {
        const mask = SasMaskHelper.commonMask[maskName];

        if (!value || !mask) {
            return value;
        }

        let formattedValue = "";

        for (let index = 0; index < value.length; index++) {
            if (formattedValue.length >= mask.length) {
                break;
            }

            const element = value[index];
            const elementMask = mask[formattedValue.length];
            if (elementMask === "9") {
                formattedValue += SasMaskHelper.getNumberValue(element);
            } else {
                formattedValue += elementMask;
                index--;
            }
        }

        return formattedValue;
    }

    private static getNumberValue(value: string): string {
        if (!value || isNaN(parseInt(value, 10))) {
            return "";
        } else {
            return value;
        }
    }
}
