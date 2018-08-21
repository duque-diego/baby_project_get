export class SasHelpers {

    public static removeNotNumbers(text: string) {
        if (!text) {
            return text;
        }

        return text.replace(/[^0-9]/g, "");
    }

    public static validateZipCode(zipCode: string): boolean {
        const expression = /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/;
        return expression.test(zipCode);
    }

    public static validateEmail(email: string): boolean {
        const expression = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return expression.test(email);
    }

    public static validateDate(dateString: string): boolean {
        // tslint:disable-next-line:max-line-length
        const expression =  /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;
        return expression.test(dateString);
    }

    public static validateCiCode(ciCode: string): boolean {
        return ciCode && ciCode.replace(/[^0-9]/g, "").length === 20;
    }

    public static validateCpf(cpf: string): boolean {

        if (!cpf) {
            return false;
        } else {

            cpf = cpf.replace(/[^0-9]/g, "");

            if (cpf.length !== 11) {
                return false;
            }

            let soma = 0;
            let resto;

            if (cpf === "00000000000") { return false; }

            for (let i = 1; i <= 9; i++) {
                soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
            }

            resto = (soma * 10) % 11;

            if (resto === 10 || resto === 11) {
                resto = 0;
            }

            if (resto !== parseInt(cpf.substring(9, 10), 10)) {
                return false;
            }

            soma = 0;
            for (let i = 1; i <= 10; i++) {
                soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
            }

            resto = (soma * 10) % 11;

            if ((resto === 10) || (resto === 11)) {
                resto = 0;
            }

            if (resto !== parseInt(cpf.substring(10, 11), 10)) {
                return false;
            }

            return true;
        }
    }
}
